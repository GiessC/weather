import { createContext, useMemo, useState, type PropsWithChildren } from "react";

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

export const LocationContext = createContext<ILocationContext>({
  location: {
    id: undefined,
    coords: Coordinates.default(),
  },
  setLocation: () => {},
});

export interface ILocationContext {
  location: Location;
  setLocation: (location: Location) => void;
}

export function LocationProvider({ children }: PropsWithChildren) {
  const [location, setLocation] = useState<Location>({
    id: undefined,
    coords: Coordinates.default(),
  });

  const contextValue = useMemo<ILocationContext>(() => ({
    location,
    setLocation: (location: Location) => {
      setLocation(location);
    },
  }), [location]);

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
}
import { z } from "zod";

export const searchSchema = z.object({
  query: z.string().min(1, { message: "Please enter a location" }),
});

export type SearchRequest = z.infer<typeof searchSchema>;
export interface Location {
  id?: string;
  coords?: Coordinates;
}