import { EntityManager } from "typeorm";
import CredencialDto from "../dto/credencialDto";
import { userCredential } from "../entities/Credential";
import { CredentialRepository } from "../repositories/indexRepository";

//chequea que exista el usuario
const checkUserExist = async (userName: string): Promise<void> => {
  const usernameFound: CredencialDto | null =
    await CredentialRepository.findOne({
      where: {
        userName,
      },
    });
  if (usernameFound)
    throw Error(
      `El usuario con username ${userName} ya existe, intente con otro nombre de usuario`
    );
};

export const createCredentialsService = async (
  entityManager: EntityManager,
  credentials: CredencialDto
): Promise<userCredential> => {
  await checkUserExist(credentials.userName);
  const newCredentials: userCredential = entityManager.create(userCredential, credentials);
  await entityManager.save(newCredentials);
  return newCredentials;
};

export const validateCredencials = async (
  credenciales: CredencialDto
): Promise<userCredential> => {
  const { userName, password } = credenciales;
  const credential: userCredential | null =
    await CredentialRepository.findOneBy({ userName });

  if (!credential) throw new Error("invalid Credential");
  if (credential.password !== password) throw new Error("invalid password");

  return credential;
};
