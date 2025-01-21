import { signIn } from '../../lib/auth'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <div className="w-full max-w-sm">
        <p className="text-2xl text-center">Login</p>
        <form
          action={async () => {
            'use server'
            await signIn('mailru', {
              redirectTo: '/items'
            });
          }}
          className="w-full"
        >
          <button className="w-full my-2 px-4 py-1 border-2 rounded-full cursor-pointer text-xl align-middle">Sign in with Mail.ru</button>
        </form>
        <form
          action={async () => {
            'use server'
            await signIn('github', {
              redirectTo: '/items'
            });
          }}
          className="w-full"
        >
          <button className="w-full my-2 px-4 py-1 border-2 rounded-full cursor-pointer text-xl align-middle">Sign in with Github</button>
        </form>
      </div>
    </div>
  )
}