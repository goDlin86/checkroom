import Link from 'next/link'
import { auth, signOut } from '../lib/auth'

export async function Auth() {
  let session = await auth()
  let user = session?.user
  console.log(user)

  return (
    <>
      {user ? (
        <form
          action={async () => {
            'use server'
            await signOut()
          }}
        >
          <button type="submit">Sign Out</button>
        </form>
      ) : (
        <Link href="/login">Sign In</Link>
      )}
    </>
  )
}