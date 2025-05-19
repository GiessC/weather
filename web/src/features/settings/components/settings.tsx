import { Form } from "../../../components/form/form";
import { Button } from "../../../components/ui/button";
import { SettingsContext } from "@/features/settings/context/settings.context";
import { settingsSchema } from "@/features/settings/types/settings.entity";
import { Checkbox } from "../../../components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
import { useContext } from "react";

export function Settings() {
  const { settings, save } = useContext(SettingsContext);

  return (
    <Form defaultValues={settings} onSubmit={save} schema={settingsSchema}>
      {({ control, formState: { errors } }) => (
        <div className="flex flex-col gap-2">
          <h2>Settings</h2>
          <div className='flex flex-col gap-2'>
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
            <FormField
              control={control}
              name="useMiles"
              render={({ field }) => (
                <FormItem>
                  <div className='flex flex-row gap-2 items-center'>
                    <FormControl>
                      <Checkbox
                        id='useMiles'
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className='cursor-pointer' htmlFor='useMiles'>
                      Use Miles
                    </FormLabel>
                  </div>
                  {errors.useMiles && <FormMessage>{errors.useMiles.message}</FormMessage>}
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