import mongoose from "mongoose";

// Schema for a single cart entry
const entrySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: true }
);

// Schema for the cart document
const basketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [entrySchema],
  },
  { timestamps: true }
);

const CartSchema = mongoose.model("Cart", basketSchema);
export default CartSchema;
