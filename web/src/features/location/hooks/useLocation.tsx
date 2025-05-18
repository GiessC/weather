import { useWeatherApi, type LocationOption } from "@/features/weather/api/weather.api";
import { useState } from "react";
import { z } from "zod";

export const searchSchema = z.object({
  query: z.string().min(1, { message: "Please enter a location" }),
});

export type SearchRequest = z.infer<typeof searchSchema>;

export function useLocation() {
  const { useLocationSearch: useSearch } = useWeatherApi();
  const [location, setLocation] = useState<Location>({
    id: undefined,
    coords: Coordinates.default()
  });

  return {
    location,
    useSearch,
    setLocation,
  }
}

export interface Location {
  id?: string;
  coords?: Coordinates;
}

export class Coordinates {
  latitude: number;
  longitude: number;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  static default() {
    return new Coordinates(42.9648, 77.4472);
  }
}