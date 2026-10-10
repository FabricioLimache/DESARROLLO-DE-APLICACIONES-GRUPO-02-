export const AGREGAR_GASTO = 'AGREGAR_GASTO'
export const ELIMINAR_GASTO = 'ELIMINAR_GASTO'

export function agregarGasto({ descripcion, monto, categoria }) {
  return {
    type: AGREGAR_GASTO,
    payload: {
      id: Date.now() + Math.random(),
      descripcion,
      monto: Number(monto),
      categoria,
    },
  }
}

export function eliminarGasto(id) {
  return {
    type: ELIMINAR_GASTO,
    payload: id,
  }
}
