const pool = require('./db.js');
const md5 = require('md5');
const uuid = require('uuid');

class UsuarioModel {


  // Query para crear un usuario
  async create(req, res) {
    try {
      const { id_usuario = uuid.v4(), usuario, password, email } = req.body;

      const query = 'INSERT INTO usuarios (id_usuario, usuario, password, email) VALUES (?,?,?,?)';

      pool.query(query, [id_usuario, usuario, md5(password), email], (error) => {
        if (error) {
          return res.status(500).json({ message: 'Hubo un problema al intentar registrar el usuario, inténtelo de nuevo más tarde' });
        }
      });
      ;
      return ({
        id_usuario: id_usuario,
        usuario: usuario,
        email: email
      });

    } catch (error) {
    }
  }



  //Method para buscar un usuario por mail y password
  async searchUsuarioByMailAndPassword(req, res) {
    const { email, password } = req.body;
    try {
      const query = 'SELECT * FROM usuarios WHERE 1=1 and email = ? and password = ?';
      const result = pool.query(query, [email, md5(password)]);
      return result;
    } catch (error) {
     
    }
  }

  //Method para buscar un usuario por id
  async searchUsuarioById(id_usuario) {
    try {
      const query = 'SELECT * FROM usuarios WHERE 1=1 and id_usuario = ?';
      const result = pool.query(query, [id_usuario]);
      return result;
    } catch (error) {
     
    }
  }


}

module.exports = UsuarioModel;
