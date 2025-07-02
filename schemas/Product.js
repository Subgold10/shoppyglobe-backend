import mongoose from "mongoose";

// Schema for product entity
const itemSchema = new mongoose.Schema(
  {
    // productId: { type: Number, unique: true, required: true },
    // Optional custom product ID field (commented out currently)

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discountPercentage: {
      type: Number,
      // Optional field for discount percentage
    },

    rating: {
      type: Number,
      // Optional field to store product rating (e.g., from 0 to 5)
    },

    stock: {
      type: Number,
      required: true,
    },

    brand: {
      type: String,
      // Optional field to store brand name
    },

    category: {
      type: String,
      // Optional field to group products by category (e.g., electronics, fashion)
    },

    thumbnail: {
      type: String,
      // URL to the main product image
    },

    images: [
      {
        type: String,
        // Array of URLs pointing to additional product images
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ProductSchema = mongoose.model("Product", itemSchema);
export default ProductSchema;
