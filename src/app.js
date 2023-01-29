const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const clientes = require('./modulos/clientes/rutas.js');

const app = express();

//middleware--------------------------------------------------
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//configuracion------------------------------------------------
app.set('port', config.app.port);

//rutas--------------------------------------------------------
app.use('/api/clientes', clientes);



module.exports = app;