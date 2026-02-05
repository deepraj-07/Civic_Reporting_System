"use client"

import { Navbar } from "@/components/navigation/navbar"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { Button } from "@/components/ui/button"
import { Plus, Filter, Download } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { UserIssues } from "@/components/dashboard/user-issues"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const displayName = user?.name || "Your"
  const trimmedName = (displayName || "").trim()
  const possessiveName = loading
    ? ""
    : (trimmedName.endsWith("s") || trimmedName.endsWith("S"))
      ? `${trimmedName}'`
      : `${trimmedName}'s`
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">{possessiveName} Dashboard</h1>
            <p className="text-muted-foreground">Track civic issues and community engagement in real-time</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>

          </div>
        </div>

        {/* Quick Stats */}
        <StatsCards />

        {/* Your Reports */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Your Reports</h2>
          <UserIssues />
        </div>

      </div>
    </div>
  )
}
