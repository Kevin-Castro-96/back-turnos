import { CustomError } from "./customError";

export const validationUserAge = (username: string, date: Date): void => {
  const today = new Date().getFullYear();
  const userBirth = new Date(date).getFullYear();
  const age = today - userBirth;
  if (userBirth > today)
    throw new CustomError(
      400,
      `El usuario${username} no puede registrarse con una fecha de nacimiento futura`
    );
  if (age < 18)
    throw new CustomError(
      400,
      `El usuario ${username} no puede registrarse por ser menor de edad`
    );
};
