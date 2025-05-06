
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal, X } from 'lucide-react'
import MovieCard from "@/components/MovieCard"
import Header from "@/components/Header"
import { allMovies } from "@/constants"


// Get unique genres from movies
const genres = Array.from(new Set(allMovies.map((movie) => movie.genre)))

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [showFilters, setShowFilters] = useState(false)
  const [filteredMovies, setFilteredMovies] = useState(allMovies)

  // Apply filters and sorting
  useEffect(() => {
    let result = [...allMovies]

    // Apply search filter
    if (searchQuery) {
      result = result.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply genre filter
    if (selectedGenre !== "all") {
      result = result.filter((movie) => movie.genre === selectedGenre)
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

    setFilteredMovies(result)
  }, [searchQuery, selectedGenre, sortBy])

  return (
    <div className="min-h-screen bg-mocha-base text-mocha-text">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Explore Movies</h1>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-mocha-text hover:text-mocha-blue"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-5 w-5 " />
            </Button>
          </div>

          {/* Search and Filters - Desktop */}
          <div className="hidden md:flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search movies..."
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
            <div className="w-full md:w-48">
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
            <div className="w-full md:w-48">
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

          {/* Search and Filters - Mobile */}
          {showFilters && (
            <div className="md:hidden flex flex-col gap-4 mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search movies..."
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
            </div>
          )}

          {/* Active Filters */}
          {(searchQuery || selectedGenre !== "all") && (
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
              <Button
                className="text-mocha-overlay2 bg-mocha-base hover:bg-mocha-base hover:text-mocha-blue text-sm p-0 h-6"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedGenre("all")
                }}
              >
                Clear all
              </Button>
            </div>
          )}

          {/* Movies Grid */}
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {filteredMovies.map((movie) => (
                <div key={movie.id} className="flex flex-col">
                  <MovieCard id={movie.id} title={movie.title} imageUrl={movie.imageUrl} rating={movie.rating} />
                  <Link href={`/movies/${movie.id}`}>
                    <Button
                      variant="ghost"
                      className="w-full mt-2 text-white hover:text-[#00BFFF] hover:bg-gray-800"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-400 mb-4">No movies found matching your criteria</p>
              <Button
                variant="outline"
                className="bg-mocha-surface0 hover:bg-mocha-blue border border-mocha-text"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedGenre("all")
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

