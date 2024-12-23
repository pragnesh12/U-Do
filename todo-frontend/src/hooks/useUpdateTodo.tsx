import { useState } from "react";
import TodoServices from "../apiServices/todoServices";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useUpdateTodo = () => {
  const [loading, setLoading] = useState(false);

  const updateTodo = async (id: any, data: any) => {
    console.log("-----> ", data);
    try {
      setLoading(true);
      await TodoServices.updateTodo(id, data).then((res: any) => {
        if (res.success == true) {
          console.log("resp from useUpdateTodo  : ", res);
          toast.success("Todo Updated Successfully!");
          return res;
        } else {
          toast.error(res.message);
        }
      });
    } catch (err: any) {
      setLoading(false);
      console.log("Error in useUpdateTodo Hook : ", err);
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, updateTodo };
};

export default useUpdateTodo;
