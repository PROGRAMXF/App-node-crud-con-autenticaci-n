//desde aqui vamos a hacer las consultas a la bd
const db = require('../../DB/mysql');

const TABLA = 'clientes';

function todos(){
    return db.todos(TABLA);
}

module.exports = {
    todos,
}