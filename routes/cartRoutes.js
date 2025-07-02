import express from "express";
import { protect } from "../middlewares/auth.js";
import {
  fetchCart,
  insertToCart,
  modifyCartItem,
  deleteFromCart,
} from "../handlers/cartHandler.js";

const cartRouter = express.Router(); // Initialize Express router

// Apply authentication middleware to all routes below

cartRouter.use(protect);

// Retrieves the authenticated user's cart
cartRouter.get("/", fetchCart);

// Adds a product to the user's cart
cartRouter.post("/", insertToCart);

// Updates the quantity of a specific item in the cart
cartRouter.put("/:itemId", modifyCartItem);

// Removes a specific item from the cart
cartRouter.delete("/:itemId", deleteFromCart);

export default cartRouter;
