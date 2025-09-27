"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const turnosController_1 = require("../controllers/turnosController");
const turnosRouter = (0, express_1.Router)();
//obtener todos los turnos
turnosRouter.get("/", turnosController_1.obtenerTurnos);
//obtener un turno por ID
turnosRouter.get("/:id", turnosController_1.obtenerTurnosById);
//crear un turno 
turnosRouter.post("/schedule", turnosController_1.crearTurno);
//cancelar un turno 
turnosRouter.put("/cancel/:appointmentId", turnosController_1.cancel);
exports.default = turnosRouter;
