import axios from "axios";
import ProductSchema from "../schemas/Product.js";

const runProductSeeder = async () => {
  try {
    console.info("Starting product seeding...");
    const apiResult = await axios.get("https://dummyjson.com/products");
    const productList = apiResult.data.products;
    await ProductSchema.deleteMany({});
    const mappedProducts = productList.map((item) => ({
      productId: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
      discountPercentage: item.discountPercentage,
      rating: item.rating,
      stock: item.stock,
      brand: item.brand,
      category: item.category,
      thumbnail: item.thumbnail,
      images: item.images,
    }));
    const inserted = await ProductSchema.insertMany(mappedProducts);
    console.info(`✔ Seeded ${inserted.length} products`);
  } catch (err) {
    console.error("✖ Product seeding failed:", err.message);
  }
};

export default runProductSeeder;
