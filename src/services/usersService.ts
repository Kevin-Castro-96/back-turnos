import { getDataSource } from "../config/db";
import { User } from "../entities/User";
import { CreateUserDto } from "../dto/createUserDto";
import { userCredential } from "../entities/Credential";
import { createCredentialsService, validateCredencials } from "./credentialServices";
import Icredencial from "../interfaces/Icredencial";
import CredencialDto from "../dto/credencialDto";

export const createUserService = async (user: CreateUserDto): Promise<User> => {
  const dataSource = await getDataSource(); // 👈 singleton
  const resultadoTransaccion = await dataSource.transaction(
    async (entityManager: any) => {
      const credential: userCredential = await createCredentialsService(
        entityManager,
        { userName: user.userName, password: user.password }
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

export const getAllUsersService = async (): Promise<User[]> => {
  const dataSource = await getDataSource();
  return await dataSource.getRepository(User).find({
    relations: { appointments: true },
  });
};

export const loginService = async (credenciales: CredencialDto): Promise<any> => {
  const dataSource = await getDataSource();
  const validacion: Icredencial = await validateCredencials(credenciales);
  if (!validacion) throw new Error("Credencial invalida");

  const user = await dataSource.getRepository(User).findOne({
    where: { credential: { id: validacion.id } },
  });

  return { login: true, user };
};

export const getUserByIdService = async (id: number): Promise<User> => {
  const dataSource = await getDataSource();
  const user = await dataSource.getRepository(User).findOne({
    where: { id },
    relations: { appointments: true },
  });
  if (!user) throw new Error("usuario no encontrado");
  return user;
};
