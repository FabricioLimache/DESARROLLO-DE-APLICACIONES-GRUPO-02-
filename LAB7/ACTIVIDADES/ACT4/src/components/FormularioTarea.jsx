import { useState } from "react";

function FormularioTarea({ onAgregar }) {
  const [titulo, setTitulo] = useState("");

  const manejarEnvio = (evento) => {
    evento.preventDefault();          // evita que el navegador recargue la página
    const limpio = titulo.trim();
    if (limpio === "") return;        // validación: no se aceptan campos vacíos
    onAgregar(limpio);                // avisa al componente padre
    setTitulo("");                    // limpia el campo
  };

  return (
    <form onSubmit={manejarEnvio} className="formulario-tarea">
      <input
        type="text"
        value={titulo}
        onChange={(evento) => setTitulo(evento.target.value)}
        placeholder="Escribe una nueva tarea"
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default FormularioTarea;
