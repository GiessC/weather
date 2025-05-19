import { SettingsProvider } from "@/features/settings/context/settings.context";
import { LocationProvider } from "@/features/location/context/location.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

const queryClient = new QueryClient();

export function Provider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <LocationProvider>
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </LocationProvider>
    </QueryClientProvider>
  )
}