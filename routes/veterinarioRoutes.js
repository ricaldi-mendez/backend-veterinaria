import express from "express";
import {
  perfil,
  registrar,
  confirmar,
  autenticar,
  olvidePassword,
  comprobarToken,
  nuevoPassword
} from "../controllers/veterinarioController.js";

import checkAuth from "../middlewares/authMiddleware.js";
const router = express.Router();

//--- api/veterinarios
//area publica
router.post("/", registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);

router.post("/olvide-password", olvidePassword);
router.get("/olvide-password/:token", comprobarToken);
router.post("/olvide-password/:token", nuevoPassword);

//area privada
router.get("/perfil", checkAuth, perfil);

export default router;
