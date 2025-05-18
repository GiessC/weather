import { Form } from "@/components/form/form";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";

const searchSchema = z.object({
  query: z.string().min(1, { message: "Please enter a location" }),
})

export function SearchLocation() {
  function search() {}

  return (
    <Form
      schema={searchSchema}
      onSubmit={search}
      defaultValues={{
        query: '',
      }}
    >
      {({ control }) => (
        <FormField
          control={control}
          name='query'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Search Location
              </FormLabel>
              <FormControl>
                <div role='search'>
                  <Input {...field} type='text' placeholder='Ex. San Francisco, CA' className='w-full' />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      )}
    </Form>
  )
}