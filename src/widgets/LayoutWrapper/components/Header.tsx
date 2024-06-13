import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBackClick = () => {
    navigate("/");
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
          <h1 className="text-xl">Agent Name</h1>
          <button onClick={handleEditClick} className="text-sm">
            <FaEdit size={16} />
          </button>
        </div>
      </div>

      {/* Центральный компонент */}
      <nav className="absolute left-1/2 flex -translate-x-1/2 transform space-x-4">
        <button
          onClick={() => navigate("/development")}
          className="hover:underline"
        >
          Разработка
        </button>
        <button
          onClick={() => navigate("/history")}
          className="hover:underline"
        >
          История
        </button>
      </nav>

      {/* Правый компонент */}
      <div className="flex items-center space-x-4">
        <span>Последнее сохранение: 10:30</span>
        <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
          Сохранить
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
