
import axios from 'axios'
const api = axios.create({
    baseURL: "https://todo-backend.vigneshkarthink.workers.dev",
    headers: {
      'Content-Type': 'application/json',
    },
  });


export const getAllCategories = async()=>{
try{
    const response = await api.get('/api/v1/todo/all')
    return response.data;
}catch(error){
    console.error('Error fetching data:', error);
    throw error;
}
}
const testApi = async () => {
  try {
    const categories = await getAllCategories();
    console.log('Categories:', categories);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Call the testApi function
testApi();