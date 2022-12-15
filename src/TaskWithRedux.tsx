import { HighlightOff } from '@mui/icons-material';
import { Checkbox, IconButton, ListItem } from '@mui/material';
import React, { ChangeEvent, memo } from 'react';
import { useDispatch } from 'react-redux';
import { EditableSpan } from './EditableSpan';
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType } from './store/task-reducer';

export type TaskWithReduxPropsType = {
  task: TaskType
  todoListID: string
}

export const TaskWithRedux = memo(({ task, todoListID } : TaskWithReduxPropsType) => {
  
  console.log('task')
  const dispatch = useDispatch();
  
  const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(task.id, todoListID, e.currentTarget.checked))
  const onChangeTaskTitle = (newTitle: string) => dispatch(changeTaskTitleAC(task.id, todoListID, newTitle));
  const onClickHandler = () => dispatch(removeTaskAC(task.id, todoListID));

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

