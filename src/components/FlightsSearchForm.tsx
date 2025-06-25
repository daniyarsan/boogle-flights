"use client";

import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Stack,
  Box,
  Chip,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Selector from "@/components/form/Selector";
import DateRangeField from "@/components/form/DateRangeField";
import AirportSearchField from "@/components/form/AirportSearchField";
import { useQuery } from "@tanstack/react-query";
import { searchFlights } from "@/api";
import FlightsList from "@/components/FlightsList";
import { useToast } from "@/providers/ToastProvider";
import {
  CabinClass,
  FlightSearchInput,
  flightSearchSchema,
} from "@/types/schema";
import dayjs from "dayjs";
import { cabinOptions } from "@/config";
import { FlightItem } from "@/types";
type AirportOption = {
  id: string;
  tag: string;
};

export default function FlightsSearchForm() {
  const { showToast } = useToast();

  const [form, setForm] = useState<FlightSearchInput>({
    originSkyId: "",
    destinationSkyId: "",
    originEntityId: "",
    destinationEntityId: "",
    date: "",
    returnDate: "",
    cabinClass: "economy",
  });

  const lastInput = useRef(form);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["searchFlights", lastInput.current],
    queryFn: async () => {
      const res = await searchFlights(lastInput.current);

      if (!res.status) throw new Error(res.message);
      return res;
    },
    enabled: false,
    // onError: (e) => showToast(`Error: ${String(e)}`, "error"),
    // onSuccess: () => showToast("Flights loaded!", "success"),
  });

  const handleSubmit = () => {
    const parsed = flightSearchSchema.safeParse(form);
    if (!parsed.success) {
      parsed.error.errors.forEach((err) => showToast(err.message, "error"));
      return;
    }
    lastInput.current = parsed.data;
    refetch();
  };

  console.log(form);
  return (
    <Stack direction={"column"} spacing={4}>
      <Box sx={{ position: "relative" }}>
        <Card elevation={3} sx={{ borderRadius: 3, mt: 4 }}>
          <CardContent>
            <Stack direction={"column"} spacing={2}>
              <Stack direction={"row"} spacing={2}>
                <Selector<CabinClass>
                  options={cabinOptions}
                  value={form.cabinClass}
                  onChange={(val) =>
                    setForm((f) => ({ ...f, cabinClass: val }))
                  }
                />
              </Stack>

              <Grid container spacing={1}>
                <Grid size={{ md: 3.5, xs: 6 }}>
                  <AirportSearchField
                    value={form.originSkyId}
                    onChange={(val: AirportOption) => {
                      setForm((f) => ({
                        ...f,
                        originSkyId: val.tag ?? "",
                        originEntityId: val.id ?? "",
                      }));
                    }}
                  />
                </Grid>

                <Grid size={{ md: 3.5, xs: 6 }}>
                  <AirportSearchField
                    value={form.destinationSkyId}
                    onChange={(val: AirportOption) => {
                      setForm((f) => ({
                        ...f,
                        destinationSkyId: val?.tag ?? "",
                        destinationEntityId: val?.id ?? "",
                      }));
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 5 }}>
                  <DateRangeField
                    value={{ start: form.date, end: form.returnDate }}
                    handleChange={(start, end) => {
                      setForm((f) => ({
                        ...f,
                        date: start,
                        returnDate: end,
                      }));
                    }}
                  />
                </Grid>
              </Grid>
            </Stack>
          </CardContent>
        </Card>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%) translateY(60%)",
          }}
        >
          <Chip
            sx={{
              px: 1,
              py: "20px",
              borderRadius: 30,
              fontSize: "1rem",
            }}
            component="button"
            clickable
            onClick={handleSubmit}
            icon={isLoading ? <CircularProgress size={20} /> : <SearchIcon />}
            label={isLoading ? "Searching…" : "Explore"}
            size="medium"
            variant="filled"
            color="primary"
          />
        </Box>
      </Box>

      {data !== undefined && (
        <FlightsList data={data.itineraries as FlightItem[]} />
      )}
    </Stack>
  );
}
