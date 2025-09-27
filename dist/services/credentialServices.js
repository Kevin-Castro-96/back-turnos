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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCredencials = exports.createCredentialsService = void 0;
const Credential_1 = require("../entities/Credential");
const indexRepository_1 = require("../repositories/indexRepository");
//chequea que exista el usuario
const checkUserExist = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    const usernameFound = yield indexRepository_1.CredentialRepository.findOne({
        where: {
            userName,
        },
    });
    if (usernameFound)
        throw Error(`El usuario con username ${userName} ya existe, intente con otro nombre de usuario`);
});
const createCredentialsService = (entityManager, credentials) => __awaiter(void 0, void 0, void 0, function* () {
    yield checkUserExist(credentials.userName);
    const newCredentials = entityManager.create(Credential_1.userCredential, credentials);
    yield entityManager.save(newCredentials);
    return newCredentials;
});
exports.createCredentialsService = createCredentialsService;
const validateCredencials = (credenciales) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = credenciales;
    const credential = yield indexRepository_1.CredentialRepository.findOneBy({ userName });
    if (!credential)
        throw new Error("invalid Credential");
    if (credential.password !== password)
        throw new Error("invalid password");
    return credential;
});
exports.validateCredencials = validateCredencials;
