import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

interface ICardBlockProps {
  id: string;
  handleClick: () => void;
  handleDelete: () => void;
  children: React.ReactNode;
}

export const CardBlock: React.FC<ICardBlockProps> = ({
  id,
  handleClick,
  handleDelete,
  children,
}) => {
  const [showMenu, setShowMenu] = useState(null);

  return (
    <div
      key={id}
      onClick={handleClick}
      className="relative cursor-pointer rounded bg-white p-4 shadow hover:bg-gray-50 dark:bg-navy-700 hover:dark:bg-navy-800"
    >
      <div className="flex items-center justify-between">
        {children}
        <div className="relative">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(showMenu === id ? null : id);
            }}
          >
            <FaEllipsisV />
          </button>
          {showMenu === id && (
            <div
              className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg"
              onMouseLeave={() => setShowMenu(null)}
            >
              <button
                className="block w-full px-4 py-2 text-left text-red-500 hover:bg-red-100"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
