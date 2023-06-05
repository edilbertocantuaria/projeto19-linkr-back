import { Router } from "express";
import { validateSchema } from "../middlewares/validate.schemas.js";
import { publishSchema } from "../schemas/publish.schema.js";
import { publishLink, getPosts, editPost, deletePost } from "../controllers/publish.controllers.js";

const publishRouter = Router();

publishRouter.post("/timeline", validateSchema(publishSchema), publishLink)
publishRouter.get("/timeline", getPosts);
publishRouter.put("/timeline/:id", editPost);
publishRouter.delete("/timeline/:id", deletePost)

export default publishRouter;