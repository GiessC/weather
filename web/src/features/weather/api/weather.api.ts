import { api, apiUrl } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import {
  CurrentWeather,
  type CurrentWeatherJson,
} from '../types/current-weather';
import type { Location } from '@/features/location/hooks/useLocation';

export function useWeatherApi() {
  function useWeatherByLocation({ id, coords }: Location) {
    return useQuery({
      queryKey: ['weather', id, coords?.latitude, coords?.longitude],
      queryFn: async (): Promise<CurrentWeather> => {
        const endpoint = apiUrl('/current.json');
        endpoint.searchParams.append(
          'q',
          id ? `id:${id}` : `${coords?.latitude},${coords?.longitude}`
        );
        const json = await api.get<CurrentWeatherJson>(endpoint);
        return CurrentWeather.fromJson(json);
      },
    });
  }

  function useSearchLocation(query: string): Promise<CurrentWeatherJson> {
    const endpoint = apiUrl('/current.json');
    endpoint.searchParams.append('q', query);
    return api.get<CurrentWeatherJson>(endpoint);
  }

  return {
    useWeatherByLocation,
    useSearchLocation,
  };
}
