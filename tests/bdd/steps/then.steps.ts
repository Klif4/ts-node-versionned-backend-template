import { Then } from "@cucumber/cucumber";
import assert from "node:assert/strict";
import type { ProductWorld } from "../support/world.js";

Then(
  "I should receive a product named {string} with price {float}",
  function (this: ProductWorld, name: string, price: number) {
    assert.ok(this.foundProduct, "Expected a product but got undefined");
    assert.equal(this.foundProduct.name, name);
    assert.equal(this.foundProduct.price, price);
  }
);

Then(
  "I should get {int} unique names",
  function (this: ProductWorld, count: number) {
    assert.equal(this.uniqueNames.size, count);
  }
);

Then(
  "the unique names should include {string} and {string}",
  function (this: ProductWorld, name1: string, name2: string) {
    assert.ok(
      this.uniqueNames.has(name1),
      `Expected "${name1}" in unique names`
    );
    assert.ok(
      this.uniqueNames.has(name2),
      `Expected "${name2}" in unique names`
    );
  }
);
