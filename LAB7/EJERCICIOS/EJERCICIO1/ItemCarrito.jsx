function ItemCarrito({ item, alQuitar, alCambiarCantidad }) {
  return (
    <div className="item-carrito">
      <img src={item.image} alt={item.title} />

      <div className="info">
        <div>{item.title}</div>
        <div>${item.price.toFixed(2)} c/u</div>
      </div>

      <input
        type="number"
        min="1"
        value={item.cantidad}
        onChange={(e) =>
          alCambiarCantidad(item.id, Number(e.target.value))
        }
      />

      <div>
        ${(item.price * item.cantidad).toFixed(2)}
      </div>

      <button onClick={() => alQuitar(item.id)}>
        Quitar
      </button>
    </div>
  )
}

export default ItemCarrito
