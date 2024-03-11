import Stock from "../models/stock.model.js";
import { errorHandler } from "../util/error.js";

export const addTransactions = async (req, res, next) => {
  if (!req.user.isAdmin || req.body.userId !== req.user.id) {
    return next(errorHandler(403, "You are not allowed to create transaction"));
  }

  const transaction = req.body.data;
  if (!transaction) {
    return next(errorHandler(400, "Data are required"));
  }

  try {
    for (const transac of transaction) {
      const newTransaction = new Stock({
        ...transac,
        userId: req.user.id,
      });
      const savedTransaction = await newTransaction.save();
      console.log("Transaction saved:", savedTransaction);
    }

    res.status(201).json("Transactions saved successfully");
  } catch (error) {
    next(error);
  }
};
