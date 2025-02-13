import AddItem from "../../../components/AddItem"
import { auth } from "../../../lib/auth"

export default async function Add() {
  let session = await auth()
  let user = session?.user

  if (!user) return <p className="py-32 text-center text-xl">Need to sign in</p>

  return (
    <main className="px-4 lg:px-0 pb-6">
      <AddItem />
    </main>
  )
}