import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import productEndpoints from "./routes/productRoutes.js";
import cartEndpoints from "./routes/cartRoutes.js";
import authEndpoints from "./routes/authRoutes.js";
import { errorHandler, notFound } from "./middlewares/error.js";

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());

// Connect to database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.info("MongoDB connection successful"))
  .catch((dbErr) => console.error("MongoDB connection failed:", dbErr));

// Register API endpoints
server.use("/products", productEndpoints);
server.use("/cart", cartEndpoints);
server.use("/auth", authEndpoints);

server.use(notFound);
server.use(errorHandler);

const SERVER_PORT = process.env.PORT || 5000;
server.listen(SERVER_PORT, () => {
  console.info(`API server listening on port ${SERVER_PORT}`);
});
