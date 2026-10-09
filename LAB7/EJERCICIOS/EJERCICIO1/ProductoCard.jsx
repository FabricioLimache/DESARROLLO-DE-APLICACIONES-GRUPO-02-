function ProductoCard({ producto, alAgregar }) {
  return (
    <div className="producto-card">
      <img src={producto.image} alt={producto.title} />
      <h3>{producto.title}</h3>
      <div className="precio">${producto.price.toFixed(2)}</div>
      <button onClick={() => alAgregar(producto)}>
        Agregar al carrito
      </button>
    </div>
  )
}

export default ProductoCard
