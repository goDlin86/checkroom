'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Disclosure, DisclosureContent, DisclosureTrigger } from './Disclosure'
import { ChevronDown } from 'lucide-react'

export default function TagItems({ tag, items }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <h1 id={tag} className="text-xl uppercase my-2 font-bold">{tag}</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item, i) => (
        i < 4 &&
        <Link href={`/items/${item.id}`} key={i}>
          <div className="relative overflow-hidden rounded-2xl">
            <img className="block object-cover w-full h-72 transition-transform duration-300 scale-100 hover:scale-110" src={item.url} />
          </div>
        </Link>
      ))}
      </div>
      {items.length > 4 && 
        <Disclosure onOpenChange={setIsOpen}>
          <DisclosureTrigger>
            <button className="w-full py-2 text-xl cursor-pointer transition-colors duration-500 hover:text-white/50" type="button">
              <ChevronDown size={32} className={'block mx-auto transition-transform duration-500 ' + (isOpen ? 'rotate-180' : 'rotate-0')} />
            </button>
          </DisclosureTrigger>
          <DisclosureContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {items.slice(4, items.length).map((item, i) => (
                <Link href={`/items/${item.id}`} key={i}>
                  <div className="relative overflow-hidden rounded-2xl">
                    <img className="block object-cover w-full h-72 transition-transform duration-300 scale-100 hover:scale-110" src={item.url} />
                  </div>
                </Link>
              ))}
            </div>
          </DisclosureContent>
        </Disclosure>
      }
    </>
  )
}