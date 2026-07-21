import { sql } from '@vercel/postgres'
import { auth } from '../../../../lib/auth'

export const POST = auth(async (req) => {
  if (!req.auth) return Response.json({ message: 'Not authenticated' }, { status: 401 })

  const { tag, offset } = await req.json()
  console.log(offset)

  try {
    const { rows: items } = await sql`SELECT * FROM items WHERE owner=${req.auth.user.email} AND tag = ${tag} ORDER BY "createdAt" DESC OFFSET ${offset};`
    return Response.json(items)
  } catch (e) {
    console.log(e)
    return Response.json({ message: e.message }, { status: 500 })
  }
})