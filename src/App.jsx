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
    {spinner && <DbSpinner/>}
      <div className="flex flex-row">
        <Suspense fallback={<Spinner />}>
        <Sidebar />
        <AllTodos />
        </Suspense>
      </div>
    </>
  );
}

export default App;
