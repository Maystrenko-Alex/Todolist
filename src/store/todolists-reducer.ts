
export const ADD_TODOLIST = 'ADD-TODOLIST'
export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export type TodolistActionType = RemoveTodoListAT | ChangeTodoListTitleAT | AddTodoListAT | ChangeTodoListFilterAT;

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

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}
// export const todoListID_1 = v1();
// export const todoListID_2 = v1();

const initialState: TodoListType[]  = [
  // { id: todoListID_1, title: 'What to learn', filter: 'all' },
  // { id: todoListID_2, title: 'What to buy', filter: 'all' },
]
export const todolistsReducer = (state: TodoListType[] = initialState, action: TodolistActionType): TodoListType[] => {
  
  switch (action.type) {
    case REMOVE_TODOLIST:
      return state.filter(tl => tl.id !== action.todoListID);
    case ADD_TODOLIST:
      if (state.length < 5) {
        return [{ id: action.todoListID, title: action.title, filter: 'all' }, ...state];
      } else {
        return [...state]
      };
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(tl => tl.id === action.todoListID ? { ...tl, title: action.title } : tl)
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(t => t.id === action.todoListID ? { ...t, filter: action.filter } : t)
    default:
      return state;
  }
}

export const removeTodoListAC = (id: string): RemoveTodoListAT => ({ type: REMOVE_TODOLIST, todoListID: id })

export const addTodoListAC = (title: string, todoListID: string): AddTodoListAT => ({ type: ADD_TODOLIST, title, todoListID})

export const changeTodoListTitleAC = (title: string, id: string): ChangeTodoListTitleAT => ({
  type: 'CHANGE-TODOLIST-TITLE',
  title,
  todoListID: id
})

export const changeTodoListFilterAC = (filter: FilterValuesType, id: string): ChangeTodoListFilterAT => ({
  type: 'CHANGE-TODOLIST-FILTER',
  filter,
  todoListID: id
})

