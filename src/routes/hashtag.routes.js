import { Router } from "express";
import { getAllHashtags, getSelectedHashtag, postHashtag } from "../controllers/hashtag.controllers.js";

const hashtag=Router()

hashtag.post("/hashtag",postHashtag)
hashtag.get("/hashtag",getAllHashtags)
hashtag.get("/hashtag/:hashtag",getSelectedHashtag)

export default hashtag