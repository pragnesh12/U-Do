import React, { useState } from "react";
import { FaLock, FaCheck } from "react-icons/fa";

const MoveToListDropdown = ({
  isOpen,
  onClose,
  onSelect,
  selectedList,
}: any) => {
  if (!isOpen) return null;

  const lists = ["Personal", "Work", "Grocery List", "Hello"];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-gray-900 text-gray-100 w-[25rem] p-3 rounded-lg shadow-lg ">
        <h2 className="text-center text-lg font-semibold mb-2">Move to...</h2>

        <div className="bg-gray-800 rounded-md pb-3">
          <div className="flex items-center gap-2  mb-4 py-2 px-2">
            <span className="text-sm font-medium ">My lists</span>
            <FaLock className="text-gray-400" />
          </div>

          <ul className="space-y-2 ">
            {lists.map((list, index) => (
              <li
                key={list}
                onClick={() => onSelect(list)}
                className={`flex items-center justify-between ease py-2 cursor-pointer hover:bg-gray-700 ${
                  index !== lists.length - 1 ? "border-b-[1px]" : ""
                } hover:rounded-[2px] px-2`}
              >
                <span className="ml-1">{list}</span>
                {selectedList === list && (
                  <FaCheck className="text-green-400" />
                )}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MoveToListDropdown;
