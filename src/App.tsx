import React from 'react';
import './App.css';
import { TodoList } from './TodoList';

function App() {
  const todoListTitle_1 = 'What to learn'
  const tasks_1 = [
    { id: 0, title: 'HTML&CSS', isDone: true},
    { id: 1, title: 'JS', isDone: true},
    { id: 2, title: 'React', isDone: false}
  ] 
  const todoListTitle_2 = 'What to buy'
  const tasks_2 = [
    { id: 0, title: 'Meet', isDone: true},
    { id: 1, title: 'Beer', isDone: true},
    { id: 2, title: 'Fish', isDone: false}
  ]
  return (
    <div className="App">
      <TodoList title={todoListTitle_1} tasks={tasks_1} />
      <TodoList title={todoListTitle_2} tasks={tasks_2}/>
    </div>
  );
}

export default App;
