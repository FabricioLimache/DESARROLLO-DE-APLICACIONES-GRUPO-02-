function BuscadorProducto({ valor, onChange }) {
  return (
    <div className="buscador">
      <input
        type="text"
        placeholder="Buscar producto por nombre..."
        value={valor}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default BuscadorProducto
