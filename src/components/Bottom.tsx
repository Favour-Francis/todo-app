import { useTodoStore, useThemeStore } from "../store/global";

export default function Bottom() {
  const theme = useThemeStore((state) => state.theme);
  const filter = useTodoStore((state) => state.filter);
  const filterTodos = useTodoStore((state) => state.setFilter);
  const todos = useTodoStore((state) => state.todos);
  const removeCompleted = useTodoStore((state) => state.removeCompleted);

  const visibleTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const handleClear = () => {
    removeCompleted();
  };

  return (
    <>
      <div
        className={`flex justify-between px-5 py-4 text-xs text-gray-500 [&_button]:cursor-pointer rounded-b-lg
        ${theme === "dark" ? "bg-gray-800" : ""}
        ${theme === "light" ? "bg-white" : ""}`}
      >
        <span>
          {visibleTodos.length === 1 ? (
            <p>{visibleTodos.length} item left</p>
          ) : (
            <p>{visibleTodos.length} items left</p>
          )}
        </span>
        <span className="*:mx-1.5 ml-5 sm:block hidden">
          <button
            className={filter === "all" ? "text-blue-500 font-semibold" : ""}
            type="button"
            onClick={() => filterTodos("all")}
          >
            All
          </button>
          <button
            className={filter === "active" ? "text-blue-500 font-semibold" : ""}
            type="button"
            onClick={() => filterTodos("active")}
          >
            Active
          </button>
          <button
            className={
              filter === "completed" ? "text-blue-500 font-semibold" : ""
            }
            type="button"
            onClick={() => filterTodos("completed")}
          >
            Completed
          </button>
        </span>
        <button type="button" onClick={() => handleClear()}>
          Clear Completed
        </button>
      </div>

      <div
        className={`sm:hidden my-5 rounded-lg bg-gray-800 flex justify-center gap-6 py-3 text-md text-gray-500 font-medium [&_button]:cursor-pointer
          ${theme === "dark" ? "bg-gray-800" : ""}
        ${theme === "light" ? "bg-white" : ""}`}
      >
        <button
          className={filter === "all" ? "text-blue-500 font-semibold" : ""}
          type="button"
          onClick={() => filterTodos("all")}
        >
          All
        </button>
        <button
          className={filter === "active" ? "text-blue-500 font-semibold" : ""}
          type="button"
          onClick={() => filterTodos("active")}
        >
          Active
        </button>
        <button
          className={
            filter === "completed" ? "text-blue-500 font-semibold" : ""
          }
          type="button"
          onClick={() => filterTodos("completed")}
        >
          Completed
        </button>
      </div>

      <span
        className={`text-center tracking-wider text-gray-500 text-xs *:my-10
          ${visibleTodos.length === 0 ? "hidden" : ""}`}
      >
        <p>Drag and drop to re-order list</p>
      </span>
    </>
  );
}
