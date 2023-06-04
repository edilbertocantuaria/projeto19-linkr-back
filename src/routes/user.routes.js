import { Router } from "express";
import { getUsers } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.get("/users", getUsers);

export default userRouter;