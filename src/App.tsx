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

export function App() {
  const todoListTitle = 'What to learn';

  let [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },
    { id: v1(), title: 'RTK', isDone: false }
  ])
  
  const [filter, setFilter] = useState<FilterValuesType>('all');

  let taskForTodoList = tasks;
  if (filter === 'active') {
    taskForTodoList = tasks.filter(t => t.isDone === false)
  }
  if (filter === 'completed') {
    taskForTodoList = tasks.filter(t => t.isDone === true)
  }

  const removeTask = (taskID: string) => {
    setTasks(tasks.filter(t => t.id !== taskID))
  }

  const updateTask = (taskID: string) => {
    setTasks(tasks.map(t => (t.id === taskID) ? { ...t, isDone: !t.isDone } : t))
  }

  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter)
  }

  const addTask = (title: string) => {
    setTasks([...tasks, {id: v1(), title, isDone: false}])
  }

  return (
    <div className="App">
      <TodoList
        title={todoListTitle}
        tasks={taskForTodoList}
        addTask={addTask}
        removeTask={removeTask}
        updateTask={updateTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}



