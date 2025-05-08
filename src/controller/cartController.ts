// Calculate total price for a shopping cart
import express from "express";
import { cartService } from "../container/container";

const router = express.Router();

// POST /api/cart/total
// Takes an array of product names and returns total cost
router.post("/total", (req, res) => {
    const cart: string[] = req.body;

    if (!Array.isArray(cart)) {
        return res.status(400).json({ message: "Invalid cart format. Expected an array of strings." });
    }

    const totalInPence = cartService.calculateTotal(cart);

    res.json({
        total: totalInPence,
        formatted: `£${(totalInPence / 100).toFixed(2)}`
    });
});

export default router;
