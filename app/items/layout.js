import Link from "next/link"
import { Auth } from "../../components/Auth"

export default function Layout({ children }) {
  return (
    <div className="container mx-auto max-w-4xl">
      <header className="p-4 flex place-content-between">
        <Link className="text-4xl transition-colors duration-500 hover:text-white/50" href="/">checkroom</Link>
        <Auth />
      </header>
      {children}
      <footer className="flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  )
}