import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import MailRu from 'next-auth/providers/mailru'

export const { handlers, signIn, signOut, auth } = NextAuth({ 
  providers: [ 
    GitHub, 
    MailRu({ checks: [ "none" ] }) 
  ] 
})