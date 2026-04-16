import type { Product, ProductId } from "../model/product.js";
import type { ProductRepository } from "../port/product-repository.js";

export class GetProductByIdUseCase {
  constructor(private readonly repository: ProductRepository) {}

  execute(id: ProductId): Promise<Product | undefined> {
    return this.repository.findById(id);
  }
}