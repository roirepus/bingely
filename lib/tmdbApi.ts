import config from "./config";

export interface featuredMovieDetails {
  id: number,
  title: string,
  vote_average: number,
  overview: string,
  poster_path: string,
  genre_ids: number[],
}
// export interface featuredApiRes{
//   results:featuredMovieDetails[],
// }
export async function getFeaturedMovie(): Promise<featuredMovieDetails> {
  //the api call return an array of movies
  const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: config.env.tmdb.tmdbAuthHeader!
    }
  };

  const res = await fetch(url, options)
  const data = await res.json();
  if (!data.results || data.results.length === 0) {
    throw new Error("Error getting featured movie details");
  }
  const featuredMovie = data.results[0];
  return featuredMovie;
}

export async function getTrendingMovies(): Promise<featuredMovieDetails[]> {
  const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: config.env.tmdb.tmdbAuthHeader!

    }
  };

  const res = await fetch(url, options);
  const data = await res.json();
  if (!data.results || data.results.lenght === 0) throw new Error("error getting trending movies",)
  return data.results;
}

export interface tvShowsDetails {
  id: number,
  poster_path: string,
  title: string,
  vote_average: number,
}
export async function getTrendingTVShows(): Promise<tvShowsDetails[] | undefined> {
  const url = 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: config.env.tmdb.tmdbAuthHeader!
    }
  };

  const res = await fetch(url, options);
  if (!res.ok) throw new Error("error getting tv shows")
  const data = await res.json();
  if (data.results && data.results.length != 0)
    return data.results;
}
