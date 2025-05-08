import {BaseProduct, Product} from "../models/BaseProduct";
import { ProductRepository } from "../repositories/ProductRepository";

/**
 * Business logic layer for products
 */
export class ProductService<T extends BaseProduct> {
    constructor(private repository: ProductRepository<T>) {}

    add(product: Product): void {
        this.repository.add(product);
    }

    list(): Product[] {
        return this.repository.getAll();
    }

    deleteByName(name: string): boolean {
        return this.repository.deleteByName(name);
    }
}
