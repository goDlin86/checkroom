import Link from 'next/link'
import { auth, signOut } from '../lib/auth'

export async function Auth() {
  let session = await auth()
  let user = session?.user

  if (!user) return <Link className="ml-2 px-4 py-1.5 border-2 rounded-full cursor-pointer" href="/login">Sign In</Link>

  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <button className="ml-2 px-4 py-1.5 border-2 rounded-full cursor-pointer" type="submit">Sign Out</button>
    </form>
  )
}