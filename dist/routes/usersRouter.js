"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const userRouter = (0, express_1.Router)();
//obtener todos los usuarios
userRouter.get("/", usersController_1.getUsers);
//retorna un usuario por su ID
userRouter.get("/:id", usersController_1.getUserById);
//creacion de usuario lo recibe de controlador y se exporta a server
userRouter.post("/register", usersController_1.register);
userRouter.post("/login", usersController_1.login);
exports.default = userRouter;
