/*************************************************************************************************
ARCHIVO     : main.js
AUTOR       : Calcina Bellido Christian Gabriel
FECHA       : 03/09/2026
DESCRIPCIÓN : Archivo externo que contiene el código JavaScript de la práctica.
*************************************************************************************************/

console.log("JavaScript desde un archivo externo");

// Variables y constantes
let nombre = "Christian";
let edad = 20;
let precio = 100.50;
let activo = true;
let datoNulo = null;
let datoIndefinido;

const IGV = 0.18;

// Mostrar valores en consola
console.log(nombre);
console.log(edad);
console.log(precio);
console.log(activo);
console.log(datoNulo);
console.log(datoIndefinido);
console.log(IGV);

// Mostrar el tipo de cada dato
console.log(typeof nombre);
console.log(typeof edad);
console.log(typeof precio);
console.log(typeof activo);
console.log(typeof datoNulo);
console.log(typeof datoIndefinido);
console.log(typeof IGV);

// Modificar el tipo de dato de precio
precio = "180";

// Comprobar el nuevo tipo de dato
console.log(typeof precio);

// Variable para comprobar el scope
let stock = 10;

if (stock > 0) {
    var mensaje = "Producto disponible";
    let unidades = stock;

    console.log(mensaje);
    console.log(unidades);
}

console.log(mensaje);

// Explorar el hoisting con var
console.log(cantidad);

var cantidad = 10;

// Explorar el hoisting con let
// console.log(descuento);
// let descuento = 20;

// Nuevas variables
let nombreCliente = "Andrea";
let cantidadProductos = 3;
let precioUnitario = 120;

// Calcular el importe
let importe = cantidadProductos * precioUnitario;

// Mostrar los datos de la venta
console.log("Cliente:", nombreCliente);
console.log("Cantidad:", cantidadProductos);
console.log("Precio unitario:", precioUnitario);
console.log("Importe:", importe);

// Parte 1 - Nuestra primera función
function calcularSubtotal(precio, cantidad) {
    return precio * cantidad;
}

// Ejecutar la función
console.log(calcularSubtotal(120, 3));
console.log(calcularSubtotal(80, 5));

// Parte 2 - Expresión de función
const calcularSubtotalExpresion = function(precio, cantidad) {
    return precio * cantidad;
};

// Parte 2 - Función flecha
const calcularSubtotalFlecha = (precio, cantidad) => precio * cantidad;

// Comprobar que las tres alternativas producen el mismo resultado
console.log(calcularSubtotal(120, 3));
console.log(calcularSubtotalExpresion(120, 3));
console.log(calcularSubtotalFlecha(120, 3));

// Parte 3 - Parámetros predeterminados
function calcularTotal(
    precio,
    cantidad = 1,
    descuento = 0
) {
    const subtotal = precio * cantidad;

    return subtotal - subtotal * descuento / 100;
}

// Probar la función
console.log(calcularTotal(100));
console.log(calcularTotal(100, 3));
console.log(calcularTotal(100, 3, 10));

// Parte 4 - Parámetros rest
function sumarImportes(...importes) {
    console.log(importes);

    return importes.reduce(
        (total, importe) => total + importe,
        0
    );
}

// Ejecutar la función
console.log(
    sumarImportes(100, 50)
);

console.log(
    sumarImportes(100, 50, 80, 25)
);

// Parte 5 - Funciones como argumentos
const aplicarDescuento = precio => precio * 0.90;

const aplicarIGV = precio => precio * 1.18;

function procesarPrecio(precio, operacion) {
    return operacion(precio);
}

// Probar las funciones
console.log(
    procesarPrecio(100, aplicarDescuento)
);

console.log(
    procesarPrecio(100, aplicarIGV)
);

// Parte 6 - Calcular venta
function calcularVenta(
    precio,
    cantidad,
    descuento = 0
) {
    const subtotal = precio * cantidad;

    return subtotal - subtotal * descuento / 100;
}

// Probar tres ventas diferentes
console.log("Venta 1:", calcularVenta(100, 2));

console.log("Venta 2:", calcularVenta(150, 3, 10));

console.log("Venta 3:", calcularVenta(80, 5, 20));
