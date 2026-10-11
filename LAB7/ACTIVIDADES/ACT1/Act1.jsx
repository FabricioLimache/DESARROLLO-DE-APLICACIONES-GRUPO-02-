/**********************************************************************
ARCHIVO     : Act1.jsx
AUTOR       : Grupo 02
FECHA       : 07/10/2026
DESCRIPCIÓN : Experiencia 1 - Entorno de trabajo y primer componente
              (Encabezado con JSX y una prop). Cada bloque se guarda en
              la ruta indicada en su comentario.
**********************************************************************/

// src/components/Encabezado.jsx
function Encabezado({ usuario }) {
  const fecha = new Date().toLocaleDateString("es-PE", {
    day: "numeric", month: "long", year: "numeric",
  });
  return (
    <header className="encabezado">
      <h1>TaskFlow</h1>
      <p>Hola, {usuario}. Hoy es {fecha}.</p>
    </header>
  );
}
export default Encabezado;

// src/App.jsx
import Encabezado from "./components/Encabezado";
function App() {
  return (
    <div className="app">
      <Encabezado usuario="Carlos" />
    </div>
  );
}
export default App;
