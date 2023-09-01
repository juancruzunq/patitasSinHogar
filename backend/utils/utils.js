
//Setear el uuid del usuario en una cookie
const nodemailer = require('nodemailer');

/* Method para setear el id del usuario en una cookie */
function setUserCookies(req, res, id_usuario) {
    req.session.user_id = id_usuario;
    res.cookie('user_id', id_usuario);
}

/* Method para enviar email*/
async function sendEmail(email, usuario, mascota) {
    let mail;
    if (usuario && mascota) {
        mail = {
            to: email,
            subject: 'Mascota Publicada',
            html: `${usuario} usted ha publicado correctamente a ${mascota.nombre} en PatitasSinHogar con la siguiente descripcion : ${mascota.descripcion} . Esperamos su pronta adopcion !`
        }
        
    }
    else {
        mail = {
            to: email,
            subject: 'Bienvenido a PatitasSinHogar',
            html: `Bienvenido ${usuario} ! Usted se ha registrado correctamente en PatitasSinHogar!`
        }
    }
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        }
    });

    await transport.sendMail(mail);
}

module.exports = {
    setUserCookies,
    sendEmail
}