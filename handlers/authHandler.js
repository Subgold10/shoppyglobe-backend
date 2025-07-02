import jwt from "jsonwebtoken"; // For creating JSON Web Tokens
import UserSchema from "../schemas/User.js"; // User model for database operations

// Register a new account
export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists in database
    const existing = await UserSchema.findOne({ email });
    if (existing) {
      // Return error if user exists (HTTP 400 Bad Request)
      return res.status(400).json({ message: "Account already exists" });
    }

    // Create new user in database
    const newUser = await UserSchema.create({
      name,
      email,
      password,
    });

    if (newUser) {
      // If user creation successful (HTTP 201 Created)
      res.status(201).json({
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token: createJwt(newUser._id),
      });
    } else {
      // If user creation failed (HTTP 400 Bad Request)
      res.status(400).json({ message: "Invalid registration data" });
    }
  } catch (err) {
    // Handle any unexpected errors (HTTP 500 Internal Server Error)
    console.error(err);
    res.status(500).json({ message: "Internal error" });
  }
};

// Authenticate and issue token
export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email in database
    const foundUser = await UserSchema.findOne({ email });

    // Check if user exists and password matches (using model method)
    if (foundUser && (await foundUser.matchPassword(password))) {
      // Successful authentication (HTTP 200 OK)
      res.json({
        id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        token: createJwt(foundUser._id),
      });
    } else {
      // Authentication failed (HTTP 401 Unauthorized)
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    // Handle any unexpected errors (HTTP 500 Internal Server Error)
    console.error(err);
    res.status(500).json({ message: "Internal error" });
  }
};

const createJwt = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET, // Secret key from environment variables
    {
      expiresIn: "30d",
    }
  );
};
