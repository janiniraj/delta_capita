import { JSONFileStorage } from "./JSONFileStorage";
import { Offer } from "../models/Offer";

/**
 * Offer repository using JSONFileStorage
 */
export class OfferRepository {
    constructor(private storage: JSONFileStorage) {}

    add(offer: Offer): void {
        const all:Offer[] = this.storage.load<Offer>();
        const index = all.findIndex(o => o.productName === offer.productName);

        if (index !== -1) {
            all[index] = offer; // Update existing offer
        } else {
            all.push(offer); // Add new offer
        }

        this.storage.save(all);
    }

    getAll(): Offer[] {
        return this.storage.load<Offer>();
    }


    deleteByProduct(productName: string): boolean {
        const all = this.storage.load<Offer>();
        const updated = all.filter(o => o.productName !== productName);
        const deleted = updated.length !== all.length;
        if (deleted) this.storage.save(updated);
        return deleted;
    }
}
