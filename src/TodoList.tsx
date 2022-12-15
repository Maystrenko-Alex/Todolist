import { HighlightOff } from "@mui/icons-material"
import { Button, Divider, List, Stack, Typography } from "@mui/material"
import { memo, useCallback } from "react"
import AddItemForm from "./AddItemForm"
import { EditableSpan } from "./EditableSpan"
import { TaskType } from "./store/task-reducer"
import { FilterValuesType } from "./store/todolists-reducer"
import Task from "./Task"
// import { TaskWithRedux } from "./TaskWithRedux"


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
  changeTaskTitle: (taskID: string, todoListID: string, newTitle: string) => void
}

export const TodoList = memo(({
  id,
  title,
  tasks,
  filter,
  removeTodoList,
  addTask,
  removeTask,
  changeTaskStatus,
  changeTaskTitle,
  changeTodoListFilter,
  changeTodoListTitle
}: TodoListPropsType) => {

  console.log('Todolist')
  let tasksForRender = tasks;
  if (filter === 'active') {
    tasksForRender = tasks.filter(t => t.isDone === false)
  }
  if (filter === 'completed') {
    tasksForRender = tasks.filter(t => t.isDone === true)
  }

  const removeTaskCallback = useCallback((taskID: string) => removeTask(taskID, id), [removeTask, id])
  const changeTaskStatusCallback = useCallback((taskID: string, newStatus: boolean) => changeTaskStatus(taskID, id, newStatus), [changeTaskStatus, id])
  const changeTaskTitleCallback = useCallback((taskID: string, newTitle: string) => changeTaskTitle(taskID, id, newTitle), [changeTaskTitle, id])

  const tasksList = tasksForRender.map(task => {
    return (
        <Task
          key={task.id}
          task={task}
          removeTask={removeTaskCallback}
          changeTaskTitle={changeTaskTitleCallback}
          changeTaskStatus={changeTaskStatusCallback} />
      // <TaskWithRedux key={task.id} task={task} todoListID={id} />
    )
  })
  // const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.id);
  const onAllClickHandler = useCallback(() => changeTodoListFilter('all', id), [changeTodoListFilter, id]);
  const onActiveClickHandler = useCallback(() => changeTodoListFilter('active', id), [changeTodoListFilter, id]);
  const onCompletedClickHandler = useCallback(() => changeTodoListFilter('completed', id), [changeTodoListFilter, id]);


  const removeTodoListHandler = () => removeTodoList(id)

  const changeTodoListTitleHandler = useCallback((newTitle: string) => changeTodoListTitle(newTitle, id), [changeTodoListTitle, id]);

  const addTaskHandler = useCallback((title: string) => {
    addTask(title, id)
  }, [addTask, id])

  return (
    <div className='wrapper'>
      <Typography variant={"h5"} align={"center"} >
        <EditableSpan title={title} changeTitle={changeTodoListTitleHandler} />
        <Button onClick={removeTodoListHandler}><HighlightOff color="error" /></Button>
      </Typography>
      <AddItemForm addItem={addTaskHandler} />
      <List>
        {tasks.length ? tasksList : <span>Your taskslist is empty...</span>}
      </List>
      <div className={'btnBlock'}>
        <Stack spacing={1} direction="row" divider={<Divider orientation="vertical" />}>
          <ButtonWithMemo
            size='small'
            title={'All'}
            variant={(filter === 'all') ? 'outlined' : 'contained'}
            onClick={onAllClickHandler}
          /><ButtonWithMemo
            size='small'
            title={'active'}
            variant={(filter === 'active') ? 'outlined' : 'contained'}
            onClick={onActiveClickHandler}
          /><ButtonWithMemo
            size='small'
            title={'completed'}
            variant={(filter === 'completed') ? 'outlined' : 'contained'}
            onClick={onCompletedClickHandler}
          />
        </Stack>
      </div>
    </div>
  );
})
type ButtonWithMemoPropsType = {
  title: string
  size: 'small' | 'medium' | 'large'
  variant: 'text' | 'outlined' | 'contained'
  onClick: () => void
}

const ButtonWithMemo = memo((props: ButtonWithMemoPropsType) => {

  console.log('button')
  return <Button
    size={props.size}
    variant={props.variant}
    onClick={props.onClick}
  >{props.title}</Button>
})