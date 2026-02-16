import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 } from "uuid";
import type { ITodo } from "../lib/todo";
import type { Theme } from "../lib/theme";

const createTodo = (title: string): ITodo => ({
  id: v4(),
  title,
  completed: false,
});

type TodoStore = {
  todos: ITodo[]; // creating list of todos
  filter: "all" | "active" | "completed"; // setting filter options

  filteredTodos: () => ITodo[];
  activeCount: () => number;

  addTodo: (title: string) => void; // add new todo
  removeTodo: (id: string) => void; // remove existing todo
  setFilter: (filter: "all" | "active" | "completed") => void; // setting filtered options
  toggleTodo: (id: string) => void; // mark completed || mark not completed
  removeCompleted: () => void; // remove completed todos

  reorderTodos: (startIndex: number, endIndex: number) => void;
};

type Themestore = {
  theme: Theme;
  toggleTheme: () => void
}


// const useTodoStore = create<TodoStore>((set) => ({
//   // State variables
//   todos: [] as ITodo[],
//   filter: "all",

//   // Action placeholders
//   addTodo: (title: string) => {
//     set((state) => ({
//       todos: [ createTodo(title), ...state.todos ],
//     }));
//   },

//   removeTodo: (id: string) => {
//     set((state) => ({
//       todos: state.todos.filter((todo) => todo.id !== id),
//     }));
//   },

//   setFilter: (filter: "all" | "active" | "completed") => {
//     set({ filter });
//   },

//   toggleTodo: (id: string) => {
//     set((state) => ({
//       todos: state.todos.map((todo) =>
//         todo.id === id ? { ...todo, completed: !todo.completed } : todo,
//       ),
//     }));
//   },
//   removeCompleted: () => {
//     set((state) => ({
//         todos: state.todos.filter((todo) => !todo.completed)
//     }))
//   }

// }));

// export default useTodoStore;

const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      filter: "all",

      filteredTodos: () => {
        const { todos, filter } = get(); 
        if (filter === "active") {
          return todos.filter((todo) => !todo.completed);
        }
        if (filter === "completed") {
          return todos.filter((todo) => todo.completed);
        }
        return todos;
      },

      activeCount: () => {
        return get().todos.filter((todo) => !todo.completed).length;
      },

      addTodo: (title) =>
        set((state) => ({
          todos: [createTodo(title), ...state.todos],
        })),

      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo,
          ),
        })),

      setFilter: (filter) => set({ filter }),

      removeCompleted: () =>
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        })),

      reorderTodos(startIndex, endIndex) {
        set((state) => {
          const updated = Array.from(state.todos);
          const [moved] = updated.splice(startIndex, 1);

          updated.splice(endIndex, 0, moved);
          return { todos: updated };
        });
      },
    }),
    { name: "todo-storage" },
  ),
);

const useThemeStore = create<Themestore>((set) =>  ({
  theme: 'dark',
  toggleTheme: () => 
    set((state) => ({
      theme:  state.theme === "light" ? "dark" : "light"
    }))
}))

export {
  useTodoStore,
  useThemeStore
} 
