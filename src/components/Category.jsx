import { useRecoilState, useSetRecoilState } from "recoil";
import { categoryAtomFamily } from "../store/atoms/categoryAtoms";
import {
  selectedCatAtom,
  todosAtomFamily,
} from "../store/atoms/todoAtoms";
import { deleteCategory } from "../api/categoryApi";
import { showSpinner } from '../store/atoms/todoAtoms'
import {useState} from "react";
function Category() {
  const [getCategories, setCategories] = useRecoilState(categoryAtomFamily());
  const [selectedCat, setSelectedCat] = useRecoilState(selectedCatAtom);
  const setTodos = useSetRecoilState(todosAtomFamily());
  const setSpinner = useSetRecoilState(showSpinner)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [thisCategory, setThisCategory] = useState();
  async function deleteCategories(cat) {
    setSpinner(true);
    const res = await deleteCategory(cat.id);
    //If the DB delete is successful, we follow that by removing the items from state as well
    if (res) {
      if (res?.category?.todos?.length) {
        res.category.todos.forEach((thisTodo) => {
          setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== thisTodo.id));
        });
      }
      setCategories((prevCats) => prevCats.filter((category) => category.id !== cat.id));
    }
    setSelectedCat({ cat: "All", id: "allTodos" })
    setSpinner(false);
  }
  const toggleModal = (category) => {
    setThisCategory(category)
    setShowDeleteModal(true);

  };

  const hideModal = () => {
    setShowDeleteModal(false);
    setThisCategory("");
  };
  function DeletePopup() {
    return (
      <>
        {showDeleteModal && (
          <div
            id="popup-modal"
            tabIndex="-1"
            className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-gray-900 bg-opacity-50"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  onClick={hideModal}
                  className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
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
                <div className="p-4 md:p-5 text-center">
                  <svg
                    className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    This will delete all the associated Todos as well
                  </h3>
                  <button
                    onClick={()=>deleteCategories(thisCategory)}
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  >
                    Yes, Please
                  </button>
                  <button
                    onClick={hideModal}
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-dark:border-gray-dark:hover:text-white dark:hover:bg-gray-dark"
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
          <DeletePopup />
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
                  onClick={()=>toggleModal(category)}
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
