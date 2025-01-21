import { sql } from '@vercel/postgres'
import Link from 'next/link'
import { tags } from '../lib/tags'

export default async function Items({ user }) {
  let data

  try {
    data = await sql`SELECT * FROM items WHERE owner = ${user} ORDER BY createdAt DESC;`
  } catch (e) {
    console.log(e)
  }

  const { rows: items } = data

  return (
    <>
      <div className="py-2 overflow-x-scroll whitespace-nowrap scrollbar">
        {tags.map(tag => (
          <a className="mx-2 px-3 py-1 border-2 rounded-full inline-block cursor-pointer" href={`#${tag}`} key={tag}>{tag}</a>
        ))}
      </div>
      <div className="px-4 lg:px-0">
        {tags.map(tag => (
          <div key={tag}>
            {items.some(item => item.tag == tag) && 
              <>
                <h1 id={tag} className="text-xl uppercase my-2">{tag}</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {
                    items.filter(item => item.tag === tag).map((item, i) => (
                      <Link href={`/items/${item.id}`} key={i}>
                        <div className="relative overflow-hidden rounded-2xl">
                          <img className="block object-cover w-full h-72 transition-transform duration-300 scale-100 hover:scale-110" src={item.url} />
                        </div>
                      </Link>
                    ))
                  }
                </div>
              </>
            }
          </div>
          ))}
      </div>
    </>
  )
}