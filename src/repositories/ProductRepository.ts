import { IStorage } from "./IStorage";
import {Product} from "../models/BaseProduct";

/**
 * Product repository using generic IStorage
 */
export class ProductRepository<T> {
    constructor(private storage: IStorage) {}

    add(product: Product): void {
        const all:Product[] = this.storage.load<Product>();
        const index = all.findIndex(p => p.name === product.name);

        if (index !== -1) {
            // Update existing product
            all[index] = product;
        } else {
            // Add new product
            all.push(product);
        }

        this.storage.save(all);
    }

    getAll(): Product[] {
        return this.storage.load<Product>();
    }

    deleteByName(name: string): boolean {
        const all:Product[] = this.storage.load<Product>();
        const updated = all.filter((item: any) => item.name !== name);

        const deleted = all.length !== updated.length;
        if (deleted) this.storage.save<Product>(updated);

        return deleted;
    }
}
