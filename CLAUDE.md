# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn build              # Compile TypeScript to dist/
yarn test:unit          # Run Vitest unit tests (tests/unit/**/*.test.ts)
yarn test:unit:watch    # Run unit tests in watch mode
yarn test:bdd           # Run Cucumber BDD tests (tests/bdd/)
yarn test               # Run all tests (unit + BDD)
```

To run a single unit test file:
```bash
npx vitest run tests/unit/domain/get-product-by-id.test.ts
```

## Architecture

Hexagonal (ports & adapters) architecture with a pure domain layer:

```
src/domain/
  model/       — plain TypeScript types/interfaces (no classes, no logic)
  port/        — repository interfaces (the "ports")
  usecase/     — use case classes injected with ports via constructor DI
tests/
  unit/        — Vitest unit tests; repositories mocked with vitest-mock-extended
  bdd/
    features/  — Gherkin .feature files
    steps/     — Cucumber step definitions (given/when/then split)
    support/
      world.ts               — ProductWorld wires use cases with in-memory repos
      adapters/              — in-memory port implementations used only in tests
```

Use cases have a single `execute()` method and receive their repository via constructor. The domain layer has no infrastructure dependencies — all I/O lives in adapters wired together outside the domain.

## TypeScript conventions

Full rules live in `.claude/rules/typescript-style.md`. Key points:

- `strict: true` — no `any`, no non-null assertions
- Use `interface` for object shapes (e.g. `Product`, `ProductRepository`), `type` for unions/aliases
- Branded types for primitive IDs (e.g. `ProductId = string` as a starting point — brand it when obsession matters)
- **Immutable.js** for all domain collections: `List<T>`, `Set<T>`, `Map<K,V>` — never native arrays or plain objects inside the domain; convert to plain structures at I/O boundaries
- `Result<T, E>` for fallible operations; `throw` only for unrecoverable states
- Named exports only — no default exports
- Explicit return types on all functions

## Versioning & commits

Commits on `master` must follow [Conventional Commits](https://www.conventionalcommits.org/) — enforced by a `cog verify` git hook (cocogitto). Commits on other branches skip validation.

Releases are triggered manually via the GitHub Actions `release` workflow, which runs `cog bump --auto` to derive the next semver tag from commit history and generates a `CHANGELOG.md`.
