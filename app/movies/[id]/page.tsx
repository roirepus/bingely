"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, ChevronRight, Home, ExternalLink, Shield, Clock, Calendar, Star } from "lucide-react"
import { useParams } from "next/navigation"
import { imageUrlPrefix } from "@/lib/utils/constants"
import Header from "@/components/Header"
interface genre {
  id: number,
  name: string,
}
interface MovieDetails {
  id: number,
  title: string,
  release_date: string,
  runtime: number,
  vote_average: number,
  overview: string,
  genres: genre[],
  poster_path: string,
}
export default function MovieWatchPage() {
  const params = useParams<{ id: string }>();
  const id = params.id
  const [movie, setMovie] = useState<MovieDetails>();
  useEffect(() => {
    const getMovie = async () => {
      const res = await fetch(`/api/movies/${id}`);
      if (!res.ok) console.log(`error getting movie details ${res.status}`)
      const data = await res.json();
      setMovie(data);
    }
    getMovie();
  })
  const [isPlaying, setIsPlaying] = useState(false)
  // const [isMuted, setIsMuted] = useState(false)
  const [selectedSource, setSelectedSource] = useState("movies-club")
  const [selectedQuality, setSelectedQuality] = useState("1080p")
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Mock movie data
  // const movie = {
  //   id: params.id,
  //   title: "Dune: Part Two",
  //   year: 2024,
  //   duration: "166 min",
  //   rating: 4.8,
  //   description:
  //     "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. As he begins a path that will lead to his destiny, he must reconcile the love of his life with the fate of the universe.",
  //   genres: ["Sci-Fi", "Adventure", "Drama"],
  //   sources: [
  //     { id: "movies-club", name: "Movies Club", premium: false },
  //     { id: "vidsrc-pro", name: "VidSrc.pro", premium: true },
  //     { id: "vidsrc-to", name: "VidSrc.to", premium: false },
  //     { id: "vidsrc-cc", name: "VidSrc.cc", premium: false },
  //     { id: "vid-link", name: "Vid Link", premium: false },
  //   ],
  //   qualities: ["2160p", "1080p", "720p", "480p"],
  //   relatedMovies: [
  //     { id: "1", title: "Dune", imageUrl: "/placeholder.svg?height=450&width=300", year: 2021 },
  //     { id: "2", title: "Blade Runner 2049", imageUrl: "/placeholder.svg?height=450&width=300", year: 2017 },
  //     { id: "3", title: "Arrival", imageUrl: "/placeholder.svg?height=450&width=300", year: 2016 },
  //   ],
  // }
  const qualities = ["1080p", "720p", "480p"]
  const sources = [

    { id: "movies-club", name: "Movies Club", premium: false },
    { id: "vidsrc-pro", name: "VidSrc.pro", premium: true },
    { id: "vidsrc-to", name: "VidSrc.to", premium: false },
    { id: "vidsrc-cc", name: "VidSrc.cc", premium: false },
    { id: "vid-link", name: "Vid Link", premium: false },
  ]

  const relatedMovies = [
    { id: "1", title: "Dune", imageUrl: "/placeholder.svg?height=450&width=300", year: 2021 },
    { id: "2", title: "Blade Runner 2049", imageUrl: "/placeholder.svg?height=450&width=300", year: 2017 },
    { id: "3", title: "Arrival", imageUrl: "/placeholder.svg?height=450&width=300", year: 2016 },
  ]
  // Simulate video loading
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [selectedSource, selectedQuality])

  // Handle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="min-h-screen text-mocha-text">
      {/* Header */}
      <Header />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4 pt-20">
        <div className="flex items-center text-sm text-gray-400">
          <Link href="/" className="hover:text-white flex items-center">
            <Home className="h-3.5 w-3.5 mr-1" />
            Home
          </Link>
          <ChevronRight className="h-3 w-3 mx-2" />
          <Link href="/movies" className="hover:text-white">
            Movies
          </Link>
          <ChevronRight className="h-3 w-3 mx-2" />
          <Link href={`/movies/${params.id}`} className="text-[#00BFFF]">
            {movie?.title}
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Movie Info Sidebar */}
          <div className="w-full md:w-72 bg-gray-900/50 rounded-lg overflow-hidden">
            <div className="relative aspect-[2/3] w-full">
              <Image
                src={`${imageUrlPrefix}w500${movie?.poster_path}`}
                alt={"movie title"}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h2 className="font-bold text-xl">{movie?.title}</h2>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-300">
                  <span className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    {movie?.release_date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {movie?.runtime}
                  </span>
                  <span className="flex items-center">
                    <Star className="h-3.5 w-3.5 text-yellow-500 mr-1" />
                    {movie?.vote_average}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-1 mb-4">
                {movie?.genres?.map((genre) => (
                  <Badge key={genre.id} variant="outline" className="border-[#00BFFF] text-[#00BFFF]">
                    {genre.name}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-gray-300">{movie?.overview}</p>

              {/* Quality Selection */}
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Quality</h3>
                <div className="grid grid-cols-4 gap-2">
                  {qualities.map((quality) => (
                    <Button
                      key={quality}
                      variant={selectedQuality === quality ? "default" : "outline"}
                      size="sm"
                      className={
                        selectedQuality === quality
                          ? "bg-[#00BFFF] hover:bg-[#00BFFF]/90"
                          : "hover:bg-gray-800 hover:text-white"
                      }
                      onClick={() => setSelectedQuality(quality)}
                    >
                      {quality}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Related Movies */}
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">You May Also Like</h3>
                <div className="space-y-3">
                  {relatedMovies.map((relatedMovie) => (
                    <Link
                      key={relatedMovie.id}
                      href={`/movies/${relatedMovie.id}`}
                      className="flex items-center gap-3 hover:bg-gray-800/50 p-2 rounded-lg"
                    >
                      <div className="relative w-12 h-16 flex-shrink-0">
                        <Image
                          src={relatedMovie.imageUrl || "/placeholder.svg"}
                          alt={relatedMovie.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{relatedMovie.title}</p>
                        <p className="text-xs text-gray-400">{relatedMovie.year}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Video Player */}
          <div className="flex-1">
            <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-gray-600 border-t-[#00BFFF] rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    className="w-full h-full"
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    onClick={togglePlay}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {!isPlaying && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-16 w-16 rounded-full bg-black/50 text-white hover:text-[#00BFFF] pointer-events-auto"
                        onClick={togglePlay}
                      >
                        <Play className="h-8 w-8" />
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Sources */}
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Sources</h3>
              <div className="flex flex-wrap gap-2">
                {sources.map((source) => (
                  <Button
                    key={source.id}
                    variant={selectedSource === source.id ? "default" : "outline"}
                    className={
                      selectedSource === source.id
                        ? "bg-[#00BFFF] hover:bg-[#00BFFF]/90"
                        : "hover:bg-gray-800 hover:text-white"
                    }
                    onClick={() => setSelectedSource(source.id)}
                  >
                    {source.premium && <Badge className="bg-yellow-500 text-black mr-2 text-xs">PREMIUM</Badge>}
                    {source.name}
                  </Button>
                ))}
                <Button variant="outline" className="hover:bg-gray-800 hover:text-white">
                  More <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <p className="text-xs text-gray-400 flex items-center mt-4">
                <Shield className="h-4 w-4 mr-2" /> We recommend using an adblocker, some of the sources may include
                their own ads.
              </p>
            </div>

            {/* Download Options */}
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Download Options</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {qualities.map((quality) => (
                  <Button
                    key={`download-${quality}`}
                    variant="outline"
                    className="hover:bg-gray-800 hover:text-white justify-between"
                  >
                    <span>Download {quality}</span>
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
