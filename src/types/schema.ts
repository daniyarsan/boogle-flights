import { z } from "zod";

export const CabinClassEnum = z.enum([
  "economy",
  "premium_economy",
  "business",
  "first",
]);

export const flightSearchSchema = z.object({
  originSkyId: z.string().min(2, {
    message: "Departure airport Tag must be at least 2 characters",
  }),
  destinationSkyId: z.string().min(2, {
    message: "Departure airport ID must be at least 2 characters",
  }),
  originEntityId: z.string().min(2, {
    message: "Arrival airport Tag must be at least 2 characters",
  }),
  destinationEntityId: z.string().min(2, {
    message: "Arrival airport ID must be at least 2 characters",
  }),
  date: z.string(),
  returnDate: z.string(),
  cabinClass: CabinClassEnum,
});

export type CabinClass = z.infer<typeof CabinClassEnum>;
export type FlightSearchInput = z.infer<typeof flightSearchSchema>;
