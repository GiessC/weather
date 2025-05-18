import { api, apiUrl } from '@/lib/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  CurrentWeather,
  type CurrentWeatherJson,
} from '../types/current-weather';
import {
  Coordinates,
  type Location,
} from '@/features/location/hooks/useLocation';

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

  function useLocationSearch() {
    return useMutation({
      mutationKey: ['location'],
      mutationFn: async (query: string) => {
        const endpoint = apiUrl('/search.json');
        endpoint.searchParams.append('q', query!);
        const response = await api.get<LocationOptionJson[]>(endpoint);
        console.log('response', response);
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

export interface LocationOptionJson {
  id: string;
  name: string;
  country: string;
  region: string;
  lat: number;
  lon: number;
}

export class LocationOption {
  readonly id: string;
  readonly name: string;
  readonly country: string;
  readonly region: string;
  readonly coords: Coordinates;

  constructor(
    id: string,
    name: string,
    country: string,
    region: string,
    coords: Coordinates
  ) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.region = region;
    this.coords = coords;
  }

  static fromJson(json: LocationOptionJson): LocationOption {
    return new LocationOption(
      json.id,
      json.name.trim(),
      json.country.trim(),
      json.region.trim(),
      new Coordinates(json.lat, json.lon)
    );
  }

  get fullName(): string {
    return `${this.name}, ${this.region ? `${this.region},` : ''} ${
      this.country
    }`;
  }
}
