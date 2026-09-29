import { useState } from "react";

const tareasIniciales = [
  {
    id: 1,
    nombre: "Diseñar interfaz",
    descripcion: "Crear el diseño de la aplicación.",
    estado: "Pendiente"
  },
  {
    id: 2,
    nombre: "Crear componentes",
    descripcion: "Desarrollar componentes reutilizables.",
    estado: "En progreso"
  },
  {
    id: 3,
    nombre: "Conectar API",
    descripcion: "Realizar la conexión con la API.",
    estado: "Pendiente"
  },
  {
    id: 4,
    nombre: "Realizar pruebas",
    descripcion: "Verificar el funcionamiento.",
    estado: "En progreso"
  },
  {
    id: 5,
    nombre: "Publicar proyecto",
    descripcion: "Preparar el proyecto.",
    estado: "Pendiente"
  }
];

function TareaCard({
  tarea,
  cambiarEstado,
  completar,
  eliminar
}) {
  return (
    <div className="tarea">
      <h2>{tarea.nombre}</h2>

      <p>{tarea.descripcion}</p>

      <p>
        Estado: <strong>{tarea.estado}</strong>
      </p>

      <button onClick={() => cambiarEstado(tarea.id)}>
        Cambiar estado
      </button>

      <button onClick={() => completar(tarea.id)}>
        Completar
      </button>

      <button onClick={() => eliminar(tarea.id)}>
        Eliminar
      </button>
    </div>
  );
}

export default function App() {
  const [tareas, setTareas] = useState(tareasIniciales);

  const cambiarEstado = (id) => {
    setTareas(
      tareas.map((tarea) => {
        if (tarea.id !== id) {
          return tarea;
        }

        if (tarea.estado === "Pendiente") {
          return {
            ...tarea,
            estado: "En progreso"
          };
        }

        if (tarea.estado === "En progreso") {
          return {
            ...tarea,
            estado: "Completado"
          };
        }

        return {
          ...tarea,
          estado: "Pendiente"
        };
      })
    );
  };

  const completar = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id
          ? { ...tarea, estado: "Completado" }
          : tarea
      )
    );
  };

  const eliminar = (id) => {
    setTareas(
      tareas.filter((tarea) => tarea.id !== id)
    );
  };

  return (
    <div className="contenedor">
      <h1>Panel de Tareas</h1>

      <div className="lista">
        {tareas.map((tarea) => (
          <TareaCard
            key={tarea.id}
            tarea={tarea}
            cambiarEstado={cambiarEstado}
            completar={completar}
            eliminar={eliminar}
          />
        ))}
      </div>
    </div>
  );
}
