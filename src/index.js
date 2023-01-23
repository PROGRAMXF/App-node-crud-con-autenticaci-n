const app = require ('./app.js');

//inicializamos el server
app.listen(app.get('port'), () => {
    console.log("Servidor escuchando en el puerto 4000", app.get('port'));
});
