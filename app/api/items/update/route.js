import { sql } from '@vercel/postgres'

export const POST = auth(async (req) => {
  if (!req.auth) return Response.json({ message: "Not authenticated" }, { status: 401 })
  
  const { id, name, tag } = await req.json()

  try {
    await sql`UPDATE items SET name = ${name}, tag = ${tag} WHERE id=${id} AND owner=${req.auth.user.email};`
    return new Response('Updated', { status: 200 })
  } catch (e) {
    console.log(e)
    return new Response(e.message, { status: 500 })
  }
})