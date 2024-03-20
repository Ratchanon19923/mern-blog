import express from "express";
import {
  addTransactions,
  deleteTransactions,
  getTransactions,
} from "../controller/stock.controller.js";
import { verifyToken } from "../util/verifyUser.js";

const router = express.Router();

router.get("/getTransactions/:userId", verifyToken, getTransactions);
router.post("/addTransactions", verifyToken, addTransactions);
router.delete(
  "/deleteTransactions/:transactionId",
  verifyToken,
  deleteTransactions
);

export default router;
