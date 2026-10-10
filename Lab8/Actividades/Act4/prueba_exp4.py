"""Prueba automática: verifica enrutamiento 200/404 y que el middleware audite cada petición."""
import threading
import urllib.request
import urllib.error
from wsgiref.simple_server import make_server, WSGIRequestHandler
from microframework import aplicacion_fortificada


class Silencioso(WSGIRequestHandler):
    def log_message(self, *args):
        pass


servidor = make_server("127.0.0.1", 0, aplicacion_fortificada, handler_class=Silencioso)
puerto = servidor.server_port
threading.Thread(target=servidor.serve_forever, daemon=True).start()
base = f"http://127.0.0.1:{puerto}"

with urllib.request.urlopen(base + "/saludo") as r:
    print("GET /saludo      ->", r.status, r.read().decode("utf-8"))
    assert r.status == 200

try:
    urllib.request.urlopen(base + "/inexistente")
except urllib.error.HTTPError as e:
    print("GET /inexistente ->", e.code, e.read().decode("utf-8"))
    assert e.code == 404

servidor.shutdown()
print("OK")
