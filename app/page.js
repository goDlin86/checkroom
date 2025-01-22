import Image from "next/image"
import { Auth } from "../components/Auth"

export default function Home() {
  return (
    <div className="container mx-auto max-w-4xl">
      <header className="p-4 text-4xl flex place-content-between">
        <div>checkroom</div>
        <Auth />
      </header>
      <Image className="mx-auto mt-4" width={512} height={512} src={"/img/android-chrome-512x512.png"} alt="checkroom" />
      <footer className="flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  )
}