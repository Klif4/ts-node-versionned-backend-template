import type { Product } from "../model/product.js";
import type { ProductRepository } from "../port/product-repository.js";

export class SaveProductUseCase {
  constructor(private readonly repository: ProductRepository) {}

  execute(product: Product): Promise<void> {
    return this.repository.save(product);
  }
}