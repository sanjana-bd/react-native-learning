# Navigation with Expo Router

Expo Router brings **file-based routing** to React Native. Every file inside the `src/app/` directory corresponds to a route in the application, similar to Next.js App Router on the web.

---

## 1. File-Based Routing Conventions

### How Files Map to URL Routes

| File Path | Resulting URL Route | Explanation |
| :--- | :--- | :--- |
| `src/app/index.tsx` | `/` | Home / entry route of the application. |
| `src/app/onboarding.tsx` | `/onboarding` | Standard static route. |
| `src/app/tabs/index.tsx` | `/tabs` | The `index.tsx` inside a folder represents that folder's root URL. |
| `src/app/tabs/add-todo.tsx` | `/tabs/add-todo` | Nested static screen inside `/tabs`. |
| `src/app/(todo)/[id].tsx` | `/:id` (e.g. `/123`) | Dynamic route inside a Route Group (group name omitted from URL). |
| `src/app/todo/[id].tsx` | `/todo/:id` (e.g. `/todo/123`) | Dynamic route inside a standard folder (folder name included in URL). |

---

## 2. Navigators & Layout Files (`_layout.tsx`)

A `_layout.tsx` file defines how children within that directory are navigated and presented (e.g., as a Stack or as Bottom Tabs).

### A. Stack Navigator (`<Stack />`)
Provides native card-push transition animations with back-navigation history.

```tsx
// src/app/_layout.tsx
import '../../global.css'; // Imported once in root layout
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Home screen with custom header title */}
      <Stack.Screen name="index" options={{ title: "Welcome" }} />
      
      {/* Hide stack header so bottom tabs don't have double headers */}
      <Stack.Screen name="tabs" options={{ headerShown: false }} />
      
      {/* Hide header for Route Group */}
      <Stack.Screen name="(todo)" options={{ headerShown: false }} />
    </Stack>
  );
}
```

### B. Tab Navigator (`<Tabs />`)
Creates a native bottom tab bar for primary navigation.

```tsx
// src/app/tabs/_layout.tsx
import { Tabs } from "expo-router";
import { Image } from "react-native";
import { icons } from "@/constants/icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2563EB", // Active tab color
        tabBarInactiveTintColor: "#64748B", // Inactive tab color
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={icons.homeIcon}
              style={{ width: 22, height: 22, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add-todo"
        options={{
          title: "Add Todo",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={icons.plusIcon}
              style={{ width: 22, height: 22, tintColor: color }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
```

---

## 3. Route Groups: `(groupName)` vs Standard Folders

Parentheses `()` create a **Route Group**.

### Why Use Route Groups?
1. **Omit Folder from the URL:** Route Groups allow organizing files into logical domains without adding extra segments to the URL path.
2. **Apply Scoped Layouts:** You can wrap a specific subset of screens with their own `_layout.tsx` without changing their public URL.
3. **Prevent Conflicting Navigators:** For example, keeping authentication screens `(auth)/signin.tsx` in a full-screen layout while main screens `(app)/` share bottom tabs.

### Comparative Example

| Folder Structure | Resulting URL Route |
| :--- | :--- |
| `src/app/auth/signin.tsx` | `/auth/signin` |
| `src/app/(auth)/signin.tsx` | `/signin` (group name `(auth)` is excluded) |
| `src/app/todo/[id].tsx` | `/todo/:id` |
| `src/app/(todo)/[id].tsx` | `/:id` |

> [!TIP]
> When navigating to a screen inside a route group with `<Link />` or `router.push`, you use the clean URL:
> ```tsx
> // For src/app/(auth)/signin.tsx:
> <Link href="/signin">Sign In</Link>
> 
> // For src/app/(todo)/[id].tsx:
> <Link href="/123">View Todo #123</Link>
> ```

---

## 4. Dynamic Routes & `useLocalSearchParams`

Dynamic segments capture values from the URL into parameters using square brackets `[paramName].tsx`.

### Reading Parameters
Use the `useLocalSearchParams` hook from `expo-router`:

```tsx
// src/app/(todo)/[id].tsx
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function EditTodo() {
  // Use TypeScript generics to type the expected parameters
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold">
        Viewing Todo ID: {id}
      </Text>
    </View>
  );
}
```

### Catch-All Routes
- `[...slug].tsx`: Matches any number of nested route segments (e.g. `/docs/react/hooks` $\rightarrow$ `slug: ['react', 'hooks']`).

---

## 5. Navigating Between Screens

### A. Declarative Navigation (`<Link />`)
Used in JSX when user taps a clickable element:

```tsx
import { Link } from "expo-router";

// Static route
<Link href="/tabs" className="text-blue-500 font-semibold">
  Go to Todos (Tabs)
</Link>

// Dynamic route
<Link href="/123" className="text-blue-500 font-semibold">
  Edit Todo #123
</Link>
```

### B. Imperative Navigation (`router`)
Used inside event handlers, API callbacks, or button presses:

```tsx
import { router } from "expo-router";
import { Button } from "react-native";

// Push to history
<Button
  title="Add Todo"
  onPress={() => router.push("/tabs/add-todo")}
/>

// Replace history (cannot go back)
<Button
  title="Done"
  onPress={() => router.replace("/tabs")}
/>

// Push with dynamic parameters
router.push({
  pathname: "/[id]",
  params: { id: "123" },
});
```

---

## 6. Typed Routes in Expo Router

Expo Router features **Type-Safe Routing** powered by TypeScript (`app.json` $\rightarrow$ `"experiments": { "typedRoutes": true }`).

### How It Works Under the Hood
1. Expo scans all files inside `src/app/`.
2. It generates TypeScript definitions in `.expo/types/router.d.ts`.
3. `<Link href="...">` and `router.push("...")` validate the path against known routes at compile time.

### Common Error: `Type '"/..."' is not assignable to type ...`
- **Why it happens:** When you create a new file (e.g. `src/app/tabs/index.tsx`), TypeScript will flag `<Link href="/tabs">` as an error if `.expo/types/router.d.ts` has not yet been regenerated by the dev server.
- **Solution:** Starting or restarting the Expo dev server (`npx expo start`) re-indexes `src/app/` and updates the types.

---

## 7. Path Aliasing & Asset Imports in TypeScript

### `tsconfig.json` Configuration
To import files cleanly without messy `../../../` relative paths, configure aliases in `tsconfig.json`:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./src/*"],
      "@assets/*": ["./assets/*"],
      "@/assets/*": ["./assets/*"]
    }
  }
}
```

### Ambient Image Declarations (`declarations.d.ts`)
TypeScript does not know how to type `.png`, `.jpg`, or `.svg` files out of the box, causing:
```
Cannot find module '@assets/home.png' or its corresponding type declarations.
```

**Fix:** Add `declarations.d.ts` at the root of the project:
```typescript
declare module "*.png" {
  const value: any;
  export default value;
}
declare module "*.jpg" {
  const value: any;
  export default value;
}
declare module "*.svg" {
  const value: any;
  export default value;
}
```

---

## 8. Common Pitfalls & Best Practices

| Pitfall | Problem | Correct Practice |
| :--- | :--- | :--- |
| **Double Headers** | Root `<Stack />` and child `<Tabs />` both show top headers | Set `options={{ headerShown: false }}` on the `<Stack.Screen name="tabs" />` |
| **Global CSS in Layouts** | Importing `@global.css` in every screen or sub-layout | Import `../../global.css` **once** at the top of the root `src/app/_layout.tsx` |
| **Route Group URLs** | Writing `<Link href="/(todo)/123">` | Groups don't belong in the URL; write `<Link href="/123">` |
| **Stale Route Types** | TypeScript complaining about a newly added screen path | Restart the Expo server (`npx expo start`) to regenerate `.expo/types/router.d.ts` |
