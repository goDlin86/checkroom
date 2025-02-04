import { sql } from '@vercel/postgres'
import Link from 'next/link'
import { tags } from '../lib/tags'
import { Disclosure, DisclosureContent, DisclosureTrigger } from './Disclosure'
import { ChevronDown } from 'lucide-react'

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
        {itemsByTags.map(t => (
          t.items.length > 0 && 
          <div key={t.tag}>
            <h1 id={t.tag} className="text-xl uppercase my-2 font-bold">{t.tag}</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {
              t.items.map((item, i) => (
                i < 4 &&
                <Link href={`/items/${item.id}`} key={i}>
                  <div className="relative overflow-hidden rounded-2xl">
                    <img className="block object-cover w-full h-72 transition-transform duration-300 scale-100 hover:scale-110" src={item.url} />
                  </div>
                </Link>
              ))
            }
            </div>
            {t.items.length > 4 && 
              <Disclosure>
                <DisclosureTrigger>
                  <button className="w-full py-2 text-xl cursor-pointer transition-colors duration-500 hover:text-white/50" type="button">
                    <ChevronDown size={32} className='block mx-auto' />
                  </button>
                </DisclosureTrigger>
                <DisclosureContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {
                    t.items.slice(4, t.items.length).map((item, i) => (
                      <Link href={`/items/${item.id}`} key={i}>
                        <div className="relative overflow-hidden rounded-2xl">
                          <img className="block object-cover w-full h-72 transition-transform duration-300 scale-100 hover:scale-110" src={item.url} />
                        </div>
                      </Link>
                    ))
                  }
                  </div>
                </DisclosureContent>
              </Disclosure>
            }
          </div>
        ))}
      </div>
    </>
  )
}