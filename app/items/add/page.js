import Link from "next/link"
import AddItem from "../../../components/AddItem"

export default function Add() {
  return (
    <main className="px-4 lg:px-0">
      <Link className="ml-2 px-4 py-1 border-2 rounded-full inline-block cursor-pointer text-sm sm:text-xl align-middle" href="/items">Home</Link>
      <AddItem />
    </main>
  )
}