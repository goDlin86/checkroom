import { del } from '@vercel/blob'
import { sql } from '@vercel/postgres'

export async function POST(request) {
  const { id, blob } = await request.json()

  try {
    await del(blob)
    await sql`DELETE FROM items WHERE id=${id};`
    return new Response('Deleted', { status: 200 })
  } catch (e) {
    console.log(e)
    return new Response(e.message, { status: 500 })
  }
}