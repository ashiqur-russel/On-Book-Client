"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export interface DatePickerWithRangeProps {
  className?: string;
  value?: DateRange;
  onSelect?: (range: DateRange | undefined) => void;
}

export function DatePickerWithRange({
  className,
  value,
  onSelect,
}: DatePickerWithRangeProps) {
  const [internal, setInternal] = React.useState<DateRange | undefined>(value);
  const range = value ?? internal;

  return (
    <Popover modal>
      <PopoverTrigger>
        <Button variant="outline" className={`${className} text-left`}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {range?.from
            ? range.to
              ? `${format(range.from, "LLL dd, yyyy")} – ${format(
                  range.to,
                  "LLL dd, yyyy"
                )}`
              : format(range.from, "LLL dd, yyyy")
            : "Pick date range"}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="start"
        className="bg-white rounded-lg shadow-lg p-4 z-[9999] overflow-visible w-full"
      >
        <Calendar
          mode="range"
          selected={range}
          onSelect={(newRange) => {
            if (onSelect) onSelect(newRange);
            else setInternal(newRange);
          }}
          disabled={{ before: new Date() }}
          numberOfMonths={2}
          classNames={{
            day_selected: "bg-primary text-white",
            day_range_middle: "bg-primary text-white",
            day_range_start: "rounded-l-lg bg-primary text-white",
            day_range_end: "rounded-r-lg bg-primary text-white",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
