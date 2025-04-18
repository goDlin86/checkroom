'use client'

import { redirect } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { tags } from '../lib/tags'
import { ChevronLeft } from 'lucide-react'
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '../components/Dialog'

export default function Item({ item }) {
  const [name, setName] = useState(item.name)
  const [price, setPrice] = useState(item.price)
  const [selectedTag, setSelectedTag] = useState(item.tag)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

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

    setIsOpen(false)
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
      <Link className="text-xl btn" href="/items"><ChevronLeft /></Link>
      <div className="text-2xl font-bold py-4">Edit Item</div>

      <div className="w-full max-w-96">
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
        <div className="flex mt-4 justify-around">
          <button 
            className="btn text-2xl font-bold" 
            type="button" 
            disabled={isUpdating || (selectedTag === item.tag && name === item.name && price === item.price)}
            onClick={update}
          >
            Update
          </button>
          <button 
            className="btn border-red-700 text-red-700 text-2xl font-bold disabled:text-red-500/10 disabled:border-red-500/10 hover:text-red-500 hover:border-red-500"
            type="button"
            disabled={isUpdating}
            onClick={() => setIsOpen(true)}
          >
            Delete
          </button>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className='w-full max-w-md bg-white p-6 dark:bg-zinc-900'>
              <DialogHeader>
                <DialogTitle className='text-red-500'>
                  Delete?
                </DialogTitle>
                <DialogDescription className='text-zinc-600 dark:text-zinc-400'>
                  Are you sure you want to delete this item?
                </DialogDescription>
              </DialogHeader>
              <div className='mt-6 flex flex-col space-y-4'>
                <button
                  className='inline-flex items-center justify-center self-end text-xl font-bold btn border-red-600 text-red-600 hover:text-red-500 hover:border-red-500 focus:outline-none'
                  disabled={isUpdating}
                  onClick={del}
                >
                  Delete
                </button>
              </div>
              <DialogClose className='text-zinc-600 dark:text-zinc-400' />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}