import Items from "../components/Items"

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-mono)] container mx-auto max-w-4xl">
      <header className="p-4 text-4xl">
        checkroom <a className="ml-2 px-4 py-1 border-2 rounded-full inline-block cursor-pointer text-sm sm:text-xl align-middle" href="/add">Add item</a>
      </header>
      <main className="">
        <Items />
      </main>
      <footer className="flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  )
}
