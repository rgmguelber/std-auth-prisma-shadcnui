'use client'
import { signIn } from "next-auth/react";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface IUser {
  email: string;
  password: string;
}

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  // Router 
  const router = useRouter();

  // Estados do formulário
  const [data, setData] = useState<IUser>({
    email: "",
    password: ""
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Funções de controle
  const onSubmitHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    setIsLoading(true);

    const res = await signIn<"credentials">("credentials", {
      ...data,
      redirect: false,
    });

    if (res?.error) {
      toast({
        title: "Ooops...",
        description: res.error,
        variant: "destructive",
        action: (
          <ToastAction altText="Tente Novamente">Tente Novamente</ToastAction>
        ),
      });

      setData({
        email: "",
        password: ""
      })
      setIsLoading(false);
    } else {
      router.push("/");
    }    
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setData((oldState) => {
      return {...oldState, [event.target.name]:[event.target.value]}
    })
  }

  // Retorno do componente
  return (
    <div className={cn("grid gap-6", className)}>
      <form onSubmit={onSubmitHandler}>
        <div className="grid gap-3">
          <div className="grid gap-1">
            <Label className="" htmlFor="email">
              Email
            </Label>

            <Input 
              id="email"
              name="email"
              placeholder="teste@mail.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={data.email}
              onChange={handleChange} 
            />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="password">
              Senha
            </Label>

            <Input 
              id="password"
              name="password"
              placeholder="Senha..."
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              value={data.password}
              onChange={handleChange} 
            />
          </div>

          <Button disabled={isLoading}>
            {isLoading && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)}
            Entrar
          </Button>
        </div>
      </form>
    </div>
  )
}