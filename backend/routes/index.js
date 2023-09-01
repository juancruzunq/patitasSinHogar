var express = require('express');
var app = express.Router();
const MascotaController = require('../controllers/MascotaController.js')
const UsuarioController = require('../controllers/UsuarioController.js')
const SessionController = require('../controllers/SessionController.js')


/* Routes Mascota */
app.post('/publicar',new MascotaController().publicar);                 //Publicar Mascota
app.get('/mascotas',new MascotaController().buscar);                    //Buscar Mascotas
app.get('/publicados',new MascotaController().buscarPublicados);        //Buscar mascotas publicadas por el usuario logeado
app.delete('/eliminar/:id_mascota',new MascotaController().eliminar);    //Elimina la mascota 
app.put('/actualizar/:id_mascota',new MascotaController().actualizar);    //Actualiza la amascota


/* Routes Usuarios*/
app.post('/registrar',new UsuarioController().registrar);      //Publicar Usuario
app.post('/login',new UsuarioController().login);              //Logear Usuario
app.get('/usuario',new UsuarioController().buscar);             //Busca un usuario


/* Routes Session*/
app.post('/logout',new SessionController().logout);         //Destruye la sesion
app.get('/logInCheck',new SessionController().logInCheck);  //Checkea si existe una session abierta


module.exports = app;

