'use client'

import { redirect } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { tags } from '../lib/tags'
import { ChevronLeft } from 'lucide-react'

export default function Item({ item }) {
  const [name, setName] = useState(item.name)
  const [price, setPrice] = useState(item.price)
  const [selectedTag, setSelectedTag] = useState(item.tag)
  const [isUpdating, setIsUpdating] = useState(false)

  async function update(e) {
    e.preventDefault()

    setIsUpdating(true)
    const toastId = toast.loading('Loading...')
    const response = await fetch(
      '/api/items/update',
      {
        method: 'POST',
        body: JSON.stringify({
          id: item.id,
          name,
          price,
          tag: selectedTag
        })
      },
    )

    const r = await response.json()
    setIsUpdating(false)
    toast.dismiss(toastId)
    if (response.ok) {
      toast.success(r.message)
      item.name = name
      item.price = price
      item.tag = selectedTag
    } else {
      toast.error(r.message)
    }
  }

  async function del(e) {
    e.preventDefault()

    setIsUpdating(true)
    const toastId = toast.loading('Loading...')
    const response = await fetch(
      `/api/items/del`,
      {
        method: 'POST',
        body: JSON.stringify({
          id: item.id,
          blob: item.url
        })
      },
    )

    const r = await response.json()
    setIsUpdating(false)
    toast.dismiss(toastId)
    if (response.ok) {
      toast.success(r.message, { style: { background: 'red' }})
      redirect('/items')
    } else {
      toast.error(r.message)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <Link className="px-4 py-1 border-2 rounded-full cursor-pointer text-xl transition-colors duration-500 hover:text-white/50" href="/items"><ChevronLeft /></Link>
      <div className="text-2xl font-bold py-4">Edit Item</div>

      <form className="w-full max-w-96" onSubmit={del}>
        <div className="relative max-w-56 mx-auto overflow-hidden rounded-2xl">
          <img className="block object-cover w-full h-72 text-center" src={item.url} />
        </div>
        <input 
          className="rounded-full w-full mt-4 px-4 py-1 bg-white/10 border-2 border-white/10 text-center font-[family-name:var(--font-geist-mono)]" 
          name="name" 
          type="text" 
          placeholder="Name"
          defaultValue={item.name}
          onChange={e => setName(e.target.value)}
          required 
        />
        <input 
          className="rounded-full w-full mt-4 px-4 py-1 bg-white/10 border-2 border-white/10 text-center font-[family-name:var(--font-geist-mono)]" 
          name="price" 
          type="text" 
          placeholder="Price" 
          defaultValue={item.price}
          onChange={e => setPrice(e.target.value)}
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
        <p className="mt-4 text-center">Added {item.createdAt.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'Europe/Moscow' })}</p>
        <div className="flex">
          <button 
            className="block mx-auto mt-4 px-4 py-2 border-2 rounded-full text-2xl cursor-pointer font-bold disabled:text-white/10 transition-colors duration-500 hover:text-white/50" 
            type="reset" 
            disabled={isUpdating || (selectedTag === item.tag && name === item.name && price === item.price)}
            onClick={update}
          >
            Update
          </button>
          <button 
            className="block mx-auto mt-4 px-4 py-2 border-2 border-red-500/70 text-red-500/70 rounded-full text-2xl cursor-pointer font-bold disabled:text-red-500/10 transition-colors duration-500 hover:text-red-500/50"
            disabled={isUpdating}
            type="submit"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  )
}