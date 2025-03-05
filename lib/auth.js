import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import MailRu from 'next-auth/providers/mailru'

async function hash() {
  const utf8 = new TextEncoder().encode((Math.random() + 1).toString(36).substring(5))
  const hashBuffer = await crypto.subtle.digest('SHA-256', utf8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray
    .map((bytes) => bytes.toString(16).padStart(2, '0'))
    .join('')
  return hashHex
}

export const { handlers, signIn, signOut, auth } = NextAuth({ 
  providers: [ 
    GitHub,
    Google,
    MailRu({
      authorization: {
        url: 'https://oauth.mail.ru/login?scope=userinfo',
        params: { state: await hash() },
      },
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