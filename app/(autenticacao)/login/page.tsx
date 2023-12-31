import { LoginForm } from "@/components/LoginForm/LoginForm"

export default function AuthenticationPage() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Entrar na Conta
          </h1>
          <p className="text-sm text-muted-foreground">
            Informe seu e-mail e senha para continuar
          </p>
        </div>
        <LoginForm />
        
      </div>
    </div>
  )
}