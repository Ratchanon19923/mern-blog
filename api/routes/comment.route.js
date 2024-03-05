import express from "express";
import {
  createComment,
  editComment,
  getPostComments,
  likeComment,
} from "../controller/comment.controller.js";
import { verifyToken } from "../util/verifyUser.js";

const router = express.Router();

router.get("/getPostComments/:postId", getPostComments);
router.post("/create", verifyToken, createComment);
router.put("/likeComment/:commentId", verifyToken, likeComment);
router.put("/editComment/:commentId", verifyToken, editComment);

export default router;
