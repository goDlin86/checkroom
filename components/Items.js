import { sql } from '@vercel/postgres'
import { tags } from '../lib/tags'
import TagItems from './TagItems'

export default async function Items({ user }) {
  let data

  try {
    data = await sql`SELECT * FROM items WHERE owner = ${user} ORDER BY "createdAt" DESC;`
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
    <>
      <div className="py-2 overflow-x-scroll whitespace-nowrap scrollbar">
        {tags.map(tag => (
          <a className="mx-2 px-3 py-1 border-2 rounded-full inline-block cursor-pointer transition-colors duration-500 hover:text-white/50" href={`#${tag}`} key={tag}>{tag}</a>
        ))}
      </div>      
      <div className="px-4 lg:px-0">
        {itemsByTags.map(t => (t.items.length > 0 && <TagItems tag={t.tag} items={t.items} key={t.tag} />))}
      </div>
    </>
  )
}