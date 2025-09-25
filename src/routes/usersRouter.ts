import { Router } from "express";
import { register, getUsers, getUserById, login } from "../controllers/usersController";

const userRouter: Router = Router();

//obtener todos los usuarios
userRouter.get("/", getUsers);

//retorna un usuario por su ID
userRouter.get("/:id", getUserById);

//creacion de usuario lo recibe de controlador y se exporta a server
userRouter.post("/register", register)

userRouter.post("/login", login)


export default userRouter;