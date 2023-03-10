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
            return error ? reject(error):resolve(result);                      
            
        } );
    });
}

//funcion que nos traiga solo un elemento de la tabla
function uno(tabla, id){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id = ${id}`, (error, result) =>{
            return error ? reject(error): resolve(result);                     
            
        } );
    });
}
function agregar(tabla, data){
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`, [data,data], (error, result) =>{
            return error ? reject(error): resolve(result);                     
            
        } );
    });
}

//funcion para eliminar
function eliminar(tabla, data){
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id = ?`, data.id, (error, result) =>{
            return error ? reject(error): resolve(result);                     
            
        } );
    });
}
function query(tabla, consulta){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE ?`, consulta, (error, result) =>{
            return error ? reject(error): resolve(result[0]);                     
            
        } );
    });
}

//exportamos
module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
    query
}