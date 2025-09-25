import TurnDto from "../dto/turnDto";
import { Appointment } from "../entities/Turn";
import { User } from "../entities/User";
import { AppointmentRepository } from "../repositories/AppointmentsRepository";
import { appointmentRepository } from "../repositories/indexRepository";
import { getUserByIdService } from "./usersService";

export const getAllAppointmentsService = async (): Promise<Appointment[]> => {
  return await appointmentRepository.find();
};

export const getAppointmentByIdService = async (
  id: number
): Promise<Appointment> => {
  const appointment = await appointmentRepository.findOneBy({ id });
  if (!appointment) {
    throw new Error("turno no encontrado");
  }
  return appointment;
};

export const createAppointmentService = async (
  appointment: TurnDto
): Promise<Appointment> => {
  const { userId, ...rest } = appointment;
  const userExist: User = await getUserByIdService(userId);
  if (!userExist) {
    throw new Error("usuario no encontrado");
  }
  AppointmentRepository.validateAllowApointment(
    appointment.date,
    appointment.time
  );
  await AppointmentRepository.validateExistingAppointment(
    appointment.userId,
    appointment.date,
    appointment.time
  );
  const newAppointment: Appointment = appointmentRepository.create({
    ...rest,
    user: userExist,
  });
  await appointmentRepository.save(newAppointment);
  return newAppointment;
};

export const cancelAppointmentService = async (
  appointmentId: number
): Promise<Appointment> => {
  const appointment: Appointment | null = await appointmentRepository.findOneBy(
    { id: appointmentId }
  );
  if (!appointment) {
    throw new Error("Turno no encontrado");
  }
  appointment.status = "CANCELED";
  await appointmentRepository.save(appointment);
  return appointment;
};
