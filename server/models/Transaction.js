import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Transaction title is required"],
    },
    amount: {
      type: Number,
      required: [true, "Transaction amount is required"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
