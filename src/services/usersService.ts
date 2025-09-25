import CredencialDto from "../dto/credencialDto";
import { CreateUserDto } from "../dto/createUserDto";
import { userCredential } from "../entities/Credential";
import { User } from "../entities/User";
import Icredencial from "../interfaces/Icredencial";
import { userRepository } from "../repositories/indexRepository";
import {
  createCredentialsService,
  validateCredencials,
} from "./credentialServices";
import { validationUserAge } from "../utils/validationUserAge";
import { AppDataSource } from "../config/data-source";

//crea un usuario
export const createUserService = async (user: CreateUserDto): Promise<User> => {
  validationUserAge(user.userName, user.birthdate);

  const resultadoTransaccion = await AppDataSource.transaction(
    async (entityManager) => {
      const credential: userCredential = await createCredentialsService(
        entityManager,
        { userName: user.userName, password: user.password}
      );

      const newUser = entityManager.create(User, {
        name: user.name,
        email: user.email,
        nDni: user.nDni,
        birthdate: new Date(user.birthdate),
        credential: credential,
      });
      await entityManager.save(newUser);
      return newUser;
    }
  );
  return resultadoTransaccion;
};

//obtiene todos los usuarios
export const getAllUsersService = async (): Promise<User[]> => {
  return await userRepository.find({
    relations: {
      appointments: true,
    },
  });
};

//loguea al usuario
export const loginService = async (
  credenciales: CredencialDto
): Promise<any> => {
  const validacion: Icredencial = await validateCredencials(credenciales);
  if (!validacion) throw new Error("Credencial invalida");

  const user = await userRepository.findOne({
    where: {
      credential: {
        id: validacion.id,
      },
    },
  });
  return { login: true, user };
};

export const getUserByIdService = async (id: number): Promise<User> => {
  const user: User | null = await userRepository.findOne({
    where: { id },
    relations: { appointments: true },
  });
  if (!user) throw new Error("usuario no encontrado");
  return user;
};
