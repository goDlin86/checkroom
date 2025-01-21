'use client'

import { useState, useRef } from 'react'
import toast from 'react-hot-toast'
import { tags } from '../lib/tags'

export default function AddItem() {
  const inputFileRef = useRef(null)
  const inputImg = useRef(null)
  const inputName = useRef(null)
  const [selectedImg, setSelectedImg] = useState(false)
  const [selectedTag, setSelectedTag] = useState('shirts')
  const [isUploading, setIsUploading] = useState(false)

  function reset() {
    inputFileRef.current.value = null
    setSelectedImg(false)
    setSelectedTag('shirts')
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-bold py-4">Add Item</div>

      <form
        onSubmit={async (event) => {
          event.preventDefault()

          const [file] = inputFileRef.current.files

          setIsUploading(true)
          const response = await fetch(
            `/api/items/add?filename=${inputName.current.value}&tag=${selectedTag}&type=${file.type}`,
            {
              method: 'POST',
              body: file,
            },
          )

          setIsUploading(false)
          if (response.ok) {
            toast.success('Item added!')
            reset()
          } else {
            toast.error('Error!')
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
          <div className="relative max-w-56 mx-auto overflow-hidden rounded-2xl">
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
          <div className="flex">
            <button 
              className="block mx-auto mt-4 px-4 py-2 border-2 rounded-full text-2xl cursor-pointer font-bold disabled:border-white/10 disabled:text-white/10" 
              type="reset" 
              disabled={isUploading} 
              onClick={reset}
            >
              Reset
            </button>
            <button 
              className="block mx-auto mt-4 px-4 py-2 border-2 rounded-full text-2xl cursor-pointer font-bold disabled:border-white/10 disabled:text-white/10" 
              type="submit" 
              disabled={isUploading}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}