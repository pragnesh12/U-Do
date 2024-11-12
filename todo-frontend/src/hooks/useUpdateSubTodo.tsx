import { useState } from "react";
import TodoServices from "../apiServices/todoServices";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useUpdateSubTodo = () => {
  const [loading, setLoading] = useState(false);

  const updateSubTodo = async (id: any, data: any) => {
    try {
      setLoading(true);
      await TodoServices.updateSubTodo(id, data).then((res: any) => {
        if (res.success == true) {
          console.log("resp from useUpdateSubTodo  : ", res);
          toast.success("SubTodo Updated Successfully!");
        } else {
          toast.error(res.message);
        }
      });
    } catch (err: any) {
      setLoading(false);
      console.log("Error in useUpdateSubTodo Hook : ", err);
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, updateSubTodo };
};

export default useUpdateSubTodo;
