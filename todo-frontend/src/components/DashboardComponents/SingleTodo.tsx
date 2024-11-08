import React, { useContext, useState } from "react";
import UpdateTodoCard from "../UpdateTodoCard/UpdateTodoCard";
import useFetchTodo from "../../hooks/useFetchTodo";
import { TodoContext } from "../../store/todoStore";

type Props = {};

const SingleTodo = (props: Props) => {
  const { loading } = useFetchTodo();
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [hoveredTodoId, setHoveredTodoId] = useState(null); // Track the hovered item

  const { todo } = useContext(TodoContext);

  const openUpdateTodo = (todoItem: any) => {
    setShowUpdateButton(true);
    setCurrentTodo(todoItem);
  };
  const closeUpdateTodo = () => setShowUpdateButton(false);

  return (
    <>
      <div
        className={`${
          loading && "animate-pulse"
        } your-container cursor-pointer md:w-[60rem]  mx-auto`}
      >
        {todo.map((item: any, index: any) => (
          <div
            key={index}
            className="bg-gray-900/70 p-3 rounded-lg shadow-lg mt-4 hover:bg-gray-900/60 mr-2"
            onMouseEnter={() => setHoveredTodoId(index)} // Set hovered item ID
            onMouseLeave={() => setHoveredTodoId(null)} // Reset on mouse leave
            onClick={() => openUpdateTodo(item)}
          >
            {" "}
            <p className="text-blue-300 font-medium text-[10px] md:text-[14px] lg:text-[16px] hover:underline cursor-pointer flex justify-between">
              {" "}
              My lists {">"} Personal{" "}
              <span className="text-white font-semibold items-center cursor-pointer flex gap-2 mr-2 md:text-[25px] sm:text-[20px]">
                {" "}
                {/* Show buttons only if the current item is hovered */}{" "}
                {hoveredTodoId === index && (
                  <span className="flex gap-1">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[16px] h-[16px] md:w-[20px] md:h-[20px]"
                      viewBox="0 0 20 20"
                      onClick={() => openUpdateTodo(item)}
                    >
                      {" "}
                      <path
                        fill="#949494"
                        d="M10.001 7.8a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 10 7.8zm0-2.6A2.2 2.2 0 1 0 9.999.8a2.2 2.2 0 0 0 .002 4.4m0 9.6a2.2 2.2 0 1 0 0 4.402a2.2 2.2 0 0 0 0-4.402"
                      />{" "}
                    </svg>{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16px"
                      height="16px"
                      className="w-[16px] h-[16px] md:w-[20px] md:h-[20px]"
                      viewBox="0 0 42 42"
                    >
                      {" "}
                      <path
                        fill="#949494"
                        fill-rule="evenodd"
                        d="m21.002 26.588l10.357 10.604c1.039 1.072 1.715 1.083 2.773 0l2.078-2.128c1.018-1.042 1.087-1.726 0-2.839L25.245 21L36.211 9.775c1.027-1.055 1.047-1.767 0-2.84l-2.078-2.127c-1.078-1.104-1.744-1.053-2.773 0L21.002 15.412L10.645 4.809c-1.029-1.053-1.695-1.104-2.773 0L5.794 6.936c-1.048 1.073-1.029 1.785 0 2.84L16.759 21L5.794 32.225c-1.087 1.113-1.029 1.797 0 2.839l2.077 2.128c1.049 1.083 1.725 1.072 2.773 0z"
                      />{" "}
                    </svg>{" "}
                  </span>
                )}{" "}
              </span>{" "}
            </p>{" "}
            <div className="flex items-center justify-between !overflow-y-hidden">
              {" "}
              <p className="text-white font-semibold mt-2 text-sm md:text-base lg:text-xl">
                {" "}
                {item.title}{" "}
              </p>{" "}
            </div>{" "}
          </div>
        ))}
      </div>

      {showUpdateButton && (
        <UpdateTodoCard
          isOpen={openUpdateTodo}
          onClose={closeUpdateTodo}
          currentTodo={currentTodo}
        />
      )}
    </>
  );
};

export default SingleTodo;
