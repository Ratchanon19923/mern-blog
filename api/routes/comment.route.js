import express from "express";
import { createComment, getPostComments } from "../controller/comment.controller.js";
import { verifyToken } from "../util/verifyUser.js";

const router = express.Router();

router.get("/getPostComments/:postId", getPostComments);
router.post("/create", verifyToken, createComment);

export default router;
 