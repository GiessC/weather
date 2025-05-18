import { SettingsContext } from '@/context/settings.context';
import { useWeather } from '@/features/weather/hooks/useWeather';
import { milesToKilometers } from '@/utils/distance';
import { useContext, useMemo } from 'react';

export function useLocalizer() {
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

  const condition = useMemo(() => {
    if (!weather) {
      return;
    }
    return weather.condition;
  }, [weather]);

  const humidity = useMemo(() => {
    if (!weather) {
      return '';
    }
    return `${weather.humidity} %`;
  }, [weather]);

  const wind = useMemo(() => {
    if (!weather) {
      return '';
    }
    if (settings.useMiles) {
      return `${weather.wind.speedMph} mph ${weather.wind.direction} with gusts up to ${weather.wind.gustMph} mph`;
    }
    return `${milesToKilometers(weather.wind.speedMph)} km/h ${weather.wind.direction} with gusts up to ${milesToKilometers(weather.wind.gustMph)} km/h`;
  }, [settings.useMiles, weather]);

  const cloudCoverage = useMemo(() => {
    if (!weather) {
      return '';
    }
    return `${weather.cloudCoverage} %`;
  }, [weather]);

  const uvIndex = useMemo(() => {
    if (!weather) {
      return '';
    }
    return `${weather.uvIndex}`;
  }, [weather]);

  const visibility = useMemo(() => {
    if (!weather) {
      return '';
    }
    if (settings.useMiles) {
      return `${weather.visibilityMiles} miles`;
    }
    return `${milesToKilometers(weather.visibilityMiles)} km`;
  }, [settings.useMiles, weather]);

  return {
    temperature,
    condition,
    humidity,
    wind,
    cloudCoverage,
    uvIndex,
    visibility,
    error,
    isLoading,
  };
}
