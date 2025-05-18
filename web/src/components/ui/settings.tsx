import { Form } from "../form/form";
import { Button } from "./button";
import { settingsSchema, useSettings } from "@/hooks/useSettings";
import { Checkbox } from "./checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";

export function Settings() {
  const { settings, save } = useSettings();

  return (
    <Form defaultValues={settings} onSubmit={save} schema={settingsSchema}>
      {({ control, formState: { errors } }) => (
        <div className="flex flex-col gap-2">
          <h2>Settings</h2>
          <div className='flex flex-row gap-2 items-center'>
            <FormField
              control={control}
              name="useFahrenheit"
              render={({ field }) => (
                <FormItem>
                  <div className='flex flex-row gap-2 items-center'>
                    <FormControl>
                      <Checkbox
                        id='useFahrenheit'
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className='cursor-pointer' htmlFor='useFahrenheit'>
                      Use Fahrenheit
                    </FormLabel>
                  </div>
                  {errors.useFahrenheit && <FormMessage>{errors.useFahrenheit.message}</FormMessage>}
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button type="submit">Save</Button>
          </div>
        </div>
      )}
    </Form>
  );
}