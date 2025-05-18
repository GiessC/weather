import { useLocalStorage } from "@/lib/local-storage";
import { createContext, useMemo, useState, type PropsWithChildren } from "react";
import { z } from "zod";

export class Coordinates {
  latitude: number;
  longitude: number;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  static default() {
    return new Coordinates(42.9648, 77.4472);
  }
}

export interface ILocationContext {
  location: LocationOption;
  setLocation: (location: LocationOption) => void;
}

export const searchSchema = z.object({
  query: z.string().min(1, { message: "Please enter a location" }),
});

export type SearchRequest = z.infer<typeof searchSchema>;

export interface LocationOptionJson {
  id: number;
  name: string;
  country: string;
  region: string;
  lat: number;
  lon: number;
}

export class LocationOption {
  readonly id: number;
  readonly name: string;
  readonly country: string;
  readonly region: string;
  readonly coords: Coordinates;

  constructor(
    id: number,
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


export const DEFAULT_LOCATION = new LocationOption(
  4_007_449,
  'Victor',
  'United States of America',
  'New York',
  Coordinates.default(),
);

export const LocationContext = createContext<ILocationContext>({
  location: DEFAULT_LOCATION,
  setLocation: () => {},
});

export function LocationProvider({ children }: PropsWithChildren) {
  const { getItem, setItem } = useLocalStorage();
  const [location, setLocation] = useState<LocationOption>(
    getItem<LocationOption>(
      "location",
      (value: Partial<LocationOption>) => {
        return new LocationOption(
          value.id!,
          value.name!,
          value.country!,
          value.region!,
          new Coordinates(value.coords!.latitude, value.coords!.longitude),
        );
      }
    ) ?? DEFAULT_LOCATION,
  );

  const contextValue = useMemo<ILocationContext>(() => ({
    location,
    setLocation: (location: LocationOption) => {
      console.log("Location set to", location);
      setLocation(location);
      setItem("location", location);
    },
  }), [location, setItem]);

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
}