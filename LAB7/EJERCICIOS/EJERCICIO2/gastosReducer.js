import { AGREGAR_GASTO, ELIMINAR_GASTO } from './acciones.js'

export const estadoInicial = {
  gastos: [],
}

export default function gastosReducer(state = estadoInicial, action) {
  switch (action.type) {
    case AGREGAR_GASTO:
      return {
        ...state,
        gastos: [...state.gastos, action.payload],
      }

    case ELIMINAR_GASTO:
      return {
        ...state,
        gastos: state.gastos.filter((gasto) => gasto.id !== action.payload),
      }

    default:
      return state
  }
}
