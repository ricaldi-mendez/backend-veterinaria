import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js"
import cors from 'cors'

dotenv.config()

const app = express();


// lo más adecuado es establecer la conexión a la base de datos en un lugar central
conectarDB();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors())

//rutas para veterinarios
app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

app.get('/', (req,res)=>{
    res.json({msg : 'Hello World'});
})

app.use('*', (req,res)=>{
    return res.json({msg : '404 not found'})
})
app.listen(PORT, ()=>{
    console.log(`server listen on port http://localhost:${PORT}`)
})