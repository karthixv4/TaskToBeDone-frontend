import { atomFamily, selectorFamily, atom } from "recoil";
import { getAllCategories } from '../../api/categoryApi'
export const categoryAtomFamily = atomFamily({
    key: 'categoryAtomFamily',
    default: selectorFamily({
        key: 'categorySelectorFamily',
        get : ()=> async()=>{
            const cat = await getAllCategories();
            return cat.categories;
        }
    })
})

export const showAddCatModalAtom = atom({
    key: 'showAddCatModalAtom',
    default: false
})