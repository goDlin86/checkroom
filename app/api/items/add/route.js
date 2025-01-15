import { put } from '@vercel/blob'
import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const { searchParams } = new URL(request.url)
  const filename = searchParams.get('filename')
  const tag = searchParams.get('tag')
  const type = searchParams.get('type')

  try {
    const blob = await put(filename, request.body, { access: 'public', contentType: type })
    const result = await sql`INSERT INTO items (name, tag, url, owner) VALUES (${filename}, ${tag}, ${blob.url}, 1);`
    return NextResponse.json({result}, {status: 200})
  } catch (e) {
    console.log(e)
    return NextResponse.json({e}, {status: 500})
  }
}