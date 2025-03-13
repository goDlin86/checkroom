'use client'

import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { Accordion,AccordionItem, AccordionContent, AccordionTrigger } from './Accordion'

export default function LookItems({ items }) {
  const [isOpen, setIsOpen] = useState(null)
  const [selected, setSelected] = useState([])

  const select = (id) => {
    setSelected(oldArray => oldArray.includes(id) ? oldArray.filter(i => i !== id) : [...oldArray, id])
  }

  return (
    <Accordion expandedValue={isOpen} onValueChange={setIsOpen}>
      {items.map(t => (
        t.items.length > 0 &&
        <div key={t.tag}>
          <AccordionItem value={t.tag}>
            <AccordionTrigger>
              <h1 id={t.tag} className="text-xl uppercase my-2 font-bold cursor-pointer">
                {t.tag}
                <ChevronDown size={32} className='inline transition-transform duration-500 group-data-expanded:-rotate-180' />
              </h1>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 mb-4 md:grid-cols-4 gap-4">
                {t.items.map((item, i) => (
                  <div className={"relative overflow-hidden rounded-2xl h-72 box-border border-4  transition-colors duration-500 " + (selected.includes(item.id) ? "border-betacolor" : "border-transparent")} key={i} onClick={() => select(item.id)}>
                    <img className="block object-cover w-full h-72 transition-transform duration-300 scale-100 hover:scale-110" src={item.url} />
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          {isOpen !== t.tag && 
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn">
              {t.items.filter(item => selected.includes(item.id)).map((item, i) => (
                <div className="relative overflow-hidden rounded-2xl" key={i}>
                  <img className="block object-cover w-full h-72" src={item.url} />
                  <X className="absolute text-zinc-950 top-1 right-1 cursor-pointer transition-colors duration-500 bg-zinc-200/50 rounded-xl hover:bg-zinc-200/80" onClick={() => select(item.id)} />
                </div>
              ))}
            </div>
          }
        </div>
      ))}
    </Accordion>
  )
}