import { useState } from "react";
import { BookCheck, ListTodo, LogOut } from "lucide-react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { showAddTodoModalAtom } from "../store/atoms/todoAtoms";
import { showAddCatModalAtom } from "../store/atoms/categoryAtoms";
import { logoutAlert } from "../store/atoms/userAtoms";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { googleLogout } from '@react-oauth/google';
function Sidebar() {
  //states for modal todo/cat
  const navigate = useNavigate();
  const [showModal, setShowModal] = useRecoilState(showAddTodoModalAtom);
  const [showCatModal, setShowCatModal] = useRecoilState(showAddCatModalAtom);
  const [showlogoutModal, setShowLogoutModal] = useState(false);
  const logOutAlert = useSetRecoilState(logoutAlert);
  function logout() {
    Cookies.remove("todoToken");
    googleLogout();
    logOutAlert(true);
    navigate("/signin");
  }

  //fn for modal show todo/cat
  function onClickModal() {
    showModal ? setShowModal(false) : setShowModal(true);
    console.log(showModal);
  }

  function onClickCatModal() {
    showCatModal ? setShowCatModal(false) : setShowCatModal(true);
  }

  const toggleModal = () => {
    console.log("clicked");
    setShowLogoutModal(true);
  };

  const hideModal = () => {
    setShowLogoutModal(false);
  };
   function LogoutPopup() {
    return (
      <>
        {showlogoutModal && (
          <div
            id="popup-modal"
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-gray-900 bg-opacity-50"
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
                    Are you sure you want to logout ?
                  </h3>
                  <button
                    onClick={logout}
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  >
                    Yes, I'm sure
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
    <LogoutPopup />
      {/* //for desktop side bar */}
      <aside className="hidden relative md:flex h-screen w-64 flex-col overflow-y-auto border-r bg-white px-5 py-8 fixed left-0 top-0">
        <a href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="46"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-check-circle"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="m9 11 3 3L22 4" />
          </svg>
        </a>
        <div className="mt-6 flex flex-1 flex-col justify-between">
          <nav className="-mx-3 space-y-6 ">
            <div className="space-y-3 ">
              <label className="px-3 text-xs font-semibold uppercase text-gray-900">
                Create Something
              </label>
              <div onClick={onClickModal}>
                <a className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700">
                  <ListTodo
                    className="w-6 h-6 transition-transform transform hover:scale-110 hover:text-black-300 cursor-pointer"
                    aria-hidden="true"
                  />
                  <span className="mx-2 text-sm font-medium cursor-pointer">
                    Add Todo
                  </span>
                </a>
              </div>
              <div onClick={onClickCatModal}>
                <a className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors -duration-300 hover:bg-gray-100 hover:text-gray-700">
                  <BookCheck
                    className="w-6 h-6 transition-transform transform hover:scale-110 hover:text-black-300 cursor-pointer"
                    aria-hidden="true"
                  />
                  <span className="mx-2 text-sm font-medium cursor-pointer">
                    Add Category
                  </span>
                </a>
              </div>
              <div onClick={toggleModal}>
                <a className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors -duration-300 hover:bg-gray-100 hover:text-gray-700">
                  <LogOut
                    className="w-6 h-6 transition-transform transform hover:scale-110 hover:text-black-300 cursor-pointer"
                    aria-hidden="true"
                  />
                  <span className="mx-2 text-sm font-medium cursor-pointer">
                    Log out
                  </span>
                </a>
              </div>
            </div>
            {/* <div className="space-y-3 ">
                <label className="px-3 text-xs font-semibold uppercase text-gray-900">content</label>
                <a
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  href="#"
                >
                  <Newspaper className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">Blogs</span>
                </a>
                <a
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  href="#"
                >
                  <BellRing className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">Notifications</span>
                </a>
                <a
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  href="#"
                >
                  <Paperclip className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">Checklists</span>
                </a>
              </div>
    
              <div className="space-y-3 ">
                <label className="px-3 text-xs font-semibold uppercase text-gray-900">
                  Customization
                </label>
                <a
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  href="#"
                >
                  <Brush className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">Themes</span>
                </a>
                <a
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  href="#"
                >
                  <Wrench className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">Setting</span>
                </a>
              </div> */}
          </nav>
        </div>
      </aside>

      {/* //for mobile sidebar */}
      <aside className="md:hidden relative flex h-screen w-16 flex-col items-center overflow-y-auto border-r bg-white py-8 fixed">
        <nav className="flex flex-1 flex-col items-center space-y-6">
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="46"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-check-circle"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="m9 11 3 3L22 4" />
            </svg>
          </a>
          {/* <a
            href="#"
            className="rounded-lg p-1.5 text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none"
          >
            <Home size={24} />
          </a> */}

          <a
            onClick={onClickModal}
            className="rounded-lg p-1.5 text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none"
          >
            <ListTodo
              size={24}
              className="w-6 h-6 transition-transform transform hover:scale-110 hover:text-black-300 cursor-pointer"
            />
          </a>

          <a
            onClick={onClickCatModal}
            className="rounded-lg p-1.5 text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none"
          >
            <BookCheck
              size={24}
              className="w-6 h-6 transition-transform transform hover:scale-110 hover:text-black-300 cursor-pointer"
            />
          </a>

          <a
            onClick={toggleModal}
            className="rounded-lg p-1.5 text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none"
          >
            <LogOut
              size={24}
              className="w-6 h-6 transition-transform transform hover:scale-110 hover:text-black-300 cursor-pointer"
            />
          </a>

          {/* <a
          href="#"
          className="rounded-lg p-1.5 text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none"
        >
          <Bookmark size={24} />
        </a>

        <a
          href="#"
          className="rounded-lg p-1.5 text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none"
        >
          <Users size={24} />
        </a> */}
        </nav>

        {/* <div className="flex flex-col items-center space-y-6">
          <a
            href="#"
            className="rounded-lg bg-gray-100 p-1.5 text-gray-700 transition-colors duration-200 focus:outline-none"
          >
            <Settings size={24} />
          </a>

          <a href="#">
            <img
              className="h-8 w-8 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
              alt="User avatar"
            />
          </a> */}
        {/* </div> */}
      </aside>
    </>
  );
}

export default Sidebar;
