import { api, apiUrl } from '@/lib/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  CurrentWeather,
  type CurrentWeatherJson,
} from '../types/current-weather';
import {
  LocationOption,
  type LocationOptionJson,
} from '@/features/location/context/location.context';

export function useWeatherApi() {
  function useWeatherByLocation({ id, coords }: LocationOption) {
    return useQuery({
      queryKey: ['weather', id, coords?.latitude, coords?.longitude],
      queryFn: async (): Promise<CurrentWeather> => {
        return new Promise((resolve) => {
          setTimeout(async () => {
            const endpoint = apiUrl('/current.json');
            endpoint.searchParams.append(
              'q',
              id ? `id:${id}` : `${coords?.latitude},${coords?.longitude}`
            );
            const json = await api.get<CurrentWeatherJson>(endpoint);
            resolve(CurrentWeather.fromJson(json));
          }, 5_000);
        });
      },
    });
  }

  function useLocationSearch() {
    return useMutation({
      mutationKey: ['location'],
      mutationFn: async (query: string) => {
        const endpoint = apiUrl('/search.json');
        endpoint.searchParams.append('q', query!);
        const response = await api.get<LocationOptionJson[]>(endpoint);
        return response.map((json: LocationOptionJson): LocationOption => {
          return LocationOption.fromJson(json);
        });
      },
    });
  }

  return {
    useWeatherByLocation,
    useLocationSearch,
  };
}
export { LocationOption };
