import ProductSchema from "../schemas/Product.js";
import axios from "axios";

// List all products, optionally filter by category
export const listProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const foundProducts = await ProductSchema.find(filter);
    res.json({
      ok: true,
      total: foundProducts.length,
      products: foundProducts,
    });
  } catch (err) {
    console.error("Error listing products:", err);
    res.status(500).json({ ok: false, error: "Internal error" });
  }
};

// Get a single product by ID
export const fetchProductById = async (req, res) => {
  try {
    const productDoc = await ProductSchema.findById(req.params.id);
    if (!productDoc) {
      return res.status(404).json({ ok: false, error: "Product not found" });
    }
    res.json({ ok: true, product: productDoc });
  } catch (err) {
    console.error("Error fetching product:", err);
    if (err.name === "CastError") {
      return res.status(400).json({ ok: false, error: "Invalid product ID" });
    }
    res.status(500).json({ ok: false, error: "Internal error" });
  }
};

// Add a new product
export const addProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock } = req.body;
    if (!title || !description || !price || !category || !stock) {
      return res
        .status(400)
        .json({ ok: false, error: "Missing required fields" });
    }
    const newProduct = new ProductSchema({
      title,
      description,
      price,
      category,
      stock,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json({ ok: true, product: savedProduct });
  } catch (err) {
    console.error("Error adding product:", err);
    if (err.name === "ValidationError") {
      return res.status(400).json({
        ok: false,
        error: Object.values(err.errors).map((e) => e.message),
      });
    }
    res.status(500).json({ ok: false, error: "Internal error" });
  }
};

// Seed products from external API
export const bulkSeedProducts = async (req, res) => {
  try {
    const apiRes = await axios.get("https://dummyjson.com/products");
    const products = apiRes.data.products;
    const mapped = products.map((item) => ({
      title: item.title,
      description: item.description,
      price: item.price,
      category: item.category,
      stock: item.stock,
      rating: item.rating,
      brand: item.brand,
      thumbnail: item.thumbnail,
      images: item.images,
    }));
    await ProductSchema.deleteMany({});
    const inserted = await ProductSchema.insertMany(mapped);
    res.status(201).json({
      ok: true,
      message: "Seeded successfully",
      count: inserted.length,
    });
  } catch (err) {
    console.error("Error seeding products:", err);
    res
      .status(500)
      .json({ ok: false, error: "Seeding failed", details: err.message });
  }
};
