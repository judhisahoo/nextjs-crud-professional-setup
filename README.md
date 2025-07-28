Fantastic! Since your ESLint is now working fine, here is the **final step-by-step complete setup** — clean and stable — for your:

> ✅ **Next.js 15 App Router** + **TypeScript** + **Material UI**
> ✅ **ESLint 8** + **Prettier** + **Husky + Lint-Staged**
> ✅ **Jest + RTL**
> ✅ Fully working `npm run dev`, `npm run lint`, `npm run test`, `git commit`

---

## ✅ FINAL SETUP GUIDE

---

### ✅ 1. Create Next.js App

```bash
npx create-next-app@latest nextjs-crud-app --typescript
cd nextjs-crud-app
```

✅ Select:

- App Router ✅
- TypeScript ✅
- ESLint ✅
- Prettier ✅
- Tailwind ❌ (skip it)

---

### ✅ 2. Install Material UI (with Next.js support)

```bash
npm install @mui/material @mui/material-nextjs @emotion/react @emotion/styled @emotion/cache
```

---

### ✅ 3. Create `ThemeRegistry.tsx`

#### 📄 `src/app/ThemeRegistry.tsx`

```tsx
'use client';

import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
```

---

### ✅ 4. Wrap it in `layout.tsx`

#### 📄 `src/app/layout.tsx`

```tsx
import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import ThemeRegistry from './ThemeRegistry';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata = {
  title: 'Next.js CRUD App',
  description: 'Professional setup',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
```

---

### ✅ 5. Install ESLint + Prettier Setup

```bash
npm install --save-dev eslint@8 @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier prettier
```

---

### ✅ 6. Create ESLint Config

#### 📄 `.eslintrc.json`

```json
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": ["next/core-web-vitals", "plugin:@typescript-eslint/recommended", "prettier"],
  "ignorePatterns": [".next/", "node_modules/", "dist/", "coverage/"],
  "rules": {
    "@typescript-eslint/no-unused-vars": ["error"],
    "react/react-in-jsx-scope": "off"
  }
}
```

##### removed "eslint.config.mjs" file from root if exists

---

### ✅ 7. Create Prettier Config

#### 📄 `.prettierrc`

```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "all"
}
```

---

### ✅ 8. Add Scripts in `package.json`

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint . --ext .ts,.tsx,.js,.jsx",
  "format": "prettier --write .",
  "test": "jest",
  "prepare": "husky"
}
```

---

### ✅ 9. Set Up Husky + Lint-Staged

```bash
npx husky-init && npm install
```

#### 📄 `.husky/pre-commit`

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

#### Add to `package.json`

```json
"lint-staged": {
  "*.{ts,tsx,js,jsx}": [
    "prettier --write",
    "eslint --fix"
  ]
}
```

---

### ✅ 10. Install Jest + Testing Library

```bash
npm install --save-dev jest @types/jest ts-jest \
  @testing-library/react @testing-library/jest-dom @testing-library/user-event \
  jest-environment-jsdom ts-node
```

#### 📄 `jest.config.js`

```js
const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
```

#### 📄 `jest.setup.ts`

```ts
import '@testing-library/jest-dom';
```

---

### ✅ 11. (Optional) Remove conflicting lockfile warning

```bash
rm ../package-lock.json
```

---

### ✅ ✅ You’re Done! Test the Setup

| Command          | Purpose                          |
| ---------------- | -------------------------------- |
| `npm run dev`    | Start development server         |
| `npm run lint`   | Run ESLint                       |
| `npm run format` | Run Prettier                     |
| `npm run test`   | Run Jest tests                   |
| `git commit`     | Triggers Prettier + Lint (Husky) |

---

Would you like me to now generate the **CRUD UI (Table + Dialog + Form)** using Material UI with mock data?
