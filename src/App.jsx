import Sidebar from "./components/Sidebar";
import AllTodos from "./components/AllTodos";
import Spinner from "./components/Spinner";
import DbSpinner from "./components/DbSpinner";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { showSpinner } from "./store/atoms/todoAtoms";
import { Suspense } from "react";

function App() {
  const spinner = useRecoilValue(showSpinner);
  return (
    <>
      {spinner && <DbSpinner />}
      <div className="flex flex-row">
        <div className="fixed left-0 top-0 md:w-64 w-16">
          {" "}
          {/* Adjust width for mobile */}
          <Sidebar />
        </div>
        <div className="ml-16 md:ml-64">
          {/* Add margin for desktop */}
          <Suspense fallback={<Spinner />}>
            <AllTodos />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default App;
