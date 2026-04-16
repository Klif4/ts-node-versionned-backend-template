import type {ProductRepository} from "../../../../src/domain/port/product-repository.js";
import {List} from "immutable";
import type {Product} from "../../../../src/domain/model/product.js";

export class InMemoryProductRepository implements ProductRepository {
    private products: List<Product>;

    constructor(products: List<Product>) {
        this.products = products;
    }

    async findById(id: string): Promise<Product | undefined> {
        return this.products.find((p) => p.id === id);
    }

    async findAll(): Promise<List<Product>> {
        return this.products;
    }

    async save(product: Product): Promise<void> {
        this.products = this.products.push(product);
    }
}