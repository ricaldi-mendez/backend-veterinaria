import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js"

dotenv.config()

const app = express();

// lo más adecuado es establecer la conexión a la base de datos en un lugar central
conectarDB();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//rutas para veterinarios
app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

app.get('/', (req,res)=>{
    res.send('Hello World');
})

app.listen(PORT, ()=>{
    console.log(`server listen on port http://localhost:${PORT}`)
})