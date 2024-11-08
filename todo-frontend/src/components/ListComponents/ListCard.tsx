import React from "react";

const ListCard = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="bg-gray-900 text-white w-80 md:w-96 p-5 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold flex items-center justify-between mb-4">
          My lists <span className="text-sm">🔒</span>
        </h2>

        <div className="border-b border-gray-700 py-3 flex items-center justify-between cursor-pointer">
          <span>Personal</span>
          <span className="text-green-400 text-xl">✔️</span>
        </div>

        <div className="border-b border-gray-700 py-3 flex items-center justify-between cursor-pointer">
          <span>Work</span>
        </div>

        <div className="border-b border-gray-700 py-3 flex items-center justify-between cursor-pointer">
          <span>Grocery List</span>
        </div>

        <div className="py-3 flex items-center justify-between cursor-pointer">
          <span>Hello</span>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
