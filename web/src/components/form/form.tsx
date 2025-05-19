import type { ReactNode } from 'react';
import { FormProvider, useForm, type FieldValues, type UseFormProps, type UseFormReturn } from 'react-hook-form';
import { z, ZodType, type AnyZodObject, type ZodTypeDef } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export interface FormProps<TSchema extends AnyZodObject, TContext = unknown, TTransformedValues extends FieldValues = z.infer<TSchema>, TFormValues extends FieldValues = z.infer<TSchema>> extends UseFormProps<TFormValues, TContext, TTransformedValues> {
  className?: string;
  id?: string;
  schema: TSchema;
  onSubmit: (data: TTransformedValues) => void;
  children: (form: UseFormReturn<TFormValues, TContext, TTransformedValues>) => ReactNode;
}

export function Form<TSchema extends AnyZodObject, TContext = unknown, TTransformedValues extends FieldValues = z.infer<TSchema>, TFormValues extends FieldValues = z.infer<TSchema>>({
  className,
  schema,
  id,
  children,
  defaultValues,
  onSubmit
}: FormProps<TSchema, TContext, TTransformedValues, TFormValues>) {
  const form = useForm<TFormValues, TContext, TTransformedValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues,
    resolver: zodResolver<TFormValues, TContext, TTransformedValues>(schema as unknown as ZodType<TTransformedValues, ZodTypeDef, TFormValues>),
  });

  return (
    <FormProvider {...form}>
      <form className={className} id={id} noValidate onSubmit={form.handleSubmit(onSubmit)}>
        {children(form)}
      </form>
    </FormProvider>
  )
}