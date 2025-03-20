import React, { useState } from "react";
import OnModal from "@/components/utils/OnModal";

interface OfferModalProps {
  onClose: () => void;
  onSubmit: (discount: number) => void;
}

const OfferModal: React.FC<OfferModalProps> = ({ onClose, onSubmit }) => {
  const [discount, setDiscount] = useState<number>(0);

  const handleSubmit = () => {
    if (discount > 0) {
      onSubmit(discount);
    }
  };

  return (
    <OnModal
      title="Apply Offer Discount"
      onClose={onClose}
      buttonLabel="Submit"
      cancelLabel="Cancel"
      onConfirm={handleSubmit}
      onCancel={onClose}
    >
      <div className="flex flex-col items-center">
        <p className="mb-2">Enter discount percentage:</p>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
          className="border border-gray-300 rounded-lg p-2 w-full"
          placeholder="e.g. 20"
        />
      </div>
    </OnModal>
  );
};

export default OfferModal;
