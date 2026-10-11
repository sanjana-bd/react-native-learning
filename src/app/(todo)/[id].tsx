import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const EditTodo = () => {
    const { id } = useLocalSearchParams();
    return (
        <View>
            <Text>
                You are looking todo for id {id}
            </Text>
        </View>
    )
}

export default EditTodo;