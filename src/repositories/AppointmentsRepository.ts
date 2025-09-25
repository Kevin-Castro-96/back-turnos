import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Turn";
import { CustomError } from "../utils/customError";

export const AppointmentRepository = AppDataSource.getRepository(Appointment).extend({
  validateAllowApointment(date: string | Date, time: string): void {
    const [hours, minutes] = time.split(":").map(Number);

    let appointmentDate: Date;

    // Si la fecha viene como string "2025-07-03"
    if (typeof date === "string") {
      const [year, month, day] = date.split("-").map(Number);
      appointmentDate = new Date(year, month - 1, day, hours, minutes, 0, 0);
    } else {
      appointmentDate = new Date(date);
      appointmentDate.setHours(hours, minutes, 0, 0);
    }

    const now = new Date();

    // Verificamos si la cita es para una fecha pasada
    if (appointmentDate < now) {
      throw new CustomError(400, "No se pueden agendar citas para fechas pasadas");
    }

    // Verificamos si faltan menos de 24 horas
    const diffInMs = appointmentDate.getTime() - now.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    if (diffInHours < 24) {
      throw new CustomError(400, "Las citas deben agendarse con al menos 24 horas de anticipación");
    }

    // Verificamos que no sea sábado (6) ni domingo (0)
    const dayOfWeek = appointmentDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      throw new CustomError(400, "No se pueden agendar citas los fines de semana");
    }

    // Verificamos que esté entre las 08:00 y las 18:00
    if (hours < 8 || hours >= 18) {
      throw new CustomError(400, "Las citas deben agendarse entre las 8:00 y las 18:00");
    }
  },

  async validateExistingAppointment(userId: number, date: string | Date, time: string): Promise<void> {
    // Convertimos date a formato Date si es string, para evitar posibles errores en la comparación
    let appointmentDate: Date;

    if (typeof date === "string") {
      const [year, month, day] = date.split("-").map(Number);
      appointmentDate = new Date(year, month - 1, day);
    } else {
      appointmentDate = new Date(date);
    }

    const appointmentFound = await this.findOne({
      where: {
        user: {
          id: userId,
        },
        date: appointmentDate,
        time,
      },
    });

    if (appointmentFound) {
      throw new CustomError(
        400,
        `La cita con fecha ${appointmentDate.toISOString().split("T")[0]} y hora ${time} ya existe para este usuario`
      );
    }
  },
});
