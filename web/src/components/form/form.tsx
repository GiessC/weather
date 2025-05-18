import type { ReactNode } from 'react';
import { FormProvider, useForm, type FieldValues, type UseFormProps, type UseFormReturn } from 'react-hook-form';
import { type AnyZodObject, z } from 'zod';

export interface FormProps<TSchema extends AnyZodObject, TContext = unknown, TTransformedValues extends FieldValues = z.infer<TSchema>, TFormValues extends FieldValues = z.infer<TSchema>> extends UseFormProps<TFormValues, TContext, TTransformedValues> {
  id?: string;
  schema: TSchema;
  onSubmit: (data: TTransformedValues) => void;
  children: (form: UseFormReturn<TFormValues, TContext, TTransformedValues>) => ReactNode;
}

export function Form<TSchema extends AnyZodObject, TContext = unknown, TTransformedValues extends FieldValues = z.infer<TSchema>, TFormValues extends FieldValues = z.infer<TSchema>>({ id, children, defaultValues, onSubmit }: FormProps<TSchema, TContext, TTransformedValues, TFormValues>) {
  const form = useForm<TFormValues, TContext, TTransformedValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues,
  });

  return (
    <FormProvider {...form}>
      <form id={id} noValidate onSubmit={form.handleSubmit(onSubmit)}>
        {children(form)}
      </form>
    </FormProvider>
  )
}