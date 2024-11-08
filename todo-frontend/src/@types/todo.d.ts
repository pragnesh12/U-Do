// @types.todo.ts
export interface Todo {
  id: number;
  title: string;
  done: boolean;
  description?: string;
  userId?: string;
}
export type TodoContextType = {
  todos: Todo[];
  saveTodo: (todo: Todo) => void;
  updateTodo: (id: number) => void;
};
