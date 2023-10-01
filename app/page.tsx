import { Button } from '@/components/ui/button'
import { getCurrentUser } from '@/lib/session'
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Home() {
  // Para acesso as informações de session em Server Components
  const user = await getCurrentUser();
  if (!user || user === undefined) {
    redirect('/login');
  }

  // Retorno do componente
  return (
    <div className='m-12 flex flex-col gap-2'>
      <h1 className='font-bold italic'>Usuário Logado</h1>
      <h4><span className='font-bold'>Nome: </span>{user.name}</h4>
      <h4><span className='font-bold'>E-mail: </span>{user.email}</h4>
      <Link href="/api/auth/signout">
        <Button variant={'secondary'}>Clique</Button>
      </Link>
    </div>
  )
}
