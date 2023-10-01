import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

import { db } from "@/lib/db"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db as any),
  providers: [
    // Provider do GitHub
    GithubProvider({
      clientId: process.env.GITHUB_CLIENTID!,
      clientSecret: process.env.GITHUB_SECRET!
    }),
    // Provider para Email e Senha
    CredentialProvider({
      name: 'credentials',
      credentials: {
        email: {label: "Email", type: 'text', placeholder: "fulano@email.com"},
        password: {label: "Senha", type: "password"},
        username: {label: "Nome", type: "text", placeholder: "Nome"}
      },
      async authorize(credentials, req): Promise<any> {
        console.log('Authorize Method', credentials)
        
        const user = { email: "test@mail.com", password: "123456", name: "Teste"}

        return user;
      }
    })
  ], 
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === "development",
}