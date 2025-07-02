import CartSchema from "../schemas/Cart.js";
import ProductSchema from "../schemas/Product.js";

// Get user cart
export const fetchCart = async (req, res) => {
  try {
    const userCart = await CartSchema.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    if (!userCart) {
      return res.status(200).json({ items: [] });
    }
    res.json(userCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal error" });
  }
};

// Add item to cart
export const insertToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const productDoc = await ProductSchema.findById(productId);
    if (!productDoc) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (productDoc.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }
    let userCart = await CartSchema.findOne({ user: req.user._id });
    if (!userCart) {
      userCart = new CartSchema({
        user: req.user._id,
        items: [{ product: productId, quantity }],
      });
      await userCart.save();
      return res.status(201).json(userCart);
    }
    const idx = userCart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (idx >= 0) {
      userCart.items[idx].quantity += quantity;
    } else {
      userCart.items.push({ product: productId, quantity });
    }
    await userCart.save();
    res.status(200).json(userCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal error" });
  }
};

// Update cart item quantity
export const modifyCartItem = async (req, res) => {
  const { quantity } = req.body;

  try {
    const userCart = await CartSchema.findOne({ user: req.user._id });
    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const idx = userCart.items.findIndex(
      (item) => item._id.toString() === req.params.itemId
    );
    if (idx < 0) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    const productDoc = await ProductSchema.findById(
      userCart.items[idx].product
    );
    if (!productDoc) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (productDoc.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }
    userCart.items[idx].quantity = quantity;
    await userCart.save();
    res.json(userCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal error" });
  }
};

// Remove item from cart
export const deleteFromCart = async (req, res) => {
  try {
    const userCart = await CartSchema.findOne({ user: req.user._id });
    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const idx = userCart.items.findIndex(
      (item) => item._id.toString() === req.params.itemId
    );
    if (idx < 0) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    userCart.items.splice(idx, 1);
    await userCart.save();
    res.json(userCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal error" });
  }
};
