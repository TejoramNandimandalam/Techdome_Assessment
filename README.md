# Techdome QA – Playwright Automation Suite

End-to-end, integration, security, and load tests for **https://techdome.io**, built with [Playwright](https://playwright.dev/) and TypeScript using the Page Object Model.

## Tech Stack

- Playwright Test (`@playwright/test`)
- TypeScript
- Data-driven tests via JSON + CSV (`csv-parse`)
- Page Object Model (`pages/`)

## Project Structure

```
techdome-playwright-assignment/
├── pages/                         # Page Objects + utilities
│   ├── HomePage.ts
│   ├── NavigationPage.ts
│   ├── ContactPage.ts
│   └── utils/                     # data providers
├── test-data/                     # customdata.json / customdata.csv
├── tests/
│   ├── e2e/                       # user journeys
│   ├── integration/               # API / network / third-party
│   ├── security/                  # headers, XSS, data exposure
│   └── load/                      # concurrent users (max 5) + perf
├── docs/                          # user stories, bugs, logs, results
├── playwright.config.ts
└── package.json
```

## Prerequisites

- Node.js
- Install dependencies and browsers:

```bash
npm install
npx playwright install
```

## Running the Tests

Run the entire suite (single command):

```bash
npx playwright test
```

Useful variations:

```bash
npx playwright test --reporter=line          # concise console output
npx playwright test tests/e2e                # only E2E tests
npx playwright test tests/load               # only load tests
npx playwright show-report                   # open the HTML report
```

> Tests run against the **live** techdome.io site, so results depend on
> network conditions and current server health. The config uses a single
> worker (`workers: 1`) to keep the load test within the required limit.

## Test Coverage

| Suite        | Folder               | Focus                                                            |
| ------------ | -------------------- | --------------------------------------------------------------- |
| E2E          | `tests/e2e/`         | Home load, CTAs, navigation dropdowns, contact form, footer/social, mobile 375px & 768px |
| Integration  | `tests/integration/` | Endpoint status codes, contact form network calls, third-party (GA) scripts |
| Security     | `tests/security/`    | Security header audit, XSS handling, sensitive-data exposure     |
| Load         | `tests/load/`        | **Exactly 5** concurrent users, p95 < 3s, zero 5xx; homepage perf |

The contact-form E2E tests are **data-driven** from `test-data/logindata.json`
and `test-data/logindata.csv` (valid/invalid email and message scenarios).

## Assignment Coverage Snapshot

| Requirement Area | Assignment Minimum | Implemented |
| ---------------- | ------------------ | ----------- |
| E2E tests | 8 | 16 |
| Integration tests | 3 | 7 |
| Security tests | 3 | 3 |
| Load tests | 1 (max 5 users) | 1 (exactly 5 users) |
| User story map | Required | Completed in `docs/user-story-map.md` |
| Claude usage log | 5 entries | 7 entries in `docs/claude-code-log.md` |
| Bug report | Required | Completed in `docs/bugs.md` |
| Load results doc | Required | Completed in `docs/load-test-results.md` |

## Security Requirement Note (Script Injection)

Validating that contact form script injection input is
rejected or sanitised. This is covered in `tests/security/xss-validation.spec.ts`
by asserting:

- script payload is submitted in the name field,
- no browser dialog/alert is executed,
- payload is not reflected unsafely in the rendered page.

### Load test constraint

The load test (`tests/load/concurrent-users.spec.ts`) simulates **exactly 5**
concurrent browser contexts — never more — in line with the assignment's hard
limit of 5 concurrent users.

## Documentation

- `docs/user-story-map.md` – structured user stories
- `docs/test-scenarios.md` – scenario catalogue
- `docs/feature-inventory.md` – feature/automation matrix
- `docs/bugs.md` – defects found running the suite
- `docs/load-test-results.md` – load run summary and verdict
- `docs/claude-code-log.md` – AI usage log and judgment notes
