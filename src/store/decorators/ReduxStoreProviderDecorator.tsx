import { Provider } from "react-redux"
import { combineReducers, legacy_createStore } from "redux"
import { v1 } from "uuid"
import { AppRootStateType } from "../store"
import { taskReducer } from "../task-reducer"
import { todolistsReducer } from "../todolists-reducer"

const rootReducer = combineReducers({
  tasks: taskReducer,
  todoLists: todolistsReducer
})
const todolists1 = v1()
const todolists2 = v1()
const initialGlobalState = {
  todoLists: [
      {id: todolists1, title: 'What to learn', filter: 'all'},
      {id: todolists2, title: 'What to buy', filter: 'all'}
  ],
  tasks: {
      [todolists1]: [
          {id: v1(), title: 'HTML&CSS', isDone: false},
          {id: v1(), title: 'JS', isDone: true}
      ],
      [todolists2]: [
          {id: v1(), title: 'Milk', isDone: true},
          {id: v1(), title: 'React Book', isDone: false}
      ]
  }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)
export const  ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) => {
  return <Provider store={storyBookStore} >
    {storyFn()}
  </Provider>
}