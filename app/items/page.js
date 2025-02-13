import Link from "next/link"
import Items from "../../components/Items"
import { auth } from "../../lib/auth"

export const dynamic = 'force-dynamic'

export default async function Home() {
  let session = await auth()
  let user = session?.user

  if (!user) return <p className="py-32 text-center text-xl">Need to sign in</p>

  return (
    <main className="pb-6">
      <Link className="block mx-auto max-w-40 my-1 px-4 py-1 border-2 rounded-full cursor-pointer text-xl text-center transition-colors duration-500 hover:text-white/50" href="/items/add">Add item</Link>
      <Items user={user.email} />
    </main>
  )
}
