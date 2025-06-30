Prerequisites
Node.js ≥18 LTS (≥20 is recommended for Playwright v1.46).
 bash

Example with nvm
nvm install --lts
nvm use --lts


A Git client (for the optional GitHub Actions workflow).


macOS / Linux / Windows 10 2004+ with WSL 2 (Docker-only steps).

How to clone and initialize a Git repository (from remote).

✅ Option 1: Clone an existing remote Git repository
bash

git clone https://github.com/username/repository-name.git
cd repository-name

This downloads the repository and moves you into the project folder.

How to install and run the Playwright + TypeScript automation testing framework.

✅ Step 1: Initialize your project
bash

cd my-playwright-tests
npm init playwright@latest

✅ Step 2: Run your first test
bash

npx playwright test

This runs the example test located in tests/example.spec.ts.
To view the report:
bash

npx playwright show-report



✅ Step 3: Run tests with options
Run in headed mode (see the browser):

 bash

npx playwright test --headed

Run a specific test by name:

 bash

npx playwright test --grep "check title"


✅ Done!
You’ve now:
Installed Playwright with TypeScript


Created and run your own test


Viewed results in a visual report
