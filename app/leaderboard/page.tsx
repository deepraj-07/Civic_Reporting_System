import { Navbar } from "@/components/navigation/navbar"
import { Leaderboard } from "@/components/gamification/leaderboard"

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto p-6">
        <Leaderboard />
      </div>
    </div>
  )
}
