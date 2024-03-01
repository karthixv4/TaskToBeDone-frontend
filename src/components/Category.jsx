import { useRecoilState, useSetRecoilState } from "recoil";
import { categoryAtomFamily } from "../store/atoms/categoryAtoms";
import {
  selectedCatAtom,
  todosAtomFamily,
} from "../store/atoms/todoAtoms";
import { deleteCategory } from "../api/categoryApi";
import { showSpinner } from '../store/atoms/todoAtoms'
import {useEffect} from "react";
function Category() {
  const [getCategories, setCategories] = useRecoilState(categoryAtomFamily());
  const [selectedCat, setSelectedCat] = useRecoilState(selectedCatAtom);
  const setTodos = useSetRecoilState(todosAtomFamily());
  const setSpinner = useSetRecoilState(showSpinner)

  async function deleteCategories(cat) {
    setSpinner(true);
    const res = await deleteCategory(cat.id);
    console.log("RES: ", res)
    //If the DB delete is successful, we follow that by removing the items from state as well
    if (res) {
      if (cat?.todos?.length) {
        cat.todos.forEach((thisTodo) => {
          setTodos((prevTodos) =>
            prevTodos.filter((todo) => todo.id !== thisTodo)
          );
        });
      }
     
      setCategories((prevCats) => prevCats.filter((category) => category.id !== cat.id));
    }
    setSpinner(false);
  }
  return (
    <>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 w-full mx-5 mr-20">
        <ul className="flex justify-start space-x-5 overflow-x-auto">
          <li className="flex flex-row items-center cursor-pointer">
            <h1
              onClick={() =>
                setSelectedCat({ cat: "All", id: "allTodos" })
              }
              className={`inline-block py-5 px-1 ${
                selectedCat.id === "allTodos"
                  ? "text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                  : "border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
              aria-current={selectedCat.id === "allTodos" ? "page" : undefined}
            >
              All todos
            </h1>
          </li>
          {getCategories.map((category) => (
            <div key={category.id}>
              <li className="flex flex-row items-center">
                <button
                  onClick={() => setSelectedCat(category)}
                  className={`inline-block py-5 px-1  ${
                    selectedCat.id === category.id
                      ? "cursor-pointer text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                      : "border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  }`}
                  aria-current={
                    selectedCat.id === category.id ? "page" : undefined
                  }
                >
                  {category.name}
                </button>
                {/* svg for delete */}
                <div
                  onClick={() => deleteCategories(category)}
                  className="ml-2 cursor-pointer"
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
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
              </li>
            </div>
          ))}

        </ul>
      </div>
    </>
  );
}
export default Category;
