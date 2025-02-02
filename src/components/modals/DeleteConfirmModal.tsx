import React from "react";
import OnModal from "@/components/utils/OnModal";

interface DeleteConfirmModalProps {
  itemName: string;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  itemName,
  onClose,
  onConfirm,
}) => {
  console.log(itemName);
  return (
    <OnModal title="Confirm Deletion" onClose={onClose}>
      <div className="text-center">
        <p className="text-lg text-gray-700">
          Are you sure you want to delete <strong>{itemName}</strong>?
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </OnModal>
  );
};

export default DeleteConfirmModal;
