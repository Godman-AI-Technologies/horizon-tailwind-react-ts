import { ReactNode, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface ILayoutProps {
  name: string;
  isUpdate: boolean;
  backwardPath?: string;
  children: ReactNode;
  modalContent?: ReactNode;
  modalSubmitHandler?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  modalCloseHandler?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  submitHandler?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

export const LayoutWrapper: React.FC<ILayoutProps> = ({
  name,
  isUpdate,
  backwardPath,
  modalContent,
  children,
  modalSubmitHandler,
  modalCloseHandler,
  submitHandler,
}) => {
  document.documentElement.dir = "agents";
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateTime, setUpdateTime] = useState(null);
  console.log("TIME", updateTime);

  const handleBackClick = () => {
    navigate(backwardPath);
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    modalCloseHandler();
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="fixed h-full w-full">
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
              {modalContent && (
                <button onClick={handleEditClick} className="text-sm">
                  <FaEdit size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Правый компонент */}
          <div className="flex items-center space-x-4">
            {isUpdate && <span>{updateTime ? updateTime : "not updated"}</span>}
            {isUpdate ? (
              <button
                onClick={() => {
                  submitHandler();
                  setUpdateTime(new Date().toLocaleString());
                }}
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              >
                Update
              </button>
            ) : (
              <button
                onClick={submitHandler}
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              >
                Create
              </button>
            )}
          </div>
        </header>
        {children}
      </div>
      {/* Модальное окно */}
      {modalContent && isModalOpen && (
        <div className="fixed inset-0 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="rounded bg-white p-4">
            <h2 className="mb-4 text-xl">Редактирование</h2>
            {modalContent}
            <button
              onClick={() => {
                modalSubmitHandler();
                setIsModalOpen(false);
              }}
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Confirm
            </button>
            <button onClick={handleCloseModal} className="text-red-500">
              Закрыть
            </button>
          </div>
        </div>
      )}
    </>
  );
};
