import axios from "axios";
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: "https://todo-backend.vigneshkarthink.workers.dev",
    // baseURL: "http://127.0.0.1:8787",
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const getAllCategories = async()=>{
try{
    const token = Cookies.get('todoToken')
    const response = await api.get('/api/v1/category/all',{
        headers:{
            'Auth':token
        }
    });
    return response.data;
}catch(error){
    console.error('Error fetching data:', error);
    throw error;
}
}

export const createCategory = async(category)=>{
    try{
        const token = Cookies.get('todoToken')
        const response = await api.post('/api/v1/category/createCategory', category,{
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

export const deleteCategory = async(id)=>{
    try{
        const token = Cookies.get('todoToken')
        const response = await api.delete('/api/v1/category/delete',{
            headers: {
                'catId': id,
                'Auth':token
            }
        })
        return response.data;
    }catch(error){
        console.error('Error posting data:', error);
        throw error;
    } 
}