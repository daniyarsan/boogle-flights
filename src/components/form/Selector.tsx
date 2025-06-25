import { SelectorProps } from "@/types";
import { MenuItem, Select } from "@mui/material";

export default function Selector<T extends string>({
  value,
  options,
  onChange,
}: SelectorProps<T>) {
  return (
    <Select
      labelId="selector-label"
      id="selector"
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      variant="standard"
      disableUnderline
      sx={{
        "&::before, &::after, &:hover::before": {
          borderBottom: "none !important",
        },
      }}
    >
      {options.map((opt) => (
        <MenuItem key={opt.id} value={opt.id}>
          {opt.label}
        </MenuItem>
      ))}
    </Select>
  );
}
