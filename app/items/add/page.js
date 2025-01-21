import Link from "next/link"
import AddItem from "../../../components/AddItem"

export default function Add() {
  return (
    <main className="px-4 lg:px-0">
      <Link className="mx-auto px-4 py-1 border-2 rounded-full cursor-pointer text-xl align-middle text-center" href="/items">Home</Link>
      <AddItem />
    </main>
  )
}