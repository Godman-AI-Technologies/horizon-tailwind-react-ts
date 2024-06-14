import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Modal } from "shared/Modal";

interface IAddButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

export const AddButton: React.FC<IAddButtonProps> = ({ children, onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    console.log("Form submitted");
    handleCloseModal();
  };

  return (
    <>
      {children && isModalOpen && (
        <Modal
          title="My Modal"
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          submitHandler={handleSubmit}
        >
          {children}
        </Modal>
      )}
      <button
        onClick={children ? handleOpenModal : onClick}
        className="fixed bottom-4 right-4 rounded-full bg-blue-500 p-4 text-white shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        <FaPlus size={24} />
      </button>
    </>
  );
};
