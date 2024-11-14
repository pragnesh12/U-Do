import React, { createContext, useState, ReactNode, useEffect } from "react";
import TodoServices from "../apiServices/todoServices";
import useDeleteTodo from "../hooks/useDeleteTodo";
import useUpdateTodo from "../hooks/useUpdateTodo";
import useUpdateSubTodo from "../hooks/useUpdateSubTodo";
import useDeleteSubTodo from "../hooks/useDeleteSubTodo";

type Todo = {
  id: number;
  title: string;
  done: boolean;
  description?: string;
  userId?: number;
  subTodos?: SubTodo[];
};

type SubTodo = {
  id: number;
  subTitle: string;
  subDone: boolean;
  todoId: number;
};

type TodoProps = {
  todo: Todo[];
  setTodo: (newTodo: Todo[]) => void;
};

export const TodoContext = createContext<any>(null);

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [currentTodoId, setCurrentTodoId] = useState<string>("");

  // Custom hooks for delete and update operations
  const { deleteTodo } = useDeleteTodo();
  const { updateTodo } = useUpdateTodo();
  const { updateSubTodo } = useUpdateSubTodo();
  const { deleteSubTodo } = useDeleteSubTodo();

  useEffect(() => {
    (async () => {
      try {
        const response = await TodoServices.fetchTodo();
        const todos = response.Task;
        setTodo(todos);
      } catch (error) {
        console.log("Error: ", error);
      }
    })();
  }, []);

  const handleDeleteTodo = async (id: number) => {
    try {
      setTodo((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      const response: any = await deleteTodo(id);
      if (!response.success) {
        throw new Error("Failed to delete todo");
      }
    } catch (error) {
      console.error("Error deleting todo: ", error);
    }
  };

  const handleUpdateTodo = async (id: number, updatedData: Partial<Todo>) => {
    try {
      setTodo((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, ...updatedData } : todo
        )
      );
      const response: any = await updateTodo(id, updatedData);
      if (!response.success) {
        throw new Error("Failed to update todo");
      }
    } catch (error) {
      console.error("Error updating todo: ", error);
    }
  };

  // Handle SubTodo Update with immediate UI update
  const handleUpdateSubTodo = async (
    id: number,
    updatedData: Partial<SubTodo>
  ) => {
    try {
      setTodo((prevTodos) =>
        prevTodos.map((todo) =>
          todo.subTodos?.some((subTodo) => subTodo.id === id)
            ? {
                ...todo,
                subTodos: todo.subTodos.map((subTodo) =>
                  subTodo.id === id ? { ...subTodo, ...updatedData } : subTodo
                ),
              }
            : todo
        )
      );

      const response: any = await updateSubTodo(id, updatedData);
      if (!response.success) {
        throw new Error("Failed to update subtask");
      }
    } catch (error) {
      console.error("Error updating subtask: ", error);
    }
  };

  // Handle SubTodo Deletion with immediate UI update
  const handleDeleteSubTodo = async (id: number) => {
    try {
      setTodo((prevTodos) =>
        prevTodos.map((todo) => ({
          ...todo,
          subTodos: todo.subTodos?.filter((subTodo) => subTodo.id !== id),
        }))
      );

      const response: any = await deleteSubTodo(id); // Only pass the id here
      if (!response.success) {
        throw new Error("Failed to delete subtask");
      }
    } catch (error) {
      console.error("Error deleting subtask: ", error);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todo,
        setTodo,
        currentTodoId,
        setCurrentTodoId,
        handleDeleteTodo,
        handleUpdateTodo,
        handleUpdateSubTodo,
        handleDeleteSubTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
