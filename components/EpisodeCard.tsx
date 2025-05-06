import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

interface EpisodeCardProps {
  seriesId: string
  seasonId: string
  episodeId: string
  title: string
  description: string
  duration: string
  thumbnailUrl: string
}

export default function EpisodeCard({
  seriesId,
  seasonId,
  episodeId,
  title,
  description,
  duration,
  thumbnailUrl,
}: EpisodeCardProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg hover:bg-gray-800/50 transition-colors">
      <div className="relative aspect-video w-full sm:w-48 rounded-md overflow-hidden">
        <Image src={thumbnailUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{title}</h3>
            <span className="text-xs text-gray-400">{duration}</span>
          </div>
          <p className="text-sm text-gray-300 line-clamp-2 mt-1">{description}</p>
        </div>
        <div className="mt-2">
          <Link href={`/series/${seriesId}/watch/${seasonId}/${episodeId}`}>
            <Button size="sm" className="bg-mocha-overlay2 text-mocha-text hover:bg-mocha-mantle">
              <Play className="h-3 w-3 mr-2" /> Watch
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
