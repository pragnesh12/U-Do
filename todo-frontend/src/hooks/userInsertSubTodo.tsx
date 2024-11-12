import { useContext, useState } from "react";
import TodoServices from "../apiServices/todoServices";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../store/todoStore";

const useInsertSubTodo = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  interface SubTodoInterface {
    subTitle: string;
    todoId: string;
  }

  const insertSubTodo = async (data: SubTodoInterface) => {
    <div>
      <Toaster />
    </div>;

    try {
      setLoading(true);
      const response = await TodoServices.insertSubTodo(data);

      if (response.success) {
        console.log("Response from useInsertSubTodo:", response);
        return response; // Return the response here
      } else {
        console.error(response.message);
        toast.error(response.message || "Failed to insert subtask");
      }
    } catch (err: any) {
      console.error("Error in useInsertSubTodo Hook:", err);
      toast.error(err?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { loading, insertSubTodo };
};

export default useInsertSubTodo;
