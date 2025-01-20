import { signIn } from '../../lib/auth'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <div className="w-full max-w-sm">
        <p className="text-2xl">Login</p>
        <form
          action={async () => {
            'use server'
            await signIn('mailru', {
              redirectTo: '/'
            });
          }}
          className="w-full"
        >
          <button className="w-full">Sign in with Mail.ru</button>
        </form>
        <form
          action={async () => {
            'use server'
            await signIn('github', {
              redirectTo: '/'
            });
          }}
          className="w-full"
        >
          <button className="w-full">Sign in with Github</button>
        </form>
      </div>
    </div>
  )
}