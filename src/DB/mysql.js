const mysql = require('mysql');
const config = require('../config');

const prueba = {
    id: 1,
    nombre: 'juan',
    edad: 43
}

//funcion que nos traiga todo los datos de la tabla
function todos(tabla){
    return prueba;
}

//funcion que nos traiga solo un elemento de la tabla
function uno(tabla, id){

}

//funcion para actualizar y crear un registro
function agregar(tabla, data){

}

//funcion para eliminar
function eliminar(tabla, id){

}

//exportamos
module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
}