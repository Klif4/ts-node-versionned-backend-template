import { Given, DataTable } from "@cucumber/cucumber";
import { List } from "immutable";
import type { ProductWorld } from "../support/world.js";

Given(
  "the following products exist:",
  function (this: ProductWorld, table: DataTable) {
    const products = List(
      table.hashes().map((row) => ({
        id: row["id"],
        name: row["name"],
        price: parseFloat(row["price"]),
      }))
    );
    this.initUseCases(products);
  }
);
