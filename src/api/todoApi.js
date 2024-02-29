import axios from "axios";

const api = axios.create({
    baseURL: "https://todo-backend.vigneshkarthink.workers.dev",
    headers: {
      'Content-Type': 'application/json',
    },
  });


export const getAllTodos = async()=>{
try{
    const response = await api.get('/api/v1/todo/all')
    return response.data;
}catch(error){
    console.error('Error fetching data:', error);
    throw error;
}
}

export const createTodo = async(todo)=>{
    try{
        const response = await api.post('/api/v1/todo/createTodo', todo)
        return response.data;
    }catch(error){
        console.error('Error posting data:', error);
        throw error;
    } 
}

export const deleteTodo = async(id)=>{
    try{
        const response = await api.delete('/api/v1/todo/delete',{
            headers: {
                'todoId': id
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
        const response = await api.put('/api/v1/todo/updateTodo', todo)
        return response.data;
    }catch(error){
        console.error('Error posting data:', error);
        throw error;
    } 
}