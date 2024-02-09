import axios from "axios";
import { atomFamily, selectorFamily, atom } from "recoil";

export const categoryAtomFamily = atomFamily({
    key: 'categoryAtomFamily',
    default: selectorFamily({
        key: 'categorySelectorFamily',
        get : ()=> async()=>{
            const cat = await axios.get('http://localhost:3000/api/v1/category/getAll');
            return cat.data.categories;
        }
    })
})