import { When } from "@cucumber/cucumber";
import type { ProductWorld } from "../support/world.js";

When(
  "I look up product with id {string}",
  async function (this: ProductWorld, id: string) {
    this.foundProduct = await this.getProductById.execute(id);
  }
);

When(
  "I request all unique product names",
  async function (this: ProductWorld) {
    this.uniqueNames = await this.getUniqueProductNames.execute();
  }
);
