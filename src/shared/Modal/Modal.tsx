import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  submitHandler: () => void;
  isOpen: boolean;
  onClose: () => void;
  isDanger?: boolean;
  isSubmitDisabled?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  children,
  submitHandler,
  isOpen,
  onClose,
  isDanger = false,
  isSubmitDisabled = false,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded-lg bg-white shadow-lg">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <div className="p-4">{children}</div>
        <div className="flex justify-end border-t p-4">
          {isDanger ? (
            <button
              onClick={submitHandler}
              disabled={isSubmitDisabled}
              className={`rounded bg-red-500 px-4 py-2 text-white transition duration-200 ${
                isSubmitDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
              }`}
            >
              Delete
            </button>
          ) : (
            <button
              onClick={submitHandler}
              disabled={isSubmitDisabled}
              className={`rounded bg-blue-500 px-4 py-2 text-white transition duration-200 ${
                isSubmitDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              }`}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
