import { v1 } from 'uuid';
import { AddTodoListAT, ADD_TODOLIST, REMOVE_TODOLIST, RemoveTodoListAT } from './todolists-reducer';

export const REMOVE_TASK = 'REMOVE-TASK';
export const ADD_TASK = 'ADD-TASK';
export const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE';
export const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS';
type RemoveTaskAT = {
  type: 'REMOVE-TASK'
  taskID: string
  todoListID: string
}
type AddTaskAT = {
  type: 'ADD-TASK'
  taskTitle: string
  todoListID: string
}
type ChangeTaskTitleAT = {
  type: 'CHANGE-TASK-TITLE'
  taskID: string
  todoListID: string
  newTitle: string
}
type ChangeTaskStatusAT = {
  type: 'CHANGE-TASK-STATUS'
  taskID: string
  todoListID: string
  newStatus: boolean
}
export type TaskActionType = RemoveTaskAT | AddTaskAT | ChangeTaskTitleAT | ChangeTaskStatusAT | AddTodoListAT | RemoveTodoListAT;

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TasksStateType = {
  [todoListId: string]: TaskType[]
}


const initialState: TasksStateType = {
  // [todoListID_1]: [
  //   { id: v1(), title: 'HTML&CSS', isDone: true },
  //   { id: v1(), title: 'JS', isDone: true },
  //   { id: v1(), title: 'React', isDone: false },
  //   { id: v1(), title: 'Redux', isDone: false },
  //   { id: v1(), title: 'RTK', isDone: false }
  // ],
  // [todoListID_2]: [
  //   { id: v1(), title: 'Water', isDone: true },
  //   { id: v1(), title: 'Beer', isDone: true },
  //   { id: v1(), title: 'Milk', isDone: false },
  //   { id: v1(), title: 'Sausage', isDone: false },
  //   { id: v1(), title: 'Buckwheat', isDone: false }
  // ]
}
export const taskReducer = (state: TasksStateType = initialState, action: TaskActionType): TasksStateType => {
  
  switch (action.type) {
    case REMOVE_TASK:
      return { ...state, [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.taskID) };
    case ADD_TASK:
      return {...state, [action.todoListID]: [{ id: v1(), title: action.taskTitle, isDone: false }, ...state[action.todoListID]] }
       case CHANGE_TASK_TITLE:
      return {...state, [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ? {...t, title: action.newTitle} : t)}
    case CHANGE_TASK_STATUS:
      debugger
      return {...state, [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID 
        ? {...t, isDone: action.newStatus} 
        : t) 
      };
    case ADD_TODOLIST:
      return {[action.todoListID] : [], ...state};
    case REMOVE_TODOLIST:
      let copyState = {...state}
      delete(copyState[action.todoListID])
      return {...copyState }
    default:
      return state;
  }
}

export const removeTaskAC = (taskID: string, todoListID: string): RemoveTaskAT => ({ type: REMOVE_TASK, taskID, todoListID })
export const addTaskAC = (taskTitle: string, todoListID: string): AddTaskAT => ({ type: ADD_TASK, taskTitle, todoListID })
export const changeTaskTitleAC = (taskID: string, todoListID: string, newTitle: string): ChangeTaskTitleAT => ({
  type: CHANGE_TASK_TITLE, taskID, todoListID, newTitle
})
export const changeTaskStatusAC = (taskID: string, todoListID: string, newStatus: boolean):ChangeTaskStatusAT => ({
  type: CHANGE_TASK_STATUS, taskID, todoListID, newStatus
})