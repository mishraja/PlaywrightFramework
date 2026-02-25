# Swag Labs (SauceDemo) — Test Scenarios & Test Cases

Target site: `https://www.saucedemo.com/`

## Scope
- Web UI functional testing for login, product catalog, cart, checkout, and common navigation.
- Non-functional spot checks: performance, accessibility, security (basic), compatibility.

## Test Data (known)
- Valid usernames (per site):
  - `standard_user`
  - `locked_out_user`
  - `problem_user`
  - `performance_glitch_user`
  - `error_user`
  - `visual_user`
- Password (commonly used by SauceDemo): `secret_sauce`

## Definitions
- **Smoke**: Critical path that must pass on every build.
- **Regression**: Broad functional coverage.
- **Negative**: Validation / error handling.

---

## Test Scenarios
### Authentication
- **TS-001** Login with valid credentials
- **TS-002** Login failures and validation messages
- **TS-003** Locked out user behavior
- **TS-004** Session handling (refresh/back/close)
- **TS-005** Logout
- **TS-026** Login UX/security basics (password masking, Enter-to-submit)

### Products / Inventory
- **TS-006** Inventory page loads and shows products
- **TS-007** Product sorting options
- **TS-008** Product details page
- **TS-009** Add to cart from inventory
- **TS-010** Remove from cart from inventory
- **TS-011** Add/remove from product details

### Cart
- **TS-012** Cart page rendering and item persistence
- **TS-013** Quantity, remove items, continue shopping
- **TS-014** Cart badge/count behavior

### Checkout
- **TS-015** Checkout info form validation
- **TS-016** Checkout overview (items, totals)
- **TS-017** Finish checkout confirmation
- **TS-018** Cancel checkout flows (info/overview)

### Navigation / UI
- **TS-019** Menu actions (All Items / About / Logout / Reset App State)
- **TS-020** Deep linking/route guards (requires login)
- **TS-021** Visual/UI elements (basic)
- **TS-027** Footer/social links (if present)

### Non-functional
- **TS-022** Performance baseline (load/interaction)
- **TS-023** Accessibility spot checks
- **TS-024** Basic security checks (no sensitive leakage)
- **TS-025** Cross-browser and viewport compatibility

---

## Test Cases

### Authentication (TS-001 … TS-005)

| TC ID | Scenario | Preconditions | Steps | Expected Result | Priority | Type |
|---|---|---|---|---|---|---|
| TC-001 | TS-001 | On login page | Login with `standard_user` / `secret_sauce` | Redirects to inventory page | P0 | Smoke |
| TC-002 | TS-001 | On login page | Login with `performance_glitch_user` / `secret_sauce` | Login succeeds; inventory eventually loads | P1 | Regression |
| TC-003 | TS-001 | On login page | Login with `problem_user` / `secret_sauce` | Login succeeds; inventory loads | P1 | Regression |
| TC-004 | TS-003 | On login page | Login with `locked_out_user` / `secret_sauce` | Error shown for locked out user; no navigation | P0 | Smoke/Negative |
| TC-005 | TS-002 | On login page | Click Login with both fields empty | Proper validation message displayed | P0 | Smoke/Negative |
| TC-006 | TS-002 | On login page | Fill username only; click Login | Password required error displayed | P0 | Smoke/Negative |
| TC-007 | TS-002 | On login page | Fill password only; click Login | Username required error displayed | P0 | Smoke/Negative |
| TC-008 | TS-002 | On login page | Use invalid username + valid password; click Login | Authentication failure message | P1 | Negative |
| TC-009 | TS-002 | On login page | Use valid username + invalid password; click Login | Authentication failure message | P1 | Negative |
| TC-010 | TS-002 | On login page | Submit, then dismiss/close error (if supported) | Error removed and form usable | P2 | Regression |
| TC-011 | TS-004 | Logged in | Refresh inventory page | Session persists; stays on inventory | P1 | Regression |
| TC-012 | TS-004 | Logged in | Use browser Back to go to login | Should not expose logged-in state incorrectly (still logged in or redirected) | P1 | Regression |
| TC-013 | TS-005 | Logged in | Open menu → Logout | Returns to login page | P0 | Smoke |
| TC-014 | TS-005 | Logged out | Attempt to visit inventory URL directly | Redirected to login | P0 | Smoke/Negative |
| TC-015 | TS-004 | Logged in | Close tab/session then revisit | Behavior consistent with app/session rules | P2 | Regression |

#### Authentication add-ons (TS-026)

| TC ID | Scenario | Preconditions | Steps | Expected Result | Priority | Type |
|---|---|---|---|---|---|---|
| TC-076 | TS-026 | On login page | Verify password field is masked (type=password) | Password characters are not visible while typing | P1 | Security/UX |
| TC-077 | TS-026 | On login page | Fill valid creds then press Enter in password field | Login succeeds (same as clicking Login) | P2 | Regression |
| TC-078 | TS-002 | On login page | Trigger login error then start typing in a field | Error clears automatically or remains consistently per app behavior | P3 | Regression |
| TC-079 | TS-002 | On login page | Submit invalid login and validate error text content | Error message is correct and helpful | P2 | Regression |

### Products / Inventory (TS-006 … TS-011)

| TC ID | Scenario | Preconditions | Steps | Expected Result | Priority | Type |
|---|---|---|---|---|---|---|
| TC-016 | TS-006 | Logged in | Verify inventory header/title present | Inventory page identified correctly | P0 | Smoke |
| TC-017 | TS-006 | Logged in | Verify product list shows 6 items | Product count matches expected demo data | P1 | Regression |
| TC-018 | TS-006 | Logged in | Verify each product shows name, desc, price, image, add button | All core fields visible | P1 | Regression |
| TC-019 | TS-006 | Logged in | Click each product name/image to open details | Navigates to corresponding details page | P1 | Regression |
| TC-020 | TS-007 | Logged in | Sort: Name (A to Z) | Items ordered ascending by name | P1 | Regression |
| TC-021 | TS-007 | Logged in | Sort: Name (Z to A) | Items ordered descending by name | P1 | Regression |
| TC-022 | TS-007 | Logged in | Sort: Price (low to high) | Items ordered ascending by price | P1 | Regression |
| TC-023 | TS-007 | Logged in | Sort: Price (high to low) | Items ordered descending by price | P1 | Regression |
| TC-024 | TS-007 | Logged in | Change sort then navigate to details and back | Sort persists or resets consistently | P2 | Regression |
| TC-025 | TS-008 | Logged in | Open a product details page | Details show correct name/desc/price/image | P1 | Regression |
| TC-026 | TS-008 | Logged in | From details click Back to products | Returns to inventory page | P1 | Regression |
| TC-027 | TS-009 | Logged in | Add one item from inventory | Button changes to Remove; cart badge increments to 1 | P0 | Smoke |
| TC-028 | TS-009 | Logged in | Add multiple distinct items | Cart badge matches number of added items | P0 | Smoke |
| TC-029 | TS-010 | Logged in with items added | Remove one item from inventory | Cart badge decrements; item removed from cart | P0 | Smoke |
| TC-030 | TS-011 | Logged in | Add to cart from details page | Cart badge increments; button changes to Remove | P1 | Regression |
| TC-031 | TS-011 | Logged in with item added | Remove from details page | Cart badge decrements; item removed | P1 | Regression |
| TC-032 | TS-009 | Logged in | Add same item twice (if possible) | No duplicates; state remains consistent | P2 | Negative |
| TC-033 | TS-006 | Logged in | Validate cart icon visible and clickable | Opens cart page | P0 | Smoke |
| TC-080 | TS-010 | Logged in with 1 item | Remove the last remaining item | Cart badge disappears; cart becomes empty | P0 | Smoke |
| TC-081 | TS-009 | Logged in | Add all products (6 items) | Badge shows 6; all buttons show Remove | P1 | Regression |
| TC-082 | TS-007 | Logged in | Change sort then refresh inventory page | Sort persists or resets consistently | P3 | Regression |

### Cart (TS-012 … TS-014)

| TC ID | Scenario | Preconditions | Steps | Expected Result | Priority | Type |
|---|---|---|---|---|---|---|
| TC-034 | TS-012 | Logged in with 1+ items | Open cart | Cart shows added items with correct fields | P0 | Smoke |
| TC-035 | TS-012 | Logged in with 1+ items | Refresh cart page | Items persist | P1 | Regression |
| TC-036 | TS-013 | Cart has items | Remove an item in cart | Item removed; badge updates | P0 | Smoke |
| TC-037 | TS-013 | Cart has items | Click Continue Shopping | Returns to inventory | P1 | Regression |
| TC-038 | TS-014 | No items | Verify cart badge not displayed | No badge shown | P1 | Regression |
| TC-039 | TS-014 | Add 2 items | Verify badge shows 2 everywhere | Badge consistent across pages | P1 | Regression |
| TC-040 | TS-012 | Cart has items | Verify quantity column values | Quantity correct (typically 1 per item) | P2 | Regression |
| TC-083 | TS-012 | Cart has items | Validate item name/price match inventory source | Cart details match selected products | P1 | Regression |
| TC-084 | TS-013 | Cart has multiple items | Remove items until cart is empty | Cart empty state correct; badge removed | P1 | Regression |

### Checkout (TS-015 … TS-018)

| TC ID | Scenario | Preconditions | Steps | Expected Result | Priority | Type |
|---|---|---|---|---|---|---|
| TC-041 | TS-015 | Cart has items | Click Checkout | Navigates to checkout information page | P0 | Smoke |
| TC-042 | TS-015 | On checkout info | Submit with all fields empty | Validation error shown | P0 | Smoke/Negative |
| TC-043 | TS-015 | On checkout info | Fill First Name only; submit | Validation error for remaining fields | P1 | Negative |
| TC-044 | TS-015 | On checkout info | Fill Last Name only; submit | Validation error for remaining fields | P1 | Negative |
| TC-045 | TS-015 | On checkout info | Fill Postal Code only; submit | Validation error for remaining fields | P1 | Negative |
| TC-046 | TS-015 | On checkout info | Fill all fields valid; Continue | Navigates to overview page | P0 | Smoke |
| TC-047 | TS-018 | On checkout info | Click Cancel | Returns to cart page | P1 | Regression |
| TC-048 | TS-016 | On overview | Verify items list matches cart | Items and prices consistent | P0 | Smoke |
| TC-049 | TS-016 | On overview | Verify item total equals sum of item prices | Correct subtotal | P1 | Regression |
| TC-050 | TS-016 | On overview | Verify tax displayed and total = subtotal + tax | Correct total calculation | P1 | Regression |
| TC-051 | TS-018 | On overview | Click Cancel | Returns to inventory page | P1 | Regression |
| TC-052 | TS-017 | On overview | Click Finish | Checkout complete page displayed | P0 | Smoke |
| TC-053 | TS-017 | On complete page | Click Back Home | Returns to inventory; cart cleared | P0 | Smoke |
| TC-054 | TS-017 | Completed order | Open cart | Cart is empty | P1 | Regression |
| TC-055 | TS-015 | Cart empty | Attempt checkout (if button present) | Prevented or handled gracefully | P2 | Negative |
| TC-085 | TS-017 | On complete page | Validate completion header/message content | Shows successful order message | P1 | Regression |
| TC-086 | TS-015 | On checkout info | Use special characters in name fields; submit | Handled gracefully (accepted/rejected consistently) | P3 | Negative |
| TC-087 | TS-015 | On checkout info | Use invalid postal code format; submit | Handled gracefully (accepted/rejected consistently) | P3 | Negative |
| TC-088 | TS-016 | Overview with 2+ items | Verify overview lists all items with correct totals | Matches cart and totals are consistent | P1 | Regression |

### Navigation / UI (TS-019 … TS-021)

| TC ID | Scenario | Preconditions | Steps | Expected Result | Priority | Type |
|---|---|---|---|---|---|---|
| TC-056 | TS-019 | Logged in | Open menu | Menu opens and shows expected items | P1 | Regression |
| TC-057 | TS-019 | Logged in | Menu → All Items | Navigates to inventory | P1 | Regression |
| TC-058 | TS-019 | Logged in | Menu → About | Navigates to About destination (external) | P2 | Regression |
| TC-059 | TS-019 | Logged in with cart items | Menu → Reset App State | Cart clears; button states reset | P1 | Regression |
| TC-060 | TS-020 | Logged out | Visit cart URL directly | Redirects to login | P1 | Negative |
| TC-061 | TS-020 | Logged out | Visit checkout URL directly | Redirects to login | P1 | Negative |
| TC-062 | TS-021 | Logged in | Verify footer visible and links (if present) | Footer renders without overlap | P3 | Regression |
| TC-063 | TS-021 | Logged in | Verify page does not show console errors in normal flow | No obvious UI error indicators | P2 | Regression |

#### Footer / social add-ons (TS-027)

| TC ID | Scenario | Preconditions | Steps | Expected Result | Priority | Type |
|---|---|---|---|---|---|---|
| TC-089 | TS-027 | Logged in | Verify footer social links are visible (if present) | Links render correctly (not overlapped) | P3 | Regression |
| TC-090 | TS-027 | Logged in | Click each social link | Opens correct destination in new tab/window | P3 | Regression |
| TC-091 | TS-019 | Logged in | Open menu then close it (X button / overlay) | Menu closes and page is usable | P2 | Regression |
| TC-092 | TS-019 | Logged in with items | Menu → Reset App State then verify cart badge | Badge cleared and inventory buttons reset | P1 | Regression |

### Non-functional (TS-022 … TS-025)

| TC ID | Scenario | Preconditions | Steps | Expected Result | Priority | Type |
|---|---|---|---|---|---|---|
| TC-064 | TS-022 | Logged in | Measure inventory load time under `performance_glitch_user` | Load time within agreed baseline | P2 | Performance |
| TC-065 | TS-022 | Logged in | Add/remove items quickly (10 cycles) | UI remains stable; no freezes | P2 | Performance |
| TC-066 | TS-023 | Logged out | Keyboard-only login (Tab/Enter) | Operable without mouse | P2 | A11y |
| TC-067 | TS-023 | Logged in | Keyboard-only add to cart and checkout | Operable without mouse | P2 | A11y |
| TC-068 | TS-023 | Any | Check basic color contrast for primary text/buttons | Meets minimal readability | P3 | A11y |
| TC-069 | TS-024 | Any | Verify password not echoed in UI or URL | No password leakage | P1 | Security |
| TC-070 | TS-024 | Any | Verify app does not store credentials in localStorage (spot check) | No plain credential storage | P2 | Security |
| TC-071 | TS-024 | Logged in | Ensure logout invalidates protected routes | Protected pages not accessible after logout | P1 | Security |
| TC-072 | TS-025 | Any | Run smoke on Chromium | Pass | P0 | Compatibility |
| TC-073 | TS-025 | Any | Run smoke on Firefox | Pass | P1 | Compatibility |
| TC-074 | TS-025 | Any | Run smoke on WebKit | Pass | P1 | Compatibility |
| TC-075 | TS-025 | Any | Run smoke on mobile viewport (e.g., 375×667) | Layout usable; no blocked actions | P2 | Compatibility |

---

## Additional Scenario Ideas (expand coverage)
- Error boundary behavior when network is slow/intermittent.
- Visual regressions (screenshots) for inventory and checkout pages.
- Localization readiness (if app later adds languages).
- Analytics/telemetry events (if implemented).

## Coverage Check (Answer to “is all test covered?”)
- Core functional areas are covered: login, inventory, cart, checkout, navigation, and key negative paths.
- Not 100% exhaustive (no suite ever is). The add-on cases above close the most common remaining gaps: password masking/Enter submit, menu close behavior, reset-state verification, empty-cart edge, multi-item totals, and footer links.
