import { useContext } from "react";
import { useWeatherApi } from "../api/weather.api";
import { LocationContext } from "@/features/location/context/LocationContext";

export function useWeather() {
  const { location } = useContext(LocationContext);
  const { useWeatherByLocation } = useWeatherApi();
  const { data: weather, error, isLoading } = useWeatherByLocation({
    id: location.id,
    coords: location.coords,
  });

  return {
    weather,
    error,
    isLoading,
  };
}