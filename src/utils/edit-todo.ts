import { TODO_KEY } from "@/constants/config";
import { TTodo } from "@/todo";

export const editTodo = (todo: TTodo) => {
    try {
        const { title, description } = todo;
        const data = window?.localStorage?.getItem(TODO_KEY);
        const parsedData = data ? JSON.parse(data) : [];
        if (Array.isArray(parsedData)) {
            const ind = parsedData.findIndex(({ id }) => id === todo.id);
            if (ind !== -1) {
                parsedData[ind] = { ...parsedData[ind], title, description };
            }
            window?.localStorage?.setItem(TODO_KEY, JSON.stringify(parsedData));
        } else {
            throw new Error('Data inconsistency...');
        }
    } catch (error) {
        console.error('Error while editing information', error);   
    }
}