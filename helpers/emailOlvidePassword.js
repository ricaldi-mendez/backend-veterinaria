import nodemailer from 'nodemailer'
const emailOlvidePassword = async (datos) => {

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
    });
    const {email,token,nombre} = datos
    const info = await transport.sendMail({
      from: "APV - Administrador de Pacientes Veterinaria", // sender 
      to: email, // list of receivers
      subject: "Resetea tu password en APV", // Subject 
      text: "Solicitaste resetear tu password en APV", // plain text body
      html: `
        <p>Bienvenido ${nombre} restablece tu contraseña en APV</p>
        <p> Para cambiar de contraseña debes seguir este enlace 
            <a href="${process.env.URL_FRONTEND}/olvide-password/${token}">cambiar password</a>
        </p>
        <p>si no creaste una cuenta ignora este mensaje</p>
      `, // html body
    });
  
    //const info = await transport.sendMail()
} 

export default emailOlvidePassword

