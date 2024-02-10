import { atomFamily, selector, selectorFamily,atom } from "recoil";
import axios from 'axios';
export const todosAtomFamily = atomFamily({
    key: "todosAtomFamily",
    default: selectorFamily({
        key: "todosSelectorFamily",
        get: ()=> async()=>{
          const res = await axios.get("http://192.168.29.216:3000/api/v1/allTodos");
          return res.data.todos;
        }
    })
})

export const selectedCatAtom = atom({
  key: 'selectedAtom',
  default: ({
      cat: 'AllTodos',
      _id: 'allTodos'
  })
})

export const filteredAtomsByCat = selector({
  key: 'fileteredAtomByCat',
  get: ({get}) => {
    const cat = get(selectedCatAtom);
    const todos = get(todosAtomFamily());

    if(cat._id === 'allTodos'){
      return todos;
    } else {
     return todos.filter((todo)=> todo?.category?._id === cat._id);
    }
  }
})