import { Link } from "expo-router";
import { styled } from 'nativewind';
import { Pressable, Text, View } from "react-native";
import { SafeAreaView as RSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RSafeAreaView);

export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white px-4">
      <View>
        <Text className="text-2xl font-bold text-slate-900 mb-6">
          Welcome to Nativewind!
        </Text>
        <Link href="/tabs" asChild>
          <Pressable className="bg-blue-600 px-6 py-3 rounded-xl active:bg-blue-700">
            <Text className="text-white font-semibold text-base">
              Go to Tabs →
            </Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}