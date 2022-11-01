import { FilterValuesType } from './../App';
import { v1 } from "uuid";
import { TodoListType } from "../App";
import { AddTodoListAC, ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC, todolistsReducer } from "./todolists-reducer";

test('correct todolist should be removed', () => {
  //
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: Array<TodoListType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" }
  ]
  //
  const endState = todolistsReducer(startState, RemoveTodoListAC(todolistId1))
  //
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {
  //
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = "New Todolist";

  const startState: Array<TodoListType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" }
  ]
  //
  const endState = todolistsReducer(startState, AddTodoListAC( newTodolistTitle, v1()))
  //
  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolists title should be changed', () => {
  //
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = "New Todolistddd";

  const startState: Array<TodoListType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" }
  ]
  //
  const endState = todolistsReducer(startState, ChangeTodoListTitleAC( newTodolistTitle, todolistId1 ))
  //
  expect(endState.length).toBe(2);
  expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolists filter should be changed', () => {
  //
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistFilter: FilterValuesType = "active";

  const startState: Array<TodoListType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" }
  ]
  //
  const endState = todolistsReducer(startState, ChangeTodoListFilterAC( newTodolistFilter, todolistId1) )
  //
  expect(endState.length).toBe(2);
  expect(endState[0].filter).toBe(newTodolistFilter);
  expect(endState[1].filter).toBe('all');
});