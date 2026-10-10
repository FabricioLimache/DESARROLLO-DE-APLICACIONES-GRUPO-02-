import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { agregarGasto } from '../redux/acciones.js'

const CATEGORIAS = ['Alimentación', 'Transporte', 'Vivienda', 'Salud', 'Ocio', 'Otros']

function FormularioGasto() {
  const dispatch = useDispatch()
  const [descripcion, setDescripcion] = useState('')
  const [monto, setMonto] = useState('')
  const [categoria, setCategoria] = useState(CATEGORIAS[0])

  function manejarEnvio(e) {
    e.preventDefault()
    if (!descripcion.trim() || !monto || Number(monto) <= 0) return

    dispatch(agregarGasto({ descripcion: descripcion.trim(), monto, categoria }))

    setDescripcion('')
    setMonto('')
    setCategoria(CATEGORIAS[0])
  }

  return (
    <form className="formulario-gasto" onSubmit={manejarEnvio}>
      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <input
        type="number"
        step="0.01"
        min="0"
        placeholder="Monto"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
      />
      <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
        {CATEGORIAS.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <button type="submit">Agregar gasto</button>
    </form>
  )
}

export default FormularioGasto
