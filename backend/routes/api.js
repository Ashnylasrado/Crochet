import express from "express";
import { products, categories } from "../data/products.js";

const router = express.Router();

// In-memory cart (single shared cart — fine for a learning project / single-user demo)
let cart = [];

// ---- Categories ----
router.get("/categories", (req, res) => {
  res.json(categories);
});

// ---- Products ----
router.get("/products", (req, res) => {
  const { category } = req.query;
  if (category) {
    return res.json(products.filter((p) => p.category === category));
  }
  res.json(products);
});

router.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

// ---- Cart ----
router.get("/cart", (req, res) => {
  res.json(cart);
});

router.get("/cart/total", (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  res.json({ total });
});

router.post("/cart/add/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: "Product not found" });
  cart.push(product);
  res.json(cart);
});

router.post("/cart/remove/:id", (req, res) => {
  const index = cart.findIndex((p) => p.id === parseInt(req.params.id));
  if (index !== -1) cart.splice(index, 1);
  res.json(cart);
});

router.post("/cart/clear", (req, res) => {
  cart = [];
  res.json(cart);
});

export default router;
