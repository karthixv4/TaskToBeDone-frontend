import react, { useState } from "react";
import TodoSingle from "./TodoSingle";
import { todosAtomFamily, filteredAtomsByCat } from "../store/atoms/todoAtoms";
import { useRecoilValue } from "recoil";
import CreateTodo from "./CreateTodo";
import AddCategory from "./AddCategory";
import Category from "./Category";

function AllTodos() {
  // const allTodos = useRecoilValue(todosAtomFamily());
  const allTodos = useRecoilValue(filteredAtomsByCat)
  const [showModal, setShowModal] = useState(false);

  const [showCatModal, setShowCatModal] = useState(false);
  // allTodos.map(todo => console.log("todo", todo));
  function onClickModal() {
    showModal ? setShowModal(false) : setShowModal(true);
  }

  function onClickCatModal() {
    showCatModal ? setShowCatModal(false) : setShowCatModal(true);
  }
  return (
    <>
      <div className="flex justify-around pt-10">
        <h1 className="text-center text-grey-800 text-lg">All Todos</h1>
        <button
          className="border border-gray-400 bg-green-400"
          onClick={onClickModal}
        >
          Add Todo
        </button>
        <button
          className="border broder-blue-500 bg-yellow-300 text-red-400"
          onClick={onClickCatModal}
        >
          Add Category
        </button>
      </div>
      <Category />
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
        {allTodos.map((todo) => (
          <div className="" key={todo._id}>
            <TodoSingle key={todo._id} todo={todo} />
          </div>
        ))}
      </div>
      {showModal ? <CreateTodo setShowModal={setShowModal} /> : <></>}
      {showCatModal ? <AddCategory setShowCatModal={setShowCatModal} /> : <></>}
    </>
  );
}

export default AllTodos;
