import {
  BookCheck,
  Newspaper,
  ListTodo,
  BellRing,
  Paperclip,
  Brush,
  Wrench,
  Home,
  Bookmark,
  Users,
  Settings,
} from "lucide-react";
import { useState } from "react";
import AddCategory from "./AddCategory";
import { useRecoilState } from "recoil";
import { showAddTodoModalAtom } from "../store/atoms/todoAtoms";
import { showAddCatModalAtom } from "../store/atoms/categoryAtoms";
function Sidebar() {
  //states for modal todo/cat

  const [ showModal, setShowModal ]  = useRecoilState(showAddTodoModalAtom)
  const [showCatModal, setShowCatModal] = useRecoilState(showAddCatModalAtom);
  //fn for modal show todo/cat
  function onClickModal() {
    showModal ? setShowModal(false) : setShowModal(true);
    console.log(showModal)
  }

  function onClickCatModal() {
    showCatModal ? setShowCatModal(false) : setShowCatModal(true);
  }
  return (
    <>
      {/* //for desktop side bar */}
      <aside className="hidden relative md:flex h-screen w-64 flex-col overflow-y-auto border-r bg-white px-5 py-8">
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
                  <ListTodo className="w-6 h-6 transition-transform transform hover:scale-110 hover:text-black-300 cursor-pointer" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium cursor-pointer">Add Todo</span>
                </a>
              </div>
              <div onClick={onClickCatModal}>
                <a className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors -duration-300 hover:bg-gray-100 hover:text-gray-700">
                  <BookCheck className="w-6 h-6 transition-transform transform hover:scale-110 hover:text-black-300 cursor-pointer" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium cursor-pointer">Add Category</span>
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
            <ListTodo size={24} className="w-6 h-6 transition-transform transform hover:scale-110 hover:text-black-300 cursor-pointer" />
          </a>

          <a
            onClick={onClickCatModal}
            className="rounded-lg p-1.5 text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none"
          >
            <BookCheck size={24} className="w-6 h-6 transition-transform transform hover:scale-110 hover:text-black-300 cursor-pointer" />
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
