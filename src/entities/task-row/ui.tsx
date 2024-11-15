"use client"

import { Checkbox, IconButton, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { deleteTodo, editTodo, toggleTodo } from "./model";
import { useForm } from "react-hook-form";
import styles from './styles.module.css'

interface props {
  id: number,
  title: string,
  checked: boolean,
}

interface formData {
  title: string
}

export const TaskRow = ({ id, title, checked }: props) => {

  const getErrorTitle = () => {
    if (errors.title?.type === "required") return 'Поле не должно быть пустым'
    if (errors.title?.type === "minLength") return 'Слишком короткое поле'
    if (errors.title?.type === "maxLength") return 'Слишком длинное поле'
    return ''
  }
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<formData>({
    mode: "all"
  })

  const [inputChecked, setChecked] = useState(false)
  const [editing, setEditing] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const resetHandler = () => {
    setEditing(false)
    resetField('title')

  }
  const submitHandler = ({ title }: formData) => {
    setEditing(false)
    dispatch(editTodo({ id: id, title: title }))
  }
  const checkHandle = () => {
    dispatch(toggleTodo({ id: id }))
    setChecked(prev => !prev)
  }

  useEffect(() => {
    setChecked(checked)
  }, [])

  return (
    <li className={styles.row_container}>
      {editing
        ? <>
          <form className={styles.form_container} onSubmit={handleSubmit(submitHandler)} onReset={() => resetHandler()}>
            <TextField
              sx={{ width: '80%', fontSize:'26' }}
              defaultValue={title}
              variant="outlined"
              error={errors.title ? true : false}
              helperText={
                errors.title ?
                  getErrorTitle()
                  :
                  ''}
              {...register('title', { required: true, minLength: 4, maxLength: 35 })}
              autoFocus
            />
            <div>
              <IconButton type="submit" >
                <DoneIcon />
              </IconButton>
              <IconButton type="reset" >
                <CloseIcon />
              </IconButton>
            </div>

          </form>

        </>
        : <>
          <div>
            <Checkbox checked={inputChecked ? true : false} value={inputChecked} onChange={() => checkHandle()} />
            <span style={checked ? { textDecorationLine: "line-through" } : {}}> {title}</span>
          </div>

          <div>
            <IconButton onClick={() => setEditing(true)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => dispatch(deleteTodo({ id: id }))}>
              <DeleteIcon />
            </IconButton>
          </div>

        </>

      }

    </li>)
}