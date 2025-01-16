import { sql } from '@vercel/postgres'

export async function POST(request) {
  const { id, name, tag } = await request.json()

  try {
    await sql`UPDATE items SET name = ${name}, tag = ${tag} WHERE id=${id};`
    return new Response('Updated', { status: 200 })
  } catch (e) {
    console.log(e)
    return new Response(e.message, { status: 500 })
  }
}