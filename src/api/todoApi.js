import axios from "axios";
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: "https://todo-backend.vigneshkarthink.workers.dev",
    headers: {
      'Content-Type': 'application/json',
    },
  });


export const getAllTodos = async()=>{
try{
    const token = Cookies.get('todoToken')
    const response = await api.get('/api/v1/todo/all', {
        headers:{
            'Auth':token
        }
    })
    return response.data;
}catch(error){
    console.error('Error fetching data:', error);
    throw error;
}
}

export const createTodo = async(todo)=>{
    try{
        const token = Cookies.get('todoToken')
        const response = await api.post('/api/v1/todo/createTodo', todo, {
            headers:{
                'Auth':token
            }
        })
        return response.data;
    }catch(error){
        console.error('Error posting data:', error);
        throw error;
    } 
}

export const deleteTodo = async(id)=>{
    try{
        const token = Cookies.get('todoToken')
        const response = await api.delete('/api/v1/todo/delete',{
            headers: {
                'todoId': id,
                'Auth':token
            }
        })
        return response.data;
    }catch(error){
        console.error('Error posting data:', error);
        throw error;
    } 
}

export const updateTodo = async(todo)=>{
    try{
        const token = Cookies.get('todoToken')
        const response = await api.put('/api/v1/todo/updateTodo', todo, {
            headers:{
                'Auth':token
            }
        })
        return response.data;
    }catch(error){
        console.error('Error posting data:', error);
        throw error;
    } 
}