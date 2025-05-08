import { OfferService } from "../src/services/OfferService";
import { OfferRepository } from "../src/repositories/OfferRepository";
import { JSONFileStorage } from "../src/repositories/JSONFileStorage";
import { Offer } from "../src/models/Offer";

class MockOfferStorage extends JSONFileStorage {
    private mockData: Offer[] = [];

    constructor() {
        super("mock-offers.json");
    }

    override save<T>(data: T[]): void {
        this.mockData = data as Offer[];
    }

    override load<T>(): T[] {
        return this.mockData as unknown as T[];
    }
}

describe("OfferService", () => {
    let service: OfferService;

    beforeEach(() => {
        const repo = new OfferRepository(new MockOfferStorage());
        service = new OfferService(repo);
    });

    it("adds a new offer", () => {
        const offer: Offer = { productName: "Apple", type: "2FOR1", description: "2 for 1 deal" };
        service.add(offer);
        expect(service.getAll()).toContainEqual(offer);
    });

    it("deletes an offer", () => {
        const offer: Offer = { productName: "Apple", type: "2FOR1", description: "2 for 1 deal" };
        service.add(offer);
        const deleted = service.deleteByProduct("Apple");
        expect(deleted).toBe(true);
        expect(service.getAll()).toHaveLength(0);
    });
});
