import { CartService } from "../src/services/CartService";
import { JSONFileStorage } from "../src/repositories/JSONFileStorage";
import { Product } from "../src/models/BaseProduct";
import { Offer } from "../src/models/Offer";

class MockProductStorage extends JSONFileStorage {
    private data: Product[] = [];

    constructor(products: Product[]) {
        super("mock-products.json");
        this.data = products;
    }

    override load<T>(): T[] {
        return this.data as unknown as T[];
    }

    override save<T>(_data: T[]): void {}
}

class MockOfferStorage extends JSONFileStorage {
    private data: Offer[] = [];

    constructor(offers: Offer[]) {
        super("mock-offers.json");
        this.data = offers;
    }

    override load<T>(): T[] {
        return this.data as unknown as T[];
    }

    override save<T>(_data: T[]): void {}
}

describe("CartService", () => {
    it("calculates total without offers", () => {
        const service = new CartService();
        (service as any).productStorage = new MockProductStorage([
            { name: "Apple", price: 100 },
            { name: "Banana", price: 80 },
        ]);
        (service as any).offerStorage = new MockOfferStorage([]);

        const total = service.calculateTotal(["Apple", "Banana"]);
        expect(total).toBe(180);
    });

    it("applies 2FOR1 offer", () => {
        const service = new CartService();
        (service as any).productStorage = new MockProductStorage([{ name: "Apple", price: 100 }]);
        (service as any).offerStorage = new MockOfferStorage([
            { productName: "Apple", type: "2FOR1", description: "2 for 1" },
        ]);

        const total = service.calculateTotal(["Apple", "Apple"]);
        expect(total).toBe(100);
    });

    it("applies 3FOR2 offer", () => {
        const service = new CartService();
        (service as any).productStorage = new MockProductStorage([{ name: "Apple", price: 100 }]);
        (service as any).offerStorage = new MockOfferStorage([
            { productName: "Apple", type: "3FOR2", description: "3 for 2" },
        ]);

        const total = service.calculateTotal(["Apple", "Apple", "Apple"]);
        expect(total).toBe(200);
    });
});
