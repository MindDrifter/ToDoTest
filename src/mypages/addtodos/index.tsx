"use client"

import ToDoPage from './ui/AddToDoPage';
import store from '@/store';
import { Provider } from 'react-redux';

const AddToDo = () => {
  return (
    <Provider store={store}> <ToDoPage /></Provider>
  )
}
export default AddToDo
