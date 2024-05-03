'use client';

import { useFormStatus } from "react-dom";
import { Button } from '@nextui-org/react';

interface FormButtonProps {
  children: React.ReactNode
}
export default function FormButton({ children }: FormButtonProps) {
  const { pending } = useFormStatus(); // tracks the status of a form in the parent component (can't be used directly in the component where the form is)

  return (
    <Button type="submit" isLoading={pending}>
      {children}
    </Button>
  )
}