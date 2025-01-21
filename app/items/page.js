import Link from "next/link"
import Items from "../../components/Items"
import { auth } from "../../lib/auth"

export const dynamic = 'force-dynamic'

export default async function Home() {
  let session = await auth()
  let user = session?.user

  if (!user) return <p className="my-4 text-center">Need to sign in</p>

  return (
    <main className="">
      <Link className="ml-2 px-4 py-1 border-2 rounded-full inline-block cursor-pointer text-xl align-middle" href="/items/add">Add item</Link>
      <Items user={user.email} />
    </main>
  )
}
