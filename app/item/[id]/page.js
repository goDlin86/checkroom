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
    <div className="font-[family-name:var(--font-geist-mono)] container mx-auto max-w-4xl">
      <header className="p-4 text-4xl">
        checkroom <Link className="ml-2 px-4 py-1 border-2 rounded-full inline-block cursor-pointer text-sm sm:text-xl align-middle" href="/">Home</Link>
      </header>
      <main className="px-4 lg:px-0">
        <Item item={item} />
      </main>
      <footer className="flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  )
}