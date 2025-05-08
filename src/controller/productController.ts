// Handles all product-related HTTP routes
import express from "express";
import {BaseProduct, Product} from "../models/BaseProduct";
import { productService } from "../container/container";

const router = express.Router();

// Add or update a product
router.post("/", (req, res) => {
    const { name, price } = req.body;
    const all:Product[] = productService.list();
    const exists = all.some(p => p.name === name);

    if (!name || typeof price !== "number") {
        return res.status(400).json({ message: "Invalid product data." });
    }

    const product:Product = new BaseProduct(name, price);
    productService.add(product);

    res.status(exists ? 200 : 201).json({
        message: exists ? "Product updated." : "Product added.",
        product,
    });
});

// List all products
router.get("/", (_req, res) => {
    const products:Product[] = productService.list();
    res.json(products);
});

// Delete a product by name
router.delete("/:name", (req, res) => {
    const name = req.params.name;

    const deleted = productService.deleteByName(name);

    if (deleted) {
        res.json({ message: `Product '${name}' deleted.` });
    } else {
        res.status(404).json({ message: `Product '${name}' not found.` });
    }
});

export default router;
