import React from 'react';
import { v1 } from 'uuid';
import { TasksStateType } from '../App';
import { AddTaskAC, RemoveTaskAC, REMOVE_TASK, taskReducer, ChangeTaskTitleAC, ChangeTaskStatusAC } from './task-reducer';
import { AddTodoListAC, RemoveTodoListAC } from './todolists-reducer';

test('task should be correct deleted',()=>{
  const todoListId_1 = v1();
  const todoListId_2 = v1();
  const deletedID = v1()
  let initialState: TasksStateType = {
    [todoListId_1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: deletedID, title: 'React', isDone: false },
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
  }

// deleted task with id = deletedID 
let newState = taskReducer(initialState, RemoveTaskAC(deletedID, todoListId_1))
// console.log(newState)
expect(newState[todoListId_1].length).toBe(4)
expect(newState[todoListId_1][2].title).toBe('Redux')

})

test('task should be correct added',()=>{
  const todoListId_1 = v1();
  const todoListId_2 = v1();
  let newTitle = 'new task title'
  let initialState: TasksStateType = {
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
  }

// deleted task with id = deletedID 
let newState = taskReducer(initialState, AddTaskAC(newTitle, todoListId_1))

expect(newState[todoListId_1].length).toBe(6)

})
test('tasktitle should be correct changed',()=>{
  const todoListId_1 = v1();
  const todoListId_2 = v1();
  let currentTaskID = v1()
  let newTitle = 'new task title'
  let initialState: TasksStateType = {
    [todoListId_1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: currentTaskID, title: 'React', isDone: false },
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
  }

// deleted task with id = deletedID 
let newState = taskReducer(initialState, ChangeTaskTitleAC(currentTaskID, todoListId_1, newTitle))

expect(newState[todoListId_1][2].title).toBe('new task title')
expect(newState[todoListId_1].length).toBe(5)
})

test('taskstatus should be correct changed',()=>{
  const todoListId_1 = v1();
  const todoListId_2 = v1();
  let currentTaskID = v1()
  let newStatus = true;
  let initialState: TasksStateType = {
    [todoListId_1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: currentTaskID, title: 'React', isDone: false },
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
  }

// deleted task with id = deletedID 
let newState = taskReducer(initialState, ChangeTaskStatusAC(currentTaskID, todoListId_1, newStatus))

expect(newState[todoListId_1][2].isDone).toBe(true)
expect(newState[todoListId_1].length).toBe(5)
});

test('new array should be added when new todolist is added', () => {
  let initialState: TasksStateType = {
    ['todoListId_1']: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Redux', isDone: false },
      { id: v1(), title: 'RTK', isDone: false }
    ],
    ['todoListId_2']: [
      { id: v1(), title: 'Water', isDone: true },
      { id: v1(), title: 'Beer', isDone: true },
      { id: v1(), title: 'Milk', isDone: false },
      { id: v1(), title: 'Sausage', isDone: false },
      { id: v1(), title: 'Buckwheat', isDone: false }
    ]
  }

  let action = AddTodoListAC('new todolist')

  let endState = taskReducer(initialState, action)


  const keys = Object.keys(endState)
  const newKey = keys.find(k => k != 'todoListId_1' && k != 'todoListId_2')
  if (!newKey) {
      throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})


test('property with todolistId should be deleted', () => {
  const startState: TasksStateType = {
      'todolistId1': [
          {id: '1', title: 'CSS', isDone: false},
          {id: '2', title: 'JS', isDone: true},
          {id: '3', title: 'React', isDone: false}
      ],
      'todolistId2': [
          {id: '1', title: 'bread', isDone: false},
          {id: '2', title: 'milk', isDone: true},
          {id: '3', title: 'tea', isDone: false}
      ]
  }

  const action = RemoveTodoListAC('todolistId2')

  const endState = taskReducer(startState, action)


  const keys = Object.keys(endState)
console.log(endState)
  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
})