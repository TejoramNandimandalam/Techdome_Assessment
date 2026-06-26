# Load Test Results – techdome.io

## Configuration

- **Tool:** Playwright (`tests/load/concurrent-users.spec.ts`)
- **Concurrent users:** 5 (exactly — hard limit respected, never exceeded)
- **Target:** https://techdome.io/ (homepage)
- **Each user:** independent `browser.newContext()` → navigate → `waitForLoadState('load')`
- **Workers:** 1 (config), 5 parallel contexts inside the single test
- **Run date:** 2026-06-26

## Method

Five browser contexts are launched in parallel via `Promise.all`. For each user
the script records full page load time and counts any response with status ≥ 500.
p95 is computed from the sorted load times.

## Results

| User   | Load Time (s) |
| ------ | ------------- |
| User 2 | 3.959         |
| User 1 | 8.931         |
| User 4 | 8.942         |
| User 5 | 11.153        |
| User 3 | 11.539        |

- **Min:** 3.96 s
- **Max:** 11.54 s
- **p95:** **11.539 s**
- **HTTP 5xx errors:** **Many** — repeated `503 Service Unavailable` on
  `/_app/immutable/**` JS, CSS, image, and video assets across all 5 users.

Single-user baseline (`page-load-performance.spec.ts`): **7.62 s**.

## Assertions

| Assertion                  | Threshold | Actual     | Result |
| -------------------------- | --------- | ---------- | ------ |
| p95 response time          | < 3000 ms | 11,539 ms  | ❌ FAIL |
| Zero HTTP 5xx errors       | 0         | > 0 (503s) | ❌ FAIL |
| Concurrent users ≤ 5       | ≤ 5       | 5          | ✅ PASS |

## Verdict

**FAIL.** The homepage does not meet the performance/reliability target under
5 concurrent users. p95 (11.54s) is ~4x the 3s budget, and the server returns
503s for static `_app/immutable` assets under concurrent load. The 5-user
constraint itself was respected.

### Observations
- Load times are highly variable (3.96s – 11.54s), suggesting cold-cache or
  rate-limiting/throttling behaviour on the CDN/origin.
- The 503s are concentrated on SvelteKit build assets, so affected users get a
  partially hydrated page.

### Recommendations
- Investigate origin/CDN capacity and caching for `/_app/immutable/*`.
- Add caching headers / scale static asset delivery.
- Re-run after fixes to confirm p95 < 3s and zero 5xx.
