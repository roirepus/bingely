"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal } from 'lucide-react'
import MovieCard from "@/components/MovieCard"
import Header from "@/components/Header"
import { featuredMovieDetails } from "@/lib/tmdbApi"

export default function MoviesPage() {
  const [movies, setMovies] = useState<featuredMovieDetails[]>([]);

  // Fetch movies (no filtering logic)
  useEffect(() => {
    const getMovies = async () => {
      const res = await fetch("/api/movies/trending-movies")
      const data = await res.json()
      setMovies(data.results)
    }
    getMovies();
  }, [])

  return (
    <div className="min-h-screen text-mocha-text">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Explore Movies</h1>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-mocha-text hover:text-mocha-blue"
            >
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </div>

          {/* Search and Filters - Visual Only */}
          <div className="hidden md:flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search movies..."
                className="pl-10 bg-gray-900 border-gray-700 text-white"
                readOnly
              />
            </div>
            <div className="w-full md:w-48">
              <Select>
                <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 text-white">
                  <SelectItem value="all">All Genres</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-48">
              <Select>
                <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 text-white">
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Movies Grid */}
          {movies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {movies.map((movie) => (
                <div key={movie.id} className="flex flex-col">
                  <MovieCard
                    id={movie.id}
                    title={movie.title}
                    imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    rating={movie.vote_average}
                  />
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
              <p className="text-gray-400 mb-4">Loading movies...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
