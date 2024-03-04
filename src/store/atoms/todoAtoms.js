import { atomFamily, selector, selectorFamily,atom } from "recoil";
import { getAllTodos } from '../../api/todoApi'
export const todosAtomFamily = atomFamily({
    key: "todosAtomFamily",
    default: selectorFamily({
        key: "todosSelectorFamily",
        get: ()=> async()=>{
          const res = await getAllTodos();
          return res.todos;
        }
    })
})

export const selectedCatAtom = atom({
  key: 'selectedAtom',
  default: ({
      cat: 'All',
      id: 'allTodos'
  })
})

export const filteredAtomsByCat = selector({
  key: 'fileteredAtomByCat',
  get: ({get}) => {
    const cat = get(selectedCatAtom);
    const todos = get(todosAtomFamily());

    if(todos && cat.id === 'allTodos'){
      return todos;
    } else if(todos) {
     return todos.filter((todo)=> todo?.category?.id === cat.id);
    }
  }
})

export const showAddTodoModalAtom = atom({
  key: 'showAddTodoModalAtom',
  default: false
})

export const showSpinner = atom({
  key: 'showSpinner',
  default: false
})