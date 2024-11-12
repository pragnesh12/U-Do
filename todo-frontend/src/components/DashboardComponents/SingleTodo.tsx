import React, { useContext, useState } from "react";
import UpdateTodoCard from "../UpdateTodoCard/UpdateTodoCard";
import useFetchTodo from "../../hooks/useFetchTodo";
import { TodoContext } from "../../store/todoStore";
import TodoServices from "../../apiServices/todoServices";
import { useNavigate } from "react-router-dom";

type Props = {};

const SingleTodo = (props: Props) => {
  const { loading } = useFetchTodo();
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [hoveredTodoId, setHoveredTodoId] = useState(null); // Track the hovered item
  const [checkedStates, setCheckedStates] = useState<{
    [key: string]: boolean;
  }>({});

  const navigate = useNavigate();

  const { todo } = useContext(TodoContext);

  const openUpdateTodo = () => {
    console.log("Called From child");
    setShowUpdateButton(true);
  };

  const toggleCheck = (id: string) => {
    // Toggle checked state
    setCheckedStates((prevState) => {
      const updatedCheckedStates = {
        ...prevState,
        [id]: !prevState[id],
      };

      return updatedCheckedStates;
    });
  };

  const closeUpdateTodo = () => {
    console.log("Called From child");
    setShowUpdateButton(false);
    console.log("Called cancel button");
  };

  return (
    <>
      <div
        className={`${
          loading && "animate-pulse"
        } your-container cursor-pointer md:w-[60rem] mx-auto`}
      >
        {todo
          .sort((a: any, b: any) => {
            // Ensure completed tasks are at the end
            if (checkedStates[a.id] && !checkedStates[b.id]) {
              return 1; // a is completed, so it moves to the end
            }
            if (!checkedStates[a.id] && checkedStates[b.id]) {
              return -1; // b is completed, so it moves to the end
            }
            return 0; // Keep the order if both are either checked or unchecked
          })
          .map((item: any) => (
            <div
              key={item.id}
              className={` p-3 rounded-lg shadow-lg mt-4  mr-2 ${
                checkedStates[item.id]
                  ? "bg-gray-950/30 "
                  : "bg-gray-900/70 hover:bg-gray-900/60"
              }`}
              onMouseEnter={() => setHoveredTodoId(item.id)} // Set hovered item ID
              onMouseLeave={() => setHoveredTodoId(null)} // Reset on mouse leave
            >
              <p className="text-blue-300 font-medium text-[10px] md:text-[8px] lg:text-[10px] hover:underline cursor-pointer flex justify-between">
                My lists {">"} Personal{" "}
                <span className="text-white font-semibold items-center cursor-pointer flex gap-2 mr-2 md:text-[25px] sm:text-[20px]">
                  {hoveredTodoId === item.id && (
                    <span className="flex gap-1">
                      {!checkedStates[item.id] && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-[16px] h-[16px] md:w-[20px] md:h-[17px]"
                          viewBox="0 0 20 20"
                          onClick={() => {
                            openUpdateTodo();
                            navigate(`/myday/tasks/${item.id}/activity`);
                          }}
                        >
                          <path
                            fill="#949494"
                            d="M10.001 7.8a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 10 7.8zm0-2.6A2.2 2.2 0 1 0 9.999.8a2.2 2.2 0 0 0 .002 4.4m0 9.6a2.2 2.2 0 1 0 0 4.402a2.2 2.2 0 0 0 0-4.402"
                          />
                        </svg>
                      )}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16px"
                        height="16px"
                        className="w-[16px] h-[16px] md:w-[20px] md:h-[17px]"
                        viewBox="0 0 42 42"
                      >
                        <path
                          fill="#949494"
                          d="m21.002 26.588l10.357 10.604c1.039 1.072 1.715 1.083 2.773 0l2.078-2.128c1.018-1.042 1.087-1.726 0-2.839L25.245 21L36.211 9.775c1.027-1.055 1.047-1.767 0-2.84l-2.078-2.127c-1.078-1.104-1.744-1.053-2.773 0L21.002 15.412L10.645 4.809c-1.029-1.053-1.695-1.104-2.773 0L5.794 6.936c-1.048 1.073-1.029 1.785 0 2.84L16.759 21L5.794 32.225c-1.087 1.113-1.029 1.797 0 2.839l2.077 2.128c1.049 1.083 1.725 1.072 2.773 0z"
                        />
                      </svg>
                    </span>
                  )}
                </span>
              </p>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={checkedStates[item.id]}
                  aria-label="Check task"
                  className="flex items-center"
                  onClick={() => toggleCheck(item.id)}
                >
                  <div className="TaskItemCheckbox__checkboxAsset">
                    {checkedStates[item.id] ? (
                      <div className="bg-blue-500 rounded-full md:p-[0.15rem] md:mt-[0.55rem] mt-[0.50rem]">
                        <svg
                          className="w-[1rem] h-[1rem] md:w-[0.80rem] md:h-[0.80rem] lg:w-[0.80rem] lg:h-[0.80rem] "
                          viewBox="0 0 14 12"
                          aria-hidden="true"
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
                      !checkedStates[item.id] && (
                        <svg
                          className="w-[1rem] h-[1rem] md:w-[1.30rem] md:h-[1.30rem] lg:w-[1.30rem] lg:h-[1.30rem] mt-[0.30rem] md:mt-[0.38rem]"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
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
                </button>
                <p
                  className={`text-white font-semibold mt-2 text-sm md:text-base lg:text-xl ${
                    checkedStates[item.id]
                      ? "line-through text-gray-300/55"
                      : "text-white"
                  }`}
                >
                  {item.title}
                </p>
              </div>
            </div>
          ))}
      </div>
      {showUpdateButton && <UpdateTodoCard />}
    </>
  );
};

export default SingleTodo;
