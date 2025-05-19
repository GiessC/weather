import { Skeleton } from "@/components/ui/skeleton";
import { useWeather } from "../hooks/useWeather";
import { useLocalizer } from "@/features/localization/hooks/useLocalizer";
import { useContext, useMemo } from "react";
import { SettingsContext } from "@/features/settings/context/settings.context";
import { round } from "@/utils/number";

export function Wind() {
  const { weather, isLoading } = useWeather();
  const { settings } = useContext(SettingsContext);
  const { milesToKilometers } = useLocalizer();

  const windSpeed = useMemo(() => {
    if (!weather) {
      return '';
    }
    if (settings.useMiles) {
      return `${round(weather.wind.speedMph)} mph`;
    }
    return `${round(milesToKilometers(weather.wind.speedMph))} km/h`;
  }, [milesToKilometers, settings.useMiles, weather]);

  const gustSpeed = useMemo(() => {
    if (!weather) {
      return '';
    }
    if (settings.useMiles) {
      return `${round(weather.wind.gustMph)} mph`;
    }
    return `${round(milesToKilometers(weather.wind.gustMph))} km/h`;
  }, [milesToKilometers, settings.useMiles, weather]);

  return (
    <div className='flex gap-2'>
      <p className='font-semibold'>Wind: </p>
      {isLoading
        ? <Skeleton className='w-[250px]' />
        : <p>{windSpeed} {weather?.wind.direction} with gusts up to {gustSpeed}</p>}
    </div>
  );
}