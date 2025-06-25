"use client";

import FlightsHero from "@/components/FlightsHero";
import FlightsSearchForm from "@/components/FlightsSearchForm";
import { Container } from "@mui/material";

export default function Main() {
  return (
    <>
      <FlightsHero />
      <Container maxWidth="md">
        <FlightsSearchForm />
      </Container>
    </>
  );
}
