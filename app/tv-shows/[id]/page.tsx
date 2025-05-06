
"use client"

import { use, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Play, Plus, Star } from "lucide-react"
import EpisodeCard from "@/components/EpisodeCard"
export default function SeriesDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [selectedSeason, setSelectedSeason] = useState("1")

  const { id } = use(params);

  // Mock series data
  const series = {
    id: id,
    title: "Stranger Things",
    description:
      "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
    imageUrl: "/placeholder.svg?height=600&width=1200",
    posterUrl: "/placeholder.svg?height=450&width=300",
    rating: 4.8,
    year: 2016,
    genres: ["Sci-Fi", "Horror", "Drama"],
    creator: "The Duffer Brothers",
    cast: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder", "David Harbour"],
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    seasons: [
      {
        id: "1",
        name: "Season 1",
        year: 2016,
        episodes: [
          {
            id: "1",
            title: "Chapter One: The Vanishing of Will Byers",
            description:
              "On his way home from a friend's house, young Will sees something terrifying. Nearby, a sinister secret lurks in the depths of a government lab.",
            duration: "49 min",
            thumbnailUrl: "/placeholder.svg?height=450&width=800",
          },
          {
            id: "2",
            title: "Chapter Two: The Weirdo on Maple Street",
            description:
              "Lucas, Mike and Dustin try to talk to the girl they found in the woods. Hopper questions an anxious Joyce about an unsettling phone call.",
            duration: "46 min",
            thumbnailUrl: "/placeholder.svg?height=450&width=800",
          },
          {
            id: "3",
            title: "Chapter Three: Holly, Jolly",
            description:
              "An increasingly concerned Nancy looks for Barb and finds out what Jonathan's been up to. Joyce is convinced Will is trying to talk to her.",
            duration: "52 min",
            thumbnailUrl: "/placeholder.svg?height=450&width=800",
          },
        ],
      },
      {
        id: "2",
        name: "Season 2",
        year: 2017,
        episodes: [
          {
            id: "1",
            title: "Chapter One: MADMAX",
            description:
              "As the town preps for Halloween, a high-scoring rival shakes things up at the arcade, and a skeptical Hopper inspects a field of rotting pumpkins.",
            duration: "48 min",
            thumbnailUrl: "/placeholder.svg?height=450&width=800",
          },
          {
            id: "2",
            title: "Chapter Two: Trick or Treat, Freak",
            description:
              "After Will sees something terrible on trick-or-treat night, Mike wonders whether Eleven's still out there. Nancy wrestles with the truth about Barb.",
            duration: "56 min",
            thumbnailUrl: "/placeholder.svg?height=450&width=800",
          },
        ],
      },
      {
        id: "3",
        name: "Season 3",
        year: 2019,
        episodes: [
          {
            id: "1",
            title: "Chapter One: Suzie, Do You Copy?",
            description:
              "Summer brings new jobs and budding romance. But the mood shifts when Dustin's radio picks up a Russian broadcast, and Will senses something is wrong.",
            duration: "51 min",
            thumbnailUrl: "/placeholder.svg?height=450&width=800",
          },
        ],
      },
      {
        id: "4",
        name: "Season 4",
        year: 2022,
        episodes: [
          {
            id: "1",
            title: "Chapter One: The Hellfire Club",
            description:
              "Darkness returns to Hawkins just in time for spring break, triggering fresh terror, disturbing memories — and the threat of war.",
            duration: "76 min",
            thumbnailUrl: "/placeholder.svg?height=450&width=800",
          },
        ],
      },
    ],
  }

  // Get the selected season data
  const currentSeason = series.seasons.find((season) => season.id === selectedSeason)

  return (
    <div className="min-h-screen bg-mocha-base text-mocha-text">
      {/* Hero Banner */}
      <div className="relative h-[70vh]">
        <div className="absolute inset-0">
          <Image
            src={series.imageUrl || "/placeholder.svg"}
            alt={series.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-mocha-mantle to-transparent" />
        </div>

        <div className="absolute top-4 left-4 z-10">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white hover:text-[#00BFFF]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="hidden md:block relative h-[300px] w-[200px] shrink-0">
              <Image
                src={series.posterUrl || "/placeholder.svg"}
                alt={series.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold">{series.title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-mocha-yellow mr-1" />
                  <span>{series.rating}/5</span>
                </div>
                <span>{series.year}</span>
                <span>
                  {series.seasons.length} {series.seasons.length === 1 ? "Season" : "Seasons"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {series.genres.map((genre) => (
                    <Badge key={genre} variant="outline" className="border-mocha-text text-mocha-text">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
              <p className="text-mocha-subtext max-w-2xl">{series.description}</p>
              <div className="flex flex-wrap gap-3">
                <Link href={`/tv-shows/${series.id}/watch/${currentSeason?.id}/1`}>
                  <Button className="watch-now-btn">
                    <Play className="h-4 w-4 mr-2" /> Watch Now
                  </Button>
                </Link>
                <Button className="add-to-list-btn">
                  <Plus className="h-4 w-4 mr-2" /> Add to List
                </Button>
                {/*
                <Button variant="outline" size="icon">
                  <Share className="h-4 w-4" />
                </Button>
                */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Series Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Season and Episode Selection */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-48">
                  <label className="block mb-2 text-sm font-medium">Season</label>
                  <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                    <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                      <SelectValue placeholder="Select season" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                      {series.seasons.map((season) => (
                        <SelectItem key={season.id} value={season.id}>
                          {season.name} ({season.year})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Episodes List */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Episodes</h2>
                <div className="space-y-4">
                  {currentSeason?.episodes.map((episode) => (
                    <EpisodeCard
                      key={episode.id}
                      seriesId={series.id}
                      seasonId={currentSeason.id}
                      episodeId={episode.id}
                      title={`${Number.parseInt(episode.id)}. ${episode.title}`}
                      description={episode.description}
                      duration={episode.duration}
                      thumbnailUrl={episode.thumbnailUrl}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Trailer */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Trailer</h2>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={series.trailerUrl}
                  title={`${series.title} Trailer`}
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Synopsis */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Synopsis</h2>
              <p className="text-gray-300">{series.description}</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Cast & Crew */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Cast & Crew</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-gray-400">Creator</h3>
                  <p>{series.creator}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Cast</h3>
                  <ul className="space-y-1">
                    {series.cast.map((actor) => (
                      <li key={actor}>{actor}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Similar Series */}
            <div>
              <h2 className="text-xl font-semibold mb-4">You May Also Like</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=450&width=300"
                    alt="Similar Series"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=450&width=300"
                    alt="Similar Series"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=450&width=300"
                    alt="Similar Series"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=450&width=300"
                    alt="Similar Series"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
