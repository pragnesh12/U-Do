import React, { useContext, useState } from "react";
import UpdateTodoCard from "../UpdateTodoCard/UpdateTodoCard";
import useFetchTodo from "../../hooks/useFetchTodo";
import { TodoContext } from "../../store/todoStore";
import TodoServices from "../../apiServices/todoServices";
import { useNavigate } from "react-router-dom";
import TaskDescription from "./TaskDescription";

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
            if (checkedStates[a.done] && !checkedStates[b.done]) {
              return 1; // a is completed, so it moves to the end
            }
            if (!checkedStates[a.done] && checkedStates[b.done]) {
              return -1; // b is completed, so it moves to the end
            }
            return 0; // Keep the order if both are either checked or unchecked
          })
          .map((item: any) => (
            <TaskDescription
              id={item.id}
              title={item.title}
              done={item.done}
              setShowUpdateButton={setShowUpdateButton}
              showUpdateButton={showUpdateButton}
              key={item.id}
            />
          ))}
      </div>
      {showUpdateButton && <UpdateTodoCard />}
    </>
  );
};

export default SingleTodo;
