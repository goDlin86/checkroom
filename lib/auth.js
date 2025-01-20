import NextAuth from 'next-auth'
import MailRu from 'next-auth/providers/mailru'

export const { handlers, signIn, signOut, auth } = NextAuth({ providers: [ MailRu ] })