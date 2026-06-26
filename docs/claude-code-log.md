# Claude Code Usage Log

## Prompt #1

**What I asked:**
"Help me design a robust selector strategy for Techdome navigation menus and dropdowns."

**What Claude did:**
Suggested using text-based locators and hover actions for Expertise, Industries, and Insights menus.

**What I changed / accepted / rejected:**
During execution, multiple navigation tests failed because menu items were dynamically rendered and some hover actions were unreliable. After manually inspecting the DOM and using Playwright Codegen, I rejected several text-based selectors and implemented custom navigation methods using dynamic XPath and role-based selectors. Additional synchronization logic and waits were introduced to stabilize execution.

---

## Prompt #2

**What I asked:**
"Help me automate the Contact Us form validations."

**What Claude did:**
Suggested validating mandatory fields by asserting the presence of the HTML `required` attribute.

**What I changed / accepted / rejected:**
The tests repeatedly failed because the website does not implement HTML `required` attributes for mandatory fields. Instead, validation is handled through browser behaviour and custom messages. I manually inspected the HTML source and rejected the original approach. I redesigned the validation strategy based on actual runtime behaviour observed during exploratory testing rather than assumptions.

---

## Prompt #3

**What I asked:**
"Help me implement integration tests for contact form submission and API validation."

**What Claude did:**
Suggested intercepting XHR/Fetch requests and validating request payloads.

**What I changed / accepted / rejected:**
While investigating network traffic through browser DevTools, I discovered that the contact form does not send any XHR or Fetch requests. Form submission is performed through URL navigation with query parameters. I rejected the original API interception approach and instead implemented tests validating successful navigation and application stability after submission. This investigation required extensive network analysis and manual verification.

---

## Prompt #4

**What I asked:**
"Help me create third-party integration tests for analytics scripts."

**What Claude did:**
Suggested capturing and validating Google Analytics requests.

**What I changed / accepted / rejected:**
Initial implementation failed because analytics requests were inconsistent across executions. After analysing browser network logs, I identified multiple Google Analytics endpoints (`google-analytics.com` and `google.com/g/collect`). I enhanced the detection logic to monitor both endpoints, resulting in a more reliable integration test.

---

## Prompt #5

**What I asked:**
"Help me implement performance and load tests according to assignment constraints."

**What Claude did:**
Suggested concurrent user simulation and response-time validation.

**What I changed / accepted / rejected:**
The assignment explicitly restricted load testing to a maximum of five concurrent users. I ensured the implementation strictly simulated exactly five users and no more. During execution, the application consistently violated the required SLA (p95 < 3 seconds). Instead of modifying thresholds to force test success, I retained the original assertions and documented the performance degradation as a product defect.

---

## Prompt #6

**What I asked:**
"Help me investigate security validation failures and missing security headers."

**What Claude did:**
Suggested validating standard HTTP security headers and XSS prevention mechanisms.

**What I changed / accepted / rejected:**
Execution results showed that important security headers such as `X-Frame-Options`, `Strict-Transport-Security`, and `Content-Security-Policy` were absent. Rather than weakening assertions to make tests pass, I preserved the checks and treated the missing headers as legitimate security findings to be reported in `bugs.md`.

---

## Prompt #7

**What I asked:**
"Help me automate mobile responsiveness verification for 375px and 768px viewports."

**What Claude did:**
Suggested viewport-based layout validation and hamburger menu checks.

**What I changed / accepted / rejected:**
The mobile hamburger menu behaved differently under Playwright Codegen compared to manual browser execution. I used Playwright Inspector and manual DOM inspection to investigate the issue. After experimentation, I implemented viewport validation, overflow checks, and menu visibility verification instead of relying solely on generated scripts.
