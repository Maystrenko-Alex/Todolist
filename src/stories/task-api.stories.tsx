
import React, { useEffect, useState } from 'react'
import { taskAPI } from '../api/task-api';

export default {
    title: 'API'
}

// const settings = {
//     withCredentials: true,
//     'API-KEY': 'fc90e319-a20b-418d-9648-645c6c049dd5'
// }
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        // axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        taskAPI.getTasks('f2097243-c90c-4bf4-923d-c825531be9dd')
            .then(response => setState(response))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', { title: 'newtodo9' }, settings)
        taskAPI.createTask('f2097243-c90c-4bf4-923d-c825531be9dd')
            .then(response => setState(response))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${"e93f18dd-57db-4022-a978-5a8a821b7582"}`, settings)
        taskAPI.deleteTask('f2097243-c90c-4bf4-923d-c825531be9dd', 'abc21559-c473-43fd-94ec-f9f0bf22f1e1')
        .then(res => setState(res))
        
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${"6eaf1307-28d8-42fc-84ce-3462add557d3"}`, {title:' todoli444'}, settings)
        taskAPI.updateTaskTitle('f2097243-c90c-4bf4-923d-c825531be9dd', '91bcc17e-082f-4fe0-a253-34b46772ec60', 'changedTitle')
        .then(res => setState(res))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


