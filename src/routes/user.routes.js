import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.get("/users", getUsers);
userRouter.get("/user/:userId", getUser);

export default userRouter;