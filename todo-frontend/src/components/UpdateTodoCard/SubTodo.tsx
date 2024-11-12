import { useContext, useState, useEffect } from "react";
import { TodoContext } from "../../store/todoStore";
import { useParams } from "react-router-dom";
import useInsertSubTodo from "../../hooks/userInsertSubTodo";

const SubTodo = () => {
  const [subtasks, setSubtasks] = useState<{
    subTitle: string;
    todoId: string;
  }>({
    subTitle: "",
    todoId: "",
  });
  const [subTodo, setSubTodo] = useState<any[]>([]); // State to hold subTodos for real-time updates
  const [newSubtask, setNewSubtask] = useState("");
  const [checkedStates, setCheckedStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [show, setShow] = useState<boolean>(false);

  const { id } = useParams();
  const { todo } = useContext(TodoContext);
  const { loading, insertSubTodo } = useInsertSubTodo();

  // Populate subTodo based on matching todoId
  useEffect(() => {
    const matchedSubTodos: any = [];
    todo.forEach((todoItem: any) => {
      if (todoItem.SubTodo && Array.isArray(todoItem.SubTodo)) {
        matchedSubTodos.push(
          ...todoItem.SubTodo.filter((sub: any) => id === sub.todoId)
        );
      }
    });
    setSubTodo(matchedSubTodos);
  }, [todo, id]);

  const handleAddButton = async () => {
    try {
      const response: any = await insertSubTodo(subtasks);
      console.log("Response:", response);

      if (response && response.SubTask) {
        setSubTodo((prevSubTodos) => [...prevSubTodos, response.SubTask]);
        setSubtasks({ subTitle: "", todoId: id || "" });
      } else {
        console.error("SubTask not found in response:", response);
      }
    } catch (error) {
      console.error("Error in handleAddButton:", error);
    }
  };

  const toggleCheck = (id: string) => {
    setCheckedStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <>
      <div className="mb-4 overflow-y-auto">
        <label className="block text-sm font-medium ml-2">Subtasks</label>
        <div className="flex flex-col gap-4 overflow-y-auto">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={subtasks.subTitle}
              onChange={(e) =>
                setSubtasks({
                  ...subtasks,
                  subTitle: e.target.value,
                  todoId: id || "",
                })
              }
              placeholder="Add a new subtask"
              className="flex-1 bg-gray-900 bg-opacity-50 text-gray-200 rounded-md p-2 !border-none outline-none"
            />
            <button
              className="bg-gray-800 bg-opacity-50 text-gray-300 px-3 py-2 rounded-full text-sm mr-1"
              onClick={handleAddButton}
            >
              + Add
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {subTodo.map((subtask: any) => (
              <div
                key={subtask.id}
                className={`flex items-center gap-2 ${
                  checkedStates[subtask.id]
                    ? " bg-gray-700/10 "
                    : " bg-gray-700/40 bg-opacity-50"
                } text-gray-200 rounded-md hover:border p-2 hover: border-blue-400`}
              >
                <div className="rounded-full md:p-[0.15rem] items-center">
                  {checkedStates[subtask.id] ? (
                    <div
                      className={`${
                        checkedStates[subtask.id]
                          ? "bg-blue-500/55"
                          : "bg-blue-500"
                      } rounded-full md:p-[0.15rem] md:mt-[-0.15rem] mt-[0.10rem]`}
                    >
                      <svg
                        className="w-[1rem] h-[1rem] md:w-[0.80rem] md:h-[0.80rem] lg:w-[0.80rem] lg:h-[0.80rem]"
                        viewBox="0 0 14 12"
                        aria-hidden="true"
                        onClick={() => toggleCheck(subtask.id)}
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          stroke="currentColor"
                          d="M4.959 9.263l6.792-8.015a.71.71 0 0 1 .995-.082c.3.249.34.69.09.984l-7.29 8.602a.706.706 0 0 1-.708.228.706.706 0 0 1-.483-.248L1.165 6.97a.694.694 0 0 1 .09-.987.712.712 0 0 1 .996.085l2.708 3.195z"
                        />
                      </svg>
                    </div>
                  ) : (
                    !checkedStates[subtask.id] && (
                      <svg
                        className="w-[1.20rem] h-[1.20rem] md:w-[1.30rem] md:h-[1.30rem] lg:w-[1.30rem] lg:h-[1.30rem] mt-[-0.10rem]"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        onClick={() => toggleCheck(subtask.id)}
                      >
                        <circle
                          cx="12"
                          cy="14"
                          r="9"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                        />
                      </svg>
                    )
                  )}
                </div>
                <span
                  className={`text-md ${
                    checkedStates[subtask.id]
                      ? "line-through text-gray-300/55"
                      : "text-white"
                  }`}
                >
                  {subtask.subTitle}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubTodo;
