import { SettingsContext } from '@/context/settings.context';
import { useWeather } from '@/features/weather/hooks/useWeather';
import { useContext, useMemo } from 'react';

export interface ILocalizer {
  temperature: string;
  error?: Error | null;
  isLoading: boolean;
}

export function useLocalizer(): ILocalizer {
  const { weather, error, isLoading } = useWeather();
  const { settings } = useContext(SettingsContext);

  const temperature = useMemo(() => {
    if (!weather) {
      return '';
    }
    const celcius = weather.temperature.celcius;
    if (settings.useFahrenheit) {
      const fahrenheit = (celcius * 9) / 5 + 32;
      return `${Math.round(fahrenheit)} °F`;
    }
    return `${Math.round(celcius)} °C`;
  }, [weather, settings.useFahrenheit]);

  if (!weather) {
    return {
      temperature: '',
      error,
      isLoading,
    };
  }

  return {
    temperature,
    error,
    isLoading,
  };
}
