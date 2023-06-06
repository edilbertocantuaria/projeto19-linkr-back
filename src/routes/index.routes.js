import { Router } from "express";
import publishRouter from "./publish.routes.js";
import hashtag from "./hashtag.routes.js";
import signRouter from "./auth.routes.js"
import userRouter from "./user.routes.js";
import postLikeRouter from "./posts.routes.js";
import followRouter from "./follow.routes.js";


const router = Router();
router.use(publishRouter);
router.use(signRouter);
router.use(hashtag)
router.use(userRouter);
router.use(postLikeRouter);
router.use(followRouter)

export default router;