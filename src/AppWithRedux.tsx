import { AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddItemForm from './AddItemForm';
import './App.css';
import { TodoList } from './TodoList';
import { addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, FilterValuesType, removeTodoListAC, TodoListType } from './store/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksStateType, TaskType } from './store/task-reducer';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './store/store';
import { useDispatch } from 'react-redux';
import TodoListWithRedux from './TodoListWithRedux';

export function AppWithRedux() {
  const tasks = useSelector<AppRootStateType, TasksStateType>(store => store.tasks)
  const todoLists = useSelector<AppRootStateType, TodoListType[]>(store => store.todoLists)

  const dispatch = useDispatch()

  const removeTask = (taskID: string, todoListID: string) => dispatch(removeTaskAC(taskID, todoListID));

  const changeTaskTitle = (taskID: string, todoListID: string, newTitle: string) => {
    dispatch(changeTaskTitleAC(taskID, todoListID, newTitle));
  }

  const changeTaskStatus = (taskID: string, todoListID: string, newStatus: boolean) => {
    dispatch(changeTaskStatusAC(taskID, todoListID, newStatus))
  }

  const addTask = (title: string, todoListID: string) => dispatch(addTaskAC(title, todoListID));

  const addTodolist = (title: string, todoListID: string) => dispatch(addTodoListAC(title, todoListID));

  const changeTodoListTitle = (title: string, todoListID: string) => dispatch(changeTodoListTitleAC(title, todoListID));

  const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => dispatch(changeTodoListFilterAC(filter, todoListID));

  const removeTodoList = (todoListID: string) => dispatch(removeTodoListAC(todoListID));

  const todolistRender = todoLists.map(tl => {
    // let filteredTasks: TaskType[] = tasks[tl.id];
    // if (tl.filter === 'active') {
    //   filteredTasks = tasks[tl.id].filter(t => t.isDone === false)
    // }
    // if (tl.filter === 'completed') {
    //   filteredTasks = tasks[tl.id].filter(t => t.isDone === true)
    // }
    return (
      <Grid item key={tl.id}>
        <Paper elevation={6} style={{ marginRight: '5px', padding: '5px' }} >
          <TodoListWithRedux todoList={tl} 

            // id={tl.id}
            // filter={tl.filter}
            // title={tl.title}
            // tasks={filteredTasks}
            // addTask={addTask}
            // removeTask={removeTask}
            // removeTodoList={removeTodoList}
            // changeTaskTitle={changeTaskTitle}
            // changeTaskStatus={changeTaskStatus}
            // changeTodoListTitle={changeTodoListTitle}
            // changeTodoListFilter={changeTodoListFilter}
          />
        </Paper>
      </Grid>
    )
  })
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TodoLists
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <AddItemForm addItem={addTodolist} />
      <Grid container xs={12} item spacing={6} style={{ display: 'flex', justifyContent: 'center' }}>
        {todolistRender}
      </Grid>
    </div>
  );
}



