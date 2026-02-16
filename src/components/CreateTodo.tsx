import "./App.css";
import { useState } from "react";

import { useTodoStore, useThemeStore } from "../store/global.ts";

export default function CreateTodo() {
  const theme = useThemeStore((state) => state.theme);

  const [todo, setTodo] = useState("");

  const addTodo = useTodoStore((state) => state.addTodo);

  const handleAdd = () => {
    if (!todo.trim()) return;
    addTodo(todo);
    setTodo("");
  };

  return (
    <>
      <div
        className={`flex gap-4 items-center rounded-sm px-5 py-1.5 mb-5
        ${theme === "dark" ? "bg-gray-800" : "bg-white"}
        `}
      >
        <div
          onClick={handleAdd}
          className={`w-6 h-5.5 border cursor-pointer rounded-full
            ${theme === "dark" ? "border-gray-700" : "border-gray-300"}
            `}
        ></div>
        <input
          className={`w-full h-10 text-[17px] font-medium  caret-blue-900 border-none outline-none focus:border-none focus:outline-none 
            ${theme === "dark" ? "text-gray-300" : "text-gray-700"}
    `}
          type="text"
          value={todo}
          placeholder="Create a new todo..."
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
          }}
        />
      </div>
    </>
  );
}
