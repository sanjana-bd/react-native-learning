import { TTodo } from "@/todo";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

const TodoList = ({ todo }: { todo: TTodo }) => {
    const { title = '', description = '', id = '' } = todo ?? {};

    const handlePressTodo = () => {
        router.push(`/${id}`)
    }

    if(!todo) return null;

    return (
        <Pressable
            className="bg-white p-4.5 rounded-2xl mb-3.5 border border-border/80 flex-row items-center justify-between active:scale-[0.99] active:opacity-85 shadow-sm"
            onPress={handlePressTodo}
        >
            <View className="flex-1 mr-3">
                <Text className="text-base font-bold text-primary" numberOfLines={1}>
                    {title}
                </Text>
                {description ? (
                    <Text className="text-secondary text-sm mt-1" numberOfLines={2}>
                        {description}
                    </Text>
                ) : null}
            </View>

            {/* Right arrow indicator */}
            <Text className="text-secondary/60 text-xl font-light">›</Text>
        </Pressable>
    )
}

export default TodoList;