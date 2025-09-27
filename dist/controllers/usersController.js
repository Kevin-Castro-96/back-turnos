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
exports.getUserById = exports.getUsers = exports.login = exports.register = void 0;
const usersService_1 = require("../services/usersService");
// Registro de usuario
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, birthdate, nDni, userName, password } = req.body;
        console.log("POST /users/register body:", req.body);
        const newUser = yield (0, usersService_1.createUserService)({
            name,
            email,
            birthdate,
            nDni,
            userName,
            password,
        });
        res.status(201).json(newUser);
    }
    catch (err) {
        const errorDb = err;
        res.status(400).json({
            mensaje: "no se pudo crear el usuario",
            error: err instanceof Error
                ? errorDb.detail
                    ? errorDb.detail
                    : err.message
                : `Error desconocido`,
        });
    }
});
exports.register = register;
// Login de usuario
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credentials = req.body;
        const usuario = yield (0, usersService_1.loginService)(credentials);
        res.status(200).json(usuario);
    }
    catch (err) {
        res.status(400).json({
            error: err instanceof Error ? err.message : `error desconocido`,
        });
    }
});
exports.login = login;
// Obtener todos los usuarios
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, usersService_1.getAllUsersService)();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(404).json({
            error: err instanceof Error ? err.message : `error desconocido`,
        });
    }
});
exports.getUsers = getUsers;
// Obtener usuario por ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, usersService_1.getUserByIdService)(Number(id));
        res.status(200).json(user);
    }
    catch (err) {
        res.status(404).json({
            mensaje: err instanceof Error ? err.message : `error desconocido`,
        });
    }
});
exports.getUserById = getUserById;
