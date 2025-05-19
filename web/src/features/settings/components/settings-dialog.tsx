import { Form } from "@/components/form/form";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useContext, useState, type PropsWithChildren } from "react";
import { DEFAULT_SETTINGS, settingsSchema, type Settings } from "../types/settings.entity";
import { SettingsContext } from "../context/settings.context";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { TriangleAlertIcon } from "lucide-react";

export function SettingsTrigger({ children }: PropsWithChildren) {
  const [isOpen, setOpen] = useState(false);
  const { settings, save } = useContext(SettingsContext);

  function submit(data: Settings) {
    try {
      save(data);
      toast('Settings saved successfully');
      setOpen(false);
    } catch (error) {
      console.error("Error saving settings:", error);
      toast('Error saving settings', {
        icon: <TriangleAlertIcon color='white' />,
        description: 'There was an error saving your settings. Please try again.',
        richColors: true,
        style: {
          backgroundColor: '#d00023',
          color: 'white',
          borderColor: '#d00023',
          gap: '1rem',
        }
      });
    }
  }

  const formId = 'settings-form';

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Settings
          </DialogTitle>
          <DialogDescription>
            Make changes to your settings. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form
          id={formId}
          className='space-y-4'
          schema={settingsSchema}
          defaultValues={{
            ...DEFAULT_SETTINGS,
            ...settings,
          }}
          onSubmit={submit}
        >
          {({ control }) => (
            <>
              <FormField
                control={control}
                name="useFahrenheit"
                render={({ field, fieldState: { error } }) => (
                  <FormItem className='flex'>
                    <div className='flex flex-row gap-1'>
                      <FormControl>
                        <Checkbox
                          id='useFahrenheit'
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="cursor-pointer" htmlFor='useFahrenheit'>
                        Use Fahrenheit
                      </FormLabel>
                    </div>
                    {error && <FormMessage>{error.message}</FormMessage>}
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="useMiles"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <div className='flex flex-row gap-1'>
                      <FormControl>
                        <Checkbox
                          id='useMiles'
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="cursor-pointer" htmlFor='useMiles'>
                        Use Miles
                      </FormLabel>
                    </div>
                    {error && <FormMessage>{error.message}</FormMessage>}
                  </FormItem>
                )}
              />
            </>
          )}
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='reset' variant='ghost' onClick={close}>
              Cancel
            </Button>
          </DialogClose>
          <Button type='submit' form={formId}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}