import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { categoryAtomFamily } from "../store/atoms/categoryAtoms";
import {
  selectedCatAtom,
  filteredAtomsByCat,
  todosAtomFamily,
} from "../store/atoms/todoAtoms";
import axios from "axios";
function Category() {
  const [getCategories, setCategories] = useRecoilState(categoryAtomFamily());
  const [selectedCat, setSelectedCat] = useRecoilState(selectedCatAtom);
  const setTodos = useSetRecoilState(todosAtomFamily());
  const filteredTodos = useRecoilValue(filteredAtomsByCat);
  const resetCat = useResetRecoilState(selectedCatAtom);
  function resetCatState() {
    resetCat();
  }

  async function deleteCategories(cat) {
    console.log("CAT: ", cat);
    const res = await axios.delete(
      "http://192.168.29.216:3000/api/v1/category/deleteCategory",
      {
        data: cat,
      }
    );
    //If the DB delete is successful, we follow that by removing the items from state as well
    if (res.status === 200) {
      if (cat.todos.length) {
        cat.todos.forEach((thisTodo) => {
          setTodos((prevTodos) =>
            prevTodos.filter((todo) => todo._id !== thisTodo)
          );
        });
      }
      setCategories((prevCats) =>
        prevCats.filter((category) => category._id !== cat._id)
      );
    }
  }
  return (
    <>
      <div className="flex justify-start space-x-5">
        <h1 onClick={resetCatState}>All todos</h1>
        {getCategories.map((category) => (
          <div key={category._id}>
            <button
              onClick={() => setSelectedCat(category)}
              key={category._id}
              className="text-green-500"
            >
              {category.name}
            </button>
            {/* svg for delete */}
            <div onClick={() => deleteCategories(category)}>
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
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default Category;
