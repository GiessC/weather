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

  function load(): Settings {
    const settings = localStorage.getItem("settings");
    if (settings) {
      const userSettings = JSON.parse(settings);
      return {
        ...DEFAULT_SETTINGS,
        ...userSettings,
      }
    }
    return DEFAULT_SETTINGS;
  }

  function save(newSettings: Settings) {
    setSettings(newSettings);
    localStorage.setItem("settings", JSON.stringify(newSettings));
  }

  function reset() {
    localStorage.removeItem("settings");
    setSettings(DEFAULT_SETTINGS);
  }

  return {
    settings,
    save,
    reset,
  };
}