// Handles creation, listing, and deletion of product offers
import express from "express";
import { offerService } from "../container/container";
import { OfferType } from "../models/Offer";

const router = express.Router();

// Add or update an offer
router.post("/", (req, res) => {
    const { productName, type, description } = req.body;

    if (!productName || !type || !description) {
        return res.status(400).json({ message: "Invalid offer data." });
    }

    if (!["2FOR1", "3FOR2"].includes(type)) {
        return res.status(400).json({ message: "Invalid offer type." });
    }

    // Check if offer already exists for the product
    const existingOffers = offerService.getAll();
    const exists = existingOffers.some(o => o.productName === productName);

    offerService.add({ productName, type: type as OfferType, description });
    res.status(exists ? 200 : 201).json({
        message: exists ? "Offer updated." : "Offer added."
    });
});

// List all offers
router.get("/", (_req, res) => {
    const offers = offerService.getAll();
    res.json(offers);
});

// Delete offer by product name
router.delete("/:productName", (req, res) => {
    const deleted = offerService.deleteByProduct(req.params.productName);
    if (deleted) {
        res.json({ message: "Offer deleted." });
    } else {
        res.status(404).json({ message: "Offer not found." });
    }
});

export default router;
