import express from "express";
import {
  addTransactions,
  getTransactions,
} from "../controller/stock.controller.js";
import { verifyToken } from "../util/verifyUser.js";

const router = express.Router();

router.get("/getTransactions/:userId", verifyToken, getTransactions);
router.post("/addTransactions", verifyToken, addTransactions);

export default router;
