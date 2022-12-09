import { HighlightOff } from "@mui/icons-material"
import { Button, Checkbox, Divider, IconButton, List, ListItem, Stack, Typography } from "@mui/material"
import { ChangeEvent, memo, useCallback } from "react"
import AddItemForm from "./AddItemForm"
import { EditableSpan } from "./EditableSpan"
import { TaskType} from "./store/task-reducer"
import { FilterValuesType } from "./store/todolists-reducer"


type TodoListPropsType = {
  id: string
  title: string
  tasks: TaskType[]
  filter: FilterValuesType
  removeTodoList: (todoListId: string) => void
  addTask: (title: string, todoListId: string) => void
  removeTask: (taskID: string, todoListId: string) => void
  changeTodoListTitle: (title: string, todoListId: string) => void
  changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
  changeTaskStatus: (taskID: string, todoListId: string, newStatus: boolean) => void
  changeTaskTitle: ( taskID: string, todoListID: string, newTitle: string) => void
}

export const TodoList = memo((props: TodoListPropsType) => {
  console.log('Todolist')

  let tasks = props.tasks;
  if (props.filter === 'active') {
    tasks = tasks.filter(t => t.isDone === false)
  }
  if (props.filter === 'completed') {
    tasks = tasks.filter(t => t.isDone === true)
  }
  const tasksList = tasks.map(task => {
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(task.id, props.id, e.currentTarget.checked)
    }
    const changeTaskTitle = (newTitle: string) => props.changeTaskTitle(task.id, props.id, newTitle );
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
        <IconButton size={'small'} onClick={() => props.removeTask(task.id, props.id)} >
          <HighlightOff />
        </IconButton>
      </ListItem>
    )
  })
  const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.id);
  const removeTodoList = () => props.removeTodoList(props.id)

  const changeTodoListTitle = (newTitle: string) => props.changeTodoListTitle(newTitle, props.id);

  const addTask = useCallback ((title: string) => {
    props.addTask(title, props.id)
  },[props.addTask, props.id])

  return (
    <div className='wrapper'>
      <Typography variant={"h5"} align={"center"} >
        <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
        <Button onClick={removeTodoList}><HighlightOff color="error"/></Button>
      </Typography>
      <AddItemForm addItem={addTask} />
      <List>
        {props.tasks.length ? tasksList : <span>Your taskslist is empty...</span>}
      </List>
      <div className={'btnBlock'}>
        <Stack spacing={1} direction="row" divider={<Divider orientation="vertical" />}>
          <Button
            size='small'
            variant={(props.filter === 'all') ? 'outlined' : 'contained'}
            onClick={handlerCreator('all')}
          >All</Button>
          <Button
            size={'small'}
            variant={(props.filter === 'active') ? 'outlined' : 'contained'}
            onClick={handlerCreator('active')}
          >Active</Button>
          <Button
            size='small'
            variant={(props.filter === 'completed') ? 'outlined' : 'contained'}
            onClick={handlerCreator('completed')}
          >Completed</Button>
        </Stack>
      </div>
    </div>
  );
})