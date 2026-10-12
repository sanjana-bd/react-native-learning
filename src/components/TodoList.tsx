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
        <Pressable className="todo-item" onPress={handlePressTodo}>
            <View>
                <Text className="todo-title">{title}</Text>
                <Text className="todo-description">{description}</Text>
            </View>
        </Pressable>
    )
}

export default TodoList;