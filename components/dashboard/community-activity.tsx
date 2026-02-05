"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Award, Users, Target, Zap } from "lucide-react"

const topContributors = [
  {
    name: "Sarah Johnson",
    reports: 23,
    resolved: 18,
    points: 1250,
    badge: "Community Champion",
    avatar: "/placeholder.svg?height=40&width=40",
    rank: 1,
  },
  {
    name: "Mike Chen",
    reports: 19,
    resolved: 15,
    points: 980,
    badge: "Issue Hunter",
    avatar: "/placeholder.svg?height=40&width=40",
    rank: 2,
  },
  {
    name: "Lisa Rodriguez",
    reports: 16,
    resolved: 14,
    points: 850,
    badge: "Civic Hero",
    avatar: "/placeholder.svg?height=40&width=40",
    rank: 3,
  },
  {
    name: "David Park",
    reports: 12,
    resolved: 10,
    points: 720,
    badge: "Problem Solver",
    avatar: "/placeholder.svg?height=40&width=40",
    rank: 4,
  },
]

const communityGoals = [
  {
    title: "Monthly Resolution Target",
    current: 892,
    target: 1000,
    percentage: 89,
    icon: Target,
    color: "bg-blue-500",
  },
  {
    title: "Community Engagement",
    current: 3456,
    target: 4000,
    percentage: 86,
    icon: Users,
    color: "bg-green-500",
  },
  {
    title: "Response Time Goal",
    current: 28,
    target: 24,
    percentage: 75,
    icon: Zap,
    color: "bg-orange-500",
    unit: "hrs",
  },
]

const rankColors = {
  1: "text-yellow-600",
  2: "text-gray-500",
  3: "text-amber-600",
}

export function TopContributors() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Top Contributors
        </CardTitle>
        <CardDescription>Most active community members this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topContributors.map((contributor) => (
            <div key={contributor.name} className="flex items-center gap-3 p-3 rounded-lg border">
              <div className="flex items-center gap-3 flex-1">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={contributor.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -top-1 -right-1 w-5 h-5 rounded-full bg-background border-2 border-background flex items-center justify-center text-xs font-bold ${
                      rankColors[contributor.rank as keyof typeof rankColors] || "text-muted-foreground"
                    }`}
                  >
                    {contributor.rank}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm truncate">{contributor.name}</p>
                    <Badge variant="secondary" className="text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      {contributor.points}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{contributor.reports} reports</span>
                    <span>{contributor.resolved} resolved</span>
                  </div>
                  <Badge variant="outline" className="text-xs mt-1">
                    {contributor.badge}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function CommunityGoals() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          Community Goals
        </CardTitle>
        <CardDescription>Progress towards monthly targets</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {communityGoals.map((goal) => {
          const Icon = goal.icon
          return (
            <div key={goal.title} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-1 rounded ${goal.color} text-white`}>
                    <Icon className="h-3 w-3" />
                  </div>
                  <span className="text-sm font-medium">{goal.title}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {goal.percentage}%
                </Badge>
              </div>
              <Progress value={goal.percentage} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>
                  {goal.current} {goal.unit || ""}
                </span>
                <span>
                  Target: {goal.target} {goal.unit || ""}
                </span>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
