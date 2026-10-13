import { TODO_KEY } from "@/constants/config";

export const deleteTodo = (todoId: number) => {
    try {
        const data = window?.localStorage?.getItem(TODO_KEY);
        const parsedData = data ? JSON.parse(data) : [];
        if (Array.isArray(parsedData)) {
            const newData = parsedData.filter(({ id }) => id !== todoId);
            window?.localStorage?.setItem(TODO_KEY, JSON.stringify(newData));
        } else {
            throw new Error('Unable to find todo');
        }
    } catch (error) {
        console.error('Error while deleting todo', error);   
    }
}