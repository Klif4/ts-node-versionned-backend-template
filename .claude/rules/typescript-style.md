---
paths:
  - "**/*.ts"
  - "**/*.tsx"
---

# TypeScript Style Rules

## Core philosophy

- Prefer functional core / imperative shell: keep pure functions separate from I/O and side effects
- Make illegal states unrepresentable — encode invariants in the type system, not in runtime checks
- Errors are values, not surprises — surface them explicitly in function signatures
- The compiler is the best linter — if it compiles cleanly with strict mode, it's halfway there

## Types

- Enable `strict: true` in tsconfig — no exceptions
- Prefer `type` for unions, intersections, and mapped types; prefer `interface` for object shapes that may be extended
- Use discriminated unions instead of optional fields to model state machines
- Use branded types to prevent primitive obsession (`UserId`, `OrderId`, `Email` — not raw `string`)
- Never use `any`; use `unknown` when the type is genuinely unknown, then narrow explicitly
- Avoid non-null assertions (`!`) — prefer explicit narrowing or early returns
- Annotate all function return types explicitly — no implicit `any` leaking from inference
- Always use `Result<T, E>` as the return type alias — never inline the union `{ ok: true; value: T } | { ok: false; error: E }` directly

## Functions

- Write single-purpose functions — one function, one concern
- Prefer pure functions: same input → same output, no mutation of arguments or global state
- Never use flag parameters that switch internal logic (`doThing(data, true)` is a code smell — split into two functions)
- Keep functions small enough to understand without scrolling
- Use `const` arrow functions for pure utilities; use `function` declarations for named top-level functions that benefit from hoisting

## Error handling

- Use a `Result<T, E>` type for operations that can fail predictably — errors appear in the signature
- Reserve `throw` for truly unexpected/unrecoverable states
- Never silently swallow errors (`catch (e) {}` is always wrong)
- Error messages must be actionable — say what went wrong and what the caller can do about it

```ts
type Result<T, E = string> =
  | { ok: true;  value: T }
  | { ok: false; error: E };
```

## Immutability

- Prefer `const` over `let` everywhere; `let` only when reassignment is genuinely needed
- Use `readonly` on all object/array properties that should not be mutated
- Prefer spread (`{ ...obj, key: newVal }`) over mutation
- Use `as const` for literal tuples and enums-as-objects

## Collections (Immutable.js)

Use **Immutable.js** (`List`, `Map`, `Set`, `OrderedMap`, etc.) for all domain-level collections — never native arrays or plain objects for domain state.

- `List<T>` instead of `T[]`
- `Set<T>` instead of native `Set<T>`
- `Map<K, V>` instead of `Record<K, V>` or plain objects
- All Immutable.js operations return new instances — never mutate in place
- Keep Immutable.js types inside the domain layer; convert to plain arrays/objects at I/O boundaries (serialisation, API responses)
- Prefer `find` + `map` over `findIndex` + `get` + `set` — never manipulate collections by index; let the collection express intent

```ts
import { List, Map, Set } from "immutable";

// Avoid
const ids: string[] = [];
ids.push("a");

// Prefer
const ids: List<string> = List();
const updated = ids.push("a"); // returns a new List
```

## Naming

- Names should read as declarations, not abbreviations: `userRepository`, not `usrRepo`
- Boolean names must be predicates: `isLoading`, `hasError`, `canSubmit`
- Event handlers: `handleClick`, `handleSubmit` — not `onClick` (that's the prop name)
- Generic type parameters: `T` for a single generic, `TItem` / `TResult` when there are multiple and semantics matter

## Patterns to prefer

### Discriminated union over optional fields
```ts
// Avoid
type Response = { data?: User; error?: string; loading: boolean };

// Prefer
type Response =
  | { status: "loading" }
  | { status: "success"; data: User }
  | { status: "error";   error: string };
```

### Result type over thrown errors
```ts
// Avoid
function parseId(raw: unknown): string {
  if (typeof raw !== "string") throw new Error("invalid");
  return raw;
}

// Prefer
function parseId(raw: unknown): Result<string> {
  if (typeof raw !== "string") return { ok: false, error: "expected string" };
  return { ok: true, value: raw };
}
```

### Branded types over raw primitives
```ts
declare const _brand: unique symbol;
type Brand<T, B> = T & { [_brand]: B };

type UserId  = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;

// Impossible to pass an OrderId where a UserId is expected
```

### Exhaustive switch
```ts
function assertNever(x: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(x)}`);
}

// Use in switch default to catch missing cases at compile time
switch (user.status) {
  case "guest":    return "…";
  case "verified": return "…";
  default:         return assertNever(user);
}
```

## Patterns to avoid

- `as SomeType` casts that bypass the type system — if you need a cast, add a comment explaining why
- `// @ts-ignore` / `// @ts-expect-error` without a tracked issue reference
- Deeply nested ternaries — extract named variables or use early returns
- Classes for pure data containers — use plain types/interfaces
- Enums — prefer `as const` objects or string literal unions (enums have surprising runtime behavior)
- Default exports — named exports are easier to rename and tree-shake

## Module organisation

- All imports at the top of the file, grouped: external libs → internal modules → types
- One concept per file — if a file needs two sections of unrelated exports, split it
- Barrel files (`index.ts` re-exports) are fine for public API surfaces; avoid them for internal cross-imports

## What belongs in code vs comments

- Code should be self-documenting: names, types, and structure tell the story
- Comments explain *why*, not *what* — if you need to comment what, rename the variable
- Use JSDoc only on public API surfaces: exported functions, types, and classes