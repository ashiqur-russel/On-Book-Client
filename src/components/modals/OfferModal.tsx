import React from "react";
import { DateRange } from "react-day-picker";
import OnModal from "@/components/utils/OnModal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";

interface OfferModalProps {
  onClose: () => void;
  onSubmit: (offerRate: number, start: string, end: string) => void;
}

export default function OfferModal({ onClose, onSubmit }: OfferModalProps) {
  const [offerRate, setOfferRate] = React.useState<number>(0);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    undefined
  );

  const handleConfirm = () => {
    if (dateRange?.from && dateRange.to) {
      onSubmit(
        offerRate,
        dateRange.from.toISOString(),
        dateRange.to.toISOString()
      );
    }
  };

  return (
    <OnModal
      title="Apply Offer Discount"
      cancelLabel="Cancel"
      buttonLabel="Submit"
      onClose={onClose}
      onConfirm={handleConfirm}
    >
      <div className="space-y-4">
        <Label htmlFor="offerRate">Discount (%)</Label>
        <Input
          id="offerRate"
          type="number"
          min={0}
          max={100}
          value={offerRate}
          onChange={(e) => setOfferRate(Number(e.target.value))}
        />

        <Label>Date Range</Label>
        <DatePickerWithRange
          className="w-full"
          value={dateRange}
          onSelect={setDateRange}
        />
      </div>
    </OnModal>
  );
}
