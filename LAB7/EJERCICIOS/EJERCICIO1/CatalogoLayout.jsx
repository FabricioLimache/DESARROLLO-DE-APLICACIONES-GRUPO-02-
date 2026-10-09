import { Link, Outlet } from 'react-router-dom'

function CatalogoLayout({ totalItemsCarrito }) {
  return (
    <div>
      <nav className="app-nav">
        <div>
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/catalogo/carrito">
            Carrito
            <span className="cart-badge">{totalItemsCarrito}</span>
          </Link>
        </div>
      </nav>

      <div className="container">
        <Outlet />
      </div>
    </div>
  )
}

export default CatalogoLayout
