import { NextRequest, NextResponse } from 'next/server'
import config from '@/lib/config'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Properly await the dynamic parameter
    const { id } = await params;

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      {
        headers: {
          Authorization: config.env.tmdb.tmdbAuthHeader!,
        },
      }
    )

    if (!res.ok) {
      throw new Error(`TMDB API error: ${res.status}`)
    }

    const data = await res.json()
    return NextResponse.json(data)

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch movie' },
      { status: 500 }
    )
  }
}
