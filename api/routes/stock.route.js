import express from "express";
import { addTransactions } from "../controller/stock.controller.js";
import { verifyToken } from "../util/verifyUser.js";

const router = express.Router();

router.post("/addTransactions", verifyToken, addTransactions);

export default router;
