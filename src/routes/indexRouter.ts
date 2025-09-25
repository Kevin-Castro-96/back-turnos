import turnosRouter from "./turnosRouter";
import userRouter from "./usersRouter";
import { Router } from "express";

const indexRouter: Router = Router();

indexRouter.use("/users", userRouter);
indexRouter.use("/appointments", turnosRouter)

export default indexRouter;