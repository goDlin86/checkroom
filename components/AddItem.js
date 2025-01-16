'use client'

import { useState, useRef } from 'react'

const tags = ['shirts', 't-shirts', 'jackets', 'jeans', 'shorts', 'shoes', 'sweatshirts', 'beanies']

export default function AddItem() {
  const inputFileRef = useRef(null)
  const inputImg = useRef(null)
  const inputName = useRef(null)
  const [selectedImg, setSelectedImg] = useState(false)
  const [selectedTag, setSelectedTag] = useState('shirts')

  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-bold py-4">Add Item</div>

      <form
        onSubmit={async (event) => {
          event.preventDefault()

          const [file] = inputFileRef.current.files

          const response = await fetch(
            `/api/items/add?filename=${inputName.current.value}&tag=${selectedTag}&type=${file.type}`,
            {
              method: 'POST',
              body: file,
            },
          )

          if (response.ok) {
            
          }
        }}
      >
        <div className={"relative flex flex-col items-center p-20 w-full bg-white/5 border-4 border-white/10 border-dashed rounded-2xl " + (selectedImg ? "hidden" : "")}>
          <div className="shrink-0 bg-white/5 py-2 px-4 mb-3 border-2 border-white/10 rounded-lg uppercase">Choose image</div>
          <div className="text-white/20 text-center">or drag and drop image here</div>
          <input className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer focus:outline-none" type="file" accept="image/*" ref={inputFileRef} required 
            onChange={() => {
              const [file] = inputFileRef.current.files
              if (file) {
                setSelectedImg(true)
                inputImg.current.src = URL.createObjectURL(file)
              }
            }}
          />
        </div>

        <div className={"transition-opacity duration-500 " + (selectedImg ? "opacity-100" : "opacity-0 invisible")}>
          <div className="relative max-w-56 mx-auto mt-4 overflow-hidden rounded-2xl">
          <img ref={inputImg} className="block object-cover w-full h-72 text-center" />
          </div>
          <input 
            className="rounded-full w-full mt-4 px-4 py-1 bg-white/10 border-2 border-white/10 text-center font-[family-name:var(--font-geist-mono)]" 
            name="name" 
            type="text" 
            ref={inputName} 
            placeholder="Name" 
            required 
          />
          <select id="tags" name="tags" className="block mx-auto bg-white/10 mt-4 px-4 py-1 rounded-full text-center" value={selectedTag} onChange={e => setSelectedTag(e.target.value)}>
            {tags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
          <button className="block mx-auto mt-4 px-4 py-2 border-2 rounded-full text-2xl cursor-pointer font-bold" type="submit">Add</button>
        </div>
      </form>
    </div>
  )
}


// CREATE TABLE items (
//   name varchar(255) NOT NULL,
//   tag varchar(255) NOT NULL,
//   url varchar(255) NOT NULL,
//   createdAt timestamp DEFAULT CURRENT_TIMESTAMP,
//   owner int NOT NULL
// );