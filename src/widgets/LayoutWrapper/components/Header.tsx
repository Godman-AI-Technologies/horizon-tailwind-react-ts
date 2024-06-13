import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface IHeaderProps {
  name: string;
  backwardPath?: string;
}

export const Header: React.FC<IHeaderProps> = ({
  name,
  backwardPath = "/",
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBackClick = () => {
    navigate(backwardPath);
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="relative flex items-center justify-between bg-gray-800 p-4 text-white">
      {/* Левый компонент */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleBackClick}
          className="flex items-center space-x-2"
        >
          <IoIosArrowBack />
        </button>
        <div className="flex gap-2">
          <h1 className="text-xl">{name}</h1>
          <button onClick={handleEditClick} className="text-sm">
            <FaEdit size={16} />
          </button>
        </div>
      </div>

      {/* Правый компонент */}
      <div className="flex items-center space-x-4">
        <span>Last update: 10:30</span>
        <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
          Create
        </button>
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="bg-black fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="rounded bg-white p-4">
            <h2 className="mb-4 text-xl">Редактирование</h2>
            <button onClick={handleCloseModal} className="text-red-500">
              Закрыть
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
