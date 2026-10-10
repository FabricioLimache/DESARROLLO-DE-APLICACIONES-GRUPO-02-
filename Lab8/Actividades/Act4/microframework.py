"""
Experiencia 4: Micro-Framework Web con Decoradores y Cadena de Responsabilidad (Middleware)
Ejecutar:  python microframework.py
Abrir:     http://127.0.0.1:8080/saludo   y   http://127.0.0.1:8080/inexistente
"""
from wsgiref.simple_server import make_server


# 1. Núcleo del Micro-Framework (componente de enrutamiento)
class NucleoWSGI:
    def __init__(self):
        # Tabla hash para resolución de endpoints en O(1)
        self.mapa_enrutamiento = {}

    # Patrón decorador: vincula una URI con su función controladora
    def registrar_endpoint(self, ruta_esperada):
        def envoltura_compilacion(funcion_controlador):
            self.mapa_enrutamiento[ruta_esperada] = funcion_controlador
            return funcion_controlador
        return envoltura_compilacion

    # Despachador dinámico (Dispatcher WSGI)
    def __call__(self, environ, start_response):
        ruta_solicitada = environ.get("PATH_INFO", "/")

        if ruta_solicitada in self.mapa_enrutamiento:
            respuesta_texto = self.mapa_enrutamiento[ruta_solicitada](environ)
            estado = "200 OK"
        else:
            respuesta_texto = "Error 404: Endpoint huérfano o no implementado."
            estado = "404 Not Found"

        payload = respuesta_texto.encode("utf-8")
        start_response(estado, [
            ("Content-Type", "text/plain; charset=utf-8"),
            ("Content-Length", str(len(payload))),
        ])
        return [payload]


# 2. Tareas transversales (Middleware)
class MiddlewareAuditoria:
    def __init__(self, aplicacion_interior):
        # Referencia a la capa inferior (el framework)
        self.aplicacion_interior = aplicacion_interior

    def __call__(self, environ, start_response):
        # Tarea previa a la ejecución (filtro interceptor)
        verbo = environ.get("REQUEST_METHOD")
        uri = environ.get("PATH_INFO")
        print(f"[Capa de Seguridad] -> Intento de acceso: {verbo} a la ruta {uri}")

        # Delegación: la app interna no sabe que fue auditada
        return self.aplicacion_interior(environ, start_response)


# --- Instanciación y uso ---
app = NucleoWSGI()


@app.registrar_endpoint("/saludo")
def vista_saludo(environ):
    return "Micro-Framework funcionando mediante abstracción declarativa."


# El gateway llama al middleware, y el middleware a la app
aplicacion_fortificada = MiddlewareAuditoria(app)


if __name__ == "__main__":
    puerto = 8080
    servidor = make_server("127.0.0.1", puerto, aplicacion_fortificada)
    print(f"Servidor en http://127.0.0.1:{puerto}  (Ctrl+C para salir)")
    try:
        servidor.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido.")
