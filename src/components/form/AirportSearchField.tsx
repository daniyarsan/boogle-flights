import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { AIRPORTS_QUERY_KEY } from "@/config";
import { getAirportsByTitle } from "@/api";
import { Airport } from "@/types";
import LocationOnIcon from "@mui/icons-material/LocationOn";

type AirportSearchFieldProps = {
  value: string;
  onChange: (val: { tag: string; id: string }) => void;
};

export default function AirportSearchField({
  value,
  onChange,
}: AirportSearchFieldProps) {
  const [selected, setSelected] = useState<Airport | null>(null);
  const [options, setOptions] = useState<Airport[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelected(options.find((o) => o.skyId === value) || null);
  }, [value, options]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue.length > 1) {
        setSearchTerm(inputValue.trim());
        setOpen(true);
      }
    }, 100);
    return () => clearTimeout(handler);
  }, [inputValue]);

  // Fetch data
  const { data, isFetching } = useQuery({
    queryKey: [AIRPORTS_QUERY_KEY, searchTerm],
    queryFn: async () => {
      const res = await getAirportsByTitle({ query: searchTerm });
      if (!res.status) throw new Error(res.message);
      return res.data || [];
    },
    enabled: searchTerm.length > 1,
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    if (data) {
      setOptions(data);
    }
  }, [data]);

  return (
    <Autocomplete
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      fullWidth
      getOptionLabel={(option) => option.skyId}
      // filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={selected}
      inputValue={inputValue}
      loading={isFetching}
      onChange={(_, newVal) => {
        setSelected(newVal);
        onChange({ tag: newVal?.skyId, id: newVal?.entityId });
        setInputValue(newVal?.skyId || "");
        setOpen(false); // optional: close on select
      }}
      onInputChange={(_, newValue, reason) => {
        if (reason === "input") setInputValue(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {isFetching && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
