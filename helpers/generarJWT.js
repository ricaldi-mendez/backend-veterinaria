import jwt from 'jsonwebtoken'
const generarJWT= (userID) =>{
    return jwt.sign({userID} , process.env.JWT_SECRET,
    {
        expiresIn: "30d"
    })
}

export default generarJWT