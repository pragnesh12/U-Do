import { useState } from "react";
import TodoServices from "../apiServices/todoServices";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useDeleteTodo = () => {
  const [loading, setLoading] = useState(false);

  const deleteTodo = async (id: any) => {
    <div>
      <Toaster />
    </div>;
    console.log("Hey : ", id);
    try {
      setLoading(true);
      await TodoServices.deleteTodo(id).then((res: any) => {
        if (res.success == true) {
          console.log("resp from useDeleteTodo  : ", res);
          toast.success("Todo Fetched Successfully!");
          return res;
        } else {
          toast.error(res.message);
        }
      });
    } catch (err: any) {
      setLoading(false);
      console.log("Error in useDeleteTodo Hook : ", err);
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, deleteTodo };
};

export default useDeleteTodo;
