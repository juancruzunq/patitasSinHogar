const UsuarioModel = require('../models/UsuarioModel.js');
const utils = require('../utils/utils.js');


class UsuarioController {

  // Method POST : Crea un usuario . Si no existe el usuario por mail y password , lo crea, sino arroja error 
  // API : http://localhost:3000/registrar
  async registrar(req, res) {
    try {
      const usuarioModel = new UsuarioModel();
      var usuarios = await usuarioModel.searchUsuarioByMailAndPassword(req, res);
      if (usuarios.length === 0) {
        const response = await usuarioModel.create(req, res);
        utils.setUserCookies(req,res, response.id_usuario)      //Asigna cookies : id , usuario , email
        
        utils.sendEmail(req.body.email,req.body.usuario);
        
        return res.status(200).json({ message: 'Usuario publicado correctamente' });
      }
      else {
        return res.status(500).json({ message: 'El correo electronico ya se encuentra en uso' });
      }
    }
    catch (error) {
      return res.status(500).json({ message: 'Hubo un problema con el servidor , intente mas tarde' });

    }
  }

  // Method POST :Busca un usuario por el email y password , si no lo encuentra arroja error
  // API : http://localhost:3000/login
  async login(req, res) {
    try {
      const usuarioModel = new UsuarioModel();
      var usuarios = await usuarioModel.searchUsuarioByMailAndPassword(req, res);
      if (usuarios.length === 0) {
        return res.status(500).json({ message: 'El correo electronico o la contraseña son incorrectas' });
      }
      else {
        utils.setUserCookies(req,res, usuarios[0].id_usuario)      //Asigna cookies : id , usuario , email
        return res.status(200).json({ message: 'Usuario encontrado'});
      }
    }
    catch (error) {
      return res.status(500).json({ message: 'Hubo un problema con el servidor , intente mas tarde' });
      
    }
  }

  // Method POST : Busca un usuario por id , si no lo encuentra arroja error
  // API : http://localhost:3000/buscar
  async buscar(req, res) {
    try {
      const usuarioModel = new UsuarioModel();
      const id_usuario = req.cookies.user_id;
      var usuarios = await usuarioModel.searchUsuarioById(id_usuario);
      if (usuarios.length === 0) {
        return res.status(500).json({ message: 'No se a encontrado ningun usuario con ese ID' });
      }
      else {
        return res.status(200).json(usuarios[0]);
      }
    }
    catch (error) {
      return res.status(500).json({ message: 'Hubo un problema con el servidor , intente mas tarde' });
    }
  } 



}

module.exports = UsuarioController;

