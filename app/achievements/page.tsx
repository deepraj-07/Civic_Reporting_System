import { Navbar } from "@/components/navigation/navbar"
import { AchievementsShowcase } from "@/components/gamification/achievements-showcase"

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto p-6">
        <AchievementsShowcase />
      </div>
    </div>
  )
}
