import { signIn } from '../../lib/auth'

const LoginButton = ({ provider }) => {
  return (
    <form
      action={async () => {
        'use server'
        await signIn(provider, { redirectTo: '/items' })
      }}
    >
      <button className="w-full my-2 px-4 py-1 border-2 rounded-full cursor-pointer text-xl transition-colors duration-500 hover:text-white/50">Sign in with {provider}</button>
    </form>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <div className="w-full max-w-sm">
        <p className="text-2xl text-center">Login</p>
        {['mailru', 'github', 'google'].map((provider, i) => (
          <LoginButton key={i} provider={provider} />
        ))}
      </div>
    </div>
  )
}