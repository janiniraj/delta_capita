import { ProductService } from "../src/services/ProductService";
import { ProductRepository } from "../src/repositories/ProductRepository";
import { BaseProduct } from "../src/models/BaseProduct";
import { IStorage } from "../src/repositories/IStorage";

class MockStorage implements IStorage {
    private data: BaseProduct[] = [];

    save<T>(data: T[]): void {
        this.data = data as BaseProduct[];
    }

    load<T>(): T[] {
        return this.data as unknown as T[];
    }
}

describe("ProductService", () => {
    let service: ProductService<BaseProduct>;

    beforeEach(() => {
        const mockStorage = new MockStorage();
        const repo = new ProductRepository<BaseProduct>(mockStorage);
        service = new ProductService<BaseProduct>(repo);
    });

    it("adds a product", () => {
        const product = new BaseProduct("Apple", 100);
        service.add(product);
        expect(service.list()).toEqual([product]);
    });

    it("deletes a product by name", () => {
        const product = new BaseProduct("Banana", 80);
        service.add(product);
        const result = service.deleteByName("Banana");
        expect(result).toBe(true);
        expect(service.list()).toEqual([]);
    });
});
