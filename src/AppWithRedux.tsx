import { AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddItemForm from './AddItemForm';
import './App.css';
import { addTodoListAC, TodoListType } from './store/todolists-reducer';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './store/store';
import { useDispatch } from 'react-redux';
import TodoListWithRedux from './TodoListWithRedux';

export function AppWithRedux() {
  
  const todoLists = useSelector<AppRootStateType, TodoListType[]>(store => store.todoLists)
  const dispatch = useDispatch()

  const addTodolist = (title: string, todoListID: string) => dispatch(addTodoListAC(title, todoListID));

  const todolistRender = todoLists.map(tl => {
    return (
      <Grid item key={tl.id}>
        <Paper elevation={6} style={{ marginRight: '5px', padding: '5px' }} >
          <TodoListWithRedux todoList={tl} />
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



