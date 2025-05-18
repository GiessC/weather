import { Skeleton } from "@/components/ui/skeleton";
import { useLocalizer } from "@/features/localization/hooks/useLocalizer";
import { useWeather } from "../hooks/useWeather";
import { useContext, useMemo } from "react";
import { SettingsContext } from "@/context/settings.context";

export function Visibility() {
  const { weather, isLoading } = useWeather();
  const { settings } = useContext(SettingsContext);
  const { milesToKilometers } = useLocalizer();

  const visibility = useMemo(() => {
    if (!weather) {
      return '';
    }
    if (settings.useMiles) {
      return `${Math.round(weather.visibilityMiles)} miles`;
    }
    return `${milesToKilometers(weather.visibilityMiles)} km`;
  }, [milesToKilometers, settings.useMiles, weather]);

  return (
    <div className='flex gap-2'>
      {isLoading ? <Skeleton className='w-[100px] h-[25px]' /> : <p>{visibility} of visibility</p>}
    </div>
  );
}