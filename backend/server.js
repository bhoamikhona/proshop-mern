import express from "express";
import products from "./data/products.js";

const app = express();

app.get("/", (req, res) => res.send("Hello, World!"));

app.get("/api/products", function (req, res) {
  return res.json(products);
});

app.get("/api/products/:id", function (req, res) {
  const product = products.find((p) => p._id === req.params.id);
  return res.json(product);
});

app.listen(8000, () => console.log("App started listening on port 8000"));
