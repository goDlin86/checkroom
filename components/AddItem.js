'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { tags } from '../lib/tags'
import { Copy, ChevronLeft } from 'lucide-react'
import { TextShimmer } from './TextShimmer'

export default function AddItem() {
  const inputFileRef = useRef(null)
  const inputImg = useRef(null)
  const inputName = useRef(null)
  const inputPrice = useRef(null)
  const [inputURL, setInputURL] = useState('')
  const [AIClass, setAIClass] = useState('')
  const [selectedImg, setSelectedImg] = useState(false)
  const [selectedTag, setSelectedTag] = useState('shirts')
  const [isUploading, setIsUploading] = useState(false)

  function reset() {
    inputFileRef.current.value = null
    inputName.current.value = ''
    inputPrice.current.value = ''
    setInputURL('')
    setSelectedImg(false)
    setSelectedTag('shirts')
    setAIClass('')
  }

  const isValidUrl = urlString => {
    try { return Boolean(new URL(urlString)) }
    catch { return false }
  }

  async function getItemData() {   
    try {
      const text = await navigator.clipboard.readText()
      if (!isValidUrl(text)) {
        toast.error('Not a valid URL!')
        return
      }
      setInputURL(text)

      const response = await fetch(
        '/api/items/getData',
        {
          method: 'POST',
          body: JSON.stringify({
            url: text
          })
        }
      )
      const data = await response.json()

      // const response = await fetch(
      //   'https://api.zyte.com/v1/extract',
      //   {
      //     method: 'POST',
      //     body: JSON.stringify({
      //       url: text,
      //       product: true
      //     }),
      //     headers: {
      //       'Authorization': 'Basic ' + btoa('api_key'),
      //       'Content-Type': 'application/json'
      //     }
      //   }
      // )
      // const data = await response.json()
      // console.log(data)
      
      if (response.ok) {
        setSelectedImg(true)
        inputImg.current.src = data.img
        inputName.current.value = data.name
        inputPrice.current.value = data.price
        hf(data.img)
      }
      else {
        toast.error(data.message)
        setInputURL('')
      }
      
    } catch (e) {
      toast.error(e.message)
      setInputURL('')
    }
  }

  async function hf(body) {
    const response = await fetch('/api/hf', { method: 'POST', body })
    const data = await response.json()
    if (response.ok) {
      setAIClass(data.message)
    } else {
      toast.error(data.message)
      setAIClass('Error')
    }
  }

  return (
    <div className="flex flex-col items-center">
      <Link className="text-xl btn" href="/items"><ChevronLeft /></Link>
      <div className="text-2xl font-bold py-4">Add Item</div>

      <form className="w-full max-w-96"
        onSubmit={async (event) => {
          event.preventDefault()

          const [file] = inputFileRef.current.files
          const url = inputImg.current.src

          setIsUploading(true)
          const toastId = toast.loading('Loading...')
          const response = await fetch(
            `/api/items/add?filename=${inputName.current.value}&price=${inputPrice.current.value}&tag=${encodeURIComponent(selectedTag)}&type=${file ? file.type : ''}&url=${file ? '' : encodeURIComponent(url)}`,
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
          <div className={inputURL === "" ? "" : "hidden"}>
            <div className="relative flex flex-col items-center p-20 w-full bg-white/5 border-4 border-white/10 border-dashed rounded-2xl">
              <div className="bg-betacolor/5 px-2 rounded-sm text-betacolor">beta</div>
              <div className="shrink-0 bg-white/5 py-2 px-4 my-3 border-2 border-white/10 rounded-lg"><Copy /></div>
              <div className="text-white/20 text-center">get item data by URL from clipboard</div>
              <div className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer focus:outline-none" onClick={getItemData}></div>
            </div>
            <div className="my-4 text-center text-white/40">or</div>
            <div className="relative flex flex-col items-center p-20 w-full bg-white/5 border-4 border-white/10 border-dashed rounded-2xl">
              <div className="shrink-0 bg-white/5 py-2 px-4 mb-3 border-2 border-white/10 rounded-lg uppercase">Choose image</div>
              <div className="text-white/20 text-center">or drag and drop image here</div>
              <input className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer focus:outline-none" type="file" accept="image/*" ref={inputFileRef} 
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
          <div className={"py-32 text-center " + (inputURL === "" ? "hidden" : "")}>
            <div className="text-white/50 overflow-hidden text-ellipsis">{inputURL}</div>
            <TextShimmer>Extracting data ...</TextShimmer>
          </div>
        </div>

        <div className={"transition-opacity duration-500 " + (selectedImg ? "opacity-100" : "opacity-0 invisible")}>
          <div className="relative max-w-56 mx-auto overflow-hidden rounded-2xl">
            <img ref={inputImg} className="block object-cover w-full h-72 text-center" />
          </div>
          <div className="mt-2 text-center">AI classification</div>
          <div className="text-center">{AIClass === "" ? <TextShimmer duration={0.5}>...</TextShimmer>  : AIClass}</div>
          <input 
            className="rounded-full w-full mt-4 px-4 py-1 bg-white/10 border-2 border-white/10 text-center font-[family-name:var(--font-geist-mono)]" 
            name="name" 
            type="text" 
            ref={inputName} 
            placeholder="Name"
            required 
          />
          <input 
            className="rounded-full w-full mt-4 px-4 py-1 bg-white/10 border-2 border-white/10 text-center font-[family-name:var(--font-geist-mono)]" 
            name="price" 
            type="text" 
            ref={inputPrice} 
            placeholder="Price" 
            required
          />
          <select 
            id="tags" 
            name="tags" 
            className="block mx-auto bg-white/10 mt-4 px-4 py-1 rounded-full text-center" 
            value={selectedTag} 
            onChange={e => setSelectedTag(e.target.value)}
          >
            {tags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
          <div className="flex mt-4 justify-around">
            <button 
              className="text-2xl font-bold btn" 
              type="reset" 
              disabled={isUploading} 
              onClick={reset}
            >
              Reset
            </button>
            <button 
              className="text-2xl font-bold btn" 
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