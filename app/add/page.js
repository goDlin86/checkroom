import Link from "next/link"
import AddItem from "../../components/AddItem"

export default function Add() {
  return (
    <div className="font-[family-name:var(--font-geist-mono)] container mx-auto max-w-4xl">
      <header className="p-4 text-4xl">
        checkroom <Link className="ml-2 px-4 py-1 border-2 rounded-full inline-block cursor-pointer text-sm sm:text-xl align-middle" href="/">Home</Link>
      </header>
      <main className="px-4 lg:px-0">
        <AddItem />
      </main>
      <footer className="flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  )
}