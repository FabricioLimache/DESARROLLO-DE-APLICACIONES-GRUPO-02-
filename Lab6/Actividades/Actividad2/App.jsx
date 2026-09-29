import { useState } from 'react'
import Header from './components/Header'
import Card from './components/Card'
import Footer from './components/Footer'
import logo from './assets/logo.svg'
import './App.css'

const datos = [
  { id: 1, nombre: 'React', descripcion: 'Biblioteca para construir interfaces de usuario.', categoria: 'Frontend', favorito: false },
  { id: 2, nombre: 'Vite', descripcion: 'Herramienta para crear proyectos web modernos.', categoria: 'Herramientas', favorito: false },
  { id: 3, nombre: 'JavaScript', descripcion: 'Lenguaje de programación de la web.', categoria: 'Lenguaje', favorito: false },
  { id: 4, nombre: 'Node.js', descripcion: 'Entorno para ejecutar JavaScript fuera del navegador.', categoria: 'Backend', favorito: false },
  { id: 5, nombre: 'CSS', descripcion: 'Lenguaje de estilos para las páginas web.', categoria: 'Frontend', favorito: false }
]

function App() {
  const [tecnologias, setTecnologias] = useState(datos)

  function alternarFavorito(id) {
    setTecnologias(
      tecnologias.map((t) => (t.id === id ? { ...t, favorito: !t.favorito } : t))
    )
  }

  function eliminar(id) {
    setTecnologias(tecnologias.filter((t) => t.id !== id))
  }

  const favoritos = tecnologias.filter((t) => t.favorito).length

  return (
    <div className="contenedor">
      <Header
        titulo="Catálogo de tecnologías web"
        equipo="Equipo Lambda"
        descripcion="Aplicación hecha con React y Vite para mostrar las tecnologías que vemos en el curso."
        logo={logo}
      />

      <main>
        <p className="resumen">
          Total: {tecnologias.length} | Favoritos: {favoritos}
        </p>

        {tecnologias.length === 0 && (
          <p className="vacio">No hay tecnologías en la lista.</p>
        )}

        <div className="lista">
          {tecnologias.map((t) => (
            <Card
              key={t.id}
              nombre={t.nombre}
              descripcion={t.descripcion}
              categoria={t.categoria}
              favorito={t.favorito}
              alternarFavorito={() => alternarFavorito(t.id)}
              eliminar={() => eliminar(t.id)}
            />
          ))}
        </div>
      </main>

      <Footer curso="Desarrollo de Aplicaciones" practica={6} />
    </div>
  )
}

export default App
