import { useState } from "react";
import TareaLista from "./components/TareaLista";
import FormularioTarea from "./components/FormularioTarea";

function TareasApp() {
  const [tareas, setTareas] = useState([
    { id: 1, titulo: "Revisar el marco teórico", completada: true },
    { id: 2, titulo: "Resolver la Experiencia 2", completada: false },
    { id: 3, titulo: "Repasar Hooks", completada: false },
  ]);

  const alternarTarea = (id) => {
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, completada: !t.completada } : t
      )
    );
  };

  const agregarTarea = (titulo) => {
    const nuevaTarea = { id: Date.now(), titulo, completada: false };
    setTareas([...tareas, nuevaTarea]); // arreglo nuevo, sin mutar el estado
  };

  return (
    <div>
      <FormularioTarea onAgregar={agregarTarea} />
      <TareaLista tareas={tareas} onAlternar={alternarTarea} />
    </div>
  );
}

export default TareasApp;
