import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';

import { db } from "@/lib/db"

export async function POST(request: NextRequest) { 
  const data = await request.json();
  
  const {name, email, password} = data;

  // Validação dos dados antes do cadastro
  if (!name || !email || !password) {
    console.error("[CREATE-USER]: Name ou email ou senha não informados.")
    return NextResponse.json({message: "Informe o nome, e-mail e senha para criação do novo usuário.", status: 400})
  }

  const usuarioExiste = await db.user.findUnique({
    where: {
      email: email
    }
  })
  
  if (usuarioExiste) {
    console.error("[CREATE-USER]: Usuário existente.")
    return NextResponse.json({message: "Usuário já cadastrado. Faça o login para ter acesso.", status: 400})
  }

  // Faz o encriptação da senha para armazenar no DB
  const hashedPassword = await bcrypt.hash(password, 10);

  // Cadastra o usuário no banco de dados
  const usuario = await db.user.create({
    data: {
      email: email,
      name: name, 
      hashedPassword: hashedPassword
    }
  });

  // return NextResponse.json({message: "Sucesso na criação do usuário", usuario: usuario})
  return NextResponse.json(usuario)
}