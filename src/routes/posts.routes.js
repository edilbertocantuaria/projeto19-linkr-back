import {Router} from 'express'

import { postLike } from '../controllers/posts.controllers.js';





const postLikeRouter = Router();


postLikeRouter.post("/posts/liked", postLike);


export default postLikeRouter;