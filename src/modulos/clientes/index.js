//constructor al quwe le pasamos nuestra bd

const db = require('../../../src/DB/mysql');
const ctrl = require('../clientes/controlador');


//exportamos el modulo
module.exports = ctrl(db);