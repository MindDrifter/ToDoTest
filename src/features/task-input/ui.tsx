"use client"

import { addTodoToList } from '@/entities/task-row/model';
import { AppDispatch } from '@/store';
import { TextField, Button } from '@mui/material';
import { redirect } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form"

import styles from './styles.module.css'
import { useEffect } from 'react';

interface formData {
  title: string
}


export const TaskInput = () => {

  const getErrorTitle = () => {
    if (errors.title?.type === "required") return 'Поле не должно быть пустым'
    if (errors.title?.type === "minLength") return 'Слишком короткое поле'
    if (errors.title?.type === "maxLenght") return 'Слишком длинное поле'
    return ''
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue
  } = useForm<formData>({
    mode: "all"
  })

  useEffect(() => {
    if (localStorage.getItem('todoDraft')) setValue('title', localStorage.getItem('todoDraft')!)
  }, [])

  const dispath = useDispatch<AppDispatch>()
  const handleFromSubmit = ({ title }: formData) => {
    dispath(addTodoToList({ title: title }))
    localStorage.removeItem('todoDraft')
    redirect('/')
  }

  return (
    <div className={styles.container}>
      <form
        onChange={() => localStorage.setItem('todoDraft', getValues('title'))}
        className={styles.form_container} onSubmit={handleSubmit(handleFromSubmit)}>
        <TextField
          fullWidth
          variant="outlined"
          error={errors.title ? true : false}
          helperText={
            errors.title ?
              getErrorTitle()
              :
              ''}
          {...register('title', { required: true, minLength: 4, maxLength: 35 })}
        />
        <Button type='submit' >Добавить</Button>
      </form>

    </div>

  )
}