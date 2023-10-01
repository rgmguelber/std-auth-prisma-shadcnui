import { NextAuthOptions } from "next-auth";
import bcrypt from 'bcrypt';
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
        if(!credentials?.email || !credentials?.password) 
          throw new Error("Dados de Login necessarios")

        const user = await db.user.findUnique({
            where:{
                email: credentials?.email
            }
        })

        if(!user || !user.hashedPassword) {
            throw new Error("Usuários não registrado através de credenciais")
        }

        const matchPassword = await bcrypt.compare(credentials.password, user.hashedPassword)
        if(!matchPassword)
            throw new Error("Senha incorreta")

        return {
          nome: user.name,
          email: user.email,
          avatar: user.image
        };
      }
    })
  ], 
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === "development",
}