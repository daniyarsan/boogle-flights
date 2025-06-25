import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs, { Dayjs } from "dayjs";

interface DateRangeFieldProps {
  value: { start: string; end: string };
  handleChange: (start: string, end: string) => void;
}

export default function DateRangeField({
  value,
  handleChange,
}: DateRangeFieldProps) {
  const parsedRange: [Dayjs | null, Dayjs | null] = [
    value.start ? dayjs(value.start) : null,
    value.end ? dayjs(value.end) : null,
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer sx={{ p: 0 }} components={["DateRangePicker"]}>
        <DateRangePicker
          value={parsedRange}
          onChange={(newValue) => {
            const [start, end] = newValue;
            const formattedStart = start?.format("YYYY-MM-DD") || "";
            const formattedEnd = end?.format("YYYY-MM-DD") || "";
            handleChange(formattedStart, formattedEnd);
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
