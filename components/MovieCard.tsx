import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"

interface MovieCardProps {
  id: number
  title: string
  imageUrl: string
  rating: number
}

export default function MovieCard({ id, title, imageUrl, rating }: MovieCardProps) {
  return (
    <Link href={`/movies/${id}`} className="group">
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mocha-base/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <h3 className="font-medium text-sm text-mocha-text line-clamp-2">{title}</h3>
          <div className="flex items-center mt-1">
            <Star className="h-3 w-3 text-mocha-yellow mr-1" />
            <span className="text-xs text-mocha-subtext1">{rating}/10</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
