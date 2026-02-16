import { useTodoStore, useThemeStore } from "../store/global.ts";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Todo from "./Todo.tsx";
import {
  DndContext,
  closestCorners,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export default function List() {
    const theme = useThemeStore((state) => state.theme);

  const todos = useTodoStore((state) => state.todos);
  const filter = useTodoStore((state) => state.filter);
  const reorder = useTodoStore((state) => state.reorderTodos);
  
  const visibleTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;
    const oldIndex = todos.findIndex((t) => t.id === active.id);
    const newIndex = todos.findIndex((t) => t.id === over.id);

    reorder(oldIndex, newIndex);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
   console.log(todos)
  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className={`list rounded-t-lg shadow-5xl
        ${theme === "dark" ? "bg-gray-800 " : "bg-white "} `}
        >
        <SortableContext
          items={visibleTodos.map(t => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {visibleTodos.map((todo) => (
            <Todo
              id={todo.id}
              title={todo.title}
              key={todo.id}
              completed={todo.completed}
            />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}
