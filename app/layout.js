import { Geist, Geist_Mono } from "next/font/google"
import Auth from "../components/Auth"
import Providers from "./providers"
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "react-hot-toast"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "checkroom",
  description: "checkroom is your best friend for dressing",
}

export default function RootLayout({ children, params: { session } }) {
  return (
    <html className="scroll-smooth" lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers session={session}>
          <div className="font-[family-name:var(--font-geist-mono)] container mx-auto max-w-4xl">
            <header className="p-4 text-4xl">
              checkroom
              <Auth />
            </header>
            {children}
            <footer className="flex gap-6 flex-wrap items-center justify-center">

            </footer>
          </div>
        </Providers>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
