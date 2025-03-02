'use client'

import { useEffect } from "react";
import { toast } from "sonner";

type ToastProps = {
  message: string;
}

export function Toast({ message }: ToastProps) {
  useEffect(() => {
    if (message) {
      toast("Algo de errado aconteceu", {
        description: message,
      })
    }
  }, [message]);
  return null;
}