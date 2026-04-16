# ts-node-versioned-backend-template

A **Node.js / TypeScript backend template** pre-wired for:

- **Hexagonal architecture** (ports & adapters)
- **TDD** with [Vitest](https://vitest.dev/) + [vitest-mock-extended](https://github.com/eratio08/vitest-mock-extended)
- **BDD** with [Cucumber.js](https://cucumber.io/docs/installation/javascript/)
- **Conventional commits** enforced locally and in CI via [Cocogitto](https://docs.cocogitto.io/)
- **Automated semantic versioning** and GitHub Releases triggered from CI

Clone it, rename it, and start building your domain.

---

## Requirements

| Tool | Version |
|------|---------|
| Node.js | ≥ 22 (see `.nvmrc`) |
| Yarn | any |
| [Cocogitto](https://docs.cocogitto.io/guide/installation.html) (`cog`) | latest — required for commit validation and releases |

---

## Architecture

```
src/
└── domain/
    ├── model/          # Pure domain types (e.g. Product)
    ├── port/           # Repository interfaces (inbound / outbound ports)
    └── usecase/        # Application use cases — depend only on ports

tests/
├── unit/
│   └── domain/         # Vitest unit tests — use mocked ports (vitest-mock-extended)
└── bdd/
    ├── features/       # Gherkin feature files (.feature)
    ├── steps/          # Cucumber step definitions (given / when / then)
    └── support/
        ├── adapters/   # In-memory adapters used as test doubles in BDD scenarios
        ├── hooks.ts    # Cucumber before/after hooks
        └── world.ts    # Shared world context injected into steps
```

### Design principles

- **Domain layer is framework-free.** `src/domain` has zero runtime dependencies beyond `immutable`.
- **Ports isolate infrastructure.** Use cases depend on interfaces (`ProductRepository`), never on concrete implementations.
- **Test doubles live in `tests/`.** In-memory adapters are wired in BDD support; mocks are generated for unit tests.
- **Outside world is plugged in at the edges.** Add HTTP controllers, database adapters, etc. outside `domain/` and wire them through ports.

---

## Getting started

```bash
# Install dependencies
yarn install

# Install the Cocogitto git hook (validates commit messages on master)
cog install-hook commit-msg
```

---

## Commands

| Command | Description |
|---------|-------------|
| `yarn build` | Compile TypeScript to `dist/` |
| `yarn test` | Run unit tests **and** BDD scenarios |
| `yarn test:unit` | Run Vitest unit tests once |
| `yarn test:unit:watch` | Run Vitest in watch mode |
| `yarn test:bdd` | Run Cucumber BDD scenarios |

---

## Conventional commits

Commits on `master` are validated against the [Conventional Commits](https://www.conventionalcommits.org/) spec via a `commit-msg` git hook (managed by Cocogitto).

```
feat: add user authentication
fix: handle null product id
chore: update dependencies
```

Commits on other branches are **not** blocked — the hook skips validation outside `master`.

---

## Versioning & releases

Releases are triggered **manually** from GitHub Actions (`workflow_dispatch`).

The `Release` workflow:

1. Runs `cog bump --auto` — computes the next semantic version from conventional commits.
2. Updates `package.json` to match the new version.
3. Pushes the tag to the repository.
4. Generates a changelog for the release via `cog changelog`.
5. Creates a GitHub Release with the changelog as release notes.

The `CI` workflow runs on every push and pull request:

- Validates all commits in the push range with `cog check`.
- Runs the test suite.

---

## Adding your own domain

1. Define your model in `src/domain/model/`.
2. Declare repository interfaces in `src/domain/port/`.
3. Implement use cases in `src/domain/usecase/`.
4. Write unit tests in `tests/unit/` using mocked ports.
5. Write BDD scenarios in `tests/bdd/features/` with in-memory adapters in `tests/bdd/support/adapters/`.
6. Add your infrastructure adapters (HTTP, database, …) outside `domain/` and wire through ports.
