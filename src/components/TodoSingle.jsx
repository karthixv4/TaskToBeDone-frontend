import React, { useState } from "react";
import axios from "axios";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { todosAtomFamily } from "../store/atoms/todoAtoms";
import { categoryAtomFamily } from "../store/atoms/categoryAtoms";
function TodoSingle({ todo }) {
  //useState Stuffs
  const { title, description, isCompleted, createdAt } = todo;

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

  async function deleteTodo(id) {
    await axios.delete(`http://localhost:3000/api/v1/deleteTodo?id=${id}`);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
  }

  async function updateTodo(toUpdateTodo) {
    const res = await axios.put(
      "http://localhost:3000/api/v1/updateTodo",
      toUpdateTodo
    );
    console.log("Res from todo api: ", res.data);
    setTodos((prevTodos) =>
      prevTodos.map((singleTodo) =>
        singleTodo._id === res.data.todo._id ? res.data.todo : singleTodo
      )
    );
  }

  async function linkCategory(categoryId, todoId) {
    const res = await axios.put(
      `http://localhost:3000/api/v1/category/linkTodo?catId=${categoryId}&todoId=${todoId}`
    );
    console.log("Res from link cat api: ", res.data.category);
    setTodoCategories((prevCat) =>
      prevCat.map((singleCat) =>
        singleCat._id === res.data.category._id ? res.data.category : singleCat
      )
    );
    return res.data.category;
  }
  async function unlinkCategory(categoryId, todoId) {
    const res = await axios.put(
      `http://localhost:3000/api/v1/category/unlinkTodo?catId=${categoryId}&todoId=${todoId}`
    );
    console.log("Res from unlink cat api: ", res.data.category);
    setTodoCategories((prevCat) =>
      prevCat.map((singleCat) =>
        singleCat._id === res.data.category._id ? res.data.category : singleCat
      )
    );
  }

  const handleEditTitle = () => {
    setIsTitleEditable(true);
  };

  const handleEditDesc = () => {
    setIsDescEditable(true);
  };

  const handleTitleUpdate = () => {
    const newTodo = {
      ...todo,
      createdAt: new Date().toLocaleString(),
      title: editedTitle,
    };
    updateTodo(newTodo);
    setIsTitleEditable(false);
  };

  const handleDescUpdate = () => {
    const newTodo = {
      ...todo,
      createdAt: new Date().toLocaleString(),
      description: editedDesc,
    };
    updateTodo(newTodo);
    setIsDescEditable(false);
  };

  const handleCompletedUpdate = () => {
    setEditedCompleted(!editedCompleted);
    const newTodo = {
      ...todo,
      createdAt: new Date().toLocaleString(),
      isCompleted: editedCompleted,
    };

    updateTodo(newTodo);
  };

  function showCategories() {
    showCategoriesList
      ? setShowCategoriesList(false)
      : setShowCategoriesList(true);
  }

  async function updateCategories(value) {
    const cat = await linkCategory(value, todo._id);
    showCategories();
    const newTodo = {
      ...todo,
      category: cat,
    };
    updateTodo(newTodo);
  }

  function deleteCategory(catId) {
    unlinkCategory(catId, todo._id);
    const newTodo = {
      ...todo,
      category: null,
    };
    updateTodo(newTodo);
  }

  function deleteTodoCat(todo){
    todo.category ? unlinkCategory(todo.category._id, todo._id) : console.log("Nothing here");
    deleteTodo(todo._id);
  }
  return (
    <>
      <div className="px-5 py-5">
        <div className="text-red-600 max-w border border-gray-400 rounded-md bg-green-300">
          <div className="p-2 flex justify-between overflow-hidden">
            <div className="flex-none">
              <p className="text-gray-700 text-sm left-0">{createdAt}</p>
            </div>
            <div className="flex flex-end">
              {showCategoriesList && (
                <div className="flex-none">
                  <select
                    className="rounded-full px-2 w-full"
                    onChange={(e) => updateCategories(e.target.value)}
                  >
                    <option value="">Choose</option>
                    {getTodoCategories.map((categories) => (
                      <option value={categories._id} key={categories._id}>
                        {categories.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="ml-2 cursor-pointer" onClick={showCategories}>
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
                    d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6h.008v.008H6V6Z"
                  />
                </svg>
              </div>
              <div
                className="ml-2 cursor-pointer"
                // onClick={() => deleteTodo(todo._id)}
                onClick={()=>deleteTodoCat(todo)}
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
                    d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                  />
                </svg>
              </div>
            </div>
          </div>
          {todo?.category && (
            <div className="flex items-center">
              <span className="relative inline-block bg-red-300 rounded-full px-2 py-1 mr-5 group">
                {todo?.category?.name}
                <div
                  className="opacity-0 group-hover:opacity-100 absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-5 cursor-pointer"
                  onClick={() => deleteCategory(todo?.category?._id)}
               
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    {/* Your SVG code for the cross icon */}
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="6" y1="18" x2="18" y2="6" />
                  </svg>
                </div>
              </span>
            </div>
          )}

          <div className="px-6 py-4 ">
            <div className="flex flex-wrap justify-center">
              {isTitleEditable ? (
                <div className="flex flex-wrap">
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="border-b-2 focus:outline-none focus:border-green-500"
                  />
                  <div className="ml-2" onClick={handleTitleUpdate}>
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
                </div>
              ) : (
                <div onClick={handleEditTitle}>
                  {" "}
                  <h3 className="font-bold text-red-500 text-center text-xl">
                    {title}
                  </h3>{" "}
                </div>
              )}
            </div>
            <div className="flex flex-wrap justify-center">
              {isDescEditable ? (
                <div className="flex flex-wrap">
                  <textarea
                    type="text"
                    value={editedDesc}
                    onChange={(e) => setEditedDesc(e.target.value)}
                    className="border-b-2 focus:outline-none focus:border-green-500"
                  />
                  <div className="ml-2" onClick={handleDescUpdate}>
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
                </div>
              ) : (
                <div onClick={handleEditDesc}>
                  <p className="text-gray-600 text-lg text-base px-7 py-5">
                    {description}
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-center space-x-10">
              <button onClick={handleCompletedUpdate}>
                {editedCompleted ? "done already" : "done"}
              </button>
              {/* <button onClick={onEdit}>{isEditable ? "done" : "edit"}</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoSingle;
