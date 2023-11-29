import axios from "axios"

type TodoListType = {
    id: string,
    title: string,
    addedDate: Date,
    order: number
}
type ResponseType<D = {}> = {
    data: D,
    messages:[],
    fieldsErrors:[],
    resultCode: number
}
const instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'fc90e319-a20b-418d-9648-645c6c049dd5'
    }
})

export const todolistAPI = {
    getTodolist() {
        return instanse.get<Array<TodoListType>>('todo-lists').then(res => res.data);
    },

    createTodolist(title: string = 'newtodo1') {
        return instanse.post<ResponseType<{item: TodoListType}>>('todo-lists', { title }).then(res => res.data);
    },

    deleteTodolist(todolistId: string) {
        return instanse.delete<ResponseType>(`todo-lists/${todolistId}`).then(res => res.data);
    },

    updateTodolistTitle(todolistId: string, title: string = 'new Todo') {
        return instanse.put<ResponseType>(`todo-lists/${todolistId}`, { title }).then(res => res.data);
    }
}