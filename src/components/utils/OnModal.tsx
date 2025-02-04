import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  title: string;
  content?: React.ReactNode;
  buttonLabel?: string;
  cancelLabel?: string;
  onClose: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  children?: React.ReactNode;
}

const OnModal: React.FC<ModalProps> = ({
  title,
  content,
  buttonLabel,
  cancelLabel,
  onClose,
  onConfirm,
  onCancel,
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
      className={`fixed inset-0 flex items-center  justify-center bg-black/50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white p-6  shadow-lg w-full max-w-md relative transform transition-transform duration-300 ${
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

        {/* Buttons Section */}
        <div className="grid grid-cols-1  md:grid-cols-2  mt-4 md:flex-row w-full gap-1">
          {/* Cancel Button */}
          {cancelLabel && (
            <button
              onClick={onCancel || handleClose}
              className=" btn-secondary transition"
            >
              {cancelLabel}
            </button>
          )}

          {/* Confirm Button */}
          {buttonLabel && (
            <button
              onClick={onConfirm}
              className=" bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
            >
              {buttonLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnModal;
