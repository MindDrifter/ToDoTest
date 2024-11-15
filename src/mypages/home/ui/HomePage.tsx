"use client"

import { TaskRow } from "@/entities/task-row";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

import NextLink from 'next/link'
import { Link as MUILink } from '@mui/material';

import { loadLocalData } from "@/entities/task-row/model";
import styles from './styles.module.css'


const HomePage = () => {
  const todos = useSelector((state: RootState) => state.tasks)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const data = localStorage.getItem('allTodoData')
    if (data) { dispatch(loadLocalData(JSON.parse(data))) } else {
      dispatch(loadLocalData([]))
    }

  }, [])

  return (
    <div className={styles.container}>
      <MUILink href='/addtodo' component={NextLink} variant="body2">Добавить задачу</MUILink>
      {
        todos.loading ? <h1>Loading</h1>
          :
          todos.data && todos.data.length != 0 ?
            <ul className={styles.ul_container}>
              {todos.data.map(todo => {
                return <TaskRow key={todo.id} id={todo.id} title={todo.title} checked={todo.checked} />
              })}
            </ul>
            : <h1>No ToDo</h1>
      }
    </div>)
}

export default HomePage