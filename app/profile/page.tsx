
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, LogOut, Settings, Edit } from "lucide-react"
import MovieCard from "@/components/MovieCard"
export default function ProfilePage() {
  // Mock user data
  const user = {
    name: "roirepus",
    email: "roirepus@example.com",
    avatar: "/placeholder.svg?height=200&width=200",
    memberSince: "March 2022",
    watchHistory: [
      { id: "1", title: "The Batman", imageUrl: "/placeholder.svg?height=450&width=300", rating: 4.5, progress: 75 },
      {
        id: "3",
        title: "Everything Everywhere All at Once",
        imageUrl: "/placeholder.svg?height=450&width=300",
        rating: 4.9,
        progress: 100,
      },
      { id: "6", title: "Oppenheimer", imageUrl: "/placeholder.svg?height=450&width=300", rating: 4.8, progress: 30 },
      { id: "8", title: "Poor Things", imageUrl: "/placeholder.svg?height=450&width=300", rating: 4.6, progress: 50 },
    ],
    savedMovies: [
      { id: "2", title: "Top Gun: Maverick", imageUrl: "/placeholder.svg?height=450&width=300", rating: 4.7 },
      { id: "4", title: "The Whale", imageUrl: "/placeholder.svg?height=450&width=300", rating: 4.3 },
      {
        id: "5",
        title: "Black Panther: Wakanda Forever",
        imageUrl: "/placeholder.svg?height=450&width=300",
        rating: 4.4,
      },
      { id: "7", title: "Barbie", imageUrl: "/placeholder.svg?height=450&width=300", rating: 4.2 },
    ],
  }

  return (
    <div className="min-h-screen  text-mocha-text">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white hover:text-[#00BFFF]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>

        {/* User Profile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative h-32 w-32 rounded-full overflow-hidden">
                <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
                <button className="absolute bottom-0 right-0 bg-[#00BFFF] p-2 rounded-full">
                  <Edit className="h-4 w-4 text-white" />
                </button>
              </div>
              <div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-gray-400">{user.email}</p>
                <p className="text-sm text-gray-500">Member since {user.memberSince}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className=" bg-mocha-overlay0 gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
                <Button
                  size="sm"
                  className="gap-2 bg-mocha-overlay0 text-mocha-red hover:text-red-400 hover:border-red-400"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <Tabs defaultValue="history" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-900">
                <TabsTrigger value="history">Watch History</TabsTrigger>
                <TabsTrigger value="saved">My List</TabsTrigger>
              </TabsList>
              <TabsContent value="history" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {user.watchHistory.map((movie) => (
                    <div key={movie.id} className="relative">
                      <MovieCard id={movie.id} title={movie.title} imageUrl={movie.imageUrl} rating={movie.rating} />
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
                        <div className="h-full bg-[#00BFFF]" style={{ width: `${movie.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="saved" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {user.savedMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      id={movie.id}
                      title={movie.title}
                      imageUrl={movie.imageUrl}
                      rating={movie.rating}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
