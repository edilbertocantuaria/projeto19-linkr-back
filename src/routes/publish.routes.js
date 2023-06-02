import { Router } from "express";
import { validateSchema } from "../middlewares/validate.schemas.js";
import { publishSchema } from "../schemas/publish.schema.js";
import { getPosts, publishLink } from "../controllers/publish.controllers.js";

const publishRouter = Router();

publishRouter.post("/timeline", validateSchema(publishSchema), publishLink)
publishRouter.get("/timeline", getPosts);

export default publishRouter;