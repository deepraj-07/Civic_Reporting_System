import { Navbar } from "@/components/navigation/navbar"
import { UserProfile } from "@/components/gamification/user-profile"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto p-6">
        <UserProfile />
      </div>
    </div>
  )
}
