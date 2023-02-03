//desde aqui vamos a hacer las consultas a la bd

const auth = require("../../auth");
const bcrypt = require('bcrypt');
const TABLA = "auth";

module.exports = function (dbInyectada) {
  let db = dbInyectada;

  if (!db) {
    db = require("../../DB/mysql");
  }

  async function login (usuario, password){
    console.log(usuario, password);
    const data = await db.query(TABLA, {usuario: usuario});

    return bcrypt.compare(password, data.password)
    .then(resultado => {
      if(resultado === true){
        //generar un token
        return auth.asignarToken({...data});

      }else{
        throw new Error ('Informacion invalida');
      }

    }); 
  }

  async function agregar(data) {
    console.log('data', data);

    const authData = {
        id: data.id,
    }
    if(data.usuario){
        authData.usuario = data.usuario;
    }
    if(data.password){
        authData.password = await bcrypt.hash(data.password.toString(), 5); //usamos bcrypt para encriptar la password unas 5 veces
        //debemos luego truncar los registros de la base de datos, dentro de operaciones.
    }
    return db.agregar(TABLA, authData);
  }

  return {
    agregar,
    login
  };
};
