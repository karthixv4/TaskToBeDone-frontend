import { useState } from "react";
import axios from 'axios';
import { useSetRecoilState } from "recoil";
import { categoryAtomFamily } from "../store/atoms/categoryAtoms";
function AddCategory({setShowCatModal}){
const [ catName, setCatName ] = useState('')
const setCategories = useSetRecoilState(categoryAtomFamily())
    const createCategory=async()=>{
        const category = {
            name: catName
        }
        const cat = await axios.post('http://192.168.29.216:3000/api/v1/category/createCategory', category);
        setCategories((prevCats)=>[...prevCats, cat.data.category]);
        console.log(cat.data.category)
        setShowCatModal(false);
    }

return <>
<div className="flex items-center justify-center top-0 bottom-0 left-0 right-0 h-screen fixed">
    {/* In Progress */}
    {/* <div className="absolute top-0 right-0">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
    </div> */}
<div className="flex flex-col border border-gray bg-opacity-25 bg-gray-400 py-10 px-10">
    <input className="p-3 rounded rounded-lg m-5" type="text" onChange={(e)=>setCatName(e.target.value)} placeholder="Name...." />
    <button className="p-2 rounded rounded-full bg-red-300" onClick={createCategory}>Create</button>
</div>
</div>
</>
}

export default AddCategory;