import NextAuth from 'next-auth'
import MailRuProvider from 'next-auth/providers/mailru'

const handler = NextAuth({
  providers: [
    MailRuProvider({
      clientId: process.env.MAILRU_CLIENT_ID,
      clientSecret: process.env.MAILRU_CLIENT_SECRET
    })
  ],
})

export { handler as GET, handler as POST }