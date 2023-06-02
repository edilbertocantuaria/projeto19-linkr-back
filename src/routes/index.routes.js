import { Router } from "express";
import publishRouter from "./publish.routes.js";
import hashtag from "./hashtag.routes.js";
import signRouter from "./auth.routes.js"
import chalk from "chalk";

console.log(chalk.green(`QAAAB`));

const router = Router();
router.use(publishRouter);
router.use(signRouter);
router.use(hashtag)


export default router;