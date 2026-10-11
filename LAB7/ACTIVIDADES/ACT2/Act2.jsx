/**********************************************************************
ARCHIVO     : Act2.jsx
AUTOR       : Grupo 02
FECHA       : 07/10/2026
DESCRIPCIÓN : Experiencia 2 - Componentes de lista, props y estado con
              useState (TareaItem, TareaLista y TareasApp). Cada bloque
              se guarda en la ruta indicada en su comentario.
**********************************************************************/

// src/components/TareaItem.jsx
function TareaItem({ tarea, onAlternar }) {
  return (
    <li className={tarea.completada ? "tarea completada" : "tarea"}>
      <span>{tarea.titulo}</span>
      <button onClick={() => onAlternar(tarea.id)}>
        {tarea.completada ? "Deshacer" : "Completar"}
      </button>
    </li>
  );
}

// src/components/TareaLista.jsx
function TareaLista({ tareas, onAlternar }) {
  if (tareas.length === 0) return <p>No hay tareas registradas.</p>;
  return (
    <ul>
      {tareas.map((t) => (
        <TareaItem key={t.id} tarea={t} onAlternar={onAlternar} />
      ))}
    </ul>
  );
}

// src/TareasApp.jsx
import { useState } from "react";
import TareaLista from "./components/TareaLista";
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
  return <TareaLista tareas={tareas} onAlternar={alternarTarea} />;
}
export default TareasApp;
