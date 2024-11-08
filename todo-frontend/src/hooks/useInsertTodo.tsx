import { useContext, useState } from "react";
import TodoServices from "../apiServices/todoServices";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../store/todoStore";

const useInsertTodo = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setTodo } = useContext(TodoContext);

  const insertTodo = async (data: any) => {
    <div>
      <Toaster />
    </div>;
    try {
      setLoading(true);
      const response = await TodoServices.insertTodo(data).then((res: any) => {
        if (res.success == true) {
          console.log("resp from useInsertTodo  : ", res);
          setTodo((prev: any) => [res.Task, ...prev]);
        } else {
          console.error(res.message);
        }
      });
    } catch (err: any) {
      setLoading(false);
      console.log("Error in useInsertTodo Hook : ", err);
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, insertTodo };
};

export default useInsertTodo;
