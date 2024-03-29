import { useState } from "react";
import { showSpinner } from "../store/atoms/todoAtoms";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  showAddTodoModalAtom,
  todosAtomFamily,
  selectedCatAtom
} from "../store/atoms/todoAtoms";
import { createTodo } from '../api/todoApi'
function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const setTodos = useSetRecoilState(todosAtomFamily());
  const setSpinner = useSetRecoilState(showSpinner)
  const setShowTodoModal = useSetRecoilState(showAddTodoModalAtom);
  const currentCat = useRecoilValue(selectedCatAtom);
  const handleCreateTodo = async (e) => {
    setSpinner(true);
    e.preventDefault();
    const newTodo = {
      title: title,
      description: description,
      isCompleted: false,
      createdAt: new Date().toLocaleString(),
      dueAt: new Date().toLocaleString(),
    };
    if(currentCat.id !== 'allTodos'){
      newTodo.categoryId = currentCat.id;
    }
    const res = await createTodo(newTodo);
    setTodos((previousTodos) => [...previousTodos, res.todo]);
    setShowTodoModal(false);
    setSpinner(false);
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        {/* Main modal */}
        <div id="crud-modal" tabIndex="-1" aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-900 bg-opacity-50">
          <div className="relative p-4 w-full max-w-xl max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add a Task
                </h3>
                <button
                  type="button"
                  onClick={() => setShowTodoModal(false)}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3 transition-transform transform hover:scale-110 hover:text-red-600 cursor-pointer"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <form className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Task Name"
                      required=""
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      onChange={(e) => setDescription(e.target.value)}
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write more about the task here"
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={handleCreateTodo}
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Add Todo
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateTodo;
