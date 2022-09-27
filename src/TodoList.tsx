import { ChangeEvent, useState, KeyboardEvent } from "react"
import { FilterValuesType, TaskType } from "./App"


type TodoListPropsType = {
  title: string
  tasks: TaskType[]
  addTask: (title: string) => void
  removeTask: (taskID: string) => void
  updateTask: (taskID: string) => void
  changeFilter: (filter: FilterValuesType) => void
}

export const TodoList = (props: TodoListPropsType) => {

  const [title, setTitle] = useState<string>('');

  const tasksList = props.tasks.map(task => {
    return (
      <li key={task.id}>
        <input type="checkbox" checked={task.isDone} onChange={()=> props.updateTask(task.id)} />
        <span>{task.title}</span>
        <button onClick={() => props.removeTask(task.id)}>x</button>
      </li>
    )
  })
  const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter);
  const addNewTaskHandler = () => {
    if (title.trim()) {
      props.addTask(title.trim());
    }
    setTitle('');
  }
  const onChangeValueInputHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
  const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addNewTaskHandler();

  return (
    <div className='wrapper'>
      <h3>{props.title}</h3>
      <div>
        <input
          value={title}
          onChange={onChangeValueInputHandler}
          onKeyPress={onKeyPressAddTask}
        />

        <button onClick={addNewTaskHandler}>+</button>
      </div>
      <ul>
        {tasksList}
      </ul>
      <div>
        <button onClick={handlerCreator('all')}>All</button>
        <button onClick={handlerCreator('active')}>Active</button>
        <button onClick={handlerCreator('completed')}>Completed</button>
      </div>
    </div>
  );
}