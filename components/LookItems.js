'use client'

import { useState } from 'react'
import { Disclosure, DisclosureContent, DisclosureTrigger } from './Disclosure'
import { ChevronDown } from 'lucide-react'

export default function LookItems({ tag, items }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState([])

  const select = (id) => {
    setSelected(oldArray => oldArray.includes(id) ? oldArray.filter(i => i !== id) : [...oldArray, id])
  }

  return (
    <>
      <Disclosure onOpenChange={setIsOpen}>
        <DisclosureTrigger>
          <h1 id={tag} className="text-xl uppercase my-2 font-bold cursor-pointer">
            {tag}
            <ChevronDown size={32} className={'inline transition-transform duration-500 ' + (isOpen ? 'rotate-180' : 'rotate-0')} />
          </h1>
        </DisclosureTrigger>
        <DisclosureContent>
          <div className="grid grid-cols-2 mb-4 md:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <div className={"relative overflow-hidden rounded-2xl h-72 box-border border-betacolor " + (selected.includes(item.id) ? "border-4" : "" )} key={i} onClick={() => select(item.id)}>
              <img className="block object-cover w-full h-72 transition-transform duration-300 scale-100 hover:scale-110" src={item.url} />
            </div>
          ))}
          </div>
        </DisclosureContent>
      </Disclosure>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.filter(item => selected.includes(item.id)).map((item, i) => (
          <div className="relative overflow-hidden rounded-2xl animate-fadeIn" key={i}>
            <img className="block object-cover w-full h-72" src={item.url} />
          </div>
        ))}
      </div>
    </>
  )
}