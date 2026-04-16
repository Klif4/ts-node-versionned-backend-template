import { List } from "immutable";
import { describe, expect, it } from "vitest";
import { mock } from "vitest-mock-extended";
import type { ProductRepository } from "../../../src/domain/port/product-repository.js";
import { GetUniqueProductNamesUseCase } from "../../../src/domain/usecase/get-unique-product-names.usecase.js";

describe("GetUniqueProductNamesUseCase", () => {
  it("returns an immutable Set of unique product names", async () => {
    const repository = mock<ProductRepository>();
    repository.findAll.mockResolvedValue(
      List([
        { id: "1", name: "Widget", price: 9.99 },
        { id: "2", name: "Gadget", price: 19.99 },
        { id: "3", name: "Widget", price: 14.99 },
      ])
    );

    const names = await new GetUniqueProductNamesUseCase(repository).execute();

    expect(names.size).toBe(2);
    expect(names.has("Widget")).toBe(true);
    expect(names.has("Gadget")).toBe(true);
  });
});
