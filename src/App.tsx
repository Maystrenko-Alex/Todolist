import { AppBar, Button, Container, Divider, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';
import { v1 } from 'uuid';
import AddItemForm from './AddItemForm';
import './App.css';
import { TodoList } from './TodoList';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed';

type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksStateType = {
  [todoListId: string]: TaskType[]
}

export function App() {
  const todoListId_1 = v1();
  const todoListId_2 = v1();

  const [todoLists, setTodoLists] = useState<TodoListType[]>([
    { id: todoListId_1, title: 'What to learn', filter: 'all' },
    { id: todoListId_2, title: 'What to buy', filter: 'all' },
  ])

  const [tasks, setTasks] = useState<TasksStateType>({
    [todoListId_1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Redux', isDone: false },
      { id: v1(), title: 'RTK', isDone: false }
    ],
    [todoListId_2]: [
      { id: v1(), title: 'Water', isDone: true },
      { id: v1(), title: 'Beer', isDone: true },
      { id: v1(), title: 'Milk', isDone: false },
      { id: v1(), title: 'Sausage', isDone: false },
      { id: v1(), title: 'Buckwheat', isDone: false }
    ]
  })

  const removeTask = (taskID: string, todoListId: string) => {
    setTasks({ ...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskID) })
  }

  const changeTaskTitle = (newTitle: string, taskId: string, todoListId: string) => {
    setTasks({ ...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? { ...t, title: newTitle } : t) })
  }

  const changeTaskStatus = (taskID: string, todoListId: string, newStatus: boolean) => {
    let copyState = { ...tasks }
    copyState[todoListId] = copyState[todoListId].map(t => t.id === taskID ? { ...t, isDone: newStatus } : t)
    setTasks(copyState)
  }

  const addTask = (title: string, todoListId: string) => {
    setTasks({ ...tasks, [todoListId]: [...tasks[todoListId], { id: v1(), title, isDone: false }] })
  }

  const addTodolist = (title: string) => {
    if (todoLists.length < 6) {const newTodoListId = v1();
    setTodoLists([{ id: newTodoListId, title, filter: 'all' }, ...todoLists]);
    setTasks({ ...tasks, [newTodoListId]: [] })}
  }

  const changeTodoListTitle = (title: string, todoListId: string) => {
    setTodoLists(todoLists.map(tl => tl.id === todoListId ? { ...tl, title } : tl))
  }

  const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
    let copyState = [...todoLists]
    setTodoLists(copyState.map(t => t.id === todoListId ? { ...t, filter } : t))
  }

  const removeTodoList = (todoListId: string) => {
    setTodoLists(todoLists.filter(t => t.id !== todoListId))
    delete tasks[todoListId]
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
      <Grid item  key={tl.id}>
        <Paper elevation={6} style={{marginRight: '5px', padding: '5px'}} >
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
          {/* <Divider  /> */}
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
        {/* <div className='todoWrapper'> */}
          <Grid container xs={12} spacing={6} style={{display: 'flex', justifyContent: 'center'}}>
            {todolistRender}
          </Grid>
        {/* </div> */}
      
    </div>
  );
}



