# Railway Playwright E2E Testing Project

This project provides end-to-end (E2E) automated tests for a railway booking web application using [Playwright](https://playwright.dev/) and TypeScript.

## Features
- Page Object Model (POM) structure for maintainable tests
- Environment configuration via `.env` file
- Test data and credentials externalized (no hardcoding)
- Supports multiple environments (dev, staging, prod)
- Playwright HTML reports and video/screenshot capture on failure

## Project Structure
```
config/           # Environment and config files
fixtures/         # Custom Playwright fixtures (e.g., login)
pages/            # Page Object Model classes
playwright.config.ts # Playwright configuration
playwright-report/   # Playwright HTML reports (auto-generated)
test-results/        # Playwright test results (auto-generated)
tests/            # Test specs
utils/            # Utility functions and test data
.env              # Environment variables (not committed)
```

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the project root:
```
TEST_BASE_URL=http://www.saferailway.somee.com
TEST_USERNAME=your_username
TEST_PASSWORD=your_password
```

### 3. Run Tests
```bash
npx playwright test
```

#### Run a specific test file
```bash
npx playwright test tests/timetable-to-booking.test.ts
```

### 4. View HTML Report
After running tests:
```bash
npx playwright show-report
```

## Best Practices
- **No hardcoded URLs or credentials:** Use `ENV` from `config/env.ts` and `.env` file.
- **No hardcoded selectors:** Use Page Object Model classes in `pages/`.
- **No hardcoded test data:** Store in `utils/` or external files (e.g., JSON).
- **Support multiple environments:** Set `TEST_ENV` in `.env` or via CLI.

## Example Test
```typescript
import { test, expect } from '../fixtures/baseTest';
import { HomePage } from '../pages/HomePage';

test('User can login', async ({ page, loginAsUser }) => {
  await loginAsUser();
  // Add assertions here
});
```

## Contributing
1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a new Pull Request

## License
MIT

## Allure Report Integration

This project supports Allure reporting for Playwright tests.

### Local Usage

1. Run your tests:
   ```bash
   npx playwright test
   ```
2. Generate the Allure HTML report:
   ```bash
   npx allure generate allure-results --clean -o allure-report
   ```
3. Open the Allure report in your browser:
   ```bash
   npx allure open allure-report
   ```

### GitHub Actions CI
- Allure results and HTML reports are automatically generated and uploaded as artifacts on every push and pull request to `main`.
- Download the `allure-report` artifact from the Actions run summary to view the report.

### Prerequisites
- Allure CLI must be installed locally to generate and view reports. Install it with:
  ```bash
  npm install -g allure-commandline --save-dev
  ```

## Allure CLI Local Installation (Recommended)

If you see an error like `allure: not found` or permission errors when running Allure scripts, install Allure CLI as a dev dependency (not globally):

```bash
npm install --save-dev allure-commandline
```

Your `package.json` scripts are already set up to use the local binary via `npx`:

```json
"scripts": {
  "test": "playwright test",
  "allure:generate": "npx allure generate allure-results --clean -o allure-report",
  "allure:open": "npx allure open allure-report"
}
```

Now you can run:

```bash
npm run allure:generate
npm run allure:open
```

No global install or sudo required!
