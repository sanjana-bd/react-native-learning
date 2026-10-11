import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddTodo = () => {
  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-4">
      <View>
        <Text className="text-2xl font-bold text-slate-900 mb-2">Add Todo</Text>
        <Text className="text-base text-slate-500">
          Add your new todo here.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default AddTodo;

