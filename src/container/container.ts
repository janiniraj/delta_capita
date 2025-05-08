// Dependency injection setup for Product, Offer, and Cart services
import { JSONFileStorage } from "../repositories/JSONFileStorage";
import { ProductRepository } from "../repositories/ProductRepository";
import { ProductService } from "../services/ProductService";
import { BaseProduct } from "../models/BaseProduct";
import { OfferRepository } from "../repositories/OfferRepository";
import { OfferService } from "../services/OfferService";
import { CartService } from "../services/CartService";

// Product service dependencies
const productStorage = new JSONFileStorage("products.json");
const productRepo = new ProductRepository<BaseProduct>(productStorage);
const productService = new ProductService<BaseProduct>(productRepo);

// Offer service dependencies
const offerStorage = new JSONFileStorage("offers.json");
const offerRepo = new OfferRepository(offerStorage);
const offerService = new OfferService(offerRepo);

// Cart service (uses local storage directly)
const cartService = new CartService();

export { productService, offerService, cartService };
