import { Router } from "express";
import { crearTurno, obtenerTurnos, obtenerTurnosById, cancel } from "../controllers/turnosController";

const turnosRouter: Router = Router();

//obtener todos los turnos
turnosRouter.get("/", obtenerTurnos);

//obtener un turno por ID
turnosRouter.get("/:id", obtenerTurnosById);

//crear un turno 
turnosRouter.post("/schedule", crearTurno);

//cancelar un turno 
turnosRouter.put("/cancel/:appointmentId", cancel);

export default turnosRouter;