import { deleteTodo } from "@/utils/delete-todo";
import { editTodo } from "@/utils/edit-todo";
import { getTodoList } from "@/utils/get-todo";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView as RSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RSafeAreaView);

const EditTodo = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const todoIdParam = Number(Array.isArray(id) ? id[0] : id);
    const todo = getTodoList(todoIdParam)[0];

    if (!todo) {
      return (
        <SafeAreaView className="flex-1 bg-background items-center justify-center p-8">
          <Text className="text-primary text-xl font-bold mb-2">Todo Not Found</Text>
          <Text className="text-secondary text-sm mb-6 text-center">
            This todo item may have been removed or does not exist.
          </Text>
          <Pressable
            className="bg-primary px-6 py-3 rounded-xl active:opacity-85"
            onPress={() => router.back()}
          >
            <Text className="text-white font-semibold text-base">Go Back</Text>
          </Pressable>
        </SafeAreaView>
      );
    }

    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);

    const handleEditTodo = () => {
        if (!title.trim()) {
            Alert.alert("Required", "Please enter a title for your todo.");
            return;
        }

        editTodo({ title, description, id: todo.id });
        router.back();
    };

    const handleDeleteTodo = () => {
        deleteTodo(todo.id);
        router.back();
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
          <View className="flex-1 px-6 pt-6 max-w-xl mx-auto w-full">
            {/* Top Bar with Back Arrow */}
            <View className="flex-row items-center justify-between mb-8">
              <Pressable
                className="w-10 h-10 rounded-full bg-white border border-border items-center justify-center active:opacity-75 shadow-sm"
                onPress={() => router.back()}
              >
                <Text className="text-primary text-lg font-bold">←</Text>
              </Pressable>
              <Text className="text-lg font-bold text-primary">Edit Task</Text>
              <View className="w-10" />
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
                placeholder="Enter title"
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
                placeholder="Enter description"
                placeholderTextColor="#A8A29E"
                editable
                numberOfLines={4}
                textAlignVertical="top"
                value={description}
                onChangeText={setDescription}
              />
            </View>
      
            {/* Action Buttons */}
            <View className="flex-row items-center justify-between gap-3">
              <Pressable
                  className="flex-1 bg-red-50 border border-red-200 py-4 rounded-2xl items-center active:opacity-80"
                  onPress={handleDeleteTodo}
              >
                  <Text className="text-red-600 font-bold text-base">Delete</Text>
              </Pressable>
              <Pressable
                  className="flex-[1.5] bg-accent py-4 rounded-2xl items-center active:scale-[0.99] active:opacity-90 shadow-md shadow-accent/25"
                  onPress={handleEditTodo}
              >
                  <Text className="text-white font-bold text-base">Save Changes</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      );
};

export default EditTodo;