# MediCare — accessible pharmacy catalogue demo

[![Quality checks](https://github.com/kavita355321/medicare-website/actions/workflows/quality.yml/badge.svg)](https://github.com/kavita355321/medicare-website/actions/workflows/quality.yml)

MediCare is a responsive front-end case study that explores how an everyday health catalogue can be clear, inclusive and responsible. It replaces risky account and checkout simulations with an honest portfolio demo: visitors can search and filter products, manage a local basket and try an accessible form without sending personal information anywhere.

> **Important:** This is a fictional portfolio project. It is not a real pharmacy, does not provide medical advice and does not process prescriptions, accounts, payments or orders.

## Why I rebuilt it

The first version proved the core idea but used duplicated page-load handlers, hard-coded credentials, inconsistent cart logic and multiple pages with repeated markup. The rebuild focuses on maintainability, privacy and a more credible user experience.

## Features

- Responsive single-page interface for mobile, tablet and desktop
- Live product search and category filters
- Demo basket with quantity controls and `localStorage` persistence
- DOM-safe rendering with `textContent` instead of injecting catalogue content as HTML
- Semantic landmarks, skip link, visible focus states and keyboard-friendly controls
- Native accessible modal using the HTML `dialog` element
- Reduced-motion support and helpful live regions for dynamic updates
- Contact-form validation that explicitly sends and stores nothing
- Automated unit tests with Node's built-in test runner
- GitHub Actions checks on every push and pull request

## Technical decisions

| Decision | Reason |
|---|---|
| Vanilla HTML, CSS and JavaScript | Demonstrates browser fundamentals without a framework |
| Pure catalogue and basket functions | Makes business logic predictable and independently testable |
| `localStorage` for the basket only | Provides persistence without an account or backend |
| No external fonts, analytics or APIs | Keeps the demo fast and privacy-friendly |
| No login or checkout | Avoids pretending that sensitive health, identity or payment data is securely processed |

## Project structure

```text
.
├── .github/workflows/quality.yml
├── css/styles.css
├── js/
│   ├── app.js
│   └── catalog.js
├── tests/catalog.test.js
├── .gitignore
├── index.html
├── LICENSE
├── package-lock.json
├── package.json
└── README.md
```

## Run locally

The page can be opened directly, but a local server is recommended because the JavaScript uses ES modules.

```bash
git clone https://github.com/kavita355321/medicare-website.git
cd medicare-website
npx serve .
```

Then open the local URL shown in your terminal.

## Run the tests

Node.js 20 or newer is required.

```bash
npm ci
npm test
```

## What I learned

- Separating DOM code from pure business logic makes a small project easier to test.
- Responsible product design includes being explicit about what a demo cannot do.
- Accessibility works best when it is part of the HTML and interaction design from the start.
- A focused single-page flow can be clearer than repeating navigation and scripts across many pages.

## Future improvements

- Add browser-level accessibility tests with axe-core
- Add visual regression coverage for key breakpoints
- Connect a consent-based backend only after defining real authentication, privacy and security requirements

## Author

Built by [Kavita](https://github.com/kavita355321) as a front-end portfolio project.

