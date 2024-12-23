import React, { useContext, useState } from "react";
import { TodoContext } from "../../store/todoStore";
import useInsertTodo from "../../hooks/useInsertTodo";
import MoveToListDropdown from "../ListComponents/MoveToListDropdown";

const AddTask = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState({
    title: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedList, setSelectedList] = useState("Personal");

  const { insertTodo, loading } = useInsertTodo();
  const { todo, setTodo } = useContext(TodoContext);

  const openDropdown = () => setIsDropdownOpen(true);
  const closeDropdown = () => setIsDropdownOpen(false);

  const handleSelect = (list: string) => {
    setSelectedList(list);
    closeDropdown();
  };

  const handleOnClick = async () => {
    if (input.title) {
      try {
        await insertTodo(input).then((res) => {
          setInput({ title: "" });
        });
      } catch (err) {
        console.log("Error:", err);
      }
    }
  };

  const handleKeyDown = async (e: any) => {
    if (e.key === "Enter" && input.title) {
      await handleOnClick();
    }
  };

  return (
    <>
      <div className="p-2">
        <div className="w-full relative mt-3">
          <div className="relative md:mx-auto sm:mr-10">
            {/* Left button with SVG icon */}
            <button
              className="absolute left-1 top-1 rounded p-1.5 border border-transparent text-gray-800/60 text-center text-sm text-white transition-all shadow-sm hover:shadow focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mt-[-0.25rem] ml-[-0.30rem] "
              type="button"
              onClick={openDropdown}
            >
              <svg
                width="32px"
                height="32px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="4"
                  y="4"
                  width="16"
                  height="16"
                  rx="3"
                  stroke="#999D9E"
                  strokeWidth="2"
                />
                <path
                  d="M16 10L8 10"
                  stroke="#999D9E"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M16 14L8 14"
                  stroke="#999D9E"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Input field */}
            <input
              type="text"
              className="w-full placeholder:text-slate-400 text-white text-sm border rounded-md pl-10 pr-10 py-3 transition duration-300 ease focus:outline-none border-gray-800 hover:border-blue-400 shadow-sm focus:shadow bg-gray-800/60 font-semibold"
              placeholder="Enter task title"
              value={input.title}
              onChange={(e) => setInput({ ...input, title: e.target.value })}
              onKeyDown={handleKeyDown}
            />

            {/* Right button with SVG icon */}
            <button
              className="absolute right-1 top-1 rounded p-1.5 border border-transparent text-center text-md text-white transition-all shadow-sm hover:shadow focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={handleOnClick}
            >
              <svg width="25px" height="25px" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289L19.7071 10.2929C20.0976 10.6834 20.0976 11.3166 19.7071 11.7071C19.3166 12.0976 18.6834 12.0976 18.2929 11.7071L13 6.41421V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V6.41421L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071C3.90237 11.3166 3.90237 10.6834 4.29289 10.2929L11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Task Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-96 bg-gradient-to-b from-gray-100 to-gray-200">
              <h2 className="text-lg font-semibold mb-4 text-gray-950">
                Add New Task
              </h2>
              <input
                type="text"
                placeholder="Task name"
                className="w-full p-2 border rounded-lg mb-4"
              />
              <textarea
                placeholder="Task details"
                className="w-full p-2 border rounded-lg mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                  Save Task
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {isDropdownOpen && (
        <MoveToListDropdown
          isOpen={isDropdownOpen}
          onClose={closeDropdown}
          onSelect={handleSelect}
          selectedList={selectedList}
        />
      )}
    </>
  );
};

export default AddTask;
