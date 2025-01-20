import { Auth } from "../components/Auth"

export default function Home() {
  return (
    <div className="container mx-auto max-w-4xl">
      <header className="p-4 text-4xl flex place-content-between">
        <div>checkroom</div>
        <Auth />
      </header>
      
      <footer className="flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  )
}