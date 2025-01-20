import Link from 'next/link'
import { auth, signOut } from '../lib/auth'

export async function Auth() {
  let session = await auth()
  let user = session?.user

  return (
    <>
      {user ? (
        <form
          action={async () => {
            'use server'
            await signOut()
          }}
        >
          <button className="ml-2 px-4 py-1 border-2 rounded-full inline-block cursor-pointer text-xl align-middle float-right" type="submit">Sign Out</button>
        </form>
      ) : (
        <Link className="ml-2 px-4 py-1 border-2 rounded-full inline-block cursor-pointer text-xl align-middle float-right" href="/login">Sign In</Link>
      )}
    </>
  )
}