import { TaskInput } from "@/features/task-input"
import styles from './styles.module.css'

import NextLink from 'next/link'
import { Link as MUILink } from '@mui/material';

const AddToDo = () => {
  return (
    <div className={styles.container}>

      <MUILink href='/' component={NextLink} variant="body2">На главную</MUILink>
      <TaskInput />
    </div>)
}

export default AddToDo