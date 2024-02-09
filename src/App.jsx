import { useState } from 'react'
import TodoSingle from './components/TodoSingle'
import AllTodos from './components/AllTodos'
import CreateTodo from './components/CreateTodo';
function App() {
  const [count, setCount] = useState(0)
  const todoList = [
    {
      _id: "1",
      title: "Complete React project",
      description: "Finish coding the React project and submit it.",
      isCompleted: false,
      createdAt: "2024-01-28T09:00:00",
    },
    {
      _id: "2",
      title: "Read a book",
      description: "Spend 30 minutes reading a book to relax.",
      isCompleted: true,
      createdAt: "2024-01-28T10:30:00",
    },
    {
      _id: "3",
      title: "Exercise",
      description: "Go for a 30-minute jog or do a quick home workout.",
      isCompleted: false,
      createdAt: "2024-01-28T12:00:00",
    },
  ];
  
  return (
    <>
    <AllTodos todos={todoList}/>
   {/* <CreateTodo /> */}
    </>
  )
}

export default App
