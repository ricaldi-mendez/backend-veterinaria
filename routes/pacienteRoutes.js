import express from "express";
import {
  obtenerPacientes,
  registrarPaciente,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
} from "../controllers/pacienteController.js";

import checkAuth from "../middlewares/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .get(checkAuth, obtenerPacientes)
  .post(checkAuth, registrarPaciente);

router
  .route("/:id")
  .get(checkAuth, obtenerPaciente)
  .put(checkAuth, actualizarPaciente)
  .delete(checkAuth, eliminarPaciente);

export default router;
