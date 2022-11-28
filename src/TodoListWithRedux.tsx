import { HighlightOff } from '@mui/icons-material';
import { Button, Checkbox, Divider, IconButton, List, ListItem, Stack, Typography } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import AddItemForm from './AddItemForm';
import { TasksStateType } from './AppWithUseReducer';
import { EditableSpan } from './EditableSpan';
import { AppRootStateType } from './store/store';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType } from './store/task-reducer';
import { changeTodoListFilterAC, changeTodoListTitleAC, FilterValuesType, removeTodoListAC, TodoListType } from './store/todolists-reducer';

export type TodoListWithReduxPropsType = {
  todoList: TodoListType
}

const TodoListWithRedux: React.FC<TodoListWithReduxPropsType> = ({todoList}) => {
  const {id, title, filter} = todoList;
  const tasks = useSelector<AppRootStateType, Array<TaskType>>(store => store.tasks[id])
  const dispatch = useDispatch()
  
  let filteredTasks: TaskType[] = tasks;
  if (filter === 'active') {
    filteredTasks = tasks.filter(t => t.isDone === false)
  }
  if (filter === 'completed') {
    filteredTasks = tasks.filter(t => t.isDone === true)
  }
  const tasksList = filteredTasks.map(task => {
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(changeTaskStatusAC(task.id, id, e.currentTarget.checked))
    }
    const changeTaskTitle = (newTitle: string) => dispatch(changeTaskTitleAC(task.id, id, newTitle ));
    return (
      <ListItem key={task.id}
        style={{
          padding: '0px',
          justifyContent: 'space-between',
          textDecoration: task.isDone ? 'line-through' : 'none'
        }}
        className={task.isDone ? 'isDone' : ''}
      >
        <Checkbox  checked={task.isDone} onChange={changeTaskStatusHandler}/>        
        <EditableSpan title={task.title} changeTitle={changeTaskTitle} />
        <IconButton size={'small'} onClick={() => dispatch(removeTaskAC(task.id, id))} >
          <HighlightOff />
        </IconButton>
      </ListItem>
    )
  })
  const handlerCreator = (filter: FilterValuesType) => () => dispatch(changeTodoListFilterAC(filter, id));
  const removeTodoList = () => dispatch(removeTodoListAC(id))

  const changeTodoListTitle = (newTitle: string) => dispatch(changeTodoListTitleAC(newTitle, id));
  const addTask = (title: string) => {
    dispatch(addTaskAC(title, id))
  }
  return (
    <div className='wrapper'>
      <Typography variant={"h5"} align={"center"} >
        <EditableSpan title={title} changeTitle={changeTodoListTitle} />
        <Button onClick={removeTodoList}><HighlightOff color="error"/></Button>
      </Typography>
      <AddItemForm addItem={addTask} />
      <List>
        {tasks.length ? tasksList : <span>Your taskslist is empty...</span>}
      </List>
      <div className={'btnBlock'}>
        <Stack spacing={1} direction="row" divider={<Divider orientation="vertical" />}>
          <Button
            size='small'
            variant={(filter === 'all') ? 'outlined' : 'contained'}
            onClick={handlerCreator('all')}
          >All</Button>
          <Button
            size={'small'}
            variant={(filter === 'active') ? 'outlined' : 'contained'}
            onClick={handlerCreator('active')}
          >Active</Button>
          <Button
            size='small'
            variant={(filter === 'completed') ? 'outlined' : 'contained'}
            onClick={handlerCreator('completed')}
          >Completed</Button>
        </Stack>
      </div>
    </div>
  );
};

export default TodoListWithRedux;
