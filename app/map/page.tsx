import { Navbar } from "@/components/navigation/navbar"
import { IssueMap } from "@/components/tracking/issue-map"

export default function MapPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto p-6">
        <IssueMap />
      </div>
    </div>
  )
}
