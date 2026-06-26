# User Story Map - Techdome Website

US-001
Title: Global navigation loads all primary routes
As a: visitor
I want to: open each top-level navigation link
So that: I can move across key sections without broken routes
Acceptance:
- [ ] Navbar links open valid pages
- [ ] No 404 or blank page appears after click
Test Type: E2E
Priority: P0

US-002
Title: Homepage loads with expected core content
As a: visitor
I want to: open the homepage
So that: I can immediately understand the site offering
Acceptance:
- [ ] Homepage title and hero content are visible
- [ ] Primary content block renders without script crash
Test Type: E2E
Priority: P0

US-003
Title: Contact form accepts valid enquiry
As a: prospect
I want to: submit valid contact information
So that: I can send an enquiry successfully
Acceptance:
- [ ] Form accepts valid required inputs
- [ ] Submission flow completes without UI error
Test Type: E2E
Priority: P0

US-004
Title: Contact form blocks missing required fields
As a: prospect
I want to: see validation for missing mandatory inputs
So that: I can correct my submission before sending
Acceptance:
- [ ] Empty mandatory fields trigger validation
- [ ] Form does not proceed when required input is missing
Test Type: E2E
Priority: P0

US-005
Title: Primary CTA buttons route correctly
As a: visitor
I want to: click major CTA buttons
So that: I can reach intended destination pages
Acceptance:
- [ ] Hero and section CTAs are clickable
- [ ] CTA routes match expected destinations
Test Type: E2E
Priority: P1

US-006
Title: Footer links and social links are valid
As a: visitor
I want to: use footer and social navigation links
So that: I can access supporting and social destinations
Acceptance:
- [ ] Footer links expose valid href values
- [ ] Social links are present and open expected targets
Test Type: E2E
Priority: P1

US-007
Title: Mobile layout works at 375px
As a: visitor
I want to: browse the site on small mobile viewport
So that: content remains usable on phone screens
Acceptance:
- [ ] Layout reflows without horizontal overflow at 375px
- [ ] Mobile navigation control is visible and usable
Test Type: E2E
Priority: P1

US-008
Title: Tablet layout works at 768px
As a: visitor
I want to: browse the site on tablet viewport
So that: content remains readable and accessible
Acceptance:
- [ ] Layout renders correctly at 768px
- [ ] Core navigation and CTAs remain functional
Test Type: E2E
Priority: P1

US-009
Title: Contact submission triggers observable integration
As a: prospect
I want to: submit the contact form
So that: backend or integration behavior can be verified
Acceptance:
- [ ] Submission emits observable network activity
- [ ] Request/response behavior can be asserted in test
Test Type: Integration
Priority: P0

US-010
Title: Visible endpoints return expected HTTP status
As a: visitor
I want to: load key pages and endpoints
So that: availability can be verified quickly
Acceptance:
- [ ] Homepage returns expected 2xx status
- [ ] Contact page returns expected 2xx status
Test Type: Integration
Priority: P1

US-011
Title: Third-party scripts do not block render
As a: visitor
I want to: load pages with analytics scripts present
So that: third-party integrations do not degrade UX
Acceptance:
- [ ] Third-party scripts are detected successfully
- [ ] No render-blocking critical-path behavior is observed
Test Type: Integration
Priority: P1

US-012
Title: HTTP security headers are present
As a: user
I want to: receive security headers in responses
So that: browser protections are enforced
Acceptance:
- [ ] X-Frame-Options header is present
- [ ] Content-Security-Policy and HSTS headers are present
Test Type: Security
Priority: P0

US-013
Title: Contact form rejects script injection
As a: user
I want to: be protected from malicious script input
So that: unsafe input is sanitised or rejected
Acceptance:
- [ ] Script payload in form input is not executed
- [ ] Submission is rejected or sanitised safely
Test Type: Security
Priority: P0

US-014
Title: Load SLA under exactly 5 users
As a: visitor
I want to: experience stable performance during concurrent usage
So that: page load remains responsive and reliable
Acceptance:
- [ ] Exactly 5 concurrent users are simulated
- [ ] p95 response time is below 3000 ms and HTTP 5xx count is zero
Test Type: Load
Priority: P0