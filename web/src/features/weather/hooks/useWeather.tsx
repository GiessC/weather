import { useLocation } from "@/features/location/hooks/useLocation";
import { useWeatherApi } from "../api/weather.api";

export function useWeather() {
  const { location } = useLocation();
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