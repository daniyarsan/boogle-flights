"use client";

import { Box, Typography, useTheme } from "@mui/material";

export default function FlightsHero() {
  const theme = useTheme();

  const lightUrl =
    "https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_4.svg";
  const darkUrl =
    "https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_dark_theme_4.svg";

  return (
    <Box
      role="presentation"
      sx={{
        height: 300,
        backgroundImage: `url(${
          theme.palette.mode === "dark" ? darkUrl : lightUrl
        })`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
      }}
    >
      <Typography variant="h2">Flights</Typography>
    </Box>
  );
}
