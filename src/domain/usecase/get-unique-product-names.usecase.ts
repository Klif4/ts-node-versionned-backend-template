import { Set } from "immutable";
import type { ProductRepository } from "../port/product-repository.js";

export class GetUniqueProductNamesUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async execute(): Promise<Set<string>> {
    const products = await this.repository.findAll();
    return Set(products.map((p) => p.name));
  }
}