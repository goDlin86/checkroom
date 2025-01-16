'use client'

import { useState, useRef } from 'react'
import { tags } from './tags'

export default function Item({ item }) {
  const inputName = useRef(null)
  const [selectedTag, setSelectedTag] = useState(item.tag)

  console.log(item)

  async function update(e) {
    e.preventDefault()

    const response = await fetch(
      '/api/items/update',
      {
        method: 'POST',
        body: JSON.stringify({
          id: item.id,
          name: inputName.current.value,
          tag: selectedTag
        })
      },
    )

    if (response.ok) {
      
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-bold py-4">Edit Item</div>

      <form
        onSubmit={async (event) => {
          event.preventDefault()

          const response = await fetch(
            `/api/items/del`,
            {
              method: 'POST',
              body: JSON.stringify({
                id: item.id,
                blob: item.url
              })
            },
          )

          if (response.ok) {
            
          }
        }}
      >
        <div className="relative max-w-56 mx-auto mt-4 overflow-hidden rounded-2xl">
          <img className="block object-cover w-full h-72 text-center" src={item.url} />
        </div>
        <input 
          className="rounded-full w-full mt-4 px-4 py-1 bg-white/10 border-2 border-white/10 text-center font-[family-name:var(--font-geist-mono)]" 
          name="name" 
          type="text" 
          ref={inputName} 
          placeholder="Name"
          defaultValue={item.name}
          required 
        />
        <select id="tags" name="tags" className="block mx-auto bg-white/10 mt-4 px-4 py-1 rounded-full text-center" value={selectedTag} onChange={e => setSelectedTag(e.target.value)}>
          {tags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
        <p className="mt-4">Added {item.createdat.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'Europe/Moscow' })}</p>
        <button className="block mx-auto mt-4 px-4 py-2 border-2 rounded-full text-2xl cursor-pointer font-bold" type="reset" onClick={update}>Update</button>
        <button className="block mx-auto mt-4 px-4 py-2 border-2 border-red-500/70 text-red-500/70 rounded-full text-2xl cursor-pointer font-bold" type="submit">Delete</button>
      </form>
    </div>
  )
}