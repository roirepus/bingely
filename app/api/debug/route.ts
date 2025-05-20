import { NextResponse } from "next/server";
import config from "@/lib/config";
export async function GET() {
  return NextResponse.json({
    // tmdbApiKey: process.env.TMDB_API_KEY,
    tmdbAuthHeader: config.env.tmdb.tmdbAuthHeader,
  });
}
