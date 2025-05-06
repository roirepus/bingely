
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, Plus, Star } from "lucide-react"

export default async function MovieDetailPage({ params }: {
  params: Promise<{ id: string }>
}) {
  // Mock movie data
  const { id } = await (params);
  const movie = {
    id,
    title: "Dune: Part Two",
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. As he begins a path that will lead to his destiny, he must reconcile the love of his life with the fate of the universe.",
    imageUrl: "/placeholder.svg?height=600&width=1200",
    posterUrl: "/placeholder.svg?height=450&width=300",
    rating: 4.8,
    year: 2024,
    duration: "166 min",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Josh Brolin"],
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  }

  return (
    <div className="min-h-screen text-mocha-text">
      {/* Hero Banner */}
      <div className="relative h-[70vh]">
        <div className="absolute inset-0">
          <Image src={movie.imageUrl || "/placeholder.svg"} alt={movie.title} fill className="object-cover" priority />
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
                src={movie.posterUrl || "/placeholder.svg"}
                alt={movie.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold">{movie.title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-mocha-yellow mr-1" />
                  <span>{movie.rating}/5</span>
                </div>
                <span>{movie.year}</span>
                <span>{movie.duration}</span>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <Badge key={genre} variant="outline" className="border-mocha-text text-mocha-text">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
              <p className="text-mocha-subtext1 max-w-2xl">{movie.description}</p>
              <div className="flex flex-wrap gap-3">
                <Link href={`/watch/${movie.id}`}>
                  <Button className="watch-now-btn">
                    <Play className="h-4 w-4 mr-2" /> Watch Now
                  </Button>
                </Link>
                <Button className="add-to-list-btn">
                  <Plus className="h-4 w-4 mr-2" /> Add to List
                </Button>
                {/*<Button variant="outline" size="icon">
                  <Share className="h-4 w-4" />
                </Button>*/}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Trailer */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Trailer</h2>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={movie.trailerUrl}
                  title={`${movie.title} Trailer`}
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Synopsis */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Synopsis</h2>
              <p className="text-mocha-subtext1">{movie.description}</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Cast & Crew */}
            <div>
              <h2 className="text-xl  font-semibold mb-4">Cast & Crew</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-gray-400">Director</h3>
                  <p>{movie.director}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Cast</h3>
                  <ul className="space-y-1">
                    {movie.cast.map((actor) => (
                      <li key={actor}>{actor}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Similar Movies */}
            <div>
              <h2 className="text-xl font-semibold mb-4">You May Also Like</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=450&width=300"
                    alt="Similar Movie"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=450&width=300"
                    alt="Similar Movie"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=450&width=300"
                    alt="Similar Movie"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=450&width=300"
                    alt="Similar Movie"
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
