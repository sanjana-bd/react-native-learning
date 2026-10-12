import { addTodo } from "@/utils/add-todo";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

let TODO_CURR_COUNT = 1;

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTodo = () => {
    if (!title.trim()) {
      Alert.alert("Required", "Please enter a title for your todo.");
      return;
    }

    addTodo({ title, description, id: TODO_CURR_COUNT++ });
    setTitle("");
    setDescription("");
    router.push("/tabs");
  };

  return (
    <SafeAreaView className="flex-1 bg-background p-8">
      <Text className="text-2xl font-bold text-primary mb-6">Create Todo</Text>

      {/* Title Input */}
      <View className="mb-5">
        <Text className="text-sm font-semibold text-primary mb-2">Title</Text>
        <TextInput
          className="bg-white border border-secondary/30 rounded-xl px-4 py-3 text-base text-primary"
          inputMode="text"
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title"
          placeholderTextColor="#797979"
        />
      </View>

      {/* Description Input */}
      <View className="mb-6">
        <Text className="text-sm font-semibold text-primary mb-2">
          Description
        </Text>
        <TextInput
          className="bg-white border border-secondary/30 rounded-xl px-4 py-3 text-base text-primary h-32"
          multiline
          inputMode="text"
          maxLength={150}
          placeholder="Enter description"
          placeholderTextColor="#797979"
          editable
          numberOfLines={4}
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
        />
      </View>

      {/* Button using theme primary color */}
      <Pressable
        className="bg-primary py-4 rounded-xl items-center active:opacity-85"
        onPress={handleAddTodo}
      >
        <Text className="text-white font-semibold text-base">Add Todo</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default AddTodo;


