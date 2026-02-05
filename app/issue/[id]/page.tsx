import { Navbar } from "@/components/navigation/navbar"
import { IssueDetail } from "@/components/tracking/issue-detail"

export default function IssueDetailPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto p-6">
        <IssueDetail />
      </div>
    </div>
  )
}
