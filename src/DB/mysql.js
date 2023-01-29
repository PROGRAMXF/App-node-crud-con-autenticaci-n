const mysql = require('mysql');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

//creamos una conexion para conectarnos:
let conexion;

function conMysql(){
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((err) => {
        if(err){
            console.log('[deb err]', err);
            setTimeout(conMysql, 200);
        }else{
            console.log('DB conectada');
        }
    });

    conexion.on('error', err =>{
        console.log('[deb err]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            conMysql();
        }else{
            throw err;
        }
    });
}

conMysql();


//funcion que nos traiga todo los datos de la tabla
function todos(tabla){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (error, result) =>{
            if(error) return reject(error);
            resolve(result);           
            
        } );
    });
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