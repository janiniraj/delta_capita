import { JSONFileStorage } from "../repositories/JSONFileStorage";
import { Product } from "../models/BaseProduct";
import { Offer, OfferType } from "../models/Offer";

/**
 * Business logic layer for a shopping cart using products and offers
 */
export class CartService {
    private productStorage = new JSONFileStorage("products.json");
    private offerStorage = new JSONFileStorage("offers.json");

    calculateTotal(cartItems: string[]): number {
        const products: Product[] = this.productStorage.load<Product>();
        const offers: Offer[] = this.offerStorage.load<Offer>();

        const itemCounts: Record<string, number> = {};

        // Count occurrences of each item
        for (const item of cartItems) {
            itemCounts[item] = (itemCounts[item] || 0) + 1;
        }

        let total:number = 0;

        for (const [name, count] of Object.entries(itemCounts)) {
            const product = products.find(p => p.name === name);
            if (!product) continue;

            const offer = offers.find(o => o.productName === name);
            let chargeableCount = count;

            if (offer) {
                if (offer.type === "2FOR1") {
                    chargeableCount = Math.ceil(count / 2);
                } else if (offer.type === "3FOR2") {
                    const setsOfThree = Math.floor(count / 3);
                    chargeableCount = setsOfThree * 2 + (count % 3);
                }
            }

            total += chargeableCount * product.price;
        }

        return total;
    }
}
