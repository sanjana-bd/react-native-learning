# React Native Learning

Documentation and revision notes covering components, styling, state management, hooks, and libraries as we build React Native applications from scratch.

---

## 📚 Learning Modules & Documentation

| # | Topic | Document | Description |
|---|---|---|---|
| 01 | **Core Components** | [01-core-components.md](./docs/01-core-components.md) | Fundamentals of `<View>`, `<Text>`, web comparisons, and rules. |
| 02 | **Styling & NativeWind** | [02-styling-and-nativewind.md](./docs/02-styling-and-nativewind.md) | Traditional `StyleSheet` vs Tailwind CSS (NativeWind v5), setup, and debugging. |
| 03 | **Layout & Flexbox** | *Coming next* | `flexDirection`, `justifyContent`, `alignItems`, `flex`. |
| 04 | **Handling Touches & User Input** | *Coming next* | `Pressable`, `TouchableOpacity`, `TextInput`, `Button`. |
| 05 | **Lists & Scrollables** | *Coming next* | `ScrollView`, `FlatList`, `SectionList`, performance. |
| 06 | **State Management & Hooks** | *Coming next* | `useState`, `useEffect`, custom hooks, and state patterns. |
| 07 | **Navigation (Expo Router)** | *Coming next* | File-based routing, Stack, Tabs, and layout files. |
| 08 | **Third-Party Libraries** | *Coming next* | Installed libraries, setup guides, and practical usage. |

---

## 🚀 Running the Project

```bash
# Start Metro bundler
npx expo start

# Start with cleared cache
npx expo start -c

# Run on iOS simulator
npx expo run:ios # or press 'i' in expo start

# Run on Android emulator
npx expo run:android # or press 'a' in expo start
```

---

## 🎯 Quick Revision Structure
Each documentation file under `docs/` is structured for rapid revision:
1. **What is it & Web Analogy** (e.g., `<div>` vs `<View>`)
2. **Native Implementation & Differences** (iOS vs Android nuances)
3. **Key Props & Syntax**
4. **Code Example**
5. **Common Pitfalls & Troubleshooting**
