"use client";

// theme.ts
import { createTheme } from "@mui/material/styles";
import localFont from "next/font/local";

// ✅ экспортируем шрифт с правильной переменной
export const googleSans = localFont({
  src: [
    {
      path: "../public/fonts/googlesans/ProductSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/googlesans/ProductSans-Medium.ttf",
      weight: "500",
      style: "semi-bold",
    },
    {
      path: "../public/fonts/googlesans/ProductSans-Bold.ttf",
      weight: "600",
      style: "bold",
    },
  ],
  variable: "--font-google-sans",
  display: "swap",
});

// ✅ создаём тему, используя эту переменную
export const theme = createTheme({
  typography: {
    fontSize: 13,
    fontFamily: `${googleSans.style.fontFamily}, Roboto, Arial, sans-serif`,
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthMd: {
          maxWidth: "1024px !important",
        },
      },
    },
  },
});
