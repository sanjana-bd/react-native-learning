import { TODO_KEY } from "@/constants/config";
import { TTodo } from "@/todo";

export const addTodo = (todo: TTodo): void => {
    try {
        const data = window?.localStorage?.getItem(TODO_KEY);
        const parsedData = data ? JSON.parse(data) : [];
        if(Array.isArray(parsedData)) {
            parsedData.push(todo);
            window?.localStorage?.setItem(TODO_KEY, JSON.stringify(parsedData));
        } 
    } catch (error) {
        console.error('Error while adding todo: ', error);
    }
}