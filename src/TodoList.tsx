import { FormEvent } from "react"
import { FilterValuesType, TaskType } from "./App"


type TodoListPropsType = {
  title: string
  tasks: TaskType[]
  removeTask: (taskID: number) => void
  updateTask: (taskID: number) => void
  changeFilter: (filter: FilterValuesType) => void
}

export const TodoList = (props: TodoListPropsType) => {
  const tasksList = props.tasks.map(task => {
    return (
      <li key={task.id}>
        <input type="checkbox" checked={task.isDone} onClick={() => props.updateTask(task.id)} />
        <span>{task.title}</span>
        <button onClick={() => props.removeTask(task.id)}>x</button>
      </li>
    )
  })

  return (
    <div className='wrapper'>
      <h3>{props.title}</h3>
      <div>
        <input></input>
        <button>+</button>
      </div>
      <ul>
        {tasksList}
      </ul>
      <div>
        <button onClick={() => props.changeFilter('all')}>All</button>
        <button onClick={() => props.changeFilter('active')}>Active</button>
        <button onClick={() => props.changeFilter('completed')}>Completed</button>
      </div>
    </div>
  );
}