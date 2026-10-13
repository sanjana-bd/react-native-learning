import { addTodo } from "@/utils/add-todo";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView as RSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RSafeAreaView);

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTodo = () => {
    if (!title.trim()) {
      Alert.alert("Required", "Please enter a title for your todo.");
      return;
    }

    addTodo({ title, description, id: Date.now() });
    setTitle("");
    setDescription("");
    router.push("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6 pt-6 max-w-xl mx-auto w-full">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-xs font-semibold text-secondary uppercase tracking-widest mb-1">
            NEW TASK
          </Text>
          <Text className="text-3xl font-extrabold text-primary">Create Task</Text>
          <Text className="text-secondary text-sm mt-1">
            Stay organized by writing down your goals.
          </Text>
        </View>

        {/* Title Input Card */}
        <View className="mb-5">
          <Text className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
            Task Title
          </Text>
          <TextInput
            className="bg-white border border-border rounded-2xl px-4 py-3.5 text-base text-primary shadow-sm"
            inputMode="text"
            value={title}
            onChangeText={setTitle}
            placeholder="e.g. Redesign mobile onboarding"
            placeholderTextColor="#A8A29E"
          />
        </View>

        {/* Description Input Card */}
        <View className="mb-8">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-xs font-bold text-primary uppercase tracking-wider">
              Notes / Description
            </Text>
            <Text className="text-xs text-secondary">
              {description.length}/150
            </Text>
          </View>
          <TextInput
            className="bg-white border border-border rounded-2xl px-4 py-3.5 text-base text-primary h-36 shadow-sm"
            multiline
            inputMode="text"
            maxLength={150}
            placeholder="Add details, links, or notes..."
            placeholderTextColor="#A8A29E"
            editable
            numberOfLines={4}
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        {/* Action Button */}
        <Pressable
          className="bg-accent py-4 rounded-2xl items-center active:scale-[0.99] active:opacity-90 shadow-md shadow-accent/25"
          onPress={handleAddTodo}
        >
          <Text className="text-white font-bold text-base tracking-wide">
            + Create Task
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AddTodo;


