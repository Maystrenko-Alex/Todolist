import React, { useState } from 'react';
import { v1 } from 'uuid';
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


  // const todoListTitle = 'What to learn';

  // let [tasks, setTasks] = useState<TaskType[]>([
  //   { id: v1(), title: 'HTML&CSS', isDone: true },
  //   { id: v1(), title: 'JS', isDone: true },
  //   { id: v1(), title: 'React', isDone: false },
  //   { id: v1(), title: 'Redux', isDone: false },
  //   { id: v1(), title: 'RTK', isDone: false }
  // ])

  // const [filter, setFilter] = useState<FilterValuesType>('all');


  const removeTask = (taskID: string, todoListId: string) => {
    // let copyState = {...tasks}
    // copyState = copyState[todoListId].filter(t => t.id !== taskID)
    // setTasks(copyState)
    setTasks({ ...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskID) })
  }

  const changeTaskStatus = (taskID: string, todoListId: string, newStatus: boolean) => {
    let copyState = { ...tasks }
    copyState[todoListId] = copyState[todoListId].map(t => t.id === taskID ? { ...t, isDone: newStatus } : t)
    setTasks(copyState)
    // setTasks(tasks.map(t => (t.id === taskID) ? { ...t, isDone: newStatus } : t))
  }

  const addTask = (title: string, todoListId: string) => {
    setTasks({ ...tasks, [todoListId]: [...tasks[todoListId], { id: v1(), title, isDone: false }] })
    // setTasks([...tasks, { id: v1(), title, isDone: false }])
  }

  const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
    let copyState = [...todoLists]
    setTodoLists(copyState.map(t => t.id === todoListId ? { ...t, filter } : t))
  }

  const removeTodoList = (todoListId: string) => {
    setTodoLists(todoLists.filter(t => t.id !== todoListId))
    delete tasks[todoListId]
  }

  // let taskForTodoList = tasks;
  // if (filter === 'active') {
  //   taskForTodoList = tasks.filter(t => t.isDone === false)
  // }
  // if (filter === 'completed') {
  //   taskForTodoList = tasks.filter(t => t.isDone === true)
  // }

  const todolistRender = todoLists.map(tl => {
    let filteredTasks: TaskType[] = tasks[tl.id];
    if (tl.filter === 'active') {
      filteredTasks = tasks[tl.id].filter(t => t.isDone === false)
    }
    if (tl.filter === 'completed') {
      filteredTasks = tasks[tl.id].filter(t => t.isDone === true)
    }
    return (
      <TodoList
        key={tl.id}
        id={tl.id}
        filter={tl.filter}
        title={tl.title}
        tasks={filteredTasks}
        addTask={addTask}
        removeTask={removeTask}
        removeTodoList={removeTodoList}
        changeTaskStatus={changeTaskStatus}
        changeTodoListFilter={changeTodoListFilter}
      />
    )
  })
  return (
    <div className="App">
      {todolistRender}
    </div>
  );
}



