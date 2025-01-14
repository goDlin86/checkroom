import { sql } from '@vercel/postgres'

const tags = ['shirts', 't-shirts', 'jackets', 'jeans', 'shorts', 'shoes', 'sweatshirts', 'beanies']

export default async function Items() {
  let data

  try {
    data = await sql`SELECT * FROM items WHERE owner = 1;`
  } catch (e) {
    throw e
  }

  const { rows: items } = data

  return (
    <>
      <div className="py-6 overflow-x-scroll whitespace-nowrap scrollbar">
        {tags.map(tag => (
          <a className="mx-2 px-4 py-1 border-2 rounded-full inline-block cursor-pointer" href={`#${tag}`} key={tag}>{tag}</a>
        ))}
      </div>
      <div className="">
        {tags.map(tag => (
          <>
            {items.some(item => item.tag == tag) && 
              <>
                <h1 id={tag}>{tag}</h1>
                <div className="grid grid-cols-4 gap-4">
                  {
                    items.filter(item => item.tag === tag).map(item => (
                      <div className="relative overflow-hidden rounded-2xl">
                        <img className="block object-cover w-full h-72" src={item.url} />
                      </div>
                    ))
                  }
                </div>
              </>
            }
          </>
          ))}
      </div>
    </>
  )
}