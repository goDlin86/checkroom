import Link from "next/link"
import Auth from "../components/Auth"
import Items from "../components/Items"

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className="">
      <Link className="ml-2 px-4 py-1 border-2 rounded-full inline-block cursor-pointer text-sm sm:text-xl align-middle" href="/add">Add item</Link>
      <Items />
    </main>
  )
}
