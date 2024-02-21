import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarID from "../helpers/generarID.js";

const registrar = async (req, res) => {
  //evitar registro con email duplicados
  const { email } = req.body;
  const findEmail = await Veterinario.findOne({ email });
  if (findEmail) {
    const error = new Error(`ya existe un usuario asociado a ${email}`);
    return res.status(400).json({ msg: error.message });
  }

  //manejar registro de veterinarios
  try {
    const veterinario = new Veterinario(req.body);
    const veterinarioGuardado = await veterinario.save();
    res.json({ msg: "Creado correctamente revisa tu email" });
  } catch (error) {
    return res.status(400).json({msg : 'se requiere datos como nombre , email y password'})
  }
};

const confirmar = async (req, res) => {
  const { token } = req.params;
  const findToken = await Veterinario.findOne({ token });

  if (!findToken) {
    return res.send(`el token no es valido `);
  }

  try {
    //validar token y confirmar cuenta
    findToken.token = null;
    findToken.confirmado = true;
    await findToken.save();
    return res.json({ msg: "usuario confirmado" });
  } catch (error) {
    console.log(error);
  }
};
const perfil = (req, res) => {
  // const veterinario = req.body
  const perfil = req.veterinario;
  return res.json({ perfil });
};

//metodo para el login
const autenticar = async (req, res) => {
  const { email, password } = req.body;

  //buscar el email del usuario para realizar el login
  const findUser = await Veterinario.findOne({ email });


  //comprobar si el usuario existe
  if (!findUser) {
    const error = new Error("El usuario no existe"); //no hay usuarios con ese email
    return res.status(403).send({ msg: error.message });
  }
  //comprobar si el usuario esta confirmado
  if (!findUser.confirmado) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).send({ msg: error.message });
  }

  const { _id } = findUser;
  //Autenticar usuario
  const passwordValido = await findUser.comprobarPassword(password);

  if (passwordValido) {
    const jwt = generarJWT(_id);
    return res.json({ jwt });
  } else {
    const error = new Error("password incorrecto");
    return res.status(400).json(error.message);
  }
};

const olvidePassword = async(req, res) => {
  
    //si olvido su password se verifica el email
    const {email} = req.body

    const usuarioVallido = await Veterinario.findOne({email})

    if(!usuarioVallido) {
        const error = new Error('No existe un usuario asociado a ese correo');
        return res.status(400).json({msg : error.message})
    }

    try {

        usuarioVallido.token = generarID()
        await usuarioVallido.save()
        return res.json({msg : "hemos enviado un email con las instrucciones"})
        
    } catch (error) {
        console.log('error')
    }
};

const comprobarToken = async(req, res) => {

    const {token} = req.params

    const findUserByToken = await Veterinario.findOne({token})
    if (findUserByToken) {
        res.json({msg : "token valido y el usuario existe"})
    }else {
        const error = new Error('token no valido')
        return res.status(400).json({msg : error.message})
    }

   
};
const nuevoPassword = async (req, res) => {

    const {token} =req.params
    const {password} = req.body

    const veterinario = await Veterinario.findOne({token})
    if(!veterinario) {
        const error = new Error("token no valido")
        return res.status(400).json({msg : error.message})
    }

    //cambiar password 
    try {
        veterinario.password = password
        veterinario.token = null
        await veterinario.save()
        return res.status(200).json ({msg : "contraseña actualizada correctamente"})
        
    } catch (error) {
        const err = new Error("hubo un problema")
        return res.status(400).json({msg : err.message})
    }
    
};

export { registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken,nuevoPassword};
