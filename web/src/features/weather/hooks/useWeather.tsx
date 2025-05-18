import { useContext } from "react";
import { useWeatherApi } from "../api/weather.api";
import { LocationContext } from "@/features/location/context/location.context";

export function useWeather() {
  const { location } = useContext(LocationContext);
  const { useWeatherByLocation } = useWeatherApi();
  const { data: weather, error, isLoading } = useWeatherByLocation(location);

  return {
    weather,
    error,
    isLoading,
  };
}