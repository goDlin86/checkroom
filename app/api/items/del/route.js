import { del } from '@vercel/blob'
import { sql } from '@vercel/postgres'

export const POST = auth(async (req) => {
  if (!req.auth) return Response.json({ message: "Not authenticated" }, { status: 401 })

  const { id, blob } = await req.json()

  try {
    await del(blob)
    await sql`DELETE FROM items WHERE id=${id} AND owner=${req.auth.user.email};`
    return new Response('Deleted', { status: 200 })
  } catch (e) {
    console.log(e)
    return new Response(e.message, { status: 500 })
  }
})