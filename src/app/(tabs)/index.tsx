import TodoList from "@/components/TodoList";
import { TTodo } from "@/todo";
import { getTodoList } from "@/utils/get-todo";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TodosList = () => {
    const todos = getTodoList();
    
    if(!todos.length) {
        return (
            <SafeAreaView className="flex-1 bg-background p-8">
                <View className="flex-1 items-center justify-center color-primary">
                    <Text>There are no todos present to display.</Text>
                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView className="flex-1 bg-background p-8">
            <View className="todo-list-container">
                {
                    todos.map((todo: TTodo) => <TodoList todo={todo} key={todo.id}  />)
                }
            </View>
        </SafeAreaView>
    );
};

export default TodosList;

