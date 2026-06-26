# Bug Report – techdome.io

---

## BUG-001
**Severity:** High
**Summary:** Site returns HTTP 503 on static assets under concurrent load, breaking the page for some users.
**Steps:**
1. Open 5 concurrent browser contexts to https://techdome.io/ simultaneously.
2. Observe network responses for `/_app/immutable/**` JS, CSS, image and video assets.
**Expected:** All users load the homepage with zero 5xx errors.
**Actual:** Multiple `503 Service Unavailable` responses for `/_app/immutable/...` chunks, CSS, images, and `headerVideoBg...mp4` across users 1–5. The SvelteKit app shell fails to fully hydrate for affected users.
**Evidence:** `tests/load/concurrent-users.spec.ts` console output: dozens of `Server Error -> 503 https://techdome.io/_app/immutable/...` lines.

---

## BUG-002
**Severity:** High
**Summary:** Homepage p95 load time far exceeds the 3-second performance budget.
**Steps:**
1. Run `tests/load/concurrent-users.spec.ts` (5 concurrent users).
**Expected:** p95 response time < 3000 ms.
**Actual:** Per-user load times were 3.96s, 8.93s, 8.94s, 11.15s, 11.54s → **p95 = 11.54s** (≈4x budget). Single-user homepage load was also slow at **7.62s** (`tests/load/page-load-performance.spec.ts`).
**Evidence:** Console: `All Load Times: [ 3.959, 8.931, 8.942, 11.153, 11.539 ]`, `P95 Load Time: 11.539s`; assertion `expect(p95).toBeLessThan(3)` failed.

---

## BUG-003
**Severity:** Medium
**Summary:** Critical security response headers are missing.
**Steps:**
1. `GET https://techdome.io/` and inspect response headers.
**Expected:** `X-Frame-Options`, `X-Content-Type-Options`, `Strict-Transport-Security`, and `Content-Security-Policy` present.
**Actual:** All four headers are **Missing** (clickjacking, MIME-sniffing, HSTS, and CSP protections absent).
**Evidence:** `tests/security/security-headers.spec.ts` console:
`✗ x-frame-options : Missing`, `✗ x-content-type-options : Missing`, `✗ strict-transport-security : Missing`, `✗ content-security-policy : Missing`.

---
