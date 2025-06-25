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
  Modal,
  Button,
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
type AirportOption = {
  id: string;
  tag: string;
};

export default function FlightsSearchForm() {
  const [captchaData, setCaptchaData] = useState<null | {
    pageBase64: string;
    uuid: string;
    vid: string;
  }>(null);

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
      console.log(res);

      if (!res.status) {
        if (res.message?.action === "captcha") {
          // Сохраняем данные капчи в состоянии, чтобы отобразить
          setCaptchaData({
            pageBase64: res.message.page,
            uuid: res.message.uuid,
            vid: res.message.vid,
          });
          throw new Error("Captcha required");
        }
        throw new Error(
          typeof res.message === "string"
            ? res.message
            : JSON.stringify(res.message),
        );
      }

      return res.data;
    },
    enabled: false,
    // onError: (e) => showToast(`Error: ${String(e)}`, "error"),
    // onSuccess: () => showToast("Flights loaded!", "success"),
  });

  // Функция для закрытия капчи, например, после успешного решения
  const handleCaptchaClose = () => {
    setCaptchaData(null);
    // Можно автоматически перезапустить запрос
    refetch();
  };

  const handleSubmit = () => {
    const [start, end] = form.date || [];
    const formattedStart = start ? dayjs(start.$d).format("YYYY-MM-DD") : "";
    const formattedEnd = end ? dayjs(end.$d).format("YYYY-MM-DD") : "";

    const dataToValidate = {
      ...form,
      date: formattedStart,
      returnDate: formattedEnd,
    };

    const parsed = flightSearchSchema.safeParse(dataToValidate);
    if (!parsed.success) {
      parsed.error.errors.forEach((err) => showToast(err.message, "error"));
      return;
    }

    lastInput.current = parsed.data;
    refetch();
  };

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
                <Grid size={{ xs: 3.5 }}>
                  <AirportSearchField
                    value={form.originSkyId}
                    onChange={(val: AirportOption) => {
                      setForm((f) => ({
                        ...f,
                        originSkyId: val?.tag ?? "",
                        originEntityId: val?.id ?? "",
                      }));
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 3.5 }}>
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

                <Grid size={{ xs: 5 }}>
                  <DateRangeField
                    value={form.date}
                    onChange={(val) => {
                      setForm((f) => ({ ...f, date: val }));
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

      {data !== undefined && <FlightsList data={data.itineraries} />}

      <Modal open={!!captchaData} onClose={handleCaptchaClose}>
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90vw",
            maxWidth: 600,
            height: "80vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            overflow: "auto",
          }}
        >
          {captchaData && (
            <>
              {/* iframe с капчей */}
              <iframe
                srcDoc={atob(captchaData.pageBase64)}
                title="Captcha Challenge"
                style={{ width: "100%", height: "100%", border: "none" }}
              />
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleCaptchaClose}
              >
                Закрыть капчу и попробовать снова
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Stack>
  );
}
