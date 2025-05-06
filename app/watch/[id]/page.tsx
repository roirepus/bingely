
"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize, Settings } from "lucide-react"

export default function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [volume, setVolume] = useState(80)

  const { id } = use(params);
  // Mock movie data
  const movie = {
    id: id,
    title: "Dune: Part Two",
    duration: "2h 46m",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  }

  // Hide controls after inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout

    const resetTimer = () => {
      clearTimeout(timeout)
      setShowControls(true)

      timeout = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false)
        }
      }, 3000)
    }

    resetTimer()

    window.addEventListener("mousemove", resetTimer)
    window.addEventListener("touchstart", resetTimer)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener("mousemove", resetTimer)
      window.removeEventListener("touchstart", resetTimer)
    }
  }, [isPlaying])

  // Format time
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  return (
    <div className="relative h-screen w-full bg-black text-white overflow-hidden">
      {/* Video Player */}
      <div className="absolute inset-0 cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
        <video
          className="h-full w-full object-contain"
          src={movie.videoUrl}
          playsInline
          autoPlay={false}
          muted={isMuted}
        />
      </div>

      {/* Overlay for controls */}
      {showControls && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-between z-10">
          {/* Top bar */}
          <div className="p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center gap-4">
              <Link href={`/movies/${movie.id}`}>
                <Button variant="ghost" size="icon" className="text-white hover:text-[#00BFFF]">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-medium">{movie.title}</h1>
              </div>
            </div>
          </div>

          {/* Center play/pause button */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Button
              variant="ghost"
              size="icon"
              className="h-16 w-16 rounded-full bg-black/50 text-white hover:text-[#00BFFF] pointer-events-auto"
              onClick={(e) => {
                e.stopPropagation()
                setIsPlaying(!isPlaying)
              }}
            >
              {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
            </Button>
          </div>

          {/* Bottom controls */}
          <div className="p-4 space-y-2 bg-gradient-to-t from-black/80 to-transparent">
            {/* Progress bar */}
            <div className="px-2">
              <Slider
                value={[progress]}
                max={100}
                step={0.1}
                className="[&>span:first-child]:h-1.5 [&>span:first-child]:bg-white/30 [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&>span:first-child_span]:bg-[#00BFFF]"
                onValueChange={(value) => setProgress(value[0])}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-[#00BFFF]"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsPlaying(!isPlaying)
                  }}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-[#00BFFF]"
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsMuted(!isMuted)
                    }}
                  >
                    {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>
                  <div className="w-20 hidden sm:block">
                    <Slider
                      value={[volume]}
                      max={100}
                      step={1}
                      className="[&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&>span:first-child_span]:bg-[#00BFFF]"
                      onValueChange={(value) => {
                        setVolume(value[0])
                        setIsMuted(value[0] === 0)
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>

                <span className="text-sm">
                  {formatTime(progress * 10)} / {movie.duration}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-[#00BFFF]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Settings className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-[#00BFFF]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Maximize className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
