import { Request, Response } from "express";
import { User } from "../entities/User";
import {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  loginService,
} from "../services/usersService";
import CredencialDto from "../dto/credencialDto";
import { PostgresError } from "../interfaces/postgreErrorInterface";

//creacion de usuario 
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, birthdate, nDni, userName, password } = req.body;
    console.log(req.body)
    const newUser: User = await createUserService({
      name,
      email,
      birthdate,
      nDni,
      userName,
      password,
    });
    res.status(201).json(newUser);
  } catch (err) {
    const errorDb = err as PostgresError;
    res.status(400).json({
      mensaje: "no se pudo crear el usuario",
      error:
        err instanceof Error
          ? errorDb.detail
            ? errorDb.detail
            : err.message
          : `Error desconocido`,
    });
  }
};

//loguea al usuario
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const credentials: CredencialDto = req.body;
    const usuario = await loginService(credentials);
    res.status(200).json(usuario);
  } catch (err) {
    res.status(400).json({
      error: err instanceof Error ? err.message : `error desconocido`,
    });
  }
};

//Obtiene todos los usuarios
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({
      error: err instanceof Error ? err.message : `error desconocido`,
    });
  }
};

//obtiene un usuario por ID
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const user: User = await getUserByIdService(Number(id));
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({
      mensaje: err instanceof Error ? err.message : `error desconocido`,
    });
  }
};
