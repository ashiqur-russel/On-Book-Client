import React from "react";
import OnModal from "@/components/utils/OnModal";

interface DeleteConfirmModalProps {
  content?: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  content,
  onClose,
  onConfirm,
}) => {
  return (
    <OnModal
      title="Confirm Deletion"
      onConfirm={onConfirm}
      onClose={onClose}
      buttonLabel="DELETE"
      cancelLabel="CANCEL"
      content={content}
    ></OnModal>
  );
};

export default DeleteConfirmModal;
