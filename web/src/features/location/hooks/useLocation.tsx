import { useState } from "react";

export function useLocation() {
  const [location, setLocation] = useState<Location>({
    id: undefined,
    coords: Coordinates.default()
  });

  return {
    location,
    setLocation,
  }
}

export interface Location {
  id?: string;
  coords?: Coordinates;
}

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