import { del } from '@vercel/blob'
 
export async function POST(req) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')
  const secret = searchParams.get('secret')

  if (secret !== process.env.IOS_SECRET) return Response.json({ message: 'Not authenticated' }, { status: 401 })
 
  try {
    await del(url)
    return Response.json({ message: 'Item deleted!' })
  } catch (e) {
    console.log(e)
    return Response.json({ error: e.message }, { status: 500 })
  }
}