import { put } from '@vercel/blob'
import { sql } from '@vercel/postgres'
import { auth } from '../../../../lib/auth'

export const POST = auth(async (req) => {
  if (!req.auth) return Response.json({ message: 'Not authenticated' }, { status: 401 })
  
  const { searchParams } = new URL(req.url)
  const filename = searchParams.get('filename')
  const tag = searchParams.get('tag')
  const type = searchParams.get('type')

  try {
    const blob = await put(filename, req.body, { access: 'public', contentType: type })
    await sql`INSERT INTO items (name, tag, url, owner) VALUES (${filename}, ${tag}, ${blob.url}, ${req.auth.user.email});`
    return Response.json({ message: 'Item added!' }, { status: 200 })
  } catch (e) {
    console.log(e)
    return Response.json({ message: e.message }, { status: 500 })
  }
})