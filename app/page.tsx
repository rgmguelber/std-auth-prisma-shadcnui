import { Button } from '@/components/ui/button'
import { getCurrentUser } from '@/lib/session'

export default async function Home() {

  // Para acesso as informações de session em Server Components
  const user = await getCurrentUser();

  return (
    <div className='m-12'>
      <h1>Home</h1>
      <h4>{JSON.stringify(user)}</h4>
      <Button variant={'secondary'}>Clique</Button>
    </div>
  )
}
