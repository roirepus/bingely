
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal, X } from "lucide-react"
import SeriesCard from "@/components/SeriesCard"
import Header from "@/components/Header"

// Mock TV series data
const allSeries = [
  {
    id: "1",
    title: "Stranger Things",
    imageUrl: "/placeholder.svg?height=450&width=300",
    rating: 4.8,
    seasons: 4,
    year: 2016,
    genre: "Sci-Fi",
    currentSeason: "Season 4",
  },
  {
    id: "2",
    title: "Breaking Bad",
    imageUrl: "/placeholder.svg?height=450&width=300",
    rating: 4.9,
    seasons: 5,
    year: 2008,
    genre: "Drama",
    currentSeason: "Complete",
  },
  {
    id: "3",
    title: "The Last of Us",
    imageUrl: "/placeholder.svg?height=450&width=300",
    rating: 4.7,
    seasons: 1,
    year: 2023,
    genre: "Drama",
    currentSeason: "Season 1",
  },
  {
    id: "4",
    title: "Game of Thrones",
    imageUrl: "/placeholder.svg?height=450&width=300",
    rating: 4.6,
    seasons: 8,
    year: 2011,
    genre: "Fantasy",
    currentSeason: "Complete",
  },
  {
    id: "5",
    title: "The Mandalorian",
    imageUrl: "/placeholder.svg?height=450&width=300",
    rating: 4.5,
    seasons: 3,
    year: 2019,
    genre: "Sci-Fi",
    currentSeason: "Season 3",
  },
  {
    id: "6",
    title: "House of the Dragon",
    imageUrl: "/placeholder.svg?height=450&width=300",
    rating: 4.4,
    seasons: 1,
    year: 2022,
    genre: "Fantasy",
    currentSeason: "Season 1",
  },
  {
    id: "7",
    title: "The Bear",
    imageUrl: "/placeholder.svg?height=450&width=300",
    rating: 4.8,
    seasons: 2,
    year: 2022,
    genre: "Drama",
    currentSeason: "Season 2",
  },
  {
    id: "8",
    title: "Succession",
    imageUrl: "/placeholder.svg?height=450&width=300",
    rating: 4.7,
    seasons: 4,
    year: 2018,
    genre: "Drama",
    currentSeason: "Complete",
  },
  {
    id: "9",
    title: "The Boys",
    imageUrl: "/placeholder.svg?height=450&width=300",
    rating: 4.6,
    seasons: 3,
    year: 2019,
    genre: "Action",
    currentSeason: "Season 3",
  },
  {
    id: "10",
    title: "The Crown",
    imageUrl: "/placeholder.svg?height=450&width=300",
    rating: 4.5,
    seasons: 6,
    year: 2016,
    genre: "Drama",
    currentSeason: "Season 6",
  },
  {
    id: "11",
    title: "Severance",
    imageUrl: "/placeholder.svg?height=450&width=300",
    rating: 4.8,
    seasons: 1,
    year: 2022,
    genre: "Sci-Fi",
    currentSeason: "Season 1",
  },
  {
    id: "12",
    title: "Ted Lasso",
    imageUrl: "/placeholder.svg?height=450&width=300",
    rating: 4.7,
    seasons: 3,
    year: 2020,
    genre: "Comedy",
    currentSeason: "Complete",
  },
  {
    id: "13",
    title: "The White Lotus",
    imageUrl: "/placeholder.svg?height=450&width=300",
    rating: 4.5,
    seasons: 2,
    year: 2021,
    genre: "Drama",
    currentSeason: "Season 2",
  },
  {
    id: "14",
    title: "Yellowstone",
    imageUrl: "/placeholder.svg?height=450&width=300",
    rating: 4.4,
    seasons: 5,
    year: 2018,
    genre: "Western",
    currentSeason: "Season 5",
  },
  {
    id: "15",
    title: "Wednesday",
    imageUrl: "/placeholder.svg?height=450&width=300",
    rating: 4.3,
    seasons: 1,
    year: 2022,
    genre: "Fantasy",
    currentSeason: "Season 1",
  },
  {
    id: "16",
    title: "Squid Game",
    imageUrl: "/placeholder.svg?height=450&width=300",
    rating: 4.6,
    seasons: 1,
    year: 2021,
    genre: "Thriller",
    currentSeason: "Season 1",
  },
]

// Get unique genres from series
const genres = Array.from(new Set(allSeries.map((series) => series.genre)))

export default function TVSeriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [seasonFilter, setSeasonFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [filteredSeries, setFilteredSeries] = useState(allSeries)

  // Apply filters and sorting
  useEffect(() => {
    let result = [...allSeries]

    // Apply search filter
    if (searchQuery) {
      result = result.filter((series) => series.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Apply genre filter
    if (selectedGenre !== "all") {
      result = result.filter((series) => series.genre === selectedGenre)
    }

    // Apply season filter
    if (seasonFilter !== "all") {
      const seasonCount = Number.parseInt(seasonFilter)
      result = result.filter((series) => series.seasons === seasonCount)
    }

    // Apply sorting
    switch (sortBy) {
      case "popular":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "latest":
        result.sort((a, b) => b.year - a.year)
        break
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }

    setFilteredSeries(result)
  }, [searchQuery, selectedGenre, sortBy, seasonFilter])

  return (
    <div className="min-h-screen bg-mocha-base text-mocha-text">
      {/* Header with opacity */}
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Explore TV Shows</h1>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:text-[#00BFFF]"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </div>

          {/* Search and Filters - Desktop */}
          <div className="hidden md:grid md:grid-cols-4 gap-4 mb-8">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search TV shows..."
                className="pl-10 bg-gray-900 border-gray-700 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-white"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div>
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 text-white">
                  <SelectItem value="all">All Genres</SelectItem>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Select value={seasonFilter} onValueChange={setSeasonFilter}>
                  <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                    <SelectValue placeholder="Seasons" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 text-white">
                    <SelectItem value="all">All Seasons</SelectItem>
                    <SelectItem value="1">1 Season</SelectItem>
                    <SelectItem value="2">2 Seasons</SelectItem>
                    <SelectItem value="3">3 Seasons</SelectItem>
                    <SelectItem value="4">4 Seasons</SelectItem>
                    <SelectItem value="5">5+ Seasons</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 text-white">
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="latest">Latest</SelectItem>
                    <SelectItem value="title">A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Search and Filters - Mobile */}
          {showFilters && (
            <div className="md:hidden flex flex-col gap-4 mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search TV shows..."
                  className="pl-10 bg-gray-900 border-gray-700 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-white"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                    <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                      <SelectValue placeholder="Genre" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                      <SelectItem value="all">All Genres</SelectItem>
                      {genres.map((genre) => (
                        <SelectItem key={genre} value={genre}>
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="latest">Latest</SelectItem>
                      <SelectItem value="title">A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Select value={seasonFilter} onValueChange={setSeasonFilter}>
                  <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                    <SelectValue placeholder="Seasons" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 text-white">
                    <SelectItem value="all">All Seasons</SelectItem>
                    <SelectItem value="1">1 Season</SelectItem>
                    <SelectItem value="2">2 Seasons</SelectItem>
                    <SelectItem value="3">3 Seasons</SelectItem>
                    <SelectItem value="4">4 Seasons</SelectItem>
                    <SelectItem value="5">5+ Seasons</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Active Filters */}
          {(searchQuery || selectedGenre !== "all" || seasonFilter !== "all") && (
            <div className="flex flex-wrap gap-2 mb-6">
              {searchQuery && (
                <div className="flex items-center gap-2 bg-gray-800 rounded-full px-3 py-1 text-sm">
                  <span>Search: {searchQuery}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 text-gray-400 hover:text-mocha-text hover:bg-mocha-blue"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              {selectedGenre !== "all" && (
                <div className="flex items-center gap-2 bg-gray-800 rounded-full px-3 py-1 text-sm">
                  <span>Genre: {selectedGenre}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 text-gray-400 hover:text-white"
                    onClick={() => setSelectedGenre("all")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              {seasonFilter !== "all" && (
                <div className="flex items-center gap-2 bg-gray-800 rounded-full px-3 py-1 text-sm">
                  <span>Seasons: {seasonFilter}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 text-gray-400 hover:text-white"
                    onClick={() => setSeasonFilter("all")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              <Button
                className="text-mocha-overlay2 bg-mocha-base hover:bg-mocha-base hover:text-mocha-blue text-sm p-0 h-6"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedGenre("all")
                  setSeasonFilter("all")
                }}
              >
                Clear all
              </Button>
            </div>
          )}

          {/* Series Grid */}
          {filteredSeries.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {filteredSeries.map((series) => (
                <div key={series.id} className="flex flex-col">
                  <SeriesCard
                    id={series.id}
                    title={series.title}
                    imageUrl={series.imageUrl}
                    rating={series.rating}
                    seasons={series.seasons}
                  />
                  <div className="mt-1 mb-2 text-xs text-gray-400 text-center">{series.currentSeason}</div>
                  <Link href={`/tv-shows/${series.id}`}>
                    <Button variant="ghost" className="w-full text-white hover:text-[#00BFFF] hover:bg-gray-800">
                      View Details
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-400 mb-4">No TV shows found matching your criteria</p>
              <Button
                variant="outline"
                className="bg-mocha-surface0 hover:bg-mocha-blue border border-mocha-text"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedGenre("all")
                  setSeasonFilter("all")
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
