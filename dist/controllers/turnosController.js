"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancel = exports.crearTurno = exports.obtenerTurnosById = exports.obtenerTurnos = void 0;
const turnosService_1 = require("../services/turnosService");
const obtenerTurnos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield (0, turnosService_1.getAllAppointmentsService)();
        res.status(200).json(appointments);
    }
    catch (err) {
        res.status(404).json({ error: err instanceof Error ? err.message : `error desconocido` });
    }
});
exports.obtenerTurnos = obtenerTurnos;
const obtenerTurnosById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { appointmentsId } = req.params;
        yield (0, turnosService_1.getAppointmentByIdService)(parseInt(appointmentsId));
        res.status(200).json(appointmentsId);
    }
    catch (err) {
        res.status(404).json({ error: err instanceof Error ? err.message : `error desconocido`, });
    }
});
exports.obtenerTurnosById = obtenerTurnosById;
//schedule
const crearTurno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = req.body;
        if (!appointment.status) {
            appointment.status = 'Active'; // O el valor que sea apropiado
        }
        const newAppointment = yield (0, turnosService_1.createAppointmentService)(appointment);
        res.status(201).json(newAppointment);
    }
    catch (err) {
        res.status(400).json({ error: err instanceof Error ? err.message : `error desconocido` });
    }
});
exports.crearTurno = crearTurno;
const cancel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { appointmentId } = req.params;
        const appointment = yield (0, turnosService_1.cancelAppointmentService)(Number(appointmentId));
        res.status(200).json(appointment);
    }
    catch (err) {
        res.status(404).json({ error: err instanceof Error ? err.message : `error desconocido` });
    }
});
exports.cancel = cancel;
