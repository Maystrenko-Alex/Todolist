import { title } from 'process';
import { v1 } from 'uuid';
import { TodoListType, FilterValuesType } from './../App';
export const ADD_TODOLIST = 'ADD-TODOLIST'
export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
type ActionType = RemoveTodoListAT | ChangeTodoListTitleAT | AddTodoListAT | ChangeTodoListFilterAT;

export type RemoveTodoListAT = {
  type: 'REMOVE-TODOLIST',
  todoListID: string
}
type ChangeTodoListTitleAT = {
  type: 'CHANGE-TODOLIST-TITLE'
  title: string
  todoListID: string
}
export type AddTodoListAT = {
  type: 'ADD-TODOLIST'
  title: string
  todoListID: string
}
type ChangeTodoListFilterAT = {
  type: 'CHANGE-TODOLIST-FILTER'
  filter: FilterValuesType
  todoListID: string
}

export const todolistsReducer = (todolists: TodoListType[], action: ActionType): TodoListType[] => {
  switch (action.type) {
    case REMOVE_TODOLIST:
      return todolists.filter(tl => tl.id !== action.todoListID);
    case ADD_TODOLIST:
      if (todolists.length < 6) {
        return [{ id: action.todoListID, title: action.title, filter: 'all' }, ...todolists];
      } else {
        return todolists
      };
    case 'CHANGE-TODOLIST-TITLE':
      return todolists.map(tl => tl.id === action.todoListID ? { ...tl, title: action.title } : tl)
    case 'CHANGE-TODOLIST-FILTER':
      return todolists.map(t => t.id === action.todoListID ? { ...t, filter: action.filter } : t)
    default:
      return todolists;
  }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => ({ type: REMOVE_TODOLIST, todoListID: id })

export const AddTodoListAC = (title: string): AddTodoListAT => ({ type: ADD_TODOLIST, title, todoListID: v1() })

export const ChangeTodoListTitleAC = (title: string, id: string): ChangeTodoListTitleAT => ({
  type: 'CHANGE-TODOLIST-TITLE',
  title,
  todoListID: id
})

export const ChangeTodoListFilterAC = (filter: FilterValuesType, id: string): ChangeTodoListFilterAT => ({
  type: 'CHANGE-TODOLIST-FILTER',
  filter,
  todoListID: id
})


