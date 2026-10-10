import assert from 'node:assert/strict'
import gastosReducer, { estadoInicial } from '../src/redux/gastosReducer.js'
import { AGREGAR_GASTO, ELIMINAR_GASTO, agregarGasto, eliminarGasto } from '../src/redux/acciones.js'

let estado = gastosReducer(undefined, { type: '@@INIT' })
assert.deepEqual(estado, estadoInicial)
console.log('estado inicial ->', estado)

const accion1 = agregarGasto({ descripcion: 'Almuerzo', monto: 25.5, categoria: 'Alimentación' })
assert.equal(accion1.type, AGREGAR_GASTO)
const estadoPrevio2 = estado
estado = gastosReducer(estado, accion1)
assert.equal(estado.gastos.length, 1)
assert.equal(estado.gastos[0].descripcion, 'Almuerzo')
assert.equal(estadoPrevio2.gastos.length, 0)
console.log('tras AGREGAR_GASTO (1) ->', estado.gastos)

const accion2 = agregarGasto({ descripcion: 'Pasaje bus', monto: 2.5, categoria: 'Transporte' })
const estadoPrevio3 = estado
estado = gastosReducer(estado, accion2)
assert.equal(estado.gastos.length, 2)
assert.equal(estadoPrevio3.gastos.length, 1)
console.log('tras AGREGAR_GASTO (2) ->', estado.gastos)

const total = estado.gastos.reduce((acc, g) => acc + g.monto, 0)
assert.equal(total, 28)
console.log('total derivado ->', total)

const idAEliminar = estado.gastos[0].id
const accion3 = eliminarGasto(idAEliminar)
assert.equal(accion3.type, ELIMINAR_GASTO)
const estadoPrevio5 = estado
estado = gastosReducer(estado, accion3)
assert.equal(estado.gastos.length, 1)
assert.equal(estado.gastos[0].descripcion, 'Pasaje bus')
assert.equal(estadoPrevio5.gastos.length, 2)
console.log('tras ELIMINAR_GASTO ->', estado.gastos)

const estadoPrevio6 = estado
estado = gastosReducer(estado, { type: 'ACCION_DESCONOCIDA' })
assert.equal(estado, estadoPrevio6)
console.log('acción desconocida devuelve el mismo estado por referencia')

console.log('todas las aserciones pasaron correctamente')
