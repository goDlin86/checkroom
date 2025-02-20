import { put } from '@vercel/blob'
import { sql } from '@vercel/postgres'
import { auth } from '../../../../lib/auth'

export const POST = auth(async (req) => {
  if (!req.auth) return Response.json({ message: 'Not authenticated' }, { status: 401 })
  
  const { searchParams } = new URL(req.url)
  const filename = searchParams.get('filename')
  const price = searchParams.get('price')
  const tag = searchParams.get('tag')
  const url = searchParams.get('url')

  let type = searchParams.get('type')
  let body = req.body

  if (url !== '') {
    body = await fetch(url).then(r => r.blob())
    type = body.type
    console.log(type)
  }

  try {
    const blob = await put(filename, body, { access: 'public', contentType: type })
    await sql`INSERT INTO items (name, tag, url, owner, price) VALUES (${filename}, ${tag}, ${blob.url}, ${req.auth.user.email}, ${price});`
    return Response.json({ message: 'Item added!' })
  } catch (e) {
    console.log(e)
    return Response.json({ message: e.message }, { status: 500 })
  }
})