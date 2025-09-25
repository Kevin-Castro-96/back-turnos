import turnosRouter from "./turnosRouter";
import userRouter from "./usersRouter";
import { Router } from "express";

const indexRouter: Router = Router();

indexRouter.use("/users", userRouter);
indexRouter.use("/appointments", turnosRouter)
indexRouter.use("/", (req, res) => {
  res.send("🚀 Bienvenido a mi backend, la API está corriendo correctamente!");
})


export default indexRouter;