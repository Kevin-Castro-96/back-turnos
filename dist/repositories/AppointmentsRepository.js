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
exports.AppointmentRepository = void 0;
const data_source_1 = require("../config/data-source");
const Turn_1 = require("../entities/Turn");
const customError_1 = require("../utils/customError");
exports.AppointmentRepository = data_source_1.AppDataSource.getRepository(Turn_1.Appointment).extend({
    validateAllowApointment(date, time) {
        const [hours, minutes] = time.split(":").map(Number);
        let appointmentDate;
        // Si la fecha viene como string "2025-07-03"
        if (typeof date === "string") {
            const [year, month, day] = date.split("-").map(Number);
            appointmentDate = new Date(year, month - 1, day, hours, minutes, 0, 0);
        }
        else {
            appointmentDate = new Date(date);
            appointmentDate.setHours(hours, minutes, 0, 0);
        }
        const now = new Date();
        // Verificamos si la cita es para una fecha pasada
        if (appointmentDate < now) {
            throw new customError_1.CustomError(400, "No se pueden agendar citas para fechas pasadas");
        }
        // Verificamos si faltan menos de 24 horas
        const diffInMs = appointmentDate.getTime() - now.getTime();
        const diffInHours = diffInMs / (1000 * 60 * 60);
        if (diffInHours < 24) {
            throw new customError_1.CustomError(400, "Las citas deben agendarse con al menos 24 horas de anticipación");
        }
        // Verificamos que no sea sábado (6) ni domingo (0)
        const dayOfWeek = appointmentDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            throw new customError_1.CustomError(400, "No se pueden agendar citas los fines de semana");
        }
        // Verificamos que esté entre las 08:00 y las 18:00
        if (hours < 8 || hours >= 18) {
            throw new customError_1.CustomError(400, "Las citas deben agendarse entre las 8:00 y las 18:00");
        }
    },
    validateExistingAppointment(userId, date, time) {
        return __awaiter(this, void 0, void 0, function* () {
            // Convertimos date a formato Date si es string, para evitar posibles errores en la comparación
            let appointmentDate;
            if (typeof date === "string") {
                const [year, month, day] = date.split("-").map(Number);
                appointmentDate = new Date(year, month - 1, day);
            }
            else {
                appointmentDate = new Date(date);
            }
            const appointmentFound = yield this.findOne({
                where: {
                    user: {
                        id: userId,
                    },
                    date: appointmentDate,
                    time,
                },
            });
            if (appointmentFound) {
                throw new customError_1.CustomError(400, `La cita con fecha ${appointmentDate.toISOString().split("T")[0]} y hora ${time} ya existe para este usuario`);
            }
        });
    },
});
