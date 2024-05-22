import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();
connectDB();

app.get("/", (req, res) => res.send("Hello, World!"));

app.get("/api/products", function (req, res) {
  return res.json(products);
});

app.get("/api/products/:id", function (req, res) {
  const product = products.find((p) => p._id === req.params.id);
  return res.json(product);
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`App started listening on port ${port}`));
