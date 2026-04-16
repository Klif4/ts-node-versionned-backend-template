import { describe, expect, it } from "vitest";
import { mock } from "vitest-mock-extended";
import type { ProductRepository } from "../../../src/domain/port/product-repository.js";
import { GetProductByIdUseCase } from "../../../src/domain/usecase/get-product-by-id.usecase.js";

describe("GetProductByIdUseCase", () => {
  it("returns the product when it exists", async () => {
    const repository = mock<ProductRepository>();
    const product = { id: "1", name: "Widget", price: 9.99 };
    repository.findById.mockResolvedValue(product);

    const result = await new GetProductByIdUseCase(repository).execute("1");

    expect(result).toEqual(product);
    expect(repository.findById).toHaveBeenCalledWith("1");
  });

  it("returns undefined when product does not exist", async () => {
    const repository = mock<ProductRepository>();
    repository.findById.mockResolvedValue(undefined);

    const result = await new GetProductByIdUseCase(repository).execute("unknown");

    expect(result).toBeUndefined();
  });
});
