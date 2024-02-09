import {useState} from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { todosAtomFamily } from "../store/atoms/todoAtoms";
function CreateTodo({setShowModal}){
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const setTodos = useSetRecoilState(todosAtomFamily());
const handleCreateTodo=async()=>{
    const newTodo = {
        title: title,
        description: description,
        isCompleted: false,
        createdAt: new Date().toLocaleTimeString(),
        dueAt: new Date().toLocaleTimeString()
    }
   const res = await axios.post("http://localhost:3000/api/v1/createTodo", newTodo)
   setTodos((previousTodos)=>[...previousTodos, res.data.todo]);
   setShowModal(false)
}
    return <>
    <div className="flex items-center justify-center h-screen fixed top-0 left-0 right-0 bottom-0">
        <div className="py-10 px-20 relative border border-gray-300 rounded-lg bg-black bg-opacity-10">
            <div className="absolute top-0 right-0 cursor-pointer p-2" onClick={()=>setShowModal(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>

            </div>
      <h2>Add a todo</h2>
      <div className="flex flex-col">
        <input className="mb-5 border border-gray-400 rounded-md p-1 pl-2" 
                type="text"   
                id="title"    
                placeholder="Title"
                onChange={(e)=>setTitle(e.target.value)}          />
        <textarea className="mb-5 border border-gray-400 rounded-md p-1 pl-2" 
                    type="description" 
                    id="title" 
                    placeholder="...."
                    onChange={(e)=>setDescription(e.target.value)} />
      </div>
      <div className="flex justify-center">
        <button className="border border-red-200 bg-green-400 pt-1 pr-5 pl-5 pb-1 rounded-lg"
                onClick={handleCreateTodo}
        >Add</button>
      </div>
    </div>
    </div>
    </>
}

export default CreateTodo;