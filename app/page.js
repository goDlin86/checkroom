import Image from "next/image"
import Link from "next/link"
import { TextShimmer } from "../components/TextShimmer"

export default async function Home() {
  return (
    <div className="container mx-auto max-w-4xl">
      <header className="p-4 flex place-content-between">
        <Link className="text-4xl transition-colors duration-500 hover:text-white/50" href="/">
          <TextShimmer>checkroom</TextShimmer>
        </Link>
      </header>
      <Link href="/login" className="block mt-4 underline text-center text-2xl">
        <Image className="mx-auto" width={512} height={512} src={"/img/android-chrome-512x512.png"} alt="checkroom" />
        <TextShimmer>to my checkroom</TextShimmer>
      </Link>
      <footer className="flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  )
}