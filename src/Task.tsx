import { HighlightOff } from '@mui/icons-material';
import { Checkbox, IconButton, ListItem } from '@mui/material';
import React, { ChangeEvent, memo } from 'react';
import { EditableSpan } from './EditableSpan';
import { TaskType } from './store/task-reducer';

export type TaskPropsType = {
  task: TaskType
  removeTask: (taskID: string) => void
  changeTaskStatus: (taskID: string, newStatus: boolean) => void
  changeTaskTitle: (taskID: string, newTitle: string) => void
}

export const Task = memo(({ task, removeTask, changeTaskStatus, changeTaskTitle } : TaskPropsType) => {
  
  console.log('task')
  
  const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked)
  const onChangeTaskTitle = (newTitle: string) => changeTaskTitle(task.id, newTitle);
  const onClickHandler = () => removeTask(task.id);

  return (
    <ListItem key={task.id}
        style={{
          padding: '0px',
          justifyContent: 'space-between',
          textDecoration: task.isDone ? 'line-through' : 'none'
        }}
        className={task.isDone ? 'isDone' : ''}
      >
        <Checkbox checked={task.isDone} onChange={onChangeTaskStatusHandler} />
        <EditableSpan title={task.title} changeTitle={onChangeTaskTitle} />
        <IconButton size={'small'} onClick={onClickHandler} >
          <HighlightOff />
        </IconButton>
      </ListItem>
  );
});

export default Task;