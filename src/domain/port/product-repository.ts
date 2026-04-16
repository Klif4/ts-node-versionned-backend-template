import { List } from "immutable";
import type { Product, ProductId } from "../model/product.js";

export interface ProductRepository {
  findById(id: ProductId): Promise<Product | undefined>;
  findAll(): Promise<List<Product>>;
  save(product: Product): Promise<void>;
}
