import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import CatalogoLayout from './components/CatalogoLayout.jsx'
import ListaProductos from './components/ListaProductos.jsx'
import BuscadorProducto from './components/BuscadorProducto.jsx'
import Carrito from './components/Carrito.jsx'

const API_URL = 'https://fakestoreapi.com/products'

function App() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [carrito, setCarrito] = useState([])
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    let cancelado = false

    async function cargarProductos() {
      setCargando(true)
      setError(null)

      try {
        const respuesta = await fetch(API_URL)

        if (!respuesta.ok) {
          throw new Error(`Error HTTP ${respuesta.status}`)
        }

        const datos = await respuesta.json()

        if (!cancelado) {
          setProductos(datos)
        }
      } catch (err) {
        if (!cancelado) {
          setError(err.message)
        }
      } finally {
        if (!cancelado) {
          setCargando(false)
        }
      }
    }

    cargarProductos()

    return () => {
      cancelado = true
    }
  }, [])

  function agregarAlCarrito(producto) {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id)

      if (existente) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }

      return [...prev, { ...producto, cantidad: 1 }]
    })
  }

  function quitarDelCarrito(id) {
    setCarrito((prev) => prev.filter((item) => item.id !== id))
  }

  function cambiarCantidad(id, cantidad) {
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, cantidad: Math.max(1, cantidad) }
          : item
      )
    )
  }

  const totalItemsCarrito = carrito.reduce(
    (acc, item) => acc + item.cantidad,
    0
  )

  const productosFiltrados = productos.filter((producto) =>
    producto.title.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/catalogo" replace />} />

      <Route
        path="/catalogo"
        element={
          <CatalogoLayout totalItemsCarrito={totalItemsCarrito} />
        }
      >
        <Route
          index
          element={
            <>
              <BuscadorProducto
                valor={busqueda}
                onChange={setBusqueda}
              />
              <ListaProductos
                productos={productosFiltrados}
                cargando={cargando}
                error={error}
                alAgregar={agregarAlCarrito}
              />
            </>
          }
        />

        <Route
          path="carrito"
          element={
            <Carrito
              items={carrito}
              alQuitar={quitarDelCarrito}
              alCambiarCantidad={cambiarCantidad}
            />
          }
        />
      </Route>
    </Routes>
  )
}

export default App
