import "./App.css";
import checkImg from "/images/icon-check.svg";
import removeImg from "/images/icon-cross.svg";

import { useTodoStore, useThemeStore } from "../store/global";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

type Props = {
  id: string;
  title: string;
  completed: boolean;
};

export default function Todo({ id, title, completed }: Props) {
  const theme = useThemeStore((state) => state.theme);
  const removeTodo = useTodoStore((state) => state.removeTodo);

  const toggleTodo = useTodoStore((state) => state.toggleTodo);

  const handleRemove = (id: string) => {
    removeTodo(id);
  };

  const { attributes, listeners, setNodeRef, transition, transform } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      className={` border-b flex justify-between items-center px-5 sm:py-4 py-3
        ${theme === "dark" ? " border-gray-700 " : "border-gray-200 text-gray-700"}
        `}
    >
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => toggleTodo(id)}
          className={`size-5.5 rounded-full flex justify-center items-center 
            ${completed ? "bg-linear-to-r from-[hsl(192,92%,65%)] to-[hsl(300,81%,46%)]" : ""}
            ${theme === "light" ? "border border-gray-300 hover:border-2 hover:border-linear-to-r hover:from-[hsl(192,92%,65%)] hover:to-[hsl(300,81%,46%)]" : "border border-gray-700"}
            `}
        >
          {completed && (
            <img className="size-2.5" src={checkImg} alt="checked" />
          )}
        </button>

        <div
          {...attributes}
          {...listeners}
          className="todo flex items-center gap-5 cursor-grab"
        >
          {!completed ? (
            <p>{title}</p>
          ) : (
            <p
              className={`line-through text-[17px]
              ${theme === "dark" ? "text-gray-500 " : "text-gray-300 "}`}
            >
              {title}
            </p>
          )}
        </div>
      </div>
      <button onClick={() => handleRemove(id)} type="button">
        <img src={removeImg} alt="remove task" />
      </button>
    </div>
  );
}
