import { Form } from "../form/form";
import { Button } from "./button";
import { settingsSchema, useSettings } from "@/hooks/useSettings";

export function Settings() {
  const { settings, save } = useSettings();

  return (
    <Form defaultValues={settings} onSubmit={save} schema={settingsSchema}>
      {({ register }) => (
        <div className="flex flex-col gap-2">
          <h2>Settings</h2>
          <label>
            <input type="checkbox" {...register("useFahrenheit")} />
            Use Fahrenheit
          </label>
          <div>
            <Button type="submit">Save</Button>
          </div>
        </div>
      )}
    </Form>
  );
}