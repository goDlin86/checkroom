import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import MailRu from 'next-auth/providers/mailru'

export const { handlers, signIn, signOut, auth } = NextAuth({ 
  providers: [ 
    GitHub,
    Google,
    MailRu({
      authorization: {
        params: {
          state: 'asdadsad'
        }
      }
    })
  ] 
})