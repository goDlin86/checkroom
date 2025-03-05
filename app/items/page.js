import Link from 'next/link'
import Items from '../../components/Items'
import { auth } from '../../lib/auth'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function Home() {
  let session = await auth()
  let user = session?.user

  if (!user) return redirect('/')

  return (
    <main className="pb-6">
      <Link className="block mx-auto max-w-40 my-1 text-xl font-bold text-center btn" href="/items/add">Add item</Link>
      <Items user={user.email} />
    </main>
  )
}
