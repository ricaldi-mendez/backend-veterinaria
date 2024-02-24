import nodemailer from 'nodemailer'
const sendEmail = async (datos) => {

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
      subject: "Confirma tu cuenta en APV", // Subject 
      text: "Confirma tu cuenta en APV", // plain text body
      html: `
        <p>Bienvenido ${nombre} confirma tu cuenta en APV</p>
        <p> Para confirmar tu cuenta debes seguir este enlace 
            <a href="${process.env.URL_FRONTEND}/confirmar/${token}">confirmarCuenta</a>
        </p>
        <p>si ya confirmaste tu cuenta ignora este mensaje</p>
      `, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    console.log(datos)
    //const info = await transport.sendMail()
} 

export default sendEmail

