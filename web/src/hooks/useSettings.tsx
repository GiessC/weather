import { useLocalStorage } from "@/lib/local-storage";
import { useState } from "react";
import { z } from "zod";

export const settingsSchema = z.object({
  useFahrenheit: z.boolean().default(false),
});

export type Settings = z.infer<typeof settingsSchema>;

const DEFAULT_SETTINGS: Settings = {
  useFahrenheit: false,
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(load());
  const { getItem, setItem, removeItem } = useLocalStorage();

  function load(): Settings {
    const settings = getItem<Settings>("settings");
    if (settings) {
      return {
        ...DEFAULT_SETTINGS,
        ...settings,
      }
    }
    return DEFAULT_SETTINGS;
  }

  function save(newSettings: Settings) {
    setSettings(newSettings);
    setItem("settings", JSON.stringify(newSettings));
  }

  function reset() {
    setSettings(DEFAULT_SETTINGS);
    removeItem("settings");
  }

  return {
    settings,
    save,
    reset,
  };
}