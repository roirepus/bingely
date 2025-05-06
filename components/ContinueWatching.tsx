import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

interface ContinueWatchingProps {
  id: string
  title: string
  imageUrl: string
  progress: number
  type: "movie" | "series"
  episodeInfo?: string
  watchUrl: string
}

export default function ContinueWatching({
  title,
  imageUrl,
  progress,
  type,
  episodeInfo,
  watchUrl,
}: ContinueWatchingProps) {
  return (
    <div className="relative group">
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <Link href={watchUrl}>
            <Button
              size="icon"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-mocha-crust/80 hover:bg-mocha-blue h-12 w-12 rounded-full"
            >
              <Play className="h-6 w-6 fill-mocha-text" />
            </Button>
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-mocha-overlay2">
          <div className="h-full bg-mocha-blue" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="mt-2">
        <h3 className="font-medium text-mocha-text text-sm line-clamp-1">{title}</h3>
        <div className="flex items-center text-xs text-mocha-subtext1">
          <span>{type === "movie" ? "Movie" : episodeInfo}</span>
        </div>
      </div>
    </div>
  )
}
