import { World, setWorldConstructor } from "@cucumber/cucumber";
import type { Set } from "immutable";
import { List } from "immutable";
import type { Product } from "../../../src/domain/model/product.js";
import { GetProductByIdUseCase } from "../../../src/domain/usecase/get-product-by-id.usecase.js";
import { GetUniqueProductNamesUseCase } from "../../../src/domain/usecase/get-unique-product-names.usecase.js";
import { InMemoryProductRepository } from "./adapters/inMemoryProductRepository.js";

export class ProductWorld extends World {
  getProductById!: GetProductByIdUseCase;
  getUniqueProductNames!: GetUniqueProductNamesUseCase;
  foundProduct: Product | undefined;
  uniqueNames!: Set<string>;

  initUseCases(products: List<Product>): void {
    const repository = new InMemoryProductRepository(products);
    this.getProductById = new GetProductByIdUseCase(repository);
    this.getUniqueProductNames = new GetUniqueProductNamesUseCase(repository);
  }
}

setWorldConstructor(ProductWorld);