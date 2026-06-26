# Claude Code Usage Log

This file records significant interactions where AI was used as a problem-solving and design assistant during the assignment. All suggestions were reviewed, validated against the live application, and modified where necessary before implementation.

---

## Prompt 1 — Stabilizing Navigation Dropdown Automation

**What I asked:**

"The Expertise, Industries, and Insights dropdowns are visible manually, but Playwright fails to locate or interact with the dropdown items consistently. How can dynamic hover-based menus be automated reliably?"

**What the AI did:**

The AI suggested multiple approaches including text-based selectors, role-based locators, hover actions, explicit waits, and synchronization techniques for handling dynamically rendered menus.

**What I changed:**

The suggested implementation did not work reliably because the dropdown content was rendered dynamically and some text locators resolved to multiple elements, causing strict mode violations. I manually inspected the DOM using browser DevTools and Playwright Codegen. After several iterations, I replaced unstable selectors, redesigned the navigation page methods, and added additional synchronization logic. Significant effort was spent stabilizing these hover-based interactions because each dropdown behaved differently.

---

## Prompt 2 — Automating Home Page CTA Navigation

**What I asked:**

"The CTA buttons on the home page (Contact Us, Meet the Minds, Expand Your Knowledge, Explore More) are visible in the browser but Playwright is unable to click them consistently. What alternative locator and interaction strategies can be used?"

**What the AI did:**

The AI proposed different locator strategies including role-based selectors, text-based selectors, visibility checks, and navigation assertions.

**What I changed:**

Several generated locators proved unstable during execution. I used Playwright Codegen and manual DOM inspection to identify more reliable locators and navigation flows. Different combinations of selectors were evaluated before finalizing the page object methods. Some generated selectors were completely rejected because they failed across multiple executions. The final implementation relied on validated locators and URL assertions rather than generated scripts alone.

---

## Prompt 3 — Contact Form Validation Investigation

**What I asked:**

"The contact form fields are mandatory, but Playwright cannot locate the HTML `required` attribute. How should mandatory field validation be automated in this scenario?"

**What the AI did:**

The AI suggested validating mandatory fields through HTML attributes and browser validation handling.

**What I changed:**

The proposed approach failed because the application does not implement HTML `required` attributes for mandatory fields. I manually inspected every form element using browser DevTools and confirmed that validation was handled through browser behaviour and runtime messages instead. I rejected the original implementation and redesigned the validation strategy based entirely on actual application behaviour. This investigation prevented incorrect assumptions from being introduced into the automation suite.

---

## Prompt 4 — Contact Form API and Network Behaviour Analysis

**What I asked:**

"How can I intercept and validate the Contact Us form API request, request payload, and response using Playwright network interception?"

**What the AI did:**

The AI suggested implementing request and response interception using Playwright network listeners (`page.on('request')`, `page.on('response')`) and validating REST API traffic.

**What I changed:**

During network analysis using browser DevTools and Playwright listeners, I discovered that the application does not send traditional REST API requests (`XHR` or `Fetch`) during form submission. Instead, form submission occurs through URL navigation with query parameters while simultaneously triggering analytics requests. I rejected the original API interception approach and redesigned the integration tests to validate successful navigation, query parameter generation, third-party request generation, and overall application stability. This investigation significantly changed the final integration testing strategy.

---

## Prompt 5 — Third-Party Script and Analytics Validation

**What I asked:**

"How can third-party integrations such as Google Analytics be validated using Playwright?"

**What the AI did:**

The AI suggested monitoring outgoing network requests and validating that analytics-related calls were successfully generated during application usage.

**What I changed:**

Initial implementations failed because analytics requests were inconsistent across executions. After analysing browser network logs, I identified that requests were being sent to multiple endpoints including `google-analytics.com` and `google.com/g/collect`. I modified the implementation to monitor both endpoints, resulting in a more reliable third-party integration test.

---

## Prompt 6 — Concurrent User Simulation and SLA Validation

**What I asked:**

"The assignment requires exactly five concurrent users, p95 response time below three seconds, and zero HTTP 5xx errors. How can this be implemented correctly without violating the maximum user constraint?"

**What the AI did:**

The AI suggested different concurrency strategies including asynchronous execution using `Promise.all()`, response interception, p95 calculation logic, and load metric aggregation.

**What I changed:**

Multiple implementation approaches were evaluated before finalizing the load test. I redesigned the execution flow to ensure that all five users accessed the application concurrently rather than sequentially. Additional logic was introduced to capture individual load times, aggregate execution metrics, calculate p95 response time, and monitor server-side failures. Considerable effort was spent investigating and optimizing the implementation because observed response times consistently exceeded the required SLA. After repeated executions and analysis, it was determined that the application's actual performance characteristics were responsible for the SLA violation rather than deficiencies in the automation framework. The original SLA assertion was intentionally preserved and documented as a product defect.

---

## Prompt 7 — Mobile Navigation and Responsive Validation

**What I asked:**

"The website collapses into a hamburger menu on mobile viewports, but Playwright Codegen cannot interact with the menu reliably. How can mobile navigation collapse be automated?"

**What the AI did:**

The AI suggested using Playwright Inspector, manual locator discovery, viewport-specific assertions, and alternative selector strategies.

**What I changed:**

Playwright Codegen was unable to identify the hamburger interaction correctly even though the functionality worked manually. I used Playwright Inspector and browser inspection tools to discover stable accessibility-based locators for the mobile menu. I then implemented viewport validation, menu visibility checks, and content reflow assertions for 375px and 768px viewports to satisfy the assignment requirements.
