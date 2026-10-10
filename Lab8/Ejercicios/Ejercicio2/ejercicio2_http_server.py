from __future__ import annotations

import json
import mimetypes
import os
import urllib.parse
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

DIRECTORIO_BASE = os.path.dirname(os.path.abspath(__file__))
DIRECTORIO_PUBLICO = os.path.join(DIRECTORIO_BASE, "public")
LIMITE_MAXIMO = 100
ENDPOINT_INVENTARIO = "/api/inventario"

INVENTARIO = [
    {"id": i, "nombre": nombre, "categoria": categoria, "stock": stock}
    for i, (nombre, categoria, stock) in enumerate(
        [
            ("Laptop Lenovo ThinkPad", "Cómputo", 12),
            ("Laptop HP Pavilion", "Cómputo", 7),
            ("Monitor LG 24''", "Periféricos", 20),
            ("Teclado mecánico Redragon", "Periféricos", 35),
            ("Mouse inalámbrico Logitech", "Periféricos", 50),
            ("Impresora Epson L3250", "Oficina", 9),
            ("Silla ergonómica", "Mobiliario", 15),
            ("Escritorio de melamina", "Mobiliario", 6),
            ("Router TP-Link AX3000", "Redes", 18),
            ("Switch 8 puertos Cisco", "Redes", 11),
            ("Laptop Dell Inspiron", "Cómputo", 4),
            ("Webcam Logitech C920", "Periféricos", 22),
        ],
        start=1,
    )
]


def _preparar_directorio_publico() -> None:
    os.makedirs(DIRECTORIO_PUBLICO, exist_ok=True)
    index_path = os.path.join(DIRECTORIO_PUBLICO, "index.html")
    if not os.path.exists(index_path):
        with open(index_path, "w", encoding="utf-8") as f:
            f.write(
                "<!DOCTYPE html>\n<html lang='es'>\n<head>"
                "<meta charset='utf-8'><title>Inventario</title></head>\n"
                "<body>\n<h1>Servidor híbrido HTTP nativo</h1>\n"
                "<p>Prueba el endpoint dinámico: "
                "<a href='/api/inventario'>/api/inventario</a></p>\n"
                "</body>\n</html>\n"
            )


class ManejadorHibrido(BaseHTTPRequestHandler):
    server_version = "ServidorHibrido/1.0"

    def _enviar_json(self, status: int, payload: dict) -> None:
        cuerpo = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(cuerpo)))
        self.end_headers()
        self.wfile.write(cuerpo)

    def _enviar_error_simple(self, status: int, mensaje: str) -> None:
        cuerpo = mensaje.encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.send_header("Content-Length", str(len(cuerpo)))
        self.end_headers()
        self.wfile.write(cuerpo)

    def do_GET(self) -> None:
        partes = urllib.parse.urlsplit(self.path)
        ruta = urllib.parse.unquote(partes.path)

        if ruta == ENDPOINT_INVENTARIO:
            self._manejar_inventario(partes.query)
            return

        self._manejar_estatico(ruta)

    def _manejar_estatico(self, ruta: str) -> None:
        if ruta == "/":
            ruta = "/index.html"

        ruta_relativa = ruta.lstrip("/")
        ruta_candidata = os.path.abspath(
            os.path.join(DIRECTORIO_PUBLICO, ruta_relativa)
        )

        base_normalizada = os.path.abspath(DIRECTORIO_PUBLICO) + os.sep
        if not (ruta_candidata + os.sep).startswith(base_normalizada) and ruta_candidata != os.path.abspath(DIRECTORIO_PUBLICO):
            self._enviar_error_simple(403, "Acceso prohibido: intento de Path Traversal detectado.")
            return

        if not os.path.isfile(ruta_candidata):
            self._enviar_error_simple(404, "Recurso no encontrado.")
            return

        content_type, _ = mimetypes.guess_type(ruta_candidata)
        content_type = content_type or "application/octet-stream"

        try:
            with open(ruta_candidata, "rb") as f:
                cuerpo = f.read()
        except OSError:
            self._enviar_error_simple(404, "Recurso no encontrado.")
            return

        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(cuerpo)))
        self.end_headers()
        self.wfile.write(cuerpo)

    def _manejar_inventario(self, query_string: str) -> None:
        parametros = urllib.parse.parse_qs(query_string)

        try:
            limite = int(parametros.get("limite", ["10"])[0])
        except ValueError:
            self._enviar_json(400, {"error": "El parámetro 'limite' debe ser un entero."})
            return

        try:
            pagina = int(parametros.get("pagina", ["1"])[0])
        except ValueError:
            self._enviar_json(400, {"error": "El parámetro 'pagina' debe ser un entero."})
            return

        filtro = parametros.get("filtro", [""])[0].strip().lower()

        if limite <= 0:
            self._enviar_json(400, {"error": "El parámetro 'limite' debe ser mayor que 0."})
            return
        if pagina <= 0:
            self._enviar_json(400, {"error": "El parámetro 'pagina' debe ser mayor que 0."})
            return

        limite = min(limite, LIMITE_MAXIMO)

        if filtro:
            resultados = [
                item for item in INVENTARIO
                if filtro in item["nombre"].lower() or filtro in item["categoria"].lower()
            ]
        else:
            resultados = INVENTARIO

        total_resultados = len(resultados)

        offset = (pagina - 1) * limite
        pagina_datos = resultados[offset: offset + limite]

        total_paginas = (total_resultados + limite - 1) // limite if total_resultados else 0

        self._enviar_json(
            200,
            {
                "metadatos": {
                    "total_resultados": total_resultados,
                    "pagina_actual": pagina,
                    "total_paginas": total_paginas,
                    "limite": limite,
                    "filtro_aplicado": filtro or None,
                },
                "datos": pagina_datos,
            },
        )

    def log_message(self, format: str, *args) -> None:
        print(f"[{self.address_string()}] {format % args}")


if __name__ == "__main__":
    _preparar_directorio_publico()
    HOST, PORT = "127.0.0.1", 8002
    with ThreadingHTTPServer((HOST, PORT), ManejadorHibrido) as servidor:
        print(f"Servidor híbrido (Ejercicio 2) escuchando en http://{HOST}:{PORT}")
        print(f"  - Estáticos:  GET /          (sirve desde ./public)")
        print(f"  - Dinámico:   GET {ENDPOINT_INVENTARIO}?filtro=...&limite=...&pagina=...")
        print("Presiona Ctrl+C para detener.")
        try:
            servidor.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor detenido.")
