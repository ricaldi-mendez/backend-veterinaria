import mongoose from "mongoose";
import bcrypt from "bcrypt"
import generarID from "../helpers/generarID.js";

const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    telefono: {
        type: String,
        default: null,
        trim: true,
    },
    web : {
        type: String,
        default: null,
    },
    token : {
        type: String,
        trim: true,
        default : generarID()
    },
    confirmado : {
        type: Boolean,
        default: false
    }

})

//hashear password antes de guardar en la base de datos
veterinarioSchema.pre("save", async function (next){

    if (!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    //this --> representa al esquema con los datos antes de guardar
})

veterinarioSchema.methods.comprobarPassword = async function (passwordFormulario) {

    //comprobar si el passwor del usuario es igual al passwor hasheados
    return await bcrypt.compare(passwordFormulario,this.password)
}

const veterinario = mongoose.model('Veterinario', veterinarioSchema);
export default veterinario;