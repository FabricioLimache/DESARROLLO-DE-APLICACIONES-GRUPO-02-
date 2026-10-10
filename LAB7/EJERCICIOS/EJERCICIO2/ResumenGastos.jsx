import { useSelector } from 'react-redux'

function ResumenGastos() {
  const gastos = useSelector((state) => state.gastos)
  const total = gastos.reduce((acc, gasto) => acc + gasto.monto, 0)

  return (
    <div className="resumen-gastos">
      <span>Total gastado:</span>
      <strong>${total.toFixed(2)}</strong>
      <span className="cantidad-gastos">({gastos.length} gasto{gastos.length !== 1 ? 's' : ''})</span>
    </div>
  )
}

export default ResumenGastos
