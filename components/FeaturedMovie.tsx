import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, Plus, Star } from "lucide-react"

interface FeaturedMovieProps {
  title: string
  description: string
  imageUrl: string
  rating: number
  year: number
  duration: string
}

export default function FeaturedMovie({ title, description, imageUrl, rating, year, duration }: FeaturedMovieProps) {
  return (
    <div className="relative h-[70vh] w-full">
      <div className="absolute inset-0">
        <Image src={imageUrl || "https://placehold.co/600x400"} alt={title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-mocha-crust to-transparent" />
      </div>
      <div className="relative h-full flex flex-col justify-end p-6 md:p-12 container mx-auto">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-3xl text-mocha-text md:text-5xl font-bold">{title}</h1>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-mocha-yellow mr-1" />
              <span className="text-mocha-subtext1">{rating}/10</span>
            </div>
            <span className="text-mocha-subtext1">{year}</span>
            <span className="text-mocha-subtext1">{duration}</span>
          </div>
          <p className="text-mocha-subtext1 line-clamp-3 md:line-clamp-none">{description}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={`/movies/1`}>
              <Button className="watch-now-btn">
                <Play className="h-4 w-4 mr-2" /> Watch Now
              </Button>
            </Link>
            <Button className="add-to-list-btn">
              <Plus className="h-4 w-4 mr-2" /> Add to List
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
