import axios from "axios";

type TaskType = {
    id: string,
    title: string,
    description: null,
    todoListId: string,
    order: number,
    status: number,
    priority: number,
    startDate: null,
    deadline: null,
    addedDate: Date
}

type GetTasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: null | string
}
type ResponseType<D = {}> = {
    data: D,
    messages: string[],
    resultCode: number
}

const instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'fc90e319-a20b-418d-9648-645c6c049dd5'
    }
})

export const taskAPI = {
    getTasks(todolistId: string) {
        return instanse.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`).then(res => res.data)
    },

    createTask(todolistId: string) {
        return instanse.post<ResponseType<{ items: TaskType[] }>>(`/todo-lists/${todolistId}/tasks`, { title: `${new Date().getHours()} : ${new Date().getMinutes()}` })
    },

    deleteTask(todolistId: string, taskId: string) {
        return instanse.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },

    updateTaskTitle(todolistId: string, taskId: string, newTitle: string) {
        return instanse.put<ResponseType<{ items: TaskType[] }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, { title: newTitle })
    }
}

