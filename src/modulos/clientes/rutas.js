const express = require("express");
const respuestas = require("../../red/respuestas");
const controlador = require("./controlador");

const router = express.Router();

//separamos las rutas de su funcionalidad--------------------
router.get("/", todos);
router.get("/:id", uno);
router.put('/', eliminar);
//-----------------------------------------------------------

async function todos (req, res, next) {
  try{
    const items = await controlador.todos();
    respuestas.success(req, res, items, 200);
  }catch(err){
    next(err);
  }
  
};

async function uno (req, res, next) {
  try{
    const items = await controlador.uno(req.params.id);
    respuestas.success(req, res, items, 200);
  }catch(err){
    next(err);
  }
  
};

async function eliminar (req, res, next) {
  try{
    const items = await controlador.eliminar(req.body);
    respuestas.success(req, res, 'item eliminado satisfactoriamente', 200);
  }catch(err){
    next(err);
  }
  
};


module.exports = router;
