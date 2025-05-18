import { LocationProvider } from "@/features/location/context/LocationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

const queryClient = new QueryClient();

export function Provider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <LocationProvider>
        {children}
      </LocationProvider>
    </QueryClientProvider>
  )
}