import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

interface DateRangeFieldProps {
  value: string;
  onChange: (date: string) => void;
}
export default function DateRangeField({
  value,
  onChange,
}: DateRangeFieldProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer sx={{ p: 0 }} components={["DateRangePicker"]}>
        <DateRangePicker value={value} onChange={(val) => onChange(val)} />
      </DemoContainer>
    </LocalizationProvider>
  );
}
