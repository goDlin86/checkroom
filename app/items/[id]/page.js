import { sql } from '@vercel/postgres'
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

  return (
    <main className="px-4 lg:px-0 pb-6">
      <Item item={item} />
    </main>
  )
}