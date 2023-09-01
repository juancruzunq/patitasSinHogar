
class SessionController {

    // Method POST : Deslogea el usuario actual 
    // API : http://localhost:3000/logout
    async logout(req, res) {
        try {
            req.session.destroy(err => {
                if (err) {
                    return res.status(500).json({ message: 'Error al cerrar sesión' });
                }
                res.clearCookie('user_id');
                return res.status(200).json({ message: 'Sesión cerrada exitosamente' });
            });
        }
        catch (error) {

        }
    }
    // Method POST : Checkea si el usuario ya esta logeado en la pagina (user_id) cookie
    // API : http://localhost:3000/logInCheck
    async logInCheck(req, res) {
        try {
            if (req.cookies.user_id) {
                return res.status(200).json(true);
            }
            else{
                return res.status(200).json(false);
            }
        }
        catch (error) {
            return res.status(200).json(false);

        }
    }
}

module.exports = SessionController;

