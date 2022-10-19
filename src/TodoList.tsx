import { ChangeEvent } from "react"
import AddItemForm from "./AddItemForm"
import { FilterValuesType, TaskType } from "./App"
import { EditableSpan } from "./EditableSpan"


type TodoListPropsType = {
  id: string
  title: string
  tasks: TaskType[]
  filter: FilterValuesType
  removeTodoList: (todoListId: string) => void
  addTask: (title: string, todoListId: string) => void
  removeTask: (taskID: string, todoListId: string) => void
  changeTodoListTitle: (title: string, todoListId: string) => void
  changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
  changeTaskStatus: (taskID: string, todoListId: string, newStatus: boolean) => void
  changeTaskTitle: (title: string, taskId: string, todoListId: string) => void
}

export const TodoList = (props: TodoListPropsType) => {

  const tasksList = props.tasks.map(task => {
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(task.id, props.id, e.currentTarget.checked)
    }
    const changeTaskTitle = (newTitle: string) => props.changeTaskTitle(newTitle, task.id, props.id);
    return (
      <li key={task.id}>
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={changeTaskStatusHandler} />
        <EditableSpan title={task.title} changeTitle={changeTaskTitle} />
        <button onClick={() => props.removeTask(task.id, props.id)}>x</button>
      </li>
    )
  })
  const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.id);
  const removeTodoList = () => props.removeTodoList(props.id)

  const changeTodoListTitle = (newTitle: string) => props.changeTodoListTitle(newTitle, props.id);
  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }
  return (
    <div className='wrapper'>
      <h3>
        <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
        <button onClick={removeTodoList}>x</button>
      </h3>
      <AddItemForm addItem={addTask} />

      <ul>
        {props.tasks.length ? tasksList : <span>Your taskslist is empty...</span>}
      </ul>
      <div className={'btnBlock'}>
        <button className={(props.filter === 'all') ? 'activeBtn' : ''} onClick={handlerCreator('all')}>All</button>
        <button className={props.filter === 'active' ? 'activeBtn' : ''} onClick={handlerCreator('active')}>Active</button>
        <button className={props.filter === 'completed' ? 'activeBtn' : ''} onClick={handlerCreator('completed')}>Completed</button>
      </div>
    </div>
  );
}