# AQA InForce - Andrii Kerechun

This project implements end-to-end (E2E) testing for a web application using Playwright and TypeScript. It covers UI automation for booking flows and API automation for room management, based on the provided test task. The codebase emphasizes maintainability, readability, and performance, following modern TypeScript practices and leveraging Playwright's capabilities for browser automation.

## Setup

1. **Prerequisites**:

   - Node.js (version 18 or higher)
   - npm or yarn

2. **Clone the repository**:

```
   git clone https://github.com/your-username/aqa-inforce-andrii-kerechun.git
   cd aqa-inforce-andrii-kerechun
```

3. **Install dependencies**:
   `npm install`

4. **Configure environment**:

- Update `config/env.ts` if needed for custom base URLs or credentials.

## Running Tests

- **Run all tests**:

```
  npx playwright test
```

- **Run specific test file**:
  `npx playwright test adminRooms.spec.ts`
- **Run API tests only** **TEST FAILS: Working on it <3**:
  `npx playwright test tests/api/`
- **Run with UI mode**:
  `npx playwright test --ui`
- **RUN different mode tests**

```
    "test": "npx playwright test",
    "test:headed": "npx playwright test --headed",
    "test:debug": "npx playwright test --debug",
    "test:report": "npx playwright show-report",
    "lint": "npx eslint . --ext .ts"
```

## Local variables in .env

Fill `.env` like in `.env.example`
uYou can choose how many _WORKERS_ will do parralel execution
Envariomental configuration in `config/env.ts`

## Test Cases

Test cases are documented in `test-cases.txt` at the root of the repository. This file includes detailed manual test cases for UI flows such as booking rooms with valid/invalid data and checking unavailable dates.

- **Filename**: `test-cases.txt`
- **Location**: Root directory

The automated tests implement these cases using Playwright, with additional API tests for room CRUD operations.

## Project Structure

```
aqa-inforce-andrii-kerechun/
├── components/
│   └── admin/
│       └── RoomRowComponent.ts    # Component for room rows in admin UI
├── config/
│   └── env.ts                     # Environment configuration (base URL)
├── pages/
│   ├── BasePage.ts                # Base page object class
│   ├── admin/
│   │   ├── AdminBasePage.ts       # Base for admin pages
│   │   ├── AdminLoginPage.ts      # Login page for admin
│   │   └── AdminRoomsPage.ts      # Rooms management page
│   └── client/
│       ├── ClientBasePage.ts      # Base for client pages
│       └── HomePage.ts            # Home page for users
├── tests/
│   ├── admin/
│   │   └── login.spec.ts          # UI test for admin login
│   ├── api/
│   │   ├── adminRooms.spec.ts     # API test for admin rooms
│   │   └── api.spec.ts            # WIP: API tests for room operations
│   └── client/
│       └── login.spec.ts          # UI test for admin login
├── test-cases.txt                 # Manual test cases documentation
├── package.json                   # Dependencies and scripts
├── playwright.config.ts           # Playwright configuration
└── README.md                      # This file
```

## Task Overview

This project fulfills the InForce test task, including:

Part 1: Manual test cases in test-cases.txt for UI booking flows.
Part 2: Automated UI tests for booking and API tests for room management (create, book, edit, delete), with verification across admin and user interfaces. Intercepts are used for API validation.
For questions or feedback, refer to the InForce team guidelines.
