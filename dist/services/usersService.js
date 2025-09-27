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
exports.getUserByIdService = exports.loginService = exports.getAllUsersService = exports.createUserService = void 0;
const db_1 = require("../config/db");
const User_1 = require("../entities/User");
const credentialServices_1 = require("./credentialServices");
// Crear usuario
const createUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const dataSource = yield (0, db_1.getDataSource)();
    const resultadoTransaccion = yield dataSource.transaction((entityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const credential = yield (0, credentialServices_1.createCredentialsService)(entityManager, { userName: user.userName, password: user.password });
        const newUser = entityManager.create(User_1.User, {
            name: user.name,
            email: user.email,
            nDni: user.nDni,
            birthdate: new Date(user.birthdate),
            credential: credential,
        });
        yield entityManager.save(newUser);
        return newUser;
    }));
    return resultadoTransaccion;
});
exports.createUserService = createUserService;
// Obtener todos los usuarios
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const dataSource = yield (0, db_1.getDataSource)();
    return yield dataSource.getRepository(User_1.User).find({
        relations: { appointments: true },
    });
});
exports.getAllUsersService = getAllUsersService;
// Login
const loginService = (credenciales) => __awaiter(void 0, void 0, void 0, function* () {
    const dataSource = yield (0, db_1.getDataSource)();
    const validacion = yield (0, credentialServices_1.validateCredencials)(credenciales);
    if (!validacion)
        throw new Error("Credencial invalida");
    const user = yield dataSource.getRepository(User_1.User).findOne({
        where: { credential: { id: validacion.id } },
    });
    return { login: true, user };
});
exports.loginService = loginService;
// Obtener usuario por ID
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const dataSource = yield (0, db_1.getDataSource)();
    const user = yield dataSource.getRepository(User_1.User).findOne({
        where: { id },
        relations: { appointments: true },
    });
    if (!user)
        throw new Error("usuario no encontrado");
    return user;
});
exports.getUserByIdService = getUserByIdService;
