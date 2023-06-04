import { Router } from "express";
import publishRouter from "./publish.routes.js";
import hashtag from "./hashtag.routes.js";
import signRouter from "./auth.routes.js"
import chalk from "chalk";
import userRouter from "./user.routes.js";

console.log(chalk.green(`QAAAB`));

const router = Router();
router.use(publishRouter);
router.use(signRouter);
router.use(hashtag)
router.use(userRouter);


export default router;