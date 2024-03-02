import axios from "axios";

const api = axios.create({
  baseURL: "https://todo-backend.vigneshkarthink.workers.dev",
  // baseURL : "http://127.0.0.1:8787",
  headers: {
    "Content-Type": "application/json",
  },
});

export const signUpUser =async(user)=>{
   try{
    const response = await api.post('/auth/v1/user/signup', user);
    return response.data
   }catch(error){
    console.error('Error creating user:', error);
    throw error;
   } 
}

export const signInUser = async(user)=>{
  try{
    console.log("Inapi: ",user)
    const response = await api.post('/auth/v1/user/signin', {}, {
      headers: {
        email: user.email,
        password: user.password
      }
    });
    return response.data
  }catch(error){
    console.error('Error signing in :', error);
    throw error;
   } 
}