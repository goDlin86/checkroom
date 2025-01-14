'use client'

import { useState, useRef } from 'react'

const tags = ['shirts', 't-shirts', 'jackets', 'jeans', 'shorts', 'shoes', 'sweatshirts', 'beanies']

export default function AddItem() {
  const inputFileRef = useRef(null)
  const inputImg = useRef(null)
  const inputName = useRef(null)
  const [selectedTag, setSelectedTag] = useState('shirts')
  //const [show, setShow] = useState(false)
  const [blob, setBlob] = useState(null)
  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-bold py-4">Add Item</div>

      <form
        onSubmit={async (event) => {
          event.preventDefault()

          const [file] = inputFileRef.current.files

          const response = await fetch(
            `/api/items/add?filename=${inputName.current.value}&tag=${selectedTag}`,
            {
              method: 'POST',
              body: file,
            },
          )

          const newBlob = await response.json()
          setBlob(newBlob)
        }}
      >
        <div className="relative flex flex-col items-center p-12 w-full max-w-96 bg-white/5 border-4 border-white/10 border-dashed rounded-2xl">
          <div className="shrink-0 bg-white/5 py-2 px-4 mb-3 border-2 border-white/10 rounded-lg uppercase">Choose image</div>
          <div className="text-white/10">or drag and drop image here</div>
          <input className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer focus:outline-none" type="file" accept="image/*" ref={inputFileRef} required 
            onChange={_ => {
              const [file] = inputFileRef.current.files
              if (file) {
                //setShow(true)
                inputImg.current.src = URL.createObjectURL(file)
              } else {
                //setShow(false)
              }
            }}
          />
        </div>
        <div className="relative max-w-56 mx-auto mt-4 overflow-hidden rounded-2xl">
         <img ref={inputImg} className="block object-cover w-full h-72 text-center" />
        </div>
        <input 
          className="rounded-full w-full outline-none mt-4 px-4 py-1 bg-white/10 border-2 border-white/10 text-center" 
          name="name" 
          type="text" 
          ref={inputName} 
          placeholder="Name" 
          required 
        />
        <select id="tags" name="tags" className="block mx-auto bg-white/10 mt-4 px-4 py-1 rounded-full" value={selectedTag} onChange={e => setSelectedTag(e.target.value)}>
          {tags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
        <button className="block mx-auto mt-4 px-4 py-2 border-2 rounded-full text-2xl cursor-pointer" type="submit">ADD</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
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