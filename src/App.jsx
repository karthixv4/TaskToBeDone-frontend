import Sidebar from "./components/Sidebar";
import AllTodos from "./components/AllTodos";
import Spinner from "./components/Spinner";
import { Routes, Route, useNavigate } from 'react-router-dom';
import DbSpinner from "./components/DbSpinner";
import { useRecoilValue } from "recoil";
import { showSpinner } from "./store/atoms/todoAtoms";
import { Suspense } from "react";
import {Signup} from './components/Signup';
import {Signin} from './components/Signin';
import {useEffect,useState} from "react";
import Cookies from 'js-cookie';

function App() {
  const navigate = useNavigate();
  const [flag, setFlag] = useState();
  function Home(){
    async function verifyJWT() {
      // const secret = new TextEncoder().encode("VICKY");
      const token = Cookies.get("todoToken");
      console.log("TOKEN: ", token)
      if(!token){
        setFlag(false);
        navigate("/signin")
      }else{
        setFlag(true);
      }
    }
    useEffect(() => {
      verifyJWT();
    }, []);
    return(
      <>
      {flag && <div className="flex flex-row">
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
    </div>}
      </>
      
    )
   
  }

  const spinner = useRecoilValue(showSpinner);
  return (
    <>
      {spinner && <DbSpinner />}
      <Routes>
      {/* <Switch> */}
        <Route exact path="/" element={<Signup />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route path="/home" element={<Home /> } />
      {/* </Switch> */}
    </Routes>
      
    </>
  );
}

export default App;
