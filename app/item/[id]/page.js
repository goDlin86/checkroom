import { sql } from '@vercel/postgres'
import Link from "next/link"
import Item from "../../../components/Item"

export default async function Page({ params }) {
  const id = (await params).id
  let data

  try {
    data = await sql`SELECT * FROM items WHERE id = ${id};`
  } catch (e) {
    console.log(e)
  }

  const { rows: items } = data
  const item = items[0]

  return (
    <main className="px-4 lg:px-0">
      <Link className="ml-2 px-4 py-1 border-2 rounded-full inline-block cursor-pointer text-sm sm:text-xl align-middle" href="/">Home</Link>
      <Item item={item} />
    </main>
  )
}