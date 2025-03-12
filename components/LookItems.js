'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Accordion,AccordionItem, AccordionContent, AccordionTrigger } from './Accordion'

export default function LookItems({ items }) {
  const [isOpen, setIsOpen] = useState(null)
  const [selected, setSelected] = useState([])

  const select = (id) => {
    setSelected(oldArray => oldArray.includes(id) ? oldArray.filter(i => i !== id) : [...oldArray, id])
  }

  return (
    <Accordion expandedValue={isOpen} onValueChange={(value) => setIsOpen(value)}>
      {items.map(t => (
        t.items.length > 0 &&
        <>
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
                  <div className={"relative overflow-hidden rounded-2xl h-72 box-border border-betacolor " + (selected.includes(item.id) ? "border-4" : "" )} key={i} onClick={() => select(item.id)}>
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
                </div>
              ))}
            </div>
          }
        </>
      ))}
    </Accordion>
  )
}