import { useSelector, useDispatch } from 'react-redux'
import { eliminarGasto } from '../redux/acciones.js'

function ListaGastos() {
  const gastos = useSelector((state) => state.gastos)
  const dispatch = useDispatch()

  if (gastos.length === 0) {
    return <p className="estado">Todavía no registraste ningún gasto.</p>
  }

  return (
    <ul className="lista-gastos">
      {gastos.map((gasto) => (
        <li key={gasto.id}>
          <span className="descripcion">{gasto.descripcion}</span>
          <span className="categoria">{gasto.categoria}</span>
          <span className="monto">${gasto.monto.toFixed(2)}</span>
          <button onClick={() => dispatch(eliminarGasto(gasto.id))}>Eliminar</button>
        </li>
      ))}
    </ul>
  )
}

export default ListaGastos
