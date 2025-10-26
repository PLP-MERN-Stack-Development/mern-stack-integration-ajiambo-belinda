import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

// Get all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find().populate("category");
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new transaction
router.post("/", async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
