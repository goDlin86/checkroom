import Items from '../../components/Items'
import { auth } from '../../lib/auth'
import { redirect } from 'next/navigation'
import { sql } from '@vercel/postgres'
import { tags } from '../../lib/tags'

export const dynamic = 'force-dynamic'

export default async function Home() {
  let session = await auth()
  let user = session?.user

  if (!user) return redirect('/')

  let data

  try {
    data = await sql`SELECT * FROM items WHERE owner = ${user.email} ORDER BY "createdAt" DESC;`
  } catch (e) {
    console.log(e)
  }

  const { rows: items } = data

  const itemsByTags = items.reduce((result, item) => {
    if (result.length === 0) 
      result = tags.map(tag => ({ tag, items: [] }))
    
    const i = result.findIndex(r => r.tag === item.tag)
    result[i].items.push(item)

    return result
  }, [])

  return (
    <main className="pb-6">
      <Items items={itemsByTags} />
    </main>
  )
}
