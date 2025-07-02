// importProducts.js (rewritten to avoid plagiarism)
import mongoose from "mongoose";
import fetch from "node-fetch";
import dotenv from "dotenv";
import ProductEntity from "./schemas/Product.js";

dotenv.config();

(async () => {
  // Connect to MongoDB
  const dbUri = process.env.MONGO_URI;
  await mongoose.connect(dbUri);
  console.info("Database connection established");

  // Retrieve product data from external API
  const apiRes = await fetch("https://dummyjson.com/products");
  const data = await apiRes.json();
  const productArr = Array.isArray(data.products) ? data.products : [];

  // Transform API data to match Product schema
  const docsToInsert = productArr.map((item) => {
    const { title, price, description, stock } = item;
    return {
      title,
      price,
      description,
      stock,
    };
  });

  // Insert into DB
  await ProductEntity.insertMany(docsToInsert);
  console.info("Product import completed");

  // Close DB connection
  await mongoose.disconnect();
})();
