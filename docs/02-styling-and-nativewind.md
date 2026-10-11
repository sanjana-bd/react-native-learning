# Styling & NativeWind (Tailwind CSS)

In React Native, styling can be done either using the built-in `StyleSheet` API or via **NativeWind**, which brings Tailwind CSS utility classes to React Native.

---

## 1. Traditional React Native Styling (`StyleSheet`)

### How it works
React Native does not use standard CSS files or the CSS cascade. Instead, styles are JavaScript objects created using `StyleSheet.create`.

```tsx
import { StyleSheet, Text, View } from 'react-native';

export default function MyComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});
```

### Key Differences from Web CSS
- **CamelCase properties:** `background-color` becomes `backgroundColor`, `font-size` becomes `fontSize`.
- **Unitless numbers:** Values like `fontSize: 16` or `padding: 12` are density-independent pixels (dp), not `px` or `rem`.
- **No Cascading:** Styles do not automatically inherit from parent views to child views (except nested `<Text>` inside `<Text>`).
- **Flexbox by default:** Every `View` is `display: flex` and `flexDirection: column`.

---

## 2. NativeWind (Tailwind CSS in React Native)

### What is NativeWind?
NativeWind acts as a compiler that takes Tailwind CSS classes (like `className="flex-1 items-center justify-center bg-white"`) and converts them into optimized React Native style objects at build-time and runtime.

### Project Architecture & Setup (Tailwind v4 / NativeWind v5)
NativeWind v5 uses the modern CSS engine `react-native-css` and Tailwind CSS v4.

#### Core Dependencies
- `nativewind`: The core bridge for React Native components and `className` support.
- `react-native-css`: The CSS compiler engine used by NativeWind v5.
- `tailwindcss` & `@tailwindcss/postcss`: Tailwind v4 packages.
- `lightningcss`: Fast CSS parser and transformer.

#### Configuration Files

1. **`metro.config.js`**
   Wraps the default Expo Metro bundler configuration with `withNativewind`:
   ```javascript
   const { getDefaultConfig } = require("expo/metro-config");
   const { withNativewind } = require("nativewind/metro");

   const config = getDefaultConfig(__dirname);

   module.exports = withNativewind(config);
   ```

2. **`global.css`**
   Imports Tailwind layers and NativeWind theme:
   ```css
   @import "tailwindcss/theme.css" layer(theme);
   @import "tailwindcss/preflight.css" layer(base);
   @import "tailwindcss/utilities.css";

   @import "nativewind/theme";
   ```

3. **`nativewind-env.d.ts`**
   Provides TypeScript type definitions so that JSX elements recognize the `className` prop without type errors:
   ```typescript
   /// <reference types="react-native-css/types" />
   ```

4. **Root Layout Import (`src/app/_layout.tsx`)**
   Loads the CSS file once when the app starts:
   ```tsx
   import '../../global.css';
   ```

---

## 3. Practical Usage Example

```tsx
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to NativeWind!
      </Text>
    </View>
  );
}
```

### Common Tailwind to React Native Mappings

| Tailwind Class | React Native Style | Description |
| :--- | :--- | :--- |
| `flex-1` | `flex: 1` | Expand to fill parent container |
| `items-center` | `alignItems: 'center'` | Center items along cross axis |
| `justify-center` | `justifyContent: 'center'` | Center items along main axis |
| `bg-white` | `backgroundColor: '#ffffff'` | Set background color |
| `text-xl` | `fontSize: 20`, `lineHeight: 28` | Text size |
| `font-bold` | `fontWeight: 'bold'` | Bold weight |
| `p-4` | `padding: 16` | Uniform padding (4 × 4dp) |

---

## 4. Common Troubleshooting & Gotchas

1. **`Cannot find module 'nativewind/metro'`**:
   - **Cause:** `metro.config.js` calls `require("nativewind/metro")`, but `nativewind` and `react-native-css` are not installed in `node_modules` / `package.json`.
   - **Fix:** Install `nativewind` and `react-native-css` matching your Tailwind version.

2. **`Unable to resolve module @/global.css`**:
   - **Cause:** In `tsconfig.json`, the `@/*` alias maps to `./src/*`, but `global.css` is located at the project root (`./global.css`). Also, `global.css` should not be imported in individual screens.
   - **Fix:** Import it once in `src/app/_layout.tsx` using the relative path `import '../../global.css';`, and remove any `global.css` imports from screens like `index.tsx`.

3. **TypeScript complains about `className` property**:
   - **Cause:** Missing `nativewind-env.d.ts` or `nativewind-env.d.ts` not included in `tsconfig.json`.
   - **Fix:** Add `nativewind-env.d.ts` to the `"include"` array in `tsconfig.json`.

4. **Metro Cache issues after config change**:
   - If styles do not reflect or bundler acts weird after config edits, reset Metro cache with:
     ```bash
     npx expo start -c
     ```

