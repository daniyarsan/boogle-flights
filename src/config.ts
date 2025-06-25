import { SelectOption } from "@/types";
import { CabinClass } from "@/types/schema";

const isServer = typeof window === "undefined";

export const CONFIG = {
  API_URL: isServer ? process.env.API_URL : process.env.NEXT_PUBLIC_API_URL,
};

export const AIRPORTS_QUERY_KEY = "airports";

export const cabinOptions: SelectOption<CabinClass>[] = [
  { id: "economy", label: "Economy" },
  { id: "premium_economy", label: "Premium Economy" },
  { id: "business", label: "Business" },
  { id: "first", label: "First" },
];
