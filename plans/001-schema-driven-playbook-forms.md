# Plan 001: Replace heuristic playbook forms with a schema-driven renderer

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report—do not improvise. When done, update the status row for this plan in
> `plans/README.md`, unless a reviewer dispatched you and told you they maintain
> the index.
>
> **Drift check (run first)**:
>
> ```bash
> git diff --stat 83706bc..HEAD -- \
>   package.json package-lock.json \
>   app/mockups/playbooks/daydream-source.ts \
>   app/mockups/playbooks/playbook-brief-form.tsx \
>   app/mockups/playbooks/library/\[slug\]/page.tsx
> ```
>
> If an in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding. If the
> parsing, serialization, or brand-layout code no longer matches, stop and
> report the drift rather than layering this plan onto unknown behavior.

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: MED
- **Depends on**: none
- **Category**: bug, tests, tech-debt, migration
- **Planned at**: commit `83706bc`, 2026-07-24

## Why this matters

The current shared form renderer extracts YAML with line-based regular
expressions, stores answers by unqualified field name, and chooses controls and
layout from field-name and string-length guesses. That happens to produce a
readable result for the customized brand-aesthetic playbook, but it cannot
represent nested arrays or repeated keys accurately. For example, the live
audio-drama brief contains three `cast[*].voice` values, and the live
one-face-six-lives brief contains six `scenes[*].setting` and
`scenes[*].action` values. All repeated values currently collide in React state
and copy-back serialization.

This migration must preserve the design quality reached on
`train-your-brand-aesthetic`: two meaningful columns on larger screens, a
logical single-column reading order on small screens, restrained labels,
purposeful controls, and no generated-sounding helper copy. The difference is
that structure and presentation will come from a typed contract, while YAML
parsing will preserve the backend document rather than guessing from text.

This repository does not contain the Storyboard backend. Therefore this plan
defines the backend contract in-repo, implements a compatible frontend adapter,
and keeps a narrow fallback for existing Markdown documents. Do not invent or
claim to ship an external backend endpoint from this repository.

## Product and design invariants

These are requirements, not suggestions:

1. The live Markdown/YAML remains the execution source of truth until a
   structured backend response is available.
2. Every editable value has a stable structural path such as
   `["cast", 0, "voice"]`; bare names such as `"voice"` are never state keys.
3. YAML edits preserve unrelated values, comments, ordering, arrays, block
   scalars, and nesting.
4. Control selection is explicit (`text`, `textarea`, `url`, `boolean`,
   `select`, `aspect-ratio`, `string-list`, `object-list`) or derived from the
   parsed YAML type—not from character count or substring checks.
5. Presentation groups are explicit. The brand reference uses `Brand` and
   `Creative` groups; it does not depend on detecting four magic field names.
6. Labels and help text come from backend/schema content. A mechanical
   snake-case fallback is allowed only when schema metadata is absent.
7. Do not generate descriptions such as “unlock,” “supercharge,” “bring your
   vision to life,” or other marketing filler. Missing help text stays missing.
8. The Copy playbook action must serialize the current values into a valid
   playbook without mutating unrelated Markdown.
9. Playbooks without editable briefs keep the existing ready-to-use state.
10. Existing global navigation, output, metadata, footer, and catalog styling
    are out of scope.

## Current state

### Relevant files

- `app/mockups/playbooks/daydream-source.ts` — fetches the external catalog and
  Markdown documents, parses frontmatter, and flattens the first YAML fence.
- `app/mockups/playbooks/playbook-brief-form.tsx` — renders every editable
  playbook form, owns local values, and rewrites YAML before clipboard copy.
- `app/mockups/playbooks/library/[slug]/page.tsx` — passes the parsed brief and
  original Markdown into `PlaybookBriefForm`.
- `package.json` and `package-lock.json` — currently have lint, build, and
  typecheck commands but no test runner.

### Confirmed source population

Sampling the live catalog at planning time produced:

- 85 playbooks total.
- 63 playbooks with at least one field in the first YAML brief.
- 22 playbooks without an editable YAML brief.
- Only `train-your-brand-aesthetic` matches the current brand-layout signature.
- `one-prompt-audio-drama` repeats the nested key `voice`.
- `one-face-six-lives` repeats the nested keys `setting` and `action`.

The executor must create local fixtures from the representative structures
listed below. Tests must not call the live service.

### Current flat parser

At `app/mockups/playbooks/daydream-source.ts:165-180`, every trimmed YAML line
that looks like `name: value` becomes a top-level field:

```ts
const briefFields = yamlBlock.split("\n").flatMap((line) => {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith("#")) return []
  const match = /^([a-zA-Z_][\w]*)\s*:(.*)$/.exec(trimmed)
  // ...
  return [{ name: match[1], defaultValue, hint }]
})
```

Indentation and array position are discarded. Consequently,
`cast[0].voice`, `cast[1].voice`, and `cast[2].voice` all become `voice`.

### Current collision and regex serialization

At `app/mockups/playbooks/playbook-brief-form.tsx:140`, form state is:

```ts
const [values, setValues] = useState<Record<string, string>>({})
```

At `app/mockups/playbooks/playbook-brief-form.tsx:219-227`, serialization
replaces the first textual key match:

```ts
const expression = new RegExp(
  `^(\\s*)(${name}:\\s*)([^\\n#]*)(\\s*#?.*)$`,
  "m"
)
nextYaml = nextYaml.replace(expression, ...)
```

This cannot target repeated or nested properties safely.

### Current presentation heuristics

At `app/mockups/playbooks/playbook-brief-form.tsx:143-195` and `:257-301`,
the renderer currently:

- treats exact textual `true`/`false` values as checkboxes;
- gives `train_brand_lora` bespoke placement;
- suppresses `finish` when four named child flags are found;
- treats any name containing `aspect` as an aspect-ratio control;
- places fields based on the exact names `brand_name`, `one_liner`, `shots`,
  and `aesthetic`;
- chooses a textarea when hint/default text exceeds 60 characters.

At `:336-357`, the LoRA checkbox is nested under the tagline only for that
magic-name layout. This visual result is the reference to preserve, but the
trigger must move into presentation metadata.

## Target contract

Create and document this frontend/backend boundary. Exact TypeScript naming may
change to match local conventions, but the represented information may not be
removed:

```ts
type PlaybookPath = Array<string | number>

type PlaybookControl =
  | "text"
  | "textarea"
  | "url"
  | "boolean"
  | "select"
  | "aspect-ratio"
  | "string-list"
  | "object-list"

type PlaybookFormGroup = {
  id: string
  label?: string
  order: number
  columns?: 1 | 2
}

type PlaybookFormField = {
  id: string
  path: PlaybookPath
  label: string
  control: PlaybookControl
  groupId: string
  order: number
  width?: "half" | "full"
  placeholder?: string
  help?: string
  required?: boolean
  options?: Array<{ label: string; value: string }>
  itemFields?: PlaybookFormField[]
}

type PlaybookBrief = {
  source: string
  fields: PlaybookFormField[]
  groups: PlaybookFormGroup[]
  fenceStart: number
  fenceEnd: number
}
```

The eventual backend response should supply `fields` and `groups`. During the
compatibility period, the frontend parser may derive a conservative schema
from YAML types and merge an explicit local presentation profile. The fallback
must never infer layout from a combination of arbitrary field names inside the
React component.

The reference profile for `train-your-brand-aesthetic` must encode:

- Group `brand`, column 1: Brand name, Brand tagline, Train brand LoRA.
- Group `creative`, column 2: Shot list, Aesthetic, Aspect ratio, Product
  packshot, 5s motion teaser, Licensed soundtrack, Reel.
- Responsive order: the complete Brand group before the Creative group.
- `shots` as `string-list`, not a comma-dependent text field.
- `aspect` as `aspect-ratio` with `4:5`, `9:16`, and `16:9`.
- `train_brand_lora`, `packshot`, `teaser`, `music`, and `reel` as booleans.
- The structural parent `finish` is not rendered as an empty input; its child
  booleans are rendered.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install dependencies | `npm install` | exit 0; lockfile updated only for intentional dependencies |
| Typecheck | `npm run typecheck` | exit 0, no TypeScript errors |
| Lint | `npm run lint` | exit 0 |
| Unit/component tests | `npm test` | exit 0, all tests pass |
| Production build | `npm run build` | exit 0; all static playbook routes generate |
| Diff check | `git diff --check` | exit 0, no output |

If adding Vitest, Testing Library, jsdom, or a YAML library, use current stable
versions compatible with Node 20, React 19, TypeScript 5, and Next 16. Do not
upgrade unrelated dependencies.

## Suggested executor toolkit

- Read the relevant guides in `node_modules/next/dist/docs/` before changing
  Next server/client boundaries; this repository explicitly requires local
  Next 16 documentation over remembered conventions.
- Use the browser skill, if available, for desktop and 390px visual checks.
- Use a standards-compliant YAML AST/document library capable of preserving
  comments and node ordering. Prefer an established package with explicit
  document mutation APIs; do not write another YAML parser.

## Scope

**In scope—the only source/config files to modify:**

- `package.json`
- `package-lock.json`
- `app/mockups/playbooks/daydream-source.ts`
- `app/mockups/playbooks/playbook-brief-form.tsx`
- `app/mockups/playbooks/library/[slug]/page.tsx`, only if the brief prop shape
  requires a type update
- `app/mockups/playbooks/playbook-schema.ts` (create)
- `app/mockups/playbooks/playbook-schema.test.ts` (create)
- `app/mockups/playbooks/playbook-brief-form.test.tsx` (create if component
  behavior cannot be covered by schema tests)
- `app/mockups/playbooks/__fixtures__/` (create; only representative Markdown
  fixtures described in this plan)
- `docs/playbook-form-contract.md` (create)
- `vitest.config.ts` and a narrowly scoped test setup file, if required
- `plans/README.md`, status update only

**Out of scope—do not touch:**

- `app/mockups/playbooks/source-catalog.tsx`
- `app/mockups/playbooks/playbooks-workspace.tsx`
- `app/mockups/playbooks/layout.tsx`
- `app/mockups/playbooks/library/page.tsx`
- Output-card or metadata layout in
  `app/mockups/playbooks/library/[slug]/page.tsx`
- `components/site-footer.tsx` and all navigation/footer components
- Platform, docs-site, and registry code
- The external `storyboard.daydream.monster` backend
- Live backend writes, deployment, PR creation, or pushing
- Broad copy rewrites unrelated to form labels/help supplied by the contract

If implementation requires modifying an out-of-scope UI file, stop and request
that the plan be revised.

## Git workflow

- Branch: `codex/001-schema-driven-playbook-forms`
- Commit at these logical seams:
  1. `test(playbooks): add form contract fixtures`
  2. `refactor(playbooks): parse briefs by structural path`
  3. `refactor(playbooks): render forms from presentation schema`
  4. `docs(playbooks): define form backend contract`
- Stage only files touched by this plan; never use `git add -A`.
- Do not push, deploy, or open a PR unless explicitly instructed.
- Other sessions may modify this repository. If unrelated changes appear, do
  not include, reformat, revert, or commit them.

## Steps

### Step 1: Establish a characterization-test baseline

1. Add a `test` script to `package.json`.
2. Configure Vitest for TypeScript and, only if component tests are needed,
   React/jsdom.
3. Add local Markdown fixtures representing:
   - `train-your-brand-aesthetic`: scalar strings, a string list, aspect ratio,
     nested `finish` booleans, and the LoRA boolean.
   - `one-prompt-audio-drama`: an object list with three repeated `voice`
     paths, a block scalar, booleans, and aspect ratio.
   - `one-face-six-lives`: an object list with six repeated `setting` and
     `action` paths.
   - one conventional flat playbook such as `product-launch`.
   - one playbook without an editable YAML brief.
4. Fixtures must contain only the minimum representative structure needed for
   the tests; do not copy entire live documents or depend on the network.
5. Write failing characterization tests that express the target behavior:
   - structural paths are unique;
   - repeated nested values remain separately addressable;
   - block scalars remain a single field/value;
   - nested container objects are not rendered as empty scalar inputs;
   - a parse-and-serialize round trip with no edits is byte-identical for the
     YAML fence;
   - editing one repeated path changes only that node;
   - comments and unrelated Markdown remain unchanged.

**Verify**:

```bash
npm test
```

Expected at this step: the new tests execute successfully as a test harness;
tests marked for the not-yet-implemented AST behavior may fail, but there must
be no configuration/import crash. Commit the fixtures and harness before
implementing the parser. Do not weaken assertions to make the old parser pass.

### Step 2: Introduce a path-aware YAML document model

1. Create `app/mockups/playbooks/playbook-schema.ts`.
2. Parse only the first intended editable `yaml` fence, retaining the existing
   fence offsets so the rest of the Markdown remains byte-for-byte untouched.
3. Use the YAML library's document/AST API. Retain the parsed document or
   sufficient node metadata to mutate a path without reconstructing the entire
   source through regular expressions.
4. Represent every leaf or editable collection with a unique stable `id` and
   a structural `path`.
5. Preserve types:
   - booleans remain booleans;
   - numbers remain numbers;
   - scalar strings remain strings;
   - `|`/`>` block scalars remain multiline text;
   - scalar sequences become `string-list`;
   - sequences of maps become `object-list`;
   - mapping containers such as `finish` group their editable descendants and
     are not themselves rendered as blank text inputs.
6. Implement pure functions with explicit names similar to:
   - `parsePlaybookBrief(markdown)`
   - `deriveFallbackFormSchema(parsedBrief)`
   - `getValueAtPath(parsedBrief, path)`
   - `setValueAtPath(parsedBrief, path, value)`
   - `serializePlaybookBrief(markdown, parsedBrief)`
7. Keep network fetching in `daydream-source.ts`; keep parsing and mutations in
   `playbook-schema.ts`.
8. Update `PlaybookDocument.brief` to use the new typed representation.
9. Remove the line-based `briefFields` parser only after all characterization
   tests pass.

**Verify**:

```bash
npm test -- playbook-schema
npm run typecheck
```

Expected: all schema tests pass; typecheck exits 0.

### Step 3: Define presentation metadata and the compatibility adapter

1. In `playbook-schema.ts`, separate structural parsing from presentation:
   - structural parsing answers what values exist and where;
   - presentation metadata answers label, control, grouping, order, width,
     options, placeholder, and help.
2. Implement validation for externally supplied presentation metadata.
   Invalid metadata must produce a controlled fallback and a server-side
   diagnostic without exposing stack traces to the client.
3. Add an explicit compatibility profile keyed by stable playbook identity for
   `train-your-brand-aesthetic`. Keep it outside the React component.
4. The profile must encode the reference grouping listed under “Target
   contract.” It may reference field paths, but it must not change the YAML
   values or execution semantics.
5. For playbooks without explicit metadata, derive conservative controls from
   parsed YAML types:
   - string scalar → text;
   - multiline scalar → textarea;
   - boolean → checkbox;
   - scalar sequence → string-list;
   - mapping sequence → object-list;
   - URL-looking value may use `url`, but an empty field must not be guessed as
     URL unless its schema says so.
6. The mechanical fallback label may convert snake case to sentence case and
   preserve the existing abbreviation set. Do not invent help text.
7. Document the precedence:
   1. validated backend field metadata;
   2. explicit compatibility profile;
   3. YAML-type fallback.
8. Ensure the external contract can be attached to a future structured
   response without changing `PlaybookBriefForm` props again.

**Verify**:

```bash
npm test -- playbook-schema
npm run lint
```

Expected: schema/profile precedence tests pass and lint exits 0.

### Step 4: Replace the heuristic React renderer

1. Refactor `PlaybookBriefForm` to accept the typed `PlaybookBrief`.
2. Store values by stable field `id` or serialized structural path. Never use a
   bare YAML key as the state key.
3. Extract small reusable internal controls as needed, but keep them in
   `playbook-brief-form.tsx` unless reuse outside this form is proven.
4. Render groups in schema order. On small screens, groups stack in reading
   order. On `sm` and above, honor explicit group columns and field widths.
5. Preserve the brand reference:
   - Brand name and Brand tagline stack in the left group.
   - Train brand LoRA follows Brand tagline with balanced spacing.
   - Shot list, Aesthetic, Aspect ratio, and the four finishing booleans stack
     in the right group.
   - Aspect ratio remains a compact left-aligned row of visual radio choices.
   - The Copy playbook action remains full-width below all groups.
6. Remove from the React component:
   - `hasBrandCompositionLayout`;
   - `hasFinishingPasses`;
   - name checks for `train_brand_lora`, `shots`, `aesthetic`, and `aspect`;
   - string-length-based textarea selection;
   - field-order sorting by magic names;
   - regex-based YAML mutation.
7. Replace the comma-only shot-list behavior with a list editor that produces
   one item per YAML sequence entry. Keep the interaction visually quiet:
   standard inputs, small remove/add controls using Lucide icons, and no card
   chrome around every item.
8. Render object lists with repeated fieldsets whose legend comes from schema
   metadata or a restrained singular fallback. Do not flatten `cast` or
   `scenes` into an undifferentiated list of fields.
9. Accessibility requirements:
   - every control has a unique `id`;
   - every label targets exactly one control;
   - radio groups have an accessible label;
   - repeated object groups use `fieldset`/`legend`;
   - add/remove controls have explicit accessible names;
   - keyboard operation works without pointer input.
10. Copy must mutate the parsed document by structural path and serialize the
    whole Markdown. Show the existing copied state only after the clipboard
    promise resolves.

**Verify**:

```bash
npm test
npm run typecheck
npm run lint
```

Expected: all tests pass with no duplicate-key or duplicate-id warnings in
component tests; typecheck and lint exit 0.

### Step 5: Add regression coverage for representative rendering

Add component tests for:

1. Brand reference:
   - group order and field order;
   - LoRA checkbox follows Brand tagline;
   - finishing booleans follow Aspect ratio;
   - changing every control produces the expected nested YAML.
2. Audio drama:
   - three independently editable voice controls;
   - script renders as a textarea;
   - changing the second voice leaves the first and third unchanged.
3. One face/six lives:
   - six scene fieldsets;
   - changing scene 4 action affects only scene 4.
4. Flat playbook:
   - fallback controls render in source order;
   - no brand-specific grouping appears.
5. No-brief playbook:
   - ready-to-use state and Copy action remain present.
6. Invalid presentation metadata:
   - renderer uses the type-derived fallback;
   - no client crash occurs.

Do not use broad snapshots as the primary assertion. Query controls by role and
accessible name, edit them, and assert exact serialized paths.

**Verify**:

```bash
npm test
```

Expected: all tests pass, including the six regression categories above.

### Step 6: Document the backend handoff contract

Create `docs/playbook-form-contract.md` containing:

1. The complete JSON/TypeScript-equivalent contract from “Target contract.”
2. A fully worked `train-your-brand-aesthetic` example.
3. A repeated-object example for `cast[*].voice`.
4. Validation rules:
   - unique field IDs;
   - unique structural paths;
   - referenced group IDs must exist;
   - options required for select/radio controls;
   - object-list child paths are relative to the item;
   - presentation metadata cannot change the YAML data type.
5. Versioning:
   - include `schemaVersion: 1`;
   - additive optional fields are backward-compatible;
   - control/path semantic changes require a version increment;
   - unknown future controls fall back safely rather than rendering the wrong
     input.
6. Ownership:
   - backend owns execution values, types, options, labels, help, and grouping;
   - frontend owns reusable visual components, accessibility, responsive
     behavior, and design tokens;
   - compatibility profiles are temporary and must be deleted once equivalent
     backend metadata ships.
7. A migration note specifying that the frontend can consume structured
   metadata when available and fall back to AST-derived structure for legacy
   Markdown.

The document must avoid aspirational marketing language. It is an engineering
contract.

**Verify**:

```bash
rg -n "schemaVersion|PlaybookFormField|structural path|compatibility" \
  docs/playbook-form-contract.md
```

Expected: all four concepts are present.

### Step 7: Perform route and visual verification

1. Run the complete production build.
2. Start the local app without changing deployment configuration.
3. Verify at 390px and at least one desktop width:
   - `/mockups/playbooks/library/train-your-brand-aesthetic`
   - `/mockups/playbooks/library/one-prompt-audio-drama`
   - `/mockups/playbooks/library/one-face-six-lives`
   - `/mockups/playbooks/library/product-launch`
   - one no-brief playbook
4. For every editable route:
   - no horizontal overflow;
   - form follows schema order;
   - controls have visible labels;
   - Copy playbook works after changing a nested value;
   - pasted YAML parses successfully;
   - no console errors, hydration errors, duplicate-key warnings, or
     duplicate-ID warnings.
5. On the brand route specifically, compare against the current reference:
   brand controls left, creative controls right, correct mobile reading order,
   balanced LoRA spacing, and no extra decorative cards or generated helper
   copy.

**Verify**:

```bash
npm run build
git diff --check
git status --short
```

Expected: build exits 0 and lists all playbook routes; diff check has no output;
status contains only files permitted by this plan.

## Test plan

Tests are part of the implementation, not a follow-up.

### Parser and serializer tests

File: `app/mockups/playbooks/playbook-schema.test.ts`

- no-edit round trip preserves YAML fence exactly;
- edit top-level scalar;
- edit boolean without converting it to a quoted string;
- edit multiline block scalar;
- edit a scalar-sequence item;
- add/remove scalar-sequence item;
- edit repeated nested object path;
- add/remove object-list item;
- retain inline and preceding comments;
- retain Markdown outside the edited fence;
- reject or safely fall back from invalid presentation metadata;
- preserve all 63-fixture structural invariants if a generated fixture manifest
  is later added.

### Component tests

File: `app/mockups/playbooks/playbook-brief-form.test.tsx`

- use accessible queries;
- assert schema-defined order, not implementation class names;
- assert the brand reference arrangement by group;
- independently edit repeated nested values;
- verify serialized clipboard content with a mocked Clipboard API;
- verify copied state occurs after successful clipboard resolution;
- verify failed clipboard writes do not claim success.

### Manual visual matrix

| Fixture | 390px | Desktop | Primary risk |
|---|---:|---:|---|
| Brand aesthetic | required | required | reference grouping and rhythm |
| Audio drama | required | required | repeated nested voice controls |
| One face/six lives | required | required | repeated object-list density |
| Product launch | required | required | generic fallback readability |
| No brief | required | required | unchanged empty state |

## Done criteria

All conditions must hold:

- [ ] `npm test` exits 0 with parser, serializer, schema, clipboard, and
      representative component coverage.
- [ ] `npm run typecheck` exits 0.
- [ ] `npm run lint` exits 0.
- [ ] `npm run build` exits 0 and generates all playbook routes.
- [ ] `git diff --check` exits 0 with no output.
- [ ] `rg -n "hasBrandCompositionLayout|hasFinishingPasses" app/mockups/playbooks/playbook-brief-form.tsx`
      returns no matches.
- [ ] `rg -n "new RegExp|nextYaml\\.replace|\\.length > 60" app/mockups/playbooks/playbook-brief-form.tsx`
      returns no matches related to form serialization/control inference.
- [ ] `PlaybookBriefForm` contains no layout or control branches keyed to
      `brand_name`, `one_liner`, `train_brand_lora`, `shots`, `aesthetic`,
      `packshot`, `teaser`, `music`, or `reel`.
- [ ] Every field state key is a stable schema ID or structural path.
- [ ] Editing the second repeated `voice` changes only `cast[1].voice`.
- [ ] Editing scene 4 action changes only `scenes[3].action`.
- [ ] A no-edit parse/serialize round trip is byte-identical.
- [ ] The brand reference has the same readable grouping on desktop and the
      intended single-column order on mobile.
- [ ] No marketing filler or invented helper text was added.
- [ ] `docs/playbook-form-contract.md` defines schema versioning, ownership,
      validation, fallback behavior, and examples.
- [ ] No files outside the in-scope list are modified.
- [ ] `plans/README.md` marks this plan DONE.

## STOP conditions

Stop and report rather than improvising if:

1. The live source has moved away from Markdown/YAML or more than one editable
   YAML fence must be changed per playbook.
2. A YAML library cannot preserve comments, ordering, block scalars, and
   targeted nested edits under the fixture tests.
3. Backend presentation metadata already exists in a different documented
   shape. Bring that contract back for plan revision instead of creating a
   competing one.
4. Correct implementation requires changing Storyboard backend code that is
   not in this repository.
5. The reference brand layout has materially changed since commit `83706bc`.
6. Any representative fixture cannot round-trip without semantic changes.
7. The implementation would require changing global layout, navigation,
   footer, catalog, output-card, or metadata components.
8. Tests pass only by normalizing or discarding comments, duplicate paths,
   ordering, or YAML scalar types.
9. A dependency requires upgrading Next, React, TypeScript, Tailwind, or other
   unrelated packages.
10. An in-scope file has concurrent changes that cannot be cleanly separated.

## Maintenance notes

- Treat the compatibility profile for `train-your-brand-aesthetic` as migration
  debt with an explicit deletion path. Once the backend returns equivalent
  versioned presentation metadata, add a fixture for that response and remove
  the local profile.
- Reviewers should scrutinize path identity, YAML type preservation, and
  clipboard serialization more heavily than CSS. A visually correct form that
  writes the wrong playbook is a failed implementation.
- New controls should extend the typed registry and backend contract. Do not
  reintroduce field-name checks in React.
- When the live catalog changes, update local fixtures intentionally; do not
  make the test suite network-dependent.
- A later plan may replace HTML catalog scraping with a structured catalog
  endpoint. That work is deliberately excluded here so form correctness can
  land independently.
