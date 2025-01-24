import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import MailRu from 'next-auth/providers/mailru'

export const { handlers, signIn, signOut, auth } = NextAuth({ 
  providers: [ 
    GitHub,
    Google,
    MailRu({
      userinfo: {
        url: 'https://oauth.mail.ru/userinfo',
        async request({ tokens, provider }) {
          const profile = await fetch(`${provider.userinfo?.url}?access_token=${tokens.access_token}`).then(async (res) => await res.json())
          return profile
        },
      },
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.image,
        }
      }
    })
  ] 
})