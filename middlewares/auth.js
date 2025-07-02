import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import UserSchema from "../schemas/User.js";

// Auth middleware to protect private routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await UserSchema.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.error("Auth error:", error);

      const msg =
        error.name === "TokenExpiredError"
          ? "Token expired"
          : "Token verification failed";

      res.status(401);
      throw new Error(`Not authorized, ${msg}`);
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, token missing");
  }
});

export { protect };
