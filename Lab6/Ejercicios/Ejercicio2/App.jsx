import { useEffect, useState } from "react";

function Formulario() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    carrera: ""
  });

  const [registro, setRegistro] = useState(null);

  const cambiarCampo = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const enviarFormulario = (e) => {
    e.preventDefault();

    setRegistro(formulario);

    setFormulario({
      nombre: "",
      correo: "",
      carrera: ""
    });
  };

  return (
    <div className="formulario">
      <h1>Registro de Estudiante</h1>

      <form onSubmit={enviarFormulario}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formulario.nombre}
          onChange={cambiarCampo}
        />

        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={formulario.correo}
          onChange={cambiarCampo}
        />

        <input
          type="text"
          name="carrera"
          placeholder="Carrera"
          value={formulario.carrera}
          onChange={cambiarCampo}
        />

        <button type="submit">Registrar</button>
      </form>

      {registro && (
        <div className="registro">
          <h2>Información registrada</h2>
          <p>Nombre: {registro.nombre}</p>
          <p>Correo: {registro.correo}</p>
          <p>Carrera: {registro.carrera}</p>
        </div>
      )}
    </div>
  );
}

function UsuariosAPI() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setUsuarios(datos);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <p>Cargando usuarios...</p>;
  }

  return (
    <div className="usuarios">
      <h1>Usuarios de la API</h1>

      {usuarios.map((usuario) => (
        <div className="usuario" key={usuario.id}>
          <h2>{usuario.name}</h2>
          <p>Correo: {usuario.email}</p>
          <p>Ciudad: {usuario.address.city}</p>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <div className="contenedor">
      <Formulario />
      <UsuariosAPI />
    </div>
  );
}
