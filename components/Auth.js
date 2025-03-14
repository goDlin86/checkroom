import Link from 'next/link'
import { auth, signOut } from '../lib/auth'
import { LogIn, LogOut } from 'lucide-react'

export async function Auth() {
  let session = await auth()
  let user = session?.user

  if (!user) return <Link className="btn" href="/login"><LogIn /></Link>

  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <button className="btn" type="submit"><LogOut /></button>
    </form>
  )
}