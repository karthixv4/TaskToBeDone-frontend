import axios from "axios";

const api = axios.create({
    baseURL: "https://todo-backend.vigneshkarthink.workers.dev",
    headers: {
      'Content-Type': 'application/json',
    },
  });


export const getAllCategories = async()=>{
try{
    const response = await api.get('/api/v1/category/all');
    return response.data;
}catch(error){
    console.error('Error fetching data:', error);
    throw error;
}
}

export const createCategory = async(category)=>{
    try{
        const response = await api.post('/api/v1/category/createCategory', category)
        return response.data;
    }catch(error){
        console.error('Error posting data:', error);
        throw error;
    } 
}

export const deleteCategory = async(id)=>{
    try{
        const response = await api.delete('/api/v1/category/delete',{
            headers: {
                'catId': id
            }
        })
        return response.data;
    }catch(error){
        console.error('Error posting data:', error);
        throw error;
    } 
}