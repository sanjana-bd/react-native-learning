import { TODO_KEY } from "@/constants/config";
import { TTodo } from "@/todo";

export const getTodoList = (id?: number) => {
    try {
        const data = window?.localStorage?.getItem(TODO_KEY);
        const parsedData = data ? JSON.parse(data) : [];
        if (!Array.isArray(parsedData)) {
            return [];
        }
        if (id !== undefined) {
            return parsedData.filter((todo: TTodo) => todo.id === id);
        }
        return parsedData;
    } catch (error) {
        console.error('Error while fetching todos', error);
    }
    return [];
}