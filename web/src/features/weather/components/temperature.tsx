import { Skeleton } from "@/components/ui/skeleton";
import { useWeather } from "../hooks/useWeather";
import { useContext, useMemo } from "react";
import { SettingsContext } from "@/context/settings.context";
import { useLocalizer } from "@/features/localization/hooks/useLocalizer";

export function Temperature() {
  const { settings } = useContext(SettingsContext);
  const { weather, isLoading } = useWeather();
  const { celciusToFahrenheit } = useLocalizer();

  const temperature = useMemo(() => {
    if (!weather) {
      return '';
    }
    const celcius = weather.temperature.celcius;
    if (settings.useFahrenheit) {
      celciusToFahrenheit(celcius);
      const fahrenheit = (celcius * 9) / 5 + 32;
      return `${Math.round(fahrenheit)} °F`;
    }
    return `${Math.round(celcius)} °C`;
  }, [weather, settings.useFahrenheit, celciusToFahrenheit]);

  return (
    <div className='flex gap-2'>
      {isLoading ? <Skeleton className='w-[100px] h-[25px]' /> : <p>{temperature}</p>}
    </div>
  );
}