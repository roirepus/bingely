import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"

interface SeriesCardProps {
  id: number
  title: string
  imageUrl: string
  rating: number
  seasons?: number
}

export default function SeriesCard({ id, title, imageUrl, rating, seasons }: SeriesCardProps) {
  return (
    <Link href={`/tv-shows/${id}`} className="group">
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mocha-base/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <h3 className="font-medium text-sm line-clamp-2 text-mocha-text">{title}</h3>
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center">
              <Star className="h-3 w-3 text-mocha-yellow mr-1" />
              <span className="text-xs text-mocha-subtext1">{rating}/10</span>
            </div>
            {seasons && (
              <span className="text-xs text-mocha-subtext1">
                {seasons} {seasons === 1 ? "Season" : "Seasons"}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
