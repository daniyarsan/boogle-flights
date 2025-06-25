import { apiClient } from "@/lib/requester";
import { CONFIG } from "@/config";
import { Airport, FlightItem, SearchFlightsQuery } from "@/types";
import { toStringParams } from "@/utils";

export async function getAirportsByTitle(inputQuery: { query: string }) {
  const query = new URLSearchParams(inputQuery);
  return await apiClient.get<Airport[]>(
    `${CONFIG.API_URL}/flights/searchAirport?${query.toString()}`,
  );
}

export async function searchFlights(inputQuery: SearchFlightsQuery) {
  const query = new URLSearchParams(toStringParams(inputQuery));
  return await apiClient.get<FlightItem[]>(
    `${CONFIG.API_URL}/flights/searchFlights?${query.toString()}`,
  );
}
