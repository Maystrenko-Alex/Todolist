import React, { useState } from 'react';
import './App.css';
import { TodoList } from './TodoList';

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
  const todoListTitle = 'What to learn';

  let [tasks, setTasks] = useState<TaskType[]>([
    { id: 0, title: 'HTML&CSS', isDone: true },
    { id: 1, title: 'JS', isDone: true },
    { id: 2, title: 'React', isDone: false },
    { id: 3, title: 'Redux', isDone: false },
    { id: 4, title: 'RTK', isDone: false }
  ])

  const [filter, setFilter] = useState<FilterValuesType>('all');

  let taskForTodoList = tasks;
  if (filter === 'active') {
    taskForTodoList = tasks.filter(t => t.isDone === false)
  }
  if (filter === 'completed') {
    taskForTodoList = tasks.filter(t => t.isDone === true)
  }

  const removeTask = (taskID: number) => {
    setTasks(tasks.filter(t => t.id !== taskID))
  }

  const updateTask = (taskID: number) => {
    setTasks(tasks.map(t => (t.id === taskID) ? { ...t, isDone: !t.isDone } : t))
  }

  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter)
  }
  return (
    <div className="App">
      <TodoList
        title={todoListTitle}
        tasks={taskForTodoList}
        removeTask={removeTask}
        updateTask={updateTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
