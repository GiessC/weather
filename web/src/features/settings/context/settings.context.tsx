import { useLocalStorage } from "@/lib/local-storage";
import { createContext, useCallback, useMemo, useState, type PropsWithChildren } from "react";
import { DEFAULT_SETTINGS, type Settings } from "../types/settings.entity";

export const SettingsContext = createContext<{
  settings: Settings;
  save: (settings: Settings) => void;
  reset: () => void;
}>({
  settings: DEFAULT_SETTINGS,
  save: () => {},
  reset: () => {},
});

export function SettingsProvider({ children }: PropsWithChildren) {
  const { getItem, setItem, removeItem } = useLocalStorage();

  const load = (): Settings => {
    const settings = getItem<Settings>("settings");
    if (settings) {
      return {
        ...DEFAULT_SETTINGS,
        ...settings,
      }
    }
    return DEFAULT_SETTINGS;
  };

  const [settings, setSettings] = useState<Settings>(load());

  const save = useCallback((newSettings: Settings) => {
    setSettings(newSettings);
    setItem("settings", newSettings);
  }, [setItem]);

  const reset = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    removeItem("settings");
  }, [removeItem]);

  const contextValue = useMemo(() => ({
    settings,
    save,
    reset,
  }), [reset, save, settings]);

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  )
}