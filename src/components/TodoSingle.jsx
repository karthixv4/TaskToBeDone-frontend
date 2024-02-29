import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { todosAtomFamily } from "../store/atoms/todoAtoms";
import { categoryAtomFamily } from "../store/atoms/categoryAtoms";
import { deleteTodo, updateTodo } from '../api/todoApi';
import { Unlink, Check } from 'lucide-react';
import { showSpinner } from "../store/atoms/todoAtoms";
function TodoSingle({ todo }) {
  //useState Stuffs
  const { title, description, isCompleted, createdAt } = todo;
  const setSpinner = useSetRecoilState(showSpinner)
  //for title field
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  //for description field
  const [isDescEditable, setIsDescEditable] = useState(false);
  const [editedDesc, setEditedDesc] = useState(description);

  //for editing
  const [editedCompleted, setEditedCompleted] = useState(isCompleted);
  const [showCategoriesList, setShowCategoriesList] = useState(false);
  //

  //RECOIL Stuffs
  const setTodos = useSetRecoilState(todosAtomFamily());
  const [getTodoCategories, setTodoCategories] = useRecoilState(
    categoryAtomFamily()
  );
  // console.log("tdodo: ",todo)

  async function deleteThisTodo(id) {
    setSpinner(true)
    await deleteTodo(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    setSpinner(false)
  }

  async function updateThisTodo(toUpdateTodo) {
    setSpinner(true)
    const res = await updateTodo(toUpdateTodo)
    console.log("Res from todo api: ", res);
    setTodos((prevTodos) =>
      prevTodos.map((singleTodo) =>
        singleTodo.id === res.updatedTodo.id ? res.updatedTodo : singleTodo
      )
    );
    setSpinner(false)
  }


  async function unlinkCategory(categoryId, todoId) {
    const res = await axios.put(
      `http://192.168.29.216:3000/api/v1/category/unlinkTodo?catId=${categoryId}&todoId=${todoId}`
    );
    console.log("Res from unlink cat api: ", res.data.category);
    setTodoCategories((prevCat) =>
      prevCat.map((singleCat) =>
        singleCat.id === res.data.category.id ? res.data.category : singleCat
      )
    );
  }


  const handleEditDesc = () => {
    setIsDescEditable(true);
  };

  const handleTitleUpdate = () => {
    const newTodo = {
      ...todo,
      createdAt: new Date().toLocaleString(),
      title: editedTitle,
    };
    updateThisTodo(newTodo);
    setIsTitleEditable(false);
  };

  const handleDescUpdate = () => {
    const newTodo = {
      ...todo,
      createdAt: new Date().toLocaleString(),
      description: editedDesc,
    };
    updateThisTodo(newTodo);
    setIsDescEditable(false);
  };

  const handleCompletedUpdate = () => {
    setEditedCompleted(!editedCompleted);
    const newTodo = {
      ...todo,
      createdAt: new Date().toLocaleString(),
      isCompleted: !editedCompleted,
    };

    updateThisTodo(newTodo);
  };

  function showCategories() {
    showCategoriesList
      ? setShowCategoriesList(false)
      : setShowCategoriesList(true);
  }

  async function updateCategories(value){
    showCategories();
    const newTodo = {
      ...todo,
      categoryId: parseInt(value,10),
    };
    updateThisTodo(newTodo);
  }

  function unlinkThisCategory(catId) {
    const newTodo = {
      ...todo,
      category: null,
      categoryId: null
    };
    updateThisTodo(newTodo);
  }

  function deleteTodoCat(todo) {
    todo.category
      ? unlinkCategory(todo.category.id, todo.id)
      : console.log("Nothing here");
    deleteThisTodo(todo.id);
  }

  const handleTitleClick = () => {
    setIsTitleEditable(true);
  };

  return (
    <>
      <div className="max-w-screen-md mx-auto p-8">
        <div className="max-w-md py-6 px-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex-none">
              {/* <p className="text-gray-700 text-sm left-0">{createdAt}</p> */}
            </div>
            <div className="grid grid-cols-10">
              <div className="col-start-1 col-end-6">
                {todo?.category && (
                  <div className="flex items-center mb-3">
                    <span className=" flex-col items-center bg-gray-300 rounded-xl px-3 py-2 mr-2 group">
                      {todo?.category?.name}
                    </span>
                    <Unlink
                      onClick={() => unlinkThisCategory(todo?.category?.id)}
                      className="transition-transform transform hover:scale-110 hover:text-red-400 cursor-pointer"
                    />
                  </div>
                )}
              </div>
              <div className="col-start-8 col-end-9">
                <div className="cols-span-5">
                  {showCategoriesList && (
                    <div className="cols-span-5">
                      <select
                        className="rounded-full px-2 w-full"
                        onChange={(e) => updateCategories(e.target.value)}
                      >
                        <option value="">Choose</option>
                        {getTodoCategories.map((categories) => (
                          <option value={categories.id} key={categories.id}>
                            {categories.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <div
                  className="ml-2 cursor-pointer "
                  onClick={showCategories}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 transition-transform transform hover:scale-110 hover:text-green-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6h.008v.008H6V6Z"
                    />
                  </svg>
                </div>
              </div>
              <div
                className="ml-2 cursor-pointer"
                // onClick={() => deleteTodo(todo._id)}
                onClick={() => deleteTodoCat(todo)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 transition-transform transform hover:scale-110 hover:text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                  />
                </svg>
              </div>
            </div>


          <div className="flex items-center px-6">
            {!editedCompleted && isTitleEditable ? (
              <div className="flex items-center ">
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white cursor-text underline"
                />
                <Check
                  onClick={handleTitleUpdate}
                  className="ml-2 cursor-pointer"
                />
              </div>
            ) : (
              <h5
                className={`mb-2 ${editedCompleted ? "line-through" : ""} text-2xl font-semibold tracking-tight text-gray-900 dark:text-white cursor-pointer`}
                onClick={handleTitleClick}
              >
                {editedTitle}
              </h5>
            )}
          </div>
          {/* Description Section */}
          <div className="flex items-center px-6">
            {!editedCompleted && isDescEditable ? (
              <div className="flex items-center ">
                <textarea
                  type="text"
                  value={editedDesc}
                  onChange={(e) => setEditedDesc(e.target.value)}
                  className="mb-3 font-normal text-gray-500 dark:text-gray-400 cursor-text underline"
                />
                {!editedCompleted && isDescEditable && (
                  <div
                    className="ml-2 cursor-pointer"
                    onClick={handleDescUpdate}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ) : (
              <article className="text-wrap overflow-hidden">
                <p
                  className={`mb-3  ${editedCompleted ? "line-through" : ""} font-normal text-gray-500 dark:text-gray-400 cursor-pointer`}
                  onClick={handleEditDesc}
                >
                  {editedDesc}
                </p>
              </article>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="rounded-full bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={handleCompletedUpdate}
            >
              {editedCompleted ? "Restart" : "Completed"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoSingle;
