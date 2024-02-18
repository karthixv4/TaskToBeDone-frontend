import Sidebar from "./components/Sidebar";
import AllTodos from "./components/AllTodos";
function App() {
  return (
    <>
      <div className="flex flex-row">
        <Sidebar />
        <AllTodos />
      </div>
    </>
  );
}

export default App;
