import ProductoCard from './ProductoCard.jsx'

function ListaProductos({ productos, cargando, error, alAgregar }) {
  if (cargando) {
    return <p className="estado">Cargando productos...</p>
  }

  if (error) {
    return (
      <p className="estado error">
        Ocurrió un error al cargar los productos: {error}
      </p>
    )
  }

  if (productos.length === 0) {
    return <p className="estado">No se encontraron productos.</p>
  }

  return (
    <div className="grid-productos">
      {productos.map((producto) => (
        <ProductoCard
          key={producto.id}
          producto={producto}
          alAgregar={alAgregar}
        />
      ))}
    </div>
  )
}

export default ListaProductos
