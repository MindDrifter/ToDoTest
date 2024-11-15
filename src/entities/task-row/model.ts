'use client'
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Todo {
  id: number,
  title: string,
  checked: boolean
}

interface state {
  loading: boolean,
  data: Todo[]
}

const initialState: state = {
  loading: true,
  data: []
}

let _id = 0
export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    loadLocalData: (state, { payload }: PayloadAction<Todo[]>) => {
      state.data.splice(0, state.data.length)
      state.data.push(...payload)
      state.loading = false
      if (state.data.length != 0) _id = state.data[state.data.length - 1].id + 1
    },
    addTodoToList: (state, { payload }: PayloadAction<{ title: string }>) => {
      state.data.push({
        checked: false,
        id: _id,
        title: payload.title
      })
      _id += 1
      localStorage.setItem('allTodoData', JSON.stringify(state.data))
    },
    toggleTodo: (state, { payload }: PayloadAction<{ id: number }>) => {
      state.data.forEach((element, idx) => {
        if (element.id == payload.id) state.data[idx].checked = !state.data[idx].checked
      });
      localStorage.setItem('allTodoData', JSON.stringify(state.data))
    },
    deleteTodo: (state, { payload }: PayloadAction<{ id: number }>) => {
      state.data.forEach((element, idx) => {
        if (element.id == payload.id) state.data.splice(idx, 1)
      });
      localStorage.setItem('allTodoData', JSON.stringify(state.data))
    },
    editTodo: (state, { payload }: PayloadAction<{ id: number, title: string }>) => {
      state.data.forEach((element, idx) => {
        if (element.id == payload.id) state.data[idx].title = payload.title
      });
      localStorage.setItem('allTodoData', JSON.stringify(state.data))
    },
  },
});

export const { addTodoToList, editTodo, deleteTodo, toggleTodo, loadLocalData } = taskSlice.actions;

export default taskSlice.reducer;