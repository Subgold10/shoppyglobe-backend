import express from "express";
import { signUp, signIn } from "../handlers/authHandler.js";

const authRouter = express.Router();

authRouter.post("/register", signUp);

authRouter.post("/login", signIn);

export default authRouter; // Export the router so it can be used in your main app
