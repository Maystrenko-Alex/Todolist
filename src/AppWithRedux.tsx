import { AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddItemForm from './AddItemForm';
import './App.css';
import { addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, FilterValuesType, removeTodoListAC, TodoListType } from './store/todolists-reducer';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './store/store';
import { useDispatch } from 'react-redux';
// import TodoListWithRedux from './TodoListWithRedux';
import { useCallback } from 'react';
import { TodoList } from './TodoList';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksStateType } from './store/task-reducer';

export function AppWithRedux() {
  const tasks = useSelector<AppRootStateType, TasksStateType>(store => store.tasks)
  const todoLists = useSelector<AppRootStateType, TodoListType[]>(store => store.todoLists)
  const dispatch = useDispatch()

  const addTodolist = useCallback((title: string, todoListID: string) =>
    dispatch(addTodoListAC(title, todoListID)), [dispatch]);

  const removeTask = useCallback((taskID: string, todoListID: string) =>
    dispatch(removeTaskAC(taskID, todoListID)), [dispatch]);

  const changeTaskTitle = useCallback((taskID: string, todoListID: string, newTitle: string) => {
    dispatch(changeTaskTitleAC(taskID, todoListID, newTitle));
  }, [dispatch])

  const changeTaskStatus = useCallback((taskID: string, todoListID: string, newStatus: boolean) => {
    dispatch(changeTaskStatusAC(taskID, todoListID, newStatus))
  }, [dispatch])

  const addTask = useCallback((title: string, todoListID: string) => dispatch(addTaskAC(title, todoListID)), [dispatch]);


  const changeTodoListTitle = useCallback((title: string, todoListID: string) =>
    dispatch(changeTodoListTitleAC(title, todoListID)), [dispatch]);

  const changeTodoListFilter = useCallback((filter: FilterValuesType, todoListID: string) =>
    dispatch(changeTodoListFilterAC(filter, todoListID)), [dispatch]);

  const removeTodoList = useCallback((todoListID: string) => dispatch(removeTodoListAC(todoListID)), [dispatch]);
  const todolistRender = todoLists.map(tl => {
    return (
      <Grid item key={tl.id}>
        <Paper elevation={6} style={{ marginRight: '5px', padding: '5px' }} >
          {/* <TodoListWithRedux todoList={tl} /> */}
          <TodoList
            id={tl.id}
            title={tl.title}
            tasks={tasks[tl.id]}
            filter={tl.filter}
            addTask={addTask}
            removeTask={removeTask}
            removeTodoList={removeTodoList}
            changeTaskTitle={changeTaskTitle}
            changeTaskStatus={changeTaskStatus}
            changeTodoListTitle={changeTodoListTitle}
            changeTodoListFilter={changeTodoListFilter}
          />
        </Paper>
      </Grid>
    )
  });

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



