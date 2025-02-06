'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { tags } from '../lib/tags'
import { Copy, ChevronLeft } from 'lucide-react'

export default function AddItem() {
  const inputFileRef = useRef(null)
  const inputImg = useRef(null)
  const inputName = useRef(null)
  const [AIClass, setAIClass] = useState('...')
  const [selectedImg, setSelectedImg] = useState(false)
  const [selectedTag, setSelectedTag] = useState('shirts')
  const [isUploading, setIsUploading] = useState(false)

  async function getProduct() {
    // const response = await fetch(
    //   `/api/getProduct`,
    //   {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       url: 'https://www.wildberries.ru/catalog/247232809/detail.aspx'
    //     })
    //   },
    // )
    // const data = await response.json()
    // console.log(data.message)
  }

  function reset() {
    inputFileRef.current.value = null
    setSelectedImg(false)
    setSelectedTag('shirts')
    setAIClass('...')
  }

  async function hf(file) {
    const response = await fetch(
      `/api/hf`,
      {
        method: 'POST',
        body: file,
      },
    )
    const data = await response.json()
    if (response.ok) {
      setAIClass(data.message)
    } else {
      toast.error(data.message)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <Link className="px-4 py-1 border-2 rounded-full cursor-pointer text-xl transition-colors duration-500 hover:text-white/50" href="/items"><ChevronLeft /></Link>
      <div className="text-2xl font-bold py-4">Add Item</div>

      <form
        onSubmit={async (event) => {
          event.preventDefault()

          const [file] = inputFileRef.current.files

          setIsUploading(true)
          const toastId = toast.loading('Loading...')
          const response = await fetch(
            `/api/items/add?filename=${inputName.current.value}&tag=${selectedTag}&type=${file.type}`,
            {
              method: 'POST',
              body: file,
            },
          )

          const r = await response.json()
          setIsUploading(false)
          toast.dismiss(toastId)
          if (response.ok) {
            toast.success(r.message)
            reset()
          } else {
            toast.error(r.message)
          }
        }}
      >
        <div className={selectedImg ? "hidden" : ""}>
          <div className="relative">
            <input 
              className="rounded-full w-full px-4 py-1 bg-white/10 border-2 border-white/10 text-center font-[family-name:var(--font-geist-mono)] bg-right bg-no-repeat" 
              name="name" 
              type="text" 
              placeholder="Paste URL for product page"
              readOnly
              onChange={async () => {
                //alert(e.target.value)
              }} 
            />
            <div className="absolute right-3 top-1.5 cursor-pointer text-white/40" onClick={getProduct}><Copy /></div>
          </div>
          <div className="my-4 text-center text-white/40">or</div>
          <div className="relative flex flex-col items-center p-20 w-full bg-white/5 border-4 border-white/10 border-dashed rounded-2xl">
            <div className="shrink-0 bg-white/5 py-2 px-4 mb-3 border-2 border-white/10 rounded-lg uppercase">Choose image</div>
            <div className="text-white/20 text-center">or drag and drop image here</div>
            <input className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer focus:outline-none" type="file" accept="image/*" ref={inputFileRef} required 
              onChange={async () => {
                const [file] = inputFileRef.current.files
                if (file) {
                  setSelectedImg(true)
                  inputImg.current.src = URL.createObjectURL(file)
                  hf(file)
                }
              }}
            />
          </div>
        </div>

        <div className={"transition-opacity duration-500" + (selectedImg ? "opacity-100" : "opacity-0 invisible")}>
          <div className="relative max-w-56 mx-auto overflow-hidden rounded-2xl">
            <img ref={inputImg} className="block object-cover w-full h-72 text-center" />
          </div>
          <div className="mt-2 text-center">AI classification</div>
          <div className="text-center">{AIClass}</div>
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
              className="block mx-auto mt-4 px-4 py-2 border-2 rounded-full text-2xl cursor-pointer font-bold disabled:text-white/10 transition-colors duration-500 hover:text-white/50" 
              type="reset" 
              disabled={isUploading} 
              onClick={reset}
            >
              Reset
            </button>
            <button 
              className="block mx-auto mt-4 px-4 py-2 border-2 rounded-full text-2xl cursor-pointer font-bold disabled:text-white/10 transition-colors duration-500 hover:text-white/50" 
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