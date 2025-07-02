import express from "express";
import {
  listProducts,
  fetchProductById,
  addProduct,
  bulkSeedProducts,
} from "../handlers/productHandler.js";

const productRouter = express.Router();

productRouter.route("/").get(listProducts).post(addProduct);

// Fetch a single product based on its MongoDB ObjectId or custom productId
productRouter.get("/:id", fetchProductById);

productRouter.post("/seed", bulkSeedProducts);

export default productRouter;
