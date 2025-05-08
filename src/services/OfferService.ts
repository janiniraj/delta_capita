import { Offer } from "../models/Offer";
import { OfferRepository } from "../repositories/OfferRepository";

/**
 * Business logic layer for offers
 */
export class OfferService {
    constructor(private repo: OfferRepository) {}

    add(offer: Offer): void {
        this.repo.add(offer);
    }

    getAll(): Offer[] {
        return this.repo.getAll();
    }

    deleteByProduct(productName: string): boolean {
        return this.repo.deleteByProduct(productName);
    }
}
