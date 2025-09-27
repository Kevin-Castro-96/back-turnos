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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointmentService = exports.createAppointmentService = exports.getAppointmentByIdService = exports.getAllAppointmentsService = void 0;
const AppointmentsRepository_1 = require("../repositories/AppointmentsRepository");
const indexRepository_1 = require("../repositories/indexRepository");
const usersService_1 = require("./usersService");
const getAllAppointmentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield indexRepository_1.appointmentRepository.find();
});
exports.getAllAppointmentsService = getAllAppointmentsService;
const getAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield indexRepository_1.appointmentRepository.findOneBy({ id });
    if (!appointment) {
        throw new Error("turno no encontrado");
    }
    return appointment;
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const createAppointmentService = (appointment) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = appointment, rest = __rest(appointment, ["userId"]);
    const userExist = yield (0, usersService_1.getUserByIdService)(userId);
    if (!userExist) {
        throw new Error("usuario no encontrado");
    }
    AppointmentsRepository_1.AppointmentRepository.validateAllowApointment(appointment.date, appointment.time);
    yield AppointmentsRepository_1.AppointmentRepository.validateExistingAppointment(appointment.userId, appointment.date, appointment.time);
    const newAppointment = indexRepository_1.appointmentRepository.create(Object.assign(Object.assign({}, rest), { user: userExist }));
    yield indexRepository_1.appointmentRepository.save(newAppointment);
    return newAppointment;
});
exports.createAppointmentService = createAppointmentService;
const cancelAppointmentService = (appointmentId) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield indexRepository_1.appointmentRepository.findOneBy({ id: appointmentId });
    if (!appointment) {
        throw new Error("Turno no encontrado");
    }
    appointment.status = "CANCELED";
    yield indexRepository_1.appointmentRepository.save(appointment);
    return appointment;
});
exports.cancelAppointmentService = cancelAppointmentService;
