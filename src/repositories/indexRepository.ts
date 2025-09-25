import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Turn";
import { User } from "../entities/User";
import { userCredential } from "../entities/Credential";

export const userRepository = AppDataSource.getRepository(User);
export const appointmentRepository = AppDataSource.getRepository(Appointment);
export const CredentialRepository = AppDataSource.getRepository(userCredential);