import React from "react";
import FlightCard from "@/components/FlightCard";
import { Box, Typography } from "@mui/material";
import { FlightItem } from "@/types";

function FlightsList({ data }: { data: FlightItem[] }) {
  return (
    <Box>
      <Typography
        component={"h2"}
        variant="h5"
        sx={{ mb: 2, fontWeight: "bold", fontSize: "20px" }}
      >
        Departing flights
      </Typography>
      {data.map((item) => {
        return <FlightCard key={item.id} item={item} />;
      })}
    </Box>
  );
}

export default FlightsList;
