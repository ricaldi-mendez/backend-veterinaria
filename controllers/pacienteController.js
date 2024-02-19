import Paciente from "../models/Paciente.js"
import veterinario from "../models/Veterinario.js"
const obtenerPacientes = async(req,res) =>{

    const getPacientes = await Paciente.find().where("veterinario").equals(req.veterinario._id)
    return res.json(getPacientes)
}

const registrarPaciente = async(req,res) =>{

    const paciente = new Paciente(req.body)
    paciente.veterinario= req.veterinario._id
    try {
        
        const savePaciente = await paciente.save()
        res.status(200).json({paciente})


    } catch (error) {
        const err = new Error('debe completar todos los campos : nombre,propietario,email y sintomas')
        res.json({msg : err.message})
    }
   
}


const obtenerPaciente = async(req,res) =>{

    const { id } = req.params;
    try {
        const findPaciente = await Paciente.findById(id);
        if (!findPaciente) {
            return res.status(404).json({ error: "Paciente no encontrado" });
        }
        //convertimos el ambos id a string ya que no podemos comparar Object id
        if(findPaciente.veterinario.toString() !== req.veterinario._id.toString()){
            return res.json({msg : "no se encontraron resultados"})
        }


        return res.json(findPaciente);
    } catch (error) {
        return res.status(400).json({ error: "ID de paciente inválido" });
    }
    
     


    // if(findPaciente){
    //    return res.json({findPaciente})
    // }

}

const actualizarPaciente = async(req,res) =>{

    const { id } = req.params;
    try {
        const paciente = await Paciente.findById(id)
        if(!paciente) {
            return res.status(400).json({msg : "no encontrado"})
        }

        if(paciente.veterinario.toString() !== req.veterinario._id.toString()){
            return res.json({msg : "paciente no encontrado"})
        }

        //actualizar paciente
        paciente.nombre = req.body.nombre || paciente.nombre
        paciente.propietario = req.body.propietario || paciente.nombre
        await paciente.save()

        return res.status(200).json({paciente})

    } catch (error) {
        return res.json({msg : "no encontrado"})
    }

   

    // return res.json({msg : "actualizar",})

}
const eliminarPaciente= async(req,res) =>{

    const { id } = req.params;
    try {
        const paciente = await Paciente.findById(id)
        if(!paciente) {
            return res.status(400).json({msg : "no encontrado"})
        }
        if(paciente.veterinario.toString() !== req.veterinario._id.toString()){
            return res.json({msg : "paciente no encontrado"})
        }
        //eliminar paciente
        await paciente.deleteOne()

        return res.status(200).json({msg : "paciente eliminado"})

    } catch (error) {
        return res.json({msg : "no encontrado"})
    }
}
export {
  obtenerPacientes,
  registrarPaciente,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
};