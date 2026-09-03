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

