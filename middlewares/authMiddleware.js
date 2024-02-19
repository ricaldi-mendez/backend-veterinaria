import jwt from 'jsonwebtoken'

import Veterinario from '../models/Veterinario.js';
const checkAuth = async(req,res,next) => {

    let token;

    //comprobar que el token se esta enviando
    if(req.headers.authorization 
        && req.headers.authorization.startsWith("Bearer"))
    {
        //decodificar el token
        try {
            token = req.headers.authorization.split(" ")[1];
            const decodeToken = jwt.verify(token,process.env.JWT_SECRET)
            const veterinario = await Veterinario.findById(decodeToken.userID).
                                select("-password -token -confirmado")

            // enviar informacion a la request 
            req.veterinario = veterinario 

            return next()
            
        } catch (error) {
            const e = new Error("token no valido")
            return res.status(403).json({msg : e.message})
            
        }
    }else {
        const error = new Error("token invalido o expirado")
        return res.status(403).json({msg : error.message})
    }

}

export default checkAuth