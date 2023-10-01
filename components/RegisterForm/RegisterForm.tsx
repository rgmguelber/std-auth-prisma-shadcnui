'use client'

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
  name: string;
  email: string;
  password: string;
}

export function RegisterForm({ className, ...props }: UserAuthFormProps) {
  // Estados do formulário
  const [data, setData] = useState<IUser>({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Router
  const router = useRouter();

  // Funções de controle
  const onSubmitHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    setIsLoading(true);

    const response = await fetch("/api/create-user", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    
    const resultado = await response.json();

    if (!response.ok) {
      toast({
        title: 'Erro',
        description: resultado.message,
        variant: 'destructive',
        action: (
          <ToastAction altText="Tente Novamente">Tente novamente. </ToastAction>
        )
      })
    } else {
      console.log(resultado.message)
      router.push("/login")
    }

    setData({
      name: "",
      email: "",
      password: ""
    })
    setIsLoading(false);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setData((oldState) => {
      return {...oldState, [event.target.name]:event.target.value}
    })
  }

  // Retorno do componente
  return (
    <div className={cn("grid gap-6", className)}>
      <form onSubmit={onSubmitHandler}>
        <div className="grid gap-3">
          <div className="grid gap-1">
            <Label className="" htmlFor="name">
              Nome
            </Label>

            <Input 
              id="name"
              name="name"
              placeholder="Nome completo"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              value={data.name}
              onChange={handleChange} 
            />
          </div>

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
            Criar Conta
          </Button>
        </div>
      </form>
    </div>
  )
}