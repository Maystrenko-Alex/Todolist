import { combineReducers, legacy_createStore } from "redux";
import { taskReducer, TasksStateType } from "./task-reducer";
import { todolistsReducer, TodoListType } from "./todolists-reducer";

const rootReducer = combineReducers({
  tasks: taskReducer,
  todoLists: todolistsReducer
})
export const store = legacy_createStore(rootReducer);

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