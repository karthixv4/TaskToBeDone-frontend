import TodoSingle from "./TodoSingle";
import { todosAtomFamily, filteredAtomsByCat, showAddTodoModalAtom } from "../store/atoms/todoAtoms";
import { useRecoilValue } from "recoil";
import Category from "./Category";
import CreateTodo from "./CreateTodo";
import { showAddCatModalAtom } from "../store/atoms/categoryAtoms";
import AddCategory from "./AddCategory";

function AllTodos() {
  // const allTodos = useRecoilValue(todosAtomFamily());
  const allTodos = useRecoilValue(filteredAtomsByCat);
  const showAddTodoModal = useRecoilValue(showAddTodoModalAtom);
  const showAddCatModal = useRecoilValue(showAddCatModalAtom);
  // allTodos.map(todo => console.log("todo", todo));

  return (
    <>
<div className="flex flex-col relative w-full">
  <Category />
  <div id="todoContents" className="flex h-full">
    {/* Create a separate container for grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
      {allTodos.map((todo) => (
        <div className="" key={todo._id}>
          <TodoSingle key={todo._id} todo={todo} />
        </div>
      ))}
    </div>

    {/* Position createModal absolutely over the grid container */}
    <div id="createModal" className="absolute left-0 right-0 z-10 flex items-center justify-center">
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
