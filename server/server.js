import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import postRoutes from "./routes/posts.js";
import categoryRoutes from "./routes/categories.js";
import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);

// Root route
app.get("/", (req, res) => res.send("Backend running successfully"));

// 404 handler
app.use((req, res, next) => res.status(404).json({ message: "Route not found" }));

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

