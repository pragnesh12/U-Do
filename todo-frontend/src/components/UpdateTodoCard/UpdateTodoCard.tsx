import React, { useState } from "react";
import MoveToListDropdown from "../ListComponents/MoveToListDropdown";

const UpdateTodoCard = ({ isOpen, onClose, currentTodo }: any) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedList, setSelectedList] = useState("Personal");
  const [title, setTitle] = useState(currentTodo);
  const [description, setDescription] = useState(currentTodo);

  if (!isOpen) return null;

  const openDropdown = () => setIsDropdownOpen(true);
  const closeDropdown = () => setIsDropdownOpen(false);

  const handleSelect = (list: any) => {
    setSelectedList(list);
    closeDropdown();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-[10rem]">
        <div className="bg-gray-900 text-gray-200 w-[40rem] h-[30rem] p-5 rounded-lg shadow-lg relative ">
          <p className="text-blue-400 font-small text-[13px] hover:underline cursor-pointer">
            My lists {">"} Personal
          </p>
          <button
            onClick={onClose}
            className="absolute top-6 right-3 text-gray-400 hover:text-white text-2xl"
          >
            ❌
          </button>

          {/* <label htmlFor="title">Title</label> */}
          <div className="flex mb-4">
            <br />
            <input
              className="text-xl font-semibold bg-gray-900 bg-opacity-50 w-full mr-10 py-2 rounded-md !border-none outline-none"
              id="title"
              value={title.title}
              onChange={(e) => setTitle({ ...title, title: e.target.value })}
            ></input>
          </div>

          <div className="flex gap-2 mb-4 cursor-pointer">
            <span className="bg-gray-800 bg-opacity-50 text-gray-300 px-3 py-1 rounded-full text-sm">
              🔔 Remind me
            </span>
            <span
              className="bg-gray-800 bg-opacity-50 text-gray-300 px-3 py-1 rounded-full text-sm"
              onClick={openDropdown}
            >
              📁 Personal
            </span>
            <span className="bg-gray-800 bg-opacity-50 text-gray-300 px-3 py-1 rounded-full text-sm">
              # Tags
            </span>
          </div>

          <div className="mb-2">
            <label htmlFor="notes" className="block text-sm font-medium ml-2">
              Notes
            </label>
            <textarea
              id="notes"
              placeholder={"Insert your notes here"}
              className="w-full h-20 bg-gray-900 bg-opacity-50 text-gray-200 !border-none outline-none rounded-md p-2 resize-none"
              value={description.description}
              onChange={(e) =>
                setDescription({ ...description, description: e.target.value })
              }
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block  text-sm font-medium ml-2">Subtasks</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Add a new subtask"
                className="flex-1 bg-gray-900 bg-opacity-50 text-gray-200 rounded-md p-2 !border-none outline-none"
              />
              <button className="bg-gray-800 bg-opacity-50 text-gray-300 px-3 py-2 rounded-full text-sm">
                + Add
              </button>
            </div>
          </div>

          <div className="border border-dashed border-gray-600 p-4 text-gray-400 text-center rounded-md cursor-pointer mt-3">
            Click to add / drop your files here
          </div>
        </div>
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

export default UpdateTodoCard;
