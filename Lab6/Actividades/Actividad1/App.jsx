import logo from './assets/logo.svg'
import banner from './assets/banner.svg'
import './App.css'

function App() {
  const nombreApp = 'Catálogo de tecnologías web'
  const equipo = 'Equipo Lambda'
  const curso = 'Desarrollo de Aplicaciones'
  const practica = 6
  const tecnologias = 4

  return (
    <div className="contenedor">
      <img className="logo" src={logo} alt="Logo" />
      <h1>{nombreApp}</h1>
      <h2>Equipo: {equipo}</h2>
      <p>
        Aplicación hecha con React y Vite para mostrar las tecnologías que
        vemos en el curso.
      </p>
      <p>
        {curso} - Práctica N.° {practica}
      </p>
      <p>Tecnologías registradas: {tecnologias}</p>
      <hr />
      <img
        className="banner"
        src={banner}
        alt="Banner de React"
      />
    </div>
  )
}

export default App
