import express from "express";

const router = express.Router();

// Sample GET route
router.get("/", (req, res) => {
  res.json({ message: "All blog posts will appear here." });
});

export default router;
