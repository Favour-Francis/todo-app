import "./App.css";
import headerLightImg from "/images/bg-desktop-light.jpg";

import headerDarkImg from "/images/bg-desktop-dark.jpg";
import ThemeButton from "./ui/ThemeButton";

import List from "./List.tsx";
import CreateTodo from "./CreateTodo.tsx";
import Bottom from "./Bottom.tsx";
import { useThemeStore } from "../store/global.ts";
import { useEffect } from "react";

function App() {
  const theme = useThemeStore((state) => state.theme);

  

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="h-screen w-full text-lg">
      <header className="sm:h-[calc(36%)] h-[calc(30%)]">
        <img
          className={`size-full
          ${theme === "light" ? "" : "hidden"}`}
          src={headerLightImg}
          alt="header"
        />
        <img
          className={`size-full 
        ${theme === "dark" ? "" : "hidden"}`}
          src={headerDarkImg}
          alt="header"
        />
      </header>
      <main className="todo m-auto sm:w-[calc(550px)] sm:h-[calc(64%)] h-[calc(70%)] sm:-translate-y-49 -translate-y-44 px-10 py-2.5">
        <div className="todo-header font-bold mb-8 flex justify-between">
          <h1 className="text-3xl tracking-[15px] ">TODO</h1>

          <ThemeButton />
        </div>

        <CreateTodo />

        <div className="rounded-md [&_button]:cursor-pointer">
          <List />
          <Bottom />
        </div>
      </main>
    </div>
  );
}

export default App;
