import { useEffect, useState } from "react";

function UsuarioCard({
  nombre,
  correo,
  ciudad,
  empresa
}) {
  return (
    <div className="usuario">
      <h2>{nombre}</h2>

      <p>
        <strong>Correo:</strong> {correo}
      </p>

      <p>
        <strong>Ciudad:</strong> {ciudad}
      </p>

      <p>
        <strong>Empresa:</strong> {empresa}
      </p>
    </div>
  );
}

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setUsuarios(datos);
        setCargando(false);
      });
  }, []);

  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.name
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <div className="contenedor">
      <h1>Directorio de Usuarios</h1>

      <input
        type="text"
        placeholder="Buscar usuario por nombre"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {cargando ? (
        <p>Cargando usuarios...</p>
      ) : usuariosFiltrados.length === 0 ? (
        <p>No existen coincidencias.</p>
      ) : (
        <div className="lista">
          {usuariosFiltrados.map((usuario) => (
            <UsuarioCard
              key={usuario.id}
              nombre={usuario.name}
              correo={usuario.email}
              ciudad={usuario.address.city}
              empresa={usuario.company.name}
            />
          ))}
        </div>
      )}
    </div>
  );
}
