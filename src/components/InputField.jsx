import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeAllTodos, removeTodo, updateTodo } from '../todo-store/TodoSlice';

function InputField() {

    const [input, setInput] = useState("");
    const [editToggle, setEditToggle] = useState(false);
    const [editIdx, setEditIdx] = useState(undefined);

    const dispatch = useDispatch();
    const list = useSelector((state) => state.todos);

    const todoAdd = () => {
        if (input === "") {
            alert("please enter something...")
        }
        else {
            dispatch(addTodo(input))
            setInput("");
        }
    }

    return (
        <div className='main-body fira-code h-dvh w-dvw flex justify-center items-center'>
            <div className='box-body h-4/5 w-4/5 bg-purple-400 rounded-xl flex flex-col items-center gap-2 p-2 overflow-auto'>
                <h1 className='heading text-3xl font-bold'>Todo List</h1>
                {
                    editToggle === false ? (
                        <div className='input-box flex items-center justify-between h-10 w-4/5 bg-white rounded-lg border-2 border-gray-600 px-2 '>
                            <input
                                placeholder='add item...'
                                className="input h-full w-3/4 rounded-l-lg outline-none p-1"
                                type="text"
                                value={input}
                                onChange={(e) => {
                                    setInput(e.target.value);
                                }}
                            />
                            <button
                                className='add-btn h-5/6 w-20 text-white bg-blue-500 rounded-lg hover:bg-pink-500 hover:text-black active:text-sm'
                                onClick={(e) => {
                                    e.preventDefault();
                                    todoAdd(e.target);
                                }}
                            >Add</button>
                        </div>
                    ) : (
                        <div className='input-box flex items-center justify-between h-10 w-4/5 bg-white rounded-lg border-2 border-gray-600 px-2'>
                            <input
                                placeholder='add item...'
                                className="input h-full w-3/4 rounded-l-lg outline-none p-1"
                                type="text"
                                value={input}
                                onChange={(e) => {
                                    setInput(e.target.value);
                                }}
                            />
                            <button
                                className='add-btn h-5/6 w-20 text-white bg-blue-500 rounded-lg hover:bg-pink-500 hover:text-black active:text-sm'
                                onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(updateTodo({ editIdx, input }));
                                    setEditToggle((prev) => prev = !prev);
                                    setInput("");
                                }}
                            >Edit</button>
                        </div>
                    )
                }
                {
                    list.map((currEle) => {
                        return (
                            <ul
                                className='h-auto w-4/5 flex justify-around items-center bg-white rounded-lg p-1'
                                key={currEle.id}
                            >
                                <li
                                    className="list-items list-none h-auto w-3/4 rounded-l-lg p-1"
                                >{currEle.text}</li>
                                <button
                                    className='edit-btn h-5/6 w-20 text-white bg-blue-500 rounded-lg hover:bg-pink-500 hover:text-black active:text-sm'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setEditToggle((prev) => prev = !prev);
                                        setInput(currEle.text);
                                        setEditIdx(currEle.id);
                                    }}
                                >Edit</button>
                                <button
                                    className='del-btn h-5/6 w-20 text-white bg-blue-500 rounded-lg hover:bg-pink-500 hover:text-black active:text-sm'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        dispatch(removeTodo(currEle.id));
                                    }}
                                >Del</button>
                            </ul>
                        )
                    })
                }
                <button
                    className='remAll-btn h-11 w-36  text-white bg-blue-500 rounded-lg hover:bg-pink-500 hover:text-black active:text-sm'
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch(removeAllTodos());
                    }}
                >Remove All</button>
            </div>
        </div>
    )
}
export default InputField
