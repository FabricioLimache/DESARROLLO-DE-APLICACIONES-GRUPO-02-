import FormularioGasto from './components/FormularioGasto.jsx'
import ListaGastos from './components/ListaGastos.jsx'
import ResumenGastos from './components/ResumenGastos.jsx'

function App() {
  return (
    <div className="container">
      <h1>Panel de Gastos Personales</h1>
      <FormularioGasto />
      <ResumenGastos />
      <ListaGastos />
    </div>
  )
}

export default App
