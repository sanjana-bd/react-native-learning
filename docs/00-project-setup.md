# Project Setup & Architecture

A complete guide to how this project is configured from scratch, combining **Expo**, **Expo Router**, **TypeScript**, and **NativeWind v5 (Tailwind CSS v4)**.

---

## 1. Tech Stack Overview

- **Expo (SDK 57):** The modern application framework for React Native that handles native compilation, bundling, and developer tooling.
- **Expo Router:** A file-based routing system built on top of React Navigation. Every file inside `src/app/` automatically maps to a screen route.
- **React 19 & React Native 0.86:** The underlying UI and native runtime libraries.
- **NativeWind v5 (RC) & Tailwind CSS v4:** A compile-time and runtime bridge that enables utility-first styling (`className="..."`) in React Native using the `react-native-css` engine.
- **TypeScript:** Strict type checking with custom path aliases (`@/*`).

---

## 2. Directory Structure Anatomy

```text
├── assets/                  # Static assets (images, icons, fonts)
├── docs/                    # Learning, architecture, and revision notes
├── src/
│   └── app/                 # Expo Router root directory
│       ├── _layout.tsx      # Root layout (wraps all screens, imports global CSS)
│       └── index.tsx        # Home screen (maps to '/')
├── global.css               # Global Tailwind CSS definitions & themes
├── metro.config.js          # Metro bundler config wrapped with NativeWind
├── nativewind-env.d.ts      # TypeScript definitions for NativeWind className props
├── postcss.config.mjs       # PostCSS configuration for Tailwind v4
├── tsconfig.json            # TypeScript settings, path aliases, exclusions
├── app.json                 # Expo app configuration (name, slug, splash, icon)
└── package.json             # Project dependencies and npm scripts
```

---

## 3. Configuration Files Breakdown

### A. `app.json`
The central manifest for Expo.
- Configures app identity: `name`, `slug`, `version`, `scheme`.
- Defines platform-specific native behaviors for iOS, Android, and Web without touching native code (`ios/` or `android/` folders).

### B. `metro.config.js`
Metro is the JavaScript bundler for React Native (similar to Vite or Webpack on the web).
- **Purpose with NativeWind:** Intercepts CSS files and transforms Tailwind utility classes into React Native style objects.
- **Configuration:**
  ```javascript
  const { getDefaultConfig } = require("expo/metro-config");
  const { withNativewind } = require("nativewind/metro");

  const config = getDefaultConfig(__dirname);

  module.exports = withNativewind(config);
  ```

### C. `postcss.config.mjs`
Tailwind CSS v4 uses `@tailwindcss/postcss` to compile modern CSS syntax:
```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

### D. `global.css`
Located at the root of the project. Contains the Tailwind v4 layers and NativeWind theme bridge:
```css
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css";

@import "nativewind/theme";
```

### E. `nativewind-env.d.ts`
TypeScript declaration file that tells TypeScript that React Native components (`<View>`, `<Text>`, etc.) accept the `className` prop:
```typescript
/// <reference types="react-native-css/types" />
```

### F. `tsconfig.json`
Configures TypeScript and path resolution:
- **`paths: { "@/*": ["./src/*"] }`**: Allows importing internal modules with clean shortcuts like `import { MyComponent } from '@/components/MyComponent'`.
- **`exclude: ["node_modules", "example"]`**: Prevents the TypeScript compiler from checking template archive folders.

---

## 4. Expo Router Conventions

1. **File-based routing:**
   - Any file placed in `src/app/` becomes a route.
   - `src/app/index.tsx` renders at `/`.
   - `src/app/profile.tsx` renders at `/profile`.
2. **Root Layout (`_layout.tsx`):**
   - The top-level component that wraps every screen in the app.
   - It is the **only place** where `global.css` should be imported:
     ```tsx
     import '../../global.css'; // Navigates from src/app/ to project root
     import { Stack } from 'expo-router';

     export default function RootLayout() {
       return <Stack />;
     }
     ```
   - Never re-import `global.css` in individual screens like `index.tsx`.

---

## 5. Critical Setup Lessons & Troubleshooting

### Lesson 1: Package alignment between Tailwind v4 and NativeWind
- **Issue:** `Error: Cannot find module 'nativewind/metro'`
- **Why it occurred:** Tailwind CSS v4 was installed, but `nativewind` and its engine `react-native-css` were not present in `package.json` / `node_modules`.
- **Takeaway:** NativeWind v4 only supports Tailwind v3. For Tailwind CSS v4, you must use NativeWind v5 (`nativewind@^5.0.0-rc.0` and `react-native-css@^3.1.0-rc.0`).

### Lesson 2: Path alias resolution vs File location
- **Issue:** `Unable to resolve module @/global.css`
- **Why it occurred:** The `@/*` path alias was configured in `tsconfig.json` to point to `./src/*`. When importing `@/global.css`, Metro looked in `src/global.css`, but `global.css` was at the project root (`./global.css`).
- **Takeaway:** From inside `src/app/_layout.tsx`, use the relative path `import '../../global.css'` to reach the root file.

### Lesson 3: Template folders breaking TypeScript checks
- **Issue:** `tsc --noEmit` throwing 30+ missing module errors in `example/`.
- **Why it occurred:** Expo templates store previous starter code in an `example/` folder when reset. TypeScript was scanning every file matching `**/*.ts`.
- **Takeaway:** Add `"example"` to the `exclude` array in `tsconfig.json`.

### Lesson 4: Path aliases (`@assets` vs `@/assets`) and image imports
- **Issue:** `Cannot find module '@assets/home.png' or its corresponding type declarations`.
- **Why it occurred:** 
  1. `tsconfig.json` had `"@/assets/*"` (with slash), but the import was `@assets/...` (without slash).
  2. The wildcard mapping on `"@/*": ["."]` lacked a matching `*` on the right side.
  3. TypeScript requires ambient module declarations (`declare module "*.png"`) to import image files as ES modules.
- **Takeaway:** Configure both `@assets/*` and `@/assets/*` in `tsconfig.json` paths, and include an `icons.d.ts` (or `declarations.d.ts`) declaring image modules.

### Lesson 5: Keep non-route files outside `src/app/`
- **Issue:** Placing files like `constants/icons.ts` or `components/` inside `src/app/`.
- **Why it occurred:** Expo Router treats every file in `src/app/` as a navigable screen route.
- **Takeaway:** Place non-route files (constants, components, hooks, utils) in `src/constants/`, `src/components/`, etc., outside of `src/app/`.

---

## 6. Essential Commands for Daily Workflow

| Task | Command | Description |
| :--- | :--- | :--- |
| **Start Bundler** | `npx expo start` | Starts Metro bundler server |
| **Clear Cache & Start** | `npx expo start -c` | Essential whenever changing `metro.config.js`, Tailwind, or Babel |
| **Type Check** | `npx tsc --noEmit` | Validates TypeScript types across the project |
| **Lint** | `npx expo lint` | Runs project ESLint checks |
| **Check Dependencies** | `npx expo-doctor` | Validates version compatibility across Expo packages |

