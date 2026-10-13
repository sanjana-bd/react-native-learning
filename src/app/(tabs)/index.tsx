import TodoList from "@/components/TodoList";
import { TTodo } from "@/todo";
import { getTodoList } from "@/utils/get-todo";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView as RSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RSafeAreaView);

const TodosList = () => {
    const [todos, setTodos] = useState<TTodo[]>([]);

    useFocusEffect(
        useCallback(() => {
            setTodos(getTodoList());
        }, [])
    );

    const todayDate = new Date().toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    });
    
    if (!todos.length) {
        return (
            <SafeAreaView className="flex-1 bg-background">
                <View className="flex-1 px-6 pt-6 max-w-xl mx-auto w-full">
                    {/* Header */}
                    <View className="mb-8">
                        <Text className="text-xs font-semibold text-secondary uppercase tracking-widest mb-1">
                            {todayDate}
                        </Text>
                        <Text className="text-3xl font-extrabold text-primary">My Tasks</Text>
                    </View>

                    {/* Empty State */}
                    <View className="flex-1 items-center justify-center -mt-16">
                        <View className="w-20 h-20 rounded-full bg-white items-center justify-center mb-5 shadow-sm border border-border/50">
                            <Text className="text-3xl">✨</Text>
                        </View>
                        <Text className="text-xl font-bold text-primary mb-1.5">
                            All Caught Up!
                        </Text>
                        <Text className="text-secondary text-sm text-center px-10 mb-6 leading-relaxed">
                            You don't have any tasks scheduled. Tap below to create your first task.
                        </Text>
                        <Pressable
                            className="bg-accent px-7 py-3.5 rounded-full active:opacity-85 shadow-md shadow-accent/25"
                            onPress={() => router.push("/add-todo")}
                        >
                            <Text className="text-white font-semibold text-base">+ New Task</Text>
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="flex-1 px-6 pt-6 max-w-xl mx-auto w-full">
                {/* Header with Counter Pill */}
                <View className="flex-row items-end justify-between mb-6">
                    <View>
                        <Text className="text-xs font-semibold text-secondary uppercase tracking-widest mb-1">
                            {todayDate}
                        </Text>
                        <Text className="text-3xl font-extrabold text-primary">My Tasks</Text>
                    </View>
                    <View className="bg-accent/10 px-3.5 py-1.5 rounded-full border border-accent/20">
                        <Text className="text-xs font-bold text-accent">
                            {todos.length} {todos.length === 1 ? "task" : "tasks"}
                        </Text>
                    </View>
                </View>

                {/* Tasks List */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 110 }}
                >
                    {todos.map((todo: TTodo) => (
                        <TodoList todo={todo} key={todo.id} />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default TodosList;

