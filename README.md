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
│   └── utils/                     # data + random data providers
├── test-data/                     # logindata.json / logindata.csv
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

- Node.js 18+
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
