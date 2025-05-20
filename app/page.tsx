import MovieCard from "@/components/MovieCard"
import SeriesCard from "@/components/SeriesCard"
import FeaturedMovie from "@/components/FeaturedMovie"
import ScrollableSection from "@/components/ScrollableSection"

import Header from "@/components/Header"
import { featuredMovieDetails, getFeaturedMovie, getTrendingMovies, getTrendingTVShows, tvShowsDetails } from "@/lib/tmdbApi"
import { imageUrlPrefix } from "@/lib/utils/constants"
export default async function Home() {

  const featuredMovie = await getFeaturedMovie();
  const trendingMovies: featuredMovieDetails[] = await getTrendingMovies();
  const trendingTVShows: tvShowsDetails[] = await getTrendingTVShows();
  return (
    <div className="min-h-screen text-white">
      {/*header*/}
      <Header />

      <main className="pt-16">
        {/* Featured Movie Banner */}
        <FeaturedMovie
          title={featuredMovie.title}
          description={featuredMovie.overview}
          imageUrl={`${imageUrlPrefix}original${featuredMovie.poster_path}`}
          rating={featuredMovie.vote_average}
          year={2024}
          duration="166 min"
        />

        {/*implement later*/}
        {/* Continue Watching Section */}
        {/*<section className="container mx-auto px-4 py-8">
          <ScrollableSection title="Continue Watching">
            {continueWatchingItems.map((item) => (
              <div key={`${item.type}-${item.id}`} className="min-w-[250px] sm:min-w-[280px] flex-shrink-0">
                <ContinueWatching {...item} />
              </div>
            ))}
          </ScrollableSection>
        </section>
        */}

        {/* Trending Movies Section */}
        <section className="container mx-auto px-4 py-8">
          <ScrollableSection title="Trending Movies">
            {trendingMovies.map((movie) => {
              return (
                <div key={movie.id} className="min-w-[150px] sm:min-w-[180px] flex-shrink-0" >
                  <MovieCard id={movie.id} title={movie.title} rating={movie.vote_average} imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                </div >
              )
            })}
          </ScrollableSection>
        </section>

        {/* Popular Series Section */}
        <section className="container mx-auto px-4 py-8">
          <ScrollableSection title="Trending TV Shows" >
            {trendingTVShows?.map((tvShow) => {
              return (
                <div key={tvShow.id} className="min-w-[150px] sm:min-w-[180px] flex-shrink-0" >
                  <SeriesCard id={tvShow.id} imageUrl={`${imageUrlPrefix}w500${tvShow.poster_path}`} title={tvShow.title} rating={tvShow.vote_average} />
                </div>
              )
            }
            )}
          </ScrollableSection>
        </section>

        {/* New Releases Section 
          implement later
        */}
        {/*
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
        */}
      </main>
    </div >
  )
}
