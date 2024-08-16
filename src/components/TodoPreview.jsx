import React from 'react'
import InputField from './InputField'
import { Provider } from "react-redux"
import {store} from "../todo-store/store"

function TodoPreview() {
  return (
    <Provider store={store}>
      <InputField />
    </Provider>
  )
}

export default TodoPreview

