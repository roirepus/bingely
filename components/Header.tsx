import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "./ui/button"
import { Bell } from "lucide-react"
import { User } from "lucide-react"

export default function Header() {

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-lg header">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold text-mocha-blue">
            Bingely
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="hover:text-mocha-blue transition-colors text-mocha-overlay2 active:text-mocha-green">
              Home
            </Link>
            <Link href="/movies" className="hover:text-mocha-blue  transition-colors text-mocha-overlay2 active:text-mocha-green">
              Movies
            </Link>
            <Link href="/tv-shows" className="hover:text-mocha-blue  transition-colors text-mocha-overlay2 active:text-mocha-green">
              TV Shows
            </Link>
            <Link href="/my-list" className="hover:text-mocha-blue  transition-colors text-mocha-overlay2 active:text-mocha-green">
              My List
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/search">
            <Button variant="ghost" size="icon" className="text-mocha-overlay2 hover:bg-mocha-blue active:bg-mocha-green">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="text-mocha-overlay2 hover:bg-mocha-blue active:bg-mocha-green">
            <Bell className="h-5 w-5" />
          </Button>
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="text-mocha-overlay2 hover:bg-mocha-blue active:bg-mocha-green">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
