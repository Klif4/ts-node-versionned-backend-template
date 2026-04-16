import { List } from "immutable";
import type { Product } from "../model/product.js";
import type { ProductRepository } from "../port/product-repository.js";

export class GetAllProductsUseCase {
  constructor(private readonly repository: ProductRepository) {}

  execute(): Promise<List<Product>> {
    return this.repository.findAll();
  }
}