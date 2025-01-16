import { put } from '@vercel/blob'
import { sql } from '@vercel/postgres'

export async function POST(request) {
  const { searchParams } = new URL(request.url)
  const filename = searchParams.get('filename')
  const tag = searchParams.get('tag')
  const type = searchParams.get('type')

  try {
    const blob = await put(filename, request.body, { access: 'public', contentType: type })
    await sql`INSERT INTO items (name, tag, url, owner) VALUES (${filename}, ${tag}, ${blob.url}, 1);`
    return new Response('Added', { status: 200 })
  } catch (e) {
    console.log(e)
    return new Response(e.message, { status: 500 })
  }
}