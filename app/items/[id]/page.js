import { sql } from '@vercel/postgres'
import Link from 'next/link'
import Item from '../../../components/Item'
import { auth } from '../../../lib/auth'

export default async function Page({ params }) {
  let session = await auth()
  let user = session?.user

  if (!user) return <p className="my-4 text-center">Need to sign in</p>

  const id = (await params).id
  let data

  try {
    data = await sql`SELECT * FROM items WHERE id=${id} AND owner=${user.email};`
  } catch (e) {
    console.log(e)
  }

  const { rows: items } = data
  const item = items[0]
  console.log(item)

  return (
    <main className="px-4 lg:px-0">
      <Link className="ml-2 px-4 py-1 border-2 rounded-full inline-block cursor-pointer text-xl align-middle" href="/items">Home</Link>
      <Item item={item} />
    </main>
  )
}