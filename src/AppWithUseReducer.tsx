import { AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Reducer, useReducer } from 'react';
import { v1 } from 'uuid';
import AddItemForm from './AddItemForm';
import './App.css';
import { TodoList } from './TodoList';
import { addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC, TodolistActionType, todolistsReducer } from './store/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskActionType, taskReducer } from './store/task-reducer';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [todoListId: string]: TaskType[]
}

export function AppWithUseReducer() {
  const todoListID_1 = v1();
  const todoListID_2 = v1();

  const [todoLists, dispatchToTodolists] = useReducer<Reducer<TodoListType[], TodolistActionType>>(todolistsReducer, [
    { id: todoListID_1, title: 'What to learn', filter: 'all' },
    { id: todoListID_2, title: 'What to buy', filter: 'all' },
  ])

  const [tasks, dispatchToTasks] = useReducer<Reducer<TasksStateType, TaskActionType>>(taskReducer, {
    [todoListID_1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Redux', isDone: false },
      { id: v1(), title: 'RTK', isDone: false }
    ],
    [todoListID_2]: [
      { id: v1(), title: 'Water', isDone: true },
      { id: v1(), title: 'Beer', isDone: true },
      { id: v1(), title: 'Milk', isDone: false },
      { id: v1(), title: 'Sausage', isDone: false },
      { id: v1(), title: 'Buckwheat', isDone: false }
    ]
  })

  const removeTask = (taskID: string, todoListID: string) => dispatchToTasks(removeTaskAC(taskID, todoListID));

  const changeTaskTitle = (taskID: string, todoListID: string, newTitle: string) => {
    dispatchToTasks(changeTaskTitleAC(taskID, todoListID, newTitle));
  }

    const changeTaskStatus = (taskID: string, todoListID: string, newStatus: boolean) => {
      dispatchToTasks(changeTaskStatusAC(taskID, todoListID, newStatus))
    }

    const addTask = (title: string, todoListID: string) => dispatchToTasks(addTaskAC(title, todoListID));

    const addTodolist = (title: string, todoListID: string) => {
      dispatchToTodolists(addTodoListAC(title, todoListID));
      dispatchToTasks(addTodoListAC(title, todoListID))
    }

    const changeTodoListTitle = (title: string, todoListID: string) => dispatchToTodolists(changeTodoListTitleAC(title, todoListID));

    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => dispatchToTodolists(changeTodoListFilterAC(filter, todoListID));

    const removeTodoList = (todoListID: string) => {
      let action = removeTodoListAC(todoListID)
      dispatchToTodolists(action);
      dispatchToTasks(action);
    } 

    const todolistRender = todoLists.map(tl => {
      let filteredTasks: TaskType[] = tasks[tl.id];
      if (tl.filter === 'active') {
        filteredTasks = tasks[tl.id].filter(t => t.isDone === false)
      }
      if (tl.filter === 'completed') {
        filteredTasks = tasks[tl.id].filter(t => t.isDone === true)
      }
      return (
        <Grid item key={tl.id}>
          <Paper elevation={6} style={{ marginRight: '5px', padding: '5px' }} >
            <TodoList

              id={tl.id}
              filter={tl.filter}
              title={tl.title}
              tasks={filteredTasks}
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
        <Grid container xs={12} spacing={6} style={{ display: 'flex', justifyContent: 'center' }}>
          {todolistRender}
        </Grid>
      </div>
    );
  }



