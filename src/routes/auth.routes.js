import { Router } from "express";

import { signUp, login } from "../controllers/sign.controllers.js/sign.controllers.js";

import { validateSchema } from "../middlewares/validate.schemas.js";

import { signInSchema, signUpSchema } from "../schemas/auth.schemas.js";

import verifyEmail from "../middlewares/verify.email.js";

import createToken from "../middlewares/token/create.token.js";

import verifyToken from "../middlewares/token/verify.token.js";




const signRouter = Router()

signRouter.post('/signup', validateSchema(signUpSchema), verifyEmail, signUp);

signRouter.post('/signin', validateSchema(signInSchema), login, createToken, verifyToken, );

export default signRouter
