import { apiClient } from "@/lib/requester";
import { CONFIG } from "@/config";
import { Airport } from "@/types";

export async function getAirportsByTitle(inputQuery: { query: string }) {
  const query = new URLSearchParams(inputQuery);
  return await apiClient.get<Airport[]>(
    `${CONFIG.API_URL}/flights/searchAirport?${query.toString()}`,
  );
}
