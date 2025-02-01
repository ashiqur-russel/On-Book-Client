import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  title: string;
  content?: React.ReactNode;
  buttonLabel?: string;
  onClose: () => void;
  onConfirm?: () => void;
  children?: React.ReactNode;
}

const OnModal: React.FC<ModalProps> = ({
  title,
  content,
  buttonLabel,
  onClose,
  onConfirm,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative transform transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-95"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          <FaTimes size={18} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-black text-center mb-4">
          {title}
        </h2>

        {/* Modal Content */}
        <div className="mb-4">{content || children}</div>

        {/* Confirm Button */}
        {buttonLabel && (
          <button
            onClick={onConfirm}
            className="mt-4 bg-black text-white w-full py-3 hover:bg-gray-800 transition text-lg"
          >
            {buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default OnModal;
