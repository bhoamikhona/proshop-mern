import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express();
connectDB();

app.get("/", (req, res) => res.send("Hello, World!"));

app.use("/api/products", productRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`App started listening on port ${port}`));
