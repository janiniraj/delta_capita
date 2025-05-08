// Entry point of the server
import express from "express";
import productController from "./controller/productController";
import offerController from "./controller/offerController";
import cartController from "./controller/cartController";

const app = express();
const PORT = 3000;

app.use(express.json());

// Root route
app.get("/", (_req, res) => {
    res.send({
        "welcome":"welcome to delta capita test, written by Niraj Jani"
    });
});
// Product API routes
app.use("/api/products", productController);
// Offer API Routes
app.use("/api/offers", offerController);
// Cart API Routes
app.use("/api/cart", cartController);

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
