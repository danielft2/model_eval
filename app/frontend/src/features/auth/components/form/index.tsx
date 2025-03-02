'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signinAction } from "@/features/auth/actions/signin";
import { LoaderCircle, MailCheck } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState = {
  error: null,
  data: null
} 

export function Form() {
  const [state, action, pending] = useActionState(signinAction, initialState)
  const emailValidationError = state.error?.validations?.email;

  useEffect(() => {
    if (state.data?.message) {
      toast("Link de acesso enviado", {
        icon: <MailCheck size={18}/>,
        description: "Seu link de acesso foi enviado, acesse seu email!",
        duration: 30000,
        action: {
          label: 'Ok',
          onClick: () => undefined,
        }
      })
    }

    if (state.error?.message) {
      toast("Algo de errado aconteceu", {
        description: state.error.message,
      })
    }
  }, [state])

  return (
    <form className="w-full space-y-4" action={action}>
      <div className="space-y-1">
        <label
          htmlFor="email"
          className="text-sm font-heading font-medium -tracking-wider text-slate-800"
        >
          Email
        </label>
        <Input
          id="email"
          type="text"
          name="email"
          placeholder="seuemail@exemplo.com"
          className={`${emailValidationError && 'border-red-700'}`}
        />
        { emailValidationError && <span className="text-sm text-red-800">{emailValidationError.message}</span> }
      </div>
      
      <Button className="w-full" type="submit" disabled={pending}>
        {pending ? (
          <LoaderCircle className="animate-spin size-full"/>
        ) : (
          "Enviar link de acesso"
        )}
      </Button>
    </form>
  );
}
