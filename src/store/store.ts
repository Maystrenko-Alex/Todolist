
import { combineReducers, compose, legacy_createStore, createStore} from "redux";
import { taskReducer, TasksStateType } from "./task-reducer";
import { todolistsReducer, TodoListType } from "./todolists-reducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const rootReducer = combineReducers({
  tasks: taskReducer,
  todoLists: todolistsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = legacy_createStore(rootReducer, composeEnhancers());
// export const store = createStore(rootReducer, composeEnhancers());

// создали стор, его структура ниже
// {
//   state: {
//     tasks: {}
//     todoLists: []
//   },
//   getState ()
//   dispatch ()
//   subscribe ()
// }

export type AppRootStateType = {
  tasks: TasksStateType,
  todoLists: TodoListType[]
}

// export type AppRootStateType = ReturnType<typeof rootReducer>
// @ts-ignore
window.store = store;