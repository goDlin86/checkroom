import { sql } from '@vercel/postgres'
import { auth } from '../../../../lib/auth'

export const POST = auth(async (req) => {
  if (!req.auth) return Response.json({ message: 'Not authenticated' }, { status: 401 })
  
  const { id, name, price, tag } = await req.json()

  try {
    await sql`UPDATE items SET name = ${name}, price=${price}, tag = ${tag} WHERE id=${id} AND owner=${req.auth.user.email};`
    return Response.json({ message: 'Item updated!' })
  } catch (e) {
    console.log(e)
    return Response.json({ message: e.message }, { status: 500 })
  }
})