import { v1 } from "uuid";
import { addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, FilterValuesType, removeTodoListAC, todolistsReducer, TodoListType } from "./todolists-reducer";

let todolistId1: string;
let todolistId2: string;

let startState: Array<TodoListType>
beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  startState = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" }
  ]
})

test('correct todolist should be removed', () => {

  const endState = todolistsReducer(startState, removeTodoListAC(todolistId1))

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {

  let newTodolistTitle = "New Todolist";

  const endState = todolistsReducer(startState, addTodoListAC(newTodolistTitle, v1()))

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolists title should be changed', () => {

  let newTodolistTitle = "New Todolistddd";

  const endState = todolistsReducer(startState, changeTodoListTitleAC(newTodolistTitle, todolistId1))

  expect(endState.length).toBe(2);
  expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolists filter should be changed', () => {

  let newTodolistFilter: FilterValuesType = "active";

  const endState = todolistsReducer(startState, changeTodoListFilterAC(newTodolistFilter, todolistId1))

  expect(endState.length).toBe(2);
  expect(endState[0].filter).toBe(newTodolistFilter);
  expect(endState[1].filter).toBe('all');
});