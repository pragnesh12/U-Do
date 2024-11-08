import { useState } from "react";
import TodoServices from "../apiServices/todoServices";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useFetchTodo = () => {
  const [loading, setLoading] = useState(false);

  const fetchTodo = async () => {
    <div>
      <Toaster />
    </div>;
    try {
      setLoading(true);
      await TodoServices.fetchTodo().then((res: any) => {
        if (res.success == true) {
          console.log("resp from useFetchTodo  : ", res);
          toast.success("Todo Fetched Successfully!");
        } else {
          toast.error(res.message);
        }
      });
    } catch (err: any) {
      setLoading(false);
      console.log("Error in useFetchTodo Hook : ", err);
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, fetchTodo };
};

export default useFetchTodo;
