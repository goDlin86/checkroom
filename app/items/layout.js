import { Auth } from "../../components/Auth"

export default function Layout({ children }) {
  return (
    <div className="container mx-auto max-w-4xl">
      <header className="p-4 text-4xl">
        checkroom
        <Auth />
      </header>
      {children}
      <footer className="flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  )
}