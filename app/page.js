import Image from "next/image"
import Link from "next/link"
import { Auth } from "../components/Auth"
import { auth } from "../lib/auth"

export default async function Home() {
  let session = await auth()
  let user = session?.user

  return (
    <div className="container mx-auto max-w-4xl">
      <header className="p-4 flex place-content-between">
        <div className="text-4xl">checkroom</div>
        <Auth />
      </header>
      <Link href={user ? "/items" : "/login"} className="block mt-4 underline text-center text-2xl">
        <Image className="mx-auto" width={512} height={512} src={"/img/android-chrome-512x512.png"} alt="checkroom" />
        to my checkroom
      </Link>
      <footer className="flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  )
}