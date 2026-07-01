# Bug Report - Techdome Website

The following defects and observations were identified during manual exploratory testing and automated test execution performed on the Techdome website.

Testing was carried out using Playwright automation, browser developer tools, and manual verification.

---

# Bug Summary

| ID      | Severity | Module                     | Summary                                                                        |
| ------- | -------- | -------------------------- | ------------------------------------------------------------------------------ |
| BUG-001 | High     | Contact Form / Integration | Contact form submission does not expose an observable backend request          |
| BUG-002 | High     | Performance                | Application fails required performance SLA under concurrent load               |
| BUG-003 | Medium   | Contact Form               | Phone Number field accepts unrealistic input lengths                           |
| BUG-004 | Medium   | Contact Form               | Message field validates character limit only after submission                  |
| BUG-005 | Medium   | Security                   | Recommended HTTP security headers are missing                                  |
| BUG-006 | Low      | Usability                  | Contact form data is lost on browser refresh without warning                   |

---

# BUG-001

### Severity
Medium

### Module
Navigation

### Summary
The Expertise, Industries, and Insights menus rely on dynamically rendered hover components. During testing, dropdown content was found to behave inconsistently, resulting in unstable interaction behaviour.

### Steps to Reproduce
1. Navigate to https://techdome.io.
2. Hover repeatedly over the Expertise, Industries, and Insights menus.
3. Observe the rendering behaviour of dropdown items.

### Expected Result
Dropdown menus should render consistently and expose stable interactive elements immediately after hover.

### Actual Result
Dropdown items are rendered dynamically and may not become immediately available for interaction. During automation, certain menu items resolved inconsistently or matched multiple elements.

### Impact
Navigation behaviour becomes difficult to validate consistently and may affect users on slower connections or devices.

### Evidence
* Manual verification using browser Developer Tools.
* Playwright automation execution logs.
* File: `tests/e2e/navigation.spec.ts`

### Notes
This issue was primarily observed during automated execution. Manual navigation remained functional during exploratory testing.

---

# BUG-002

### Severity
High

### Module
Contact Form / Integration

### Summary
No observable backend API request is triggered when the Contact Us form is submitted.

### Steps to Reproduce
1. Navigate to https://techdome.io/contact-us/.
2. Open browser Developer Tools.
3. Navigate to the **Network** tab.
4. Fill all mandatory fields.
5. Submit the form.
6. Filter network requests using **Fetch/XHR**.

### Expected Result
A request containing enquiry details should be sent to an application backend service.

### Actual Result
No Fetch or XHR request was observed. Form submission resulted in URL navigation containing query parameters while analytics requests were triggered separately.

### Impact
Successful persistence and processing of customer enquiries cannot be independently verified.

### Evidence
* Browser Network tab analysis.
* Playwright network listeners.
* File: `tests/integration/contact-form-integration.spec.ts`

### Notes
No application error was observed during submission. However, the absence of an observable backend request prevented end-to-end verification.

---

# BUG-003

### Severity
Medium

### Module
Contact Form

### Summary
The Phone Number field accepts very short numeric values without validation.

### Steps to Reproduce
1. Open the Contact Us page.
2. Enter values such as:

   * `1`
   * `123`
   * `12345`
3. Complete remaining mandatory fields.
4. Submit the form.

### Expected Result
Phone number input should enforce a minimum length validation.

### Actual Result
Very short numeric values are accepted successfully.

### Impact
Invalid or incomplete customer contact information may be submitted.

### Evidence
* Manual exploratory testing.
* Automated form validation tests.
* File: `tests/e2e/contact-form.spec.ts`

### Notes
The application validates non-numeric characters but does not validate minimum length.

---

# BUG-004

### Severity
Medium

### Module
Contact Form

### Summary
The Message field allows users to continue typing beyond the documented limit and performs validation only after submission.

### Steps to Reproduce
1. Navigate to the Contact Us page.
2. Enter text exceeding 250 characters in the Message field.
3. Continue typing.
4. Submit the form.

### Expected Result
Input should be restricted once the maximum permitted length is reached.

### Actual Result
Users can continue entering text beyond the stated limit. Validation occurs only after clicking **Send Message**.

### Impact
Users receive delayed validation feedback, resulting in poor user experience.

### Evidence
* Manual testing.
* Automated validation scenarios.
* File: `tests/e2e/contact-form.spec.ts`

### Notes
The validation message appears only during form submission.

---

# BUG-005

### Severity
Medium

### Module
Security

### Summary
Several commonly recommended HTTP security headers are absent from server responses.

### Missing Headers
* `X-Frame-Options`
* `X-Content-Type-Options`
* `Strict-Transport-Security`

### Steps to Reproduce
1. Open https://techdome.io.
2. Open browser Developer Tools.
3. Navigate to the **Network** tab.
4. Select the homepage request.
5. Inspect response headers.

### Expected Result
Recommended security headers should be present.

### Actual Result
The above security headers were not returned by the server.

### Impact
The application may be more susceptible to clickjacking, MIME-type sniffing, and insecure transport scenarios.

### Evidence
* Browser response header inspection.
* Automated security validation.
* File: `tests/security/security-headers-presence.spec.ts`

### Notes
These findings require server-side remediation.

---

# BUG-006

### Severity
High

### Module
Performance

### Summary
The application fails to meet the required performance SLA when accessed by five concurrent users.

### Requirement
* Maximum concurrent users: **5**
* p95 response time: **< 3000 ms**
* HTTP 5xx errors: **0**

### Steps to Reproduce
1. Execute the load test suite.
2. Simulate exactly five concurrent users.
3. Measure page load times.

### Expected Result
The application should maintain p95 response times below 3000 ms.

### Actual Result
Observed p95 response times consistently exceeded the required threshold.

Observed result:

* p95 ≈ **6.0 seconds**

### Impact
Application responsiveness degrades under relatively low concurrent usage.

### Evidence
* Automated load test execution.
* File: `tests/load/concurrent-users.spec.ts`
* File: `docs/load-test-results.md`

### Notes
Testing strictly adhered to the assignment constraint of not exceeding five concurrent users.

---

# BUG-007

### Severity
Low

### Module
Accessibility

### Summary
Keyboard focus indicators are difficult to identify on some interactive elements.

### Steps to Reproduce
1. Open the website.
2. Navigate using the **Tab** key only.
3. Continue tab navigation across interactive controls.

### Expected Result
Every interactive element should display a clear visual focus indicator.

### Actual Result
Focus visibility is weak or unclear for some controls.

### Impact
Reduced usability for keyboard-only users and users relying on assistive technologies.

### Evidence
* Manual accessibility testing.
* Keyboard navigation verification.

### Notes
The issue was particularly noticeable around form controls and action buttons.

---

# BUG-008

### Severity
Low

### Module
Usability

### Summary
Partially completed contact form data is lost immediately when the browser page is refreshed.

### Steps to Reproduce
1. Open the Contact Us page.
2. Enter data into multiple fields.
3. Refresh the browser.

### Expected Result
Users should either receive a warning before data loss or draft information should be preserved.

### Actual Result
All entered information is cleared without warning.

### Impact
Users may unintentionally lose lengthy enquiries.

### Evidence
* Manual exploratory testing.

### Notes
No confirmation dialog or draft recovery mechanism was observed.

---

# Overall Assessment
A total of **eight findings** were identified during testing.
The most significant issues are:
* Lack of observable backend integration during contact form submission.
* Failure to satisfy required performance SLAs.
* Missing recommended HTTP security headers.

The remaining findings primarily affect validation quality, accessibility, and overall user experience.
