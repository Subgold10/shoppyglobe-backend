import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Schema for user entity
const accountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

// Hash password before saving
accountSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
accountSchema.methods.matchPassword = async function (candidate) {
  return await bcrypt.compare(candidate, this.password);
};

const UserSchema = mongoose.model("User", accountSchema);
export default UserSchema;
