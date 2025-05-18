import { z } from 'zod';

export const settingsSchema = z.object({
  useFahrenheit: z.boolean().default(false),
  useMiles: z.boolean().default(true),
});
export type Settings = z.infer<typeof settingsSchema>;
export const DEFAULT_SETTINGS: Settings = {
  useFahrenheit: false,
  useMiles: true,
};
