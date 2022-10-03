import { ChangeEvent, useState, KeyboardEvent } from "react"
import { FilterValuesType, TaskType } from "./App"


type TodoListPropsType = {
  title: string
  tasks: TaskType[]
  filter: FilterValuesType
  addTask: (title: string) => void
  removeTask: (taskID: string) => void
  changeTaskStatus: (taskID: string, newStatus: boolean) => void
  changeFilter: (filter: FilterValuesType) => void
}

export const TodoList = (props: TodoListPropsType) => {

  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<boolean>(false)

  const tasksList = props.tasks.map(task => {
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(task.id, e.currentTarget.checked)
    }
    return (
      <li key={task.id}>
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={changeTaskStatusHandler} />
        <span className={task.isDone ? 'isDone' : ''}>{task.title}</span>
        <button onClick={() => props.removeTask(task.id)}>x</button>
      </li>
    )
  })
  const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter);
  const addNewTaskHandler = () => {
    if (title.trim()) {
      props.addTask(title.trim());
    } else {
      setError(true);
    }
    setTitle('');
  }
  const onChangeValueInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    error && setError(false)
  }
  const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addNewTaskHandler();
  return (
    <div className='wrapper'>
      <h3>{props.title}</h3>
      <div>
        <input
          className={error ? 'error' : 'notError'}
          value={title}
          onChange={onChangeValueInputHandler}
          onKeyPress={onKeyPressAddTask}
        />

        <button onClick={addNewTaskHandler}>+</button>
        {error && <div className={'errorMessage'}>Title is required!</div>}
      </div>
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