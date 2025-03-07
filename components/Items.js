'use client'

import Link from 'next/link'
import TagItems from './TagItems'
import LookItems from './LookItems'
import { tags } from '../lib/tags'
import { useState } from 'react'

export default function Items({ items }) {
  const [isLook, setIsLook] = useState(false)

  return (
    <>
      <div className="flex my-1 justify-around">
        <Link className="text-xl font-bold text-center btn" href="/items/add">Add item</Link>
        <div className={"text-xl font-bold text-center btn " + (isLook ? "bg-zinc-800" : "")} onClick={() => setIsLook(!isLook)}>
          Create look 
          <div className="inline text-sm bg-betacolor/5 px-2 rounded-sm text-betacolor">beta</div>
        </div>
      </div>
      <div className="py-4 overflow-x-scroll whitespace-nowrap scrollbar text-sm">
        {tags.map(tag => (
          <a className="mx-2 btn" href={`#${tag}`} key={tag}>{tag}</a>
        ))}
      </div>      
      <div className="px-4 lg:px-0">
        {items.map(t => (
          t.items.length > 0 && 
          (isLook ? <LookItems tag={t.tag} items={t.items} key={t.tag} /> : <TagItems tag={t.tag} items={t.items} key={t.tag} />)
        ))}
      </div>
    </>
  )
}