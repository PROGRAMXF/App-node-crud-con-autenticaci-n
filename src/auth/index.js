const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.jwt.secret;
const error = require('../middleware/errors');

function asignarToken(data){
    return jwt.sign(data, secret)
}

//verificamos el token:

function verificarToken(token){
    return jwt.verify(token, secret);

}

const chequearToken = {
    confirmarToken: function(req, id){
        const decodificado = decodificarCabecera(req);
        
        if(decodificado.id !== id){
            throw new Error ('No tienes privilegios para hacer eso', 401);

        }
    }
}

function obtenerToken(autorizacion){
    if(!autorizacion){
        throw new Error('No viene token', 401);
    }
    if(autorizacion.indexOf('Bearer') === -1){
        throw new Error('Formato invalido', 401);
    }
    let token = autorizacion.replace('Bearer', '');
    return token;
}

function decodificarCabecera(req){
    const autorizacion = req.headers.authorization || '';
    const token = obtenerToken(autorizacion);
    const decodificado = verificarToken(token);

    req.user = decodificado;

    return decodificado;
}

module.exports = {
    asignarToken,
    chequearToken

}

//instalamos jsonwebtoken