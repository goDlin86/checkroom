import { put } from '@vercel/blob'
import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const { searchParams } = new URL(request.url)
  const filename = searchParams.get('filename')
  const tag = searchParams.get('tag')

  const blob = await put(filename, request.body, {
    access: 'public',
  })

  const result = await sql`INSERT INTO items (name, tag, url, owner) VALUES (${filename}, ${tag}, ${blob.url}, 1);`;
  console.log(result)

  return NextResponse.json(blob)
}