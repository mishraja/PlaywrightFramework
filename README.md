# Swag Labs (SauceDemo) Playwright Automation Framework

A robust, maintainable, and scalable test automation framework for [Swag Labs](https://www.saucedemo.com/), built with **Playwright** and **TypeScript**.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
npm install
npx playwright install chromium
```

### Running Tests

**Run all tests:**
```bash
npm test
```

**Run regression suite:**
```bash
npm run test:regression
```

**Run smoke tests:**
```bash
npm run test:smoke
```

**Run API tests:**
```bash
npm run test:api
```

**Run mobile smoke tests (Android & iOS):**
```bash
npm run test:smoke:mobile
```

**Run in UI mode:**
```bash
npm run test:ui
```

**Generate Allure Report:**
> **Note:** To preserve history, each test run creates a unique timestamped folder in `allure-results/` (e.g., `allure-results/run-2026-02-25_01-50-46`).

1. **Locate the latest run folder:**
   Check the `allure-results/` directory for the most recent timestamped folder.

2. **Generate and Open the Report:**
   Replace `<timestamp-folder>` with the actual folder name (e.g., `run-2026-02-25_01-50-46`).

```bash
# Generate the report
npx allure generate ./allure-results/<timestamp-folder> -o ./allure-report --clean

# Open the report in your browser
npx allure open ./allure-report
```

---

## 🏗️ Project Structure

```
src/
├── config/           # Configuration files (env, playwright config)
├── fixtures/         # Test fixtures and test data
├── pages/            # Page Objects (POM)
├── tests/            # Test specs
│   ├── api/          # API test suite
│   ├── regression/   # Regression test suite
│   └── smoke/        # Smoke test suite
└── utils/            # Shared utilities (Wait, Logger, API, etc.)
```

---

## �️ Utility Library

The framework includes a comprehensive set of utilities in `src/utils/` to streamline test development:

| Utility | Description |
| :--- | :--- |
| **ApiHelper** | Axios wrapper for API testing with logging interceptors. |
| **AssertUtil** | Custom assertions wrapping Playwright's `expect`. |
| **BrowserFactory** | Factory for managing Browser, Context, and Page instances. |
| **ConfigManager** | Centralized configuration and environment variable management. |
| **DataFactory** | Generates random test data (strings, emails, numbers). |
| **DateUtil** | Date and time manipulation using `dayjs`. |
| **DBUtil** | Placeholder for database connection and query execution. |
| **FileUtil** | File system operations (read/write JSON, check existence). |
| **Logger** | Standardized logging (Console & File) using `winston`. |
| **NotificationUtil** | Integrations for Slack and Microsoft Teams notifications. |
| **PerformanceUtil** | Measures execution time and captures Navigation Timing metrics. |
| **RetryHelper** | Configurable retry logic for flaky operations. |
| **ScreenshotUtil** | Captures full-page and element-specific screenshots. |
| **WaitUtils** | Enhanced wait mechanisms (visible, hidden, URL, etc.). |

---

## 📱 Mobile Testing

The framework supports mobile viewports using Playwright's device emulation.

**Supported Configurations:**
- **Mobile Chrome** (Pixel 5 emulation)
- **Mobile Safari** (iPhone 12 emulation)

**Run Mobile Tests:**
```bash
# Run smoke tests on both Android and iOS
npm run test:smoke:mobile

# Run smoke tests on Android only
npm run test:smoke:android

# Run smoke tests on iOS only
npm run test:smoke:ios
```

---

## �🛡️ Framework Features & Best Practices

### 1️⃣4️⃣ Security & Secrets Handling
- **Never hardcode:** Passwords, Tokens, API keys.
- **Use:**
  - **Environment variables**: Support for `.env` files (locally) and CI env vars.
  - **GitHub Secrets**: Configured in `.github/workflows/playwright.yml` to inject `SWAG_PASSWORD` and `SWAG_USERNAME`.
  - **Azure Key Vault**: Architecture supports dynamic secret retrieval (see `src/config/environments.ts` for integration points).
- **Implementation Details:**
  - `swag.credentials.json` is git-ignored.
  - `swag.credentials.example.json` provided as a template.
  - `src/config/environments.ts` prioritizes environment variables over local files.

### 1️⃣5️⃣ Performance & Optimization
- **Execution Strategy:**
  - Run **smoke tests** first (Fail Fast).
  - Run **full regression** nightly.
- **Optimization:**
  - Remove duplicate validations.
  - Keep tests atomic and independent.
  - Use **Parallel Execution** to reduce total run time.

### 🚀 Advanced Architecture (Senior Level)
- **Design Principles:**
  - **Test Tagging System**: `@smoke`, `@regression` tags for granular execution control.
  - **Smart Test Selection**: Run tests based on changed modules (future enhancement).
- **Integrations:**
  - SonarQube for code quality.
  - Slack notifications for test results.
  - Test management tools (Jira/Xray).

### 1️⃣1️⃣ Exception Handling & Stability
- **Resilience:**
  - **Retry on flaky test**: Configured in `playwright.config.ts`.
  - **Auto screenshot on failure**: Captured automatically.
  - **Auto video recording**: Retained on failure for debugging.
  - **Soft assertion support**: Use `expect.soft()` where applicable.

### 9️⃣ Parallel Execution Strategy
- **Thread Safety:**
  - Designed for fully parallel execution.
  - **Independent Test Data**: Each test uses isolated data/fixtures.
  - **No Static Driver**: Playwright's `page` fixture ensures isolation.
  - Avoid shared global variables to prevent race conditions.

### 8️⃣ CI/CD & DevOps Integration
- **Pipeline Ready (Azure/Jenkins):**
  - Run **headless** by default.
  - Support **parallel execution** (workers configured via CI env var).
  - Support **tag-based execution** (grep).
  - Generate artifacts (traces, videos, screenshots, reports).
  - **Fail Fast** strategy implemented.

### 7️⃣ Reporting & Logging
- **Reports:**
  - **Playwright HTML Report**: Native, detailed report.
  - **Allure Report**: Rich, historical trend analysis.
- **Logging:**
  - Capture test start/end.
  - Step execution tracking.
  - Failure logs with screenshots and videos.

---

## 🐳 CI/CD & Docker

This framework is ready for Continuous Integration and Containerized execution.

### GitHub Actions
A workflow is configured in `.github/workflows/playwright.yml` to run tests on every push and pull request.
- **Triggers**: Push/PR to `main` or `master`.
- **Steps**: Install deps, run regression tests, generate Allure report.
- **Artifacts**: Playwright HTML report and Allure report are uploaded for review.

### Docker Execution
Run tests in a consistent containerized environment using the provided `Dockerfile`.

**1. Build the Docker Image:**
```bash
docker build -t playwright-tests .
```

**2. Run Tests in Container:**
```bash
docker run --rm -it playwright-tests
```

**3. Run Specific Suite (e.g., Smoke):**
```bash
docker run --rm -it playwright-tests npm run test:smoke
```

---

## 📝 Test Scenarios
Detailed test scenarios and cases are documented in [TEST_SCENARIOS_AND_CASES_SwagLabs.md](./TEST_SCENARIOS_AND_CASES_SwagLabs.md).
