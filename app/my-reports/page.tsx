import { Navbar } from "@/components/navigation/navbar"
import { MyReports } from "@/components/tracking/my-reports"

export default function MyReportsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto p-6">
        <MyReports />
      </div>
    </div>
  )
}
