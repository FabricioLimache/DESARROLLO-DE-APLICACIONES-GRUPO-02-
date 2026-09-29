import { useState } from "react";

const videojuegosIniciales = [
  {
    id: 1,
    nombre: "Dota 2",
    descripcion: "Videojuego multijugador de estrategia y acción.",
    categoria: "MOBA"
  },
  {
    id: 2,
    nombre: "Minecraft",
    descripcion: "Videojuego de construcción y exploración.",
    categoria: "Sandbox"
  },
  {
    id: 3,
    nombre: "Valorant",
    descripcion: "Videojuego competitivo de disparos tácticos.",
    categoria: "FPS"
  },
  {
    id: 4,
    nombre: "Elden Ring",
    descripcion: "Videojuego de rol y acción.",
    categoria: "RPG"
  },
  {
    id: 5,
    nombre: "Forza Horizon 5",
    descripcion: "Videojuego de carreras en mundo abierto.",
    categoria: "Carreras"
  }
];

function VideojuegoCard({
  videojuego,
  seleccionado,
  onSeleccionar,
  onEliminar
}) {
  return (
    <div className={seleccionado ? "card seleccionado" : "card"}>
      <h2>{videojuego.nombre}</h2>

      <p>{videojuego.descripcion}</p>

      <p>
        <strong>Categoría:</strong> {videojuego.categoria}
      </p>

      <button onClick={() => onSeleccionar(videojuego.id)}>
        {seleccionado ? "Seleccionado" : "Seleccionar"}
      </button>

      <button onClick={() => onEliminar(videojuego.id)}>
        Eliminar
      </button>
    </div>
  );
}

export default function App() {
  const [videojuegos, setVideojuegos] = useState(videojuegosIniciales);
  const [seleccionado, setSeleccionado] = useState(null);

  const eliminar = (id) => {
    setVideojuegos(
      videojuegos.filter((videojuego) => videojuego.id !== id)
    );

    if (seleccionado === id) {
      setSeleccionado(null);
    }
  };

  return (
    <div className="contenedor">
      <h1>Catálogo de Videojuegos</h1>

      <div className="catalogo">
        {videojuegos.map((videojuego) => (
          <VideojuegoCard
            key={videojuego.id}
            videojuego={videojuego}
            seleccionado={seleccionado === videojuego.id}
            onSeleccionar={setSeleccionado}
            onEliminar={eliminar}
          />
        ))}
      </div>
    </div>
  );
}
