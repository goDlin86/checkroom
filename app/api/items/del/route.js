import { del } from '@vercel/blob'
import { sql } from '@vercel/postgres'
import { auth } from '../../../../lib/auth'

export const POST = auth(async (req) => {
  if (!req.auth) return Response.json({ message: 'Not authenticated' }, { status: 401 })

  const { id, blob } = await req.json()

  try {
    await del(blob)
    await sql`DELETE FROM items WHERE id=${id} AND owner=${req.auth.user.email};`
    return Response.json({ message: 'Item deleted!' })
  } catch (e) {
    console.log(e)
    return Response.json({ message: e.message }, { status: 500 })
  }
})