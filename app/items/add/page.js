import AddItem from '../../../components/AddItem'
import { auth } from '../../../lib/auth'
import { redirect } from 'next/navigation'

export default async function Add() {
  let session = await auth()
  let user = session?.user

  if (!user) return redirect('/')

  return (
    <main className="px-4 lg:px-0 pb-6">
      <AddItem />
    </main>
  )
}