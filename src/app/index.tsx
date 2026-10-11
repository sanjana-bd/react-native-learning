import { Link } from "expo-router";
import { Text, View } from "react-native";
 
export default function App() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-bold text-primary">
        Welcome to Nativewind!
      </Text>
      <Link href="/tabs">Show Todos</Link>
      <Link href="/(todo)">Edit Todo 123</Link>
    </View>
  );
}