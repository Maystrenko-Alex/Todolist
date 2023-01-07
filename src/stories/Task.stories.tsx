import { action } from "@storybook/addon-actions";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";
import { TaskType } from "../store/task-reducer";
import Task from "../Task";


export default {
  title: 'TODOLISTS/Task',
  component: Task,
  args: {
    removeTask: action ('task removed'),
    changeTaskStatus: action ('task status changed'),
    changeTaskTitle: action ('task title changed')
  }
} as ComponentMeta<typeof Task>

const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>

export const TaskIsDoneStory = Template.bind({})
TaskIsDoneStory.args = {
  task: {id: '0', title: 'CSS', isDone: true},
}

export const TaskNotIsDoneStory = Template.bind({})
TaskNotIsDoneStory.args = {
  task: {id: '0', title: 'CSS', isDone: false},
}

const ResponsiveTemplate: ComponentStory<typeof Task> = () => {
 const [task, setTask] = useState<TaskType>({id: '0', title: 'CSS', isDone: true})
 const changeTaskTitle = (newTitle: string) => setTask({...task, title: newTitle})
 const changeTaskStatus = () => setTask({...task, isDone: !task.isDone})
 const removeTask = () => setTask({} as TaskType)
  return <Task task={task} changeTaskTitle={changeTaskTitle} changeTaskStatus={changeTaskStatus} removeTask={removeTask}/>
}

export const ResponsiveTaskStory = ResponsiveTemplate.bind({})