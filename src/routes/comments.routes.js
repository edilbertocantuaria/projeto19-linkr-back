import { Router } from "express"
import { getCommentsFromPost, postComment } from "../controllers/comments.controller.js"

const comments=Router()

comments.post("/comments/:postId",postComment)
comments.get("/comments/:postId",getCommentsFromPost)

export default comments