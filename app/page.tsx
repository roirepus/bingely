import MovieCard from "@/components/MovieCard"
import SeriesCard from "@/components/SeriesCard"
import FeaturedMovie from "@/components/FeaturedMovie"
import ScrollableSection from "@/components/ScrollableSection"
import ContinueWatching from "@/components/ContinueWatching"

import { continueWatchingItems } from "@/constants"
import { trendingMovies } from "@/constants"
import { popularSeries } from "@/constants"

import Header from "@/components/Header"
export default function Home() {

  return (
    <div className="min-h-screen text-white">
      <Header />
      <main className="pt-16">
        {/* Featured Movie Banner */}
        <FeaturedMovie
          title="Dune: Part Two"
          description="Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family."
          imageUrl="/placeholder.svg?height=600&width=1200"
          rating={4.8}
          year={2024}
          duration="166 min"
        />

        {/* Continue Watching Section */}
        <section className="container mx-auto px-4 py-8">
          <ScrollableSection title="Continue Watching">
            {continueWatchingItems.map((item) => (
              <div key={`${item.type}-${item.id}`} className="min-w-[250px] sm:min-w-[280px] flex-shrink-0">
                <ContinueWatching {...item} />
              </div>
            ))}
          </ScrollableSection>
        </section>

        {/* Trending Movies Section */}
        <section className="container mx-auto px-4 py-8">
          <ScrollableSection title="Trending Movies">
            {trendingMovies.map((movie) => {
              return (
                <div key={movie.id} className="min-w-[150px] sm:min-w-[180px] flex-shrink-0" >
                  <MovieCard id={movie.id} title={movie.title} rating={movie.rating} imageUrl={movie.imageUrl} />
                </div >
              )
            })}
          </ScrollableSection>
        </section>

        {/* Popular Series Section */}
        <section className="container mx-auto px-4 py-8">
          <ScrollableSection title="Trending TV Shows" >
            {popularSeries.map((series) => {
              return (
                <div key={series.id} className="min-w-[150px] sm:min-w-[180px] flex-shrink-0" >
                  <SeriesCard id={series.id} imageUrl={series.imageUrl} title={series.title} rating={series.rating} />
                </div>
              )
            }
            )}
          </ScrollableSection>
        </section>

        {/* New Releases Section */}
        <section className="container mx-auto px-4 py-8">
          <ScrollableSection title="New Releases" >
            {popularSeries.map((series) => {
              return (
                <div key={series.id} className="min-w-[150px] sm:min-w-[180px] flex-shrink-0" >
                  <SeriesCard id={series.id} imageUrl={series.imageUrl} title={series.title} rating={series.rating} />
                </div>
              )
            }
            )}
          </ScrollableSection>
        </section>
      </main>
    </div >
  )
}
