import { deleteTodo } from "@/utils/delete-todo";
import { editTodo } from "@/utils/edit-todo";
import { getTodoList } from "@/utils/get-todo";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { styled } from "react-native-css";
import { SafeAreaView as RSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RSafeAreaView);

const EditTodo = () => {
    const { id } = useLocalSearchParams();
    const todo = getTodoList(parseInt(id[0]))[0];
    const { title: todoTitle, description: todoDescription, id: todoId } = todo;
    const [title, setTitle] = useState(todoTitle);
    const [description, setDescription] = useState(todoDescription);

    const handleEditTodo = () => {
        if (!title.trim()) {
            Alert.alert("Required", "Please enter a title for your todo.");
            return;
        }

        editTodo({ title, description, id: todoId });
        setTitle("");
        setDescription("");
        router.push("/tabs");
    };

    const handleDeleteTodo = () => {
        deleteTodo(todoId);
    }

    return (
        <SafeAreaView className="flex-1 bg-background p-8">
          <Text className="text-2xl font-bold text-primary mb-6">Edit Todo</Text>
    
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
          <View className="flex item-center justify-between">
            <Pressable
                className="bg-red-400 py-4 rounded-xl items-center active:opacity-85"
                onPress={handleDeleteTodo}
            >
                <Text className="text-white font-semibold text-base">Delete Todo</Text>
            </Pressable>
            <Pressable
                className="bg-primary py-4 rounded-xl items-center active:opacity-85"
                onPress={handleEditTodo}
            >
                <Text className="text-white font-semibold text-base">Edit Todo</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      );
    
}

export default EditTodo;