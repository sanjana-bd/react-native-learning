import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TodosList = () => {
  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-4">
      <View>
        <Text className="text-2xl font-bold text-slate-900 mb-2">Todo List</Text>
        <Text className="text-base text-slate-500">
          This is the page to display your todos.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default TodosList;

