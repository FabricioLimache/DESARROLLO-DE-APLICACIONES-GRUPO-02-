import ItemCarrito from './ItemCarrito.jsx'

function Carrito({ items, alQuitar, alCambiarCantidad }) {
  const total = items.reduce(
    (acc, item) => acc + item.price * item.cantidad,
    0
  )

  if (items.length === 0) {
    return <p className="estado">Tu carrito está vacío.</p>
  }

  return (
    <div>
      {items.map((item) => (
        <ItemCarrito
          key={item.id}
          item={item}
          alQuitar={alQuitar}
          alCambiarCantidad={alCambiarCantidad}
        />
      ))}

      <div className="total-carrito">
        Total: ${total.toFixed(2)}
      </div>
    </div>
  )
}

export default Carrito
