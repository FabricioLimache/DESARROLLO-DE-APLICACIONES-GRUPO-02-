
from __future__ import annotations

import json
from typing import Callable, Iterable
from urllib.parse import parse_qs
from wsgiref.simple_server import make_server


TOKEN_VALIDO = "Bearer TOKEN_SECRETO_2026"
LLAVES_OBLIGATORIAS = ("dni", "correo_electronico", "programa_academico")
ENDPOINT_INSCRIPCIONES = "/api/inscripciones"



def _responder_json(start_response: Callable, status: str, payload: dict) -> Iterable[bytes]:
    """Serializa `payload` a JSON, arma las cabeceras y devuelve el iterable
    de bytes que exige la interfaz WSGI (PEP 3333)."""
    cuerpo = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    headers = [
        ("Content-Type", "application/json; charset=utf-8"),
        ("Content-Length", str(len(cuerpo))),
    ]
    start_response(status, headers)
    return [cuerpo]


def _responder_texto(start_response: Callable, status: str, mensaje: str) -> Iterable[bytes]:
    """Variante en texto plano, usada por el middleware para el 401 y por la
    app para errores de ruteo (404/405) cuando no hace falta JSON."""
    cuerpo = mensaje.encode("utf-8")
    headers = [
        ("Content-Type", "text/plain; charset=utf-8"),
        ("Content-Length", str(len(cuerpo))),
    ]
    start_response(status, headers)
    return [cuerpo]


class MiddlewareTokenSeguridad:
    """Componente WSGI envolvente que intercepta TODAS las peticiones.

    Si la cabecera HTTP_AUTHORIZATION no coincide exactamente con el token
    esperado, se hace un cortocircuito (short-circuit) devolviendo 401 sin
    siquiera invocar a la aplicación interna. En caso contrario, delega el
    control (environ, start_response) a `app_envuelta`.
    """

    def __init__(self, app_envuelta: Callable):
        self.app_envuelta = app_envuelta

    def __call__(self, environ: dict, start_response: Callable) -> Iterable[bytes]:
        token_recibido = environ.get("HTTP_AUTHORIZATION", "")

        if token_recibido != TOKEN_VALIDO:
            return _responder_texto(
                start_response,
                "401 Unauthorized",
                "Acceso denegado: token de autorización ausente o inválido.",
            )

        # Token válido -> delega el control a la aplicación principal.
        return self.app_envuelta(environ, start_response)


def _leer_cuerpo_peticion(environ: dict) -> bytes:
    """Lee el flujo binario de environ['wsgi.input'] respetando estrictamente
    CONTENT_LENGTH, para evitar bloqueos de socket (hang-ups) al intentar
    leer más allá de lo que el cliente realmente envió."""
    try:
        longitud = int(environ.get("CONTENT_LENGTH", 0) or 0)
    except (TypeError, ValueError):
        longitud = 0

    if longitud <= 0:
        return b""

    return environ["wsgi.input"].read(longitud)


def _deserializar_payload(environ: dict, crudo: bytes) -> tuple[dict | None, str | None]:
    """Analizador polimórfico: según CONTENT_TYPE, deserializa el payload
    crudo a un diccionario estándar de Python.

    Retorna (payload, error). Si hay error, payload es None.
    """
    content_type = environ.get("CONTENT_TYPE", "").split(";")[0].strip().lower()

    if content_type == "application/json":
        if not crudo:
            return None, "El cuerpo de la petición está vacío."
        try:
            datos = json.loads(crudo.decode("utf-8"))
        except (json.JSONDecodeError, UnicodeDecodeError) as exc:
            return None, f"JSON malformado: {exc}"
        if not isinstance(datos, dict):
            return None, "El JSON raíz debe ser un objeto (diccionario)."
        return datos, None

    if content_type == "application/x-www-form-urlencoded":
        texto = crudo.decode("utf-8", errors="replace")
        parseado = parse_qs(texto)
        # Aplanamiento de listas: parse_qs devuelve {k: [v1, v2, ...]}
        datos = {k: v[0] for k, v in parseado.items() if v}
        return datos, None

    return None, f"Content-Type no soportado: '{content_type or 'ausente'}'."


def _validar_esquema(payload: dict) -> str | None:
    """Fail-Fast: retorna el nombre de la primera llave obligatoria ausente,
    o None si el esquema es válido."""
    for llave in LLAVES_OBLIGATORIAS:
        if llave not in payload or payload[llave] in (None, ""):
            return llave
    return None



def aplicacion_inscripciones(environ: dict, start_response: Callable) -> Iterable[bytes]:
    metodo = environ.get("REQUEST_METHOD", "")
    ruta = environ.get("PATH_INFO", "")

    # --- Ruteo ---
    if ruta != ENDPOINT_INSCRIPCIONES:
        return _responder_json(
            start_response, "404 Not Found",
            {"error": "Ruta no encontrada", "ruta_solicitada": ruta},
        )

    if metodo != "POST":
        return _responder_json(
            start_response, "405 Method Not Allowed",
            {"error": "Método no permitido", "metodo_permitido": "POST", "metodo_recibido": metodo},
        )

    # --- Lectura segura de I/O ---
    crudo = _leer_cuerpo_peticion(environ)

    # --- Deserialización polimórfica ---
    payload, error = _deserializar_payload(environ, crudo)
    if error is not None:
        return _responder_json(start_response, "400 Bad Request", {"error": error})

    # --- Validación de esquema (Fail-Fast) ---
    llave_faltante = _validar_esquema(payload)
    if llave_faltante is not None:
        return _responder_json(
            start_response, "400 Bad Request",
            {"error": "Falta un parámetro obligatorio", "parametro_faltante": llave_faltante},
        )

    # --- Éxito ---
    return _responder_json(
        start_response, "201 Created",
        {
            "mensaje": "Inscripción registrada exitosamente.",
            "aspirante": {
                "dni": payload["dni"],
                "correo_electronico": payload["correo_electronico"],
                "programa_academico": payload["programa_academico"],
            },
        },
    )



app = MiddlewareTokenSeguridad(aplicacion_inscripciones)


if __name__ == "__main__":
    HOST, PORT = "127.0.0.1", 8001
    with make_server(HOST, PORT, app) as servidor:
        print(f"Servidor WSGI (Ejercicio 1) escuchando en http://{HOST}:{PORT}")
        print(f"Endpoint protegido: POST {ENDPOINT_INSCRIPCIONES}")
        print("Presiona Ctrl+C para detener.")
        try:
            servidor.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor detenido.")
