
import React, { useEffect, useState } from 'react'
import { todolistAPI } from '../api/todolist-api'

export default {
    title: 'API'
}

// const settings = {
//     withCredentials: true,
//     'API-KEY': 'fc90e319-a20b-418d-9648-645c6c049dd5'
// }
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        // axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        todolistAPI.getTodolist()
            .then(response => setState(response))

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', { title: 'newtodo9' }, settings)
        todolistAPI.createTodolist()
            .then(response => setState(response))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${"e93f18dd-57db-4022-a978-5a8a821b7582"}`, settings)
        todolistAPI.deleteTodolist('f855dc31-2e67-4c6e-b07a-592f1e1a067c')
        .then(res => setState(res))
        
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${"6eaf1307-28d8-42fc-84ce-3462add557d3"}`, {title:' todoli444'}, settings)
        todolistAPI.updateTodolistTitle('6eaf1307-28d8-42fc-84ce-3462add557d3', 'todoli555')
        .then(res => setState(res))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


