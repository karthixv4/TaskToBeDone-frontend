import TodoSingle from "./TodoSingle";
import {
  todosAtomFamily,
  filteredAtomsByCat,
  showAddTodoModalAtom,
} from "../store/atoms/todoAtoms";
import { useRecoilValue } from "recoil";
import Category from "./Category";
import CreateTodo from "./CreateTodo";
import { showAddCatModalAtom } from "../store/atoms/categoryAtoms";
import AddCategory from "./AddCategory";
import { Suspense } from "react";
import Spinner from "./Spinner";

function AllTodos() {
  // const allTodos = useRecoilValue(todosAtomFamily());
  const allTodos = useRecoilValue(filteredAtomsByCat);
  const showAddTodoModal = useRecoilValue(showAddTodoModalAtom);
  const showAddCatModal = useRecoilValue(showAddCatModalAtom);
  // allTodos.map(todo => console.log("todo", todo));

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="fixed top-0 w-full z-10 bg-white shadow-md">
          {" "}
          {/* Fixed position for Category */}
          <Suspense fallback={<Spinner />}>
            <Category />
          </Suspense>
        </div>
        <div id="todoContents" className="flex h-full">
          {/* Create a separate container for grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-20 md:mt-16">
            {allTodos.map((todo) => (
              <div className="" key={todo.id}>
                <Suspense fallback={<Spinner />}>
                  <TodoSingle key={todo.id} todo={todo} />
                </Suspense>
              </div>
            ))}
          </div>

          {/* Position createModal absolutely over the grid container */}
          <div
            id="createModal"
            className="absolute left-0 right-0 z-10 flex items-center justify-center"
          >
            {/* Center content within createModal using flexbox */}
            <div className="flex flex-col items-center">
              {showAddTodoModal && <CreateTodo />}
              {showAddCatModal && <AddCategory />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllTodos;
