import { createSlice, current, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
}

const TodoSlice = createSlice({
    name: "todo-list",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload,
            }
            state.todos.push(todo);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((currEle) => {
                return currEle.id !== action.payload;
            })
        },
        updateTodo: (state, action) => {
            const { editIdx, input } = action.payload;
            state.todos.forEach((currEle) => {
                if (currEle.id === editIdx) {
                    currEle.text = input;
                }
                else {
                    return;
                }
            })
        },
        removeAllTodos: (state) => {
            state.todos = [];
        },
    }
})

export const { addTodo, removeTodo, updateTodo, removeAllTodos } = TodoSlice.actions;
export default TodoSlice.reducer;