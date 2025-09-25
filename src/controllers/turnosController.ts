import { Request, Response } from "express";
import {
  cancelAppointmentService,
  createAppointmentService,
  getAllAppointmentsService,
  getAppointmentByIdService,
} from "../services/turnosService";
import TurnDto from "../dto/turnDto";

export const obtenerTurnos = async (req: Request, res: Response) => {
  try {
    const appointments = await getAllAppointmentsService();
    res.status(200).json(appointments);
  } catch (err) {
    res.status(404).json({ error: err instanceof Error? err.message : `error desconocido` });
  }
};

export const obtenerTurnosById = async (req: Request, res: Response) => {
  try {
    const { appointmentsId } = req.params;
    await getAppointmentByIdService(parseInt(appointmentsId));
    res.status(200).json(appointmentsId);
  } catch (err) {
    res.status(404).json({error: err instanceof Error ? err.message : `error desconocido`, });
  }
};

//schedule
export const crearTurno = async (req: Request, res: Response) => {
  try {
    const appointment: TurnDto = req.body;
    if (!appointment.status) {
      appointment.status = 'Active'; // O el valor que sea apropiado
    }
    const newAppointment = await createAppointmentService(appointment);
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(400).json({ error: err instanceof Error? err.message : `error desconocido` });
  }
};

export const cancel = async (req: Request, res: Response) => {
  try {
    const { appointmentId } = req.params;
    const appointment = await cancelAppointmentService(Number(appointmentId));
    res.status(200).json(appointment);
  } catch (err) {
    res.status(404).json({ error: err instanceof Error? err.message : `error desconocido` });
  }
};
