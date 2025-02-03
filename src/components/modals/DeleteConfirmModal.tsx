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
    <OnModal
      title="Confirm Deletion"
      onConfirm={onConfirm}
      onClose={onClose}
      buttonLabel="DELETE"
      cancelLabel="CANCEL"
      content="Are you sure want to delete user?"
    ></OnModal>
  );
};

export default DeleteConfirmModal;
