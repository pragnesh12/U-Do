import React, { createContext, useState, ReactNode, useEffect } from "react";
import TodoServices from "../apiServices/todoServices";

type Todo = {
  id: number;
  title: string;
  done: boolean;
  description?: string;
  userId?: number;
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

  useEffect(() => {
    (async () => {
      try {
        const response = await TodoServices.fetchTodo().then((res: any) => {
          const todos = res.Task;
          setTodo(todos);
        });
      } catch (error) {
        console.log("Error: ", error);
      }
    })();
  }, []);

  return (
    <TodoContext.Provider
      value={{ todo, setTodo, currentTodoId, setCurrentTodoId }}
    >
      {children}
    </TodoContext.Provider>
  );
};
