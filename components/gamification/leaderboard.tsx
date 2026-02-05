"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Medal, Award, Crown, Star, TrendingUp, Calendar, Users, Target } from "lucide-react"

const leaderboardData = {
  weekly: [
    {
      rank: 1,
      name: "Sarah Johnson",
      points: 450,
      reports: 8,
      resolved: 6,
      streak: 12,
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "Community Champion",
      level: 12,
    },
    {
      rank: 2,
      name: "Mike Chen",
      points: 380,
      reports: 6,
      resolved: 5,
      streak: 8,
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "Issue Hunter",
      level: 10,
    },
    {
      rank: 3,
      name: "Lisa Rodriguez",
      points: 320,
      reports: 5,
      resolved: 4,
      streak: 6,
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "Civic Hero",
      level: 9,
    },
    {
      rank: 4,
      name: "David Park",
      points: 280,
      reports: 4,
      resolved: 3,
      streak: 4,
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "Problem Solver",
      level: 8,
    },
    {
      rank: 5,
      name: "Emma Wilson",
      points: 240,
      reports: 3,
      resolved: 3,
      streak: 5,
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "Speed Reporter",
      level: 7,
    },
  ],
  monthly: [
    {
      rank: 1,
      name: "Sarah Johnson",
      points: 1850,
      reports: 32,
      resolved: 28,
      streak: 12,
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "Community Champion",
      level: 12,
    },
    {
      rank: 2,
      name: "Mike Chen",
      points: 1620,
      reports: 28,
      resolved: 24,
      streak: 8,
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "Issue Hunter",
      level: 10,
    },
    {
      rank: 3,
      name: "David Park",
      points: 1480,
      reports: 25,
      resolved: 22,
      streak: 4,
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "Problem Solver",
      level: 8,
    },
  ],
  allTime: [
    {
      rank: 1,
      name: "Mike Chen",
      points: 15750,
      reports: 187,
      resolved: 162,
      streak: 8,
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "Legend",
      level: 15,
    },
    {
      rank: 2,
      name: "Sarah Johnson",
      points: 14200,
      reports: 165,
      resolved: 148,
      streak: 12,
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "Community Champion",
      level: 12,
    },
    {
      rank: 3,
      name: "Lisa Rodriguez",
      points: 12800,
      reports: 152,
      resolved: 135,
      streak: 6,
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "Civic Hero",
      level: 11,
    },
  ],
}

const communityStats = {
  totalMembers: 3456,
  activeThisWeek: 892,
  totalReports: 12847,
  totalResolved: 9234,
  averageResponseTime: "2.4 hours",
}

const challenges = [
  {
    id: "weekly-goal",
    title: "Weekly Community Goal",
    description: "Report 100 issues as a community this week",
    progress: 73,
    target: 100,
    reward: "500 bonus points for all participants",
    timeLeft: "3 days",
    participants: 45,
  },
  {
    id: "resolution-challenge",
    title: "Resolution Challenge",
    description: "Achieve 90% resolution rate this month",
    progress: 87,
    target: 90,
    reward: "Special 'Efficiency Expert' badge",
    timeLeft: "12 days",
    participants: 128,
  },
]

const rankColors = {
  1: "from-yellow-400 to-yellow-600",
  2: "from-gray-300 to-gray-500",
  3: "from-amber-400 to-amber-600",
}

const rankIcons = {
  1: Crown,
  2: Medal,
  3: Award,
}

export function Leaderboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("weekly")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const currentData = leaderboardData[selectedPeriod as keyof typeof leaderboardData]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-heading font-bold text-foreground">Community Leaderboard</h1>
        <p className="text-muted-foreground">Celebrating our most active civic contributors</p>
      </div>

      {/* Community Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">{communityStats.totalMembers.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Members</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{communityStats.activeThisWeek}</div>
                <div className="text-sm text-muted-foreground">Active This Week</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{communityStats.totalReports.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Reports</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">{communityStats.averageResponseTime}</div>
                <div className="text-sm text-muted-foreground">Avg Response</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Community Challenges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Community Challenges
          </CardTitle>
          <CardDescription>Work together to achieve community goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="p-4 rounded-lg border bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium">{challenge.title}</h3>
                    <p className="text-sm text-muted-foreground">{challenge.description}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>
                        {challenge.progress} / {challenge.target}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground">{challenge.participants} participants</span>
                      <span className="text-muted-foreground">{challenge.timeLeft} left</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {challenge.reward}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Top Contributors
          </CardTitle>
          <CardDescription>Rankings based on community contributions and impact</CardDescription>
          <div className="flex gap-4 pt-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">This Week</SelectItem>
                <SelectItem value="monthly">This Month</SelectItem>
                <SelectItem value="allTime">All Time</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="roads">Road Issues</SelectItem>
                <SelectItem value="lighting">Street Lighting</SelectItem>
                <SelectItem value="waste">Waste Management</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentData.map((user, index) => {
              const RankIcon = rankIcons[user.rank as keyof typeof rankIcons] || Star
              const isTopThree = user.rank <= 3
              return (
                <div
                  key={user.name}
                  className={`p-4 rounded-lg border ${
                    isTopThree
                      ? "bg-gradient-to-r " + rankColors[user.rank as keyof typeof rankColors] + " text-white"
                      : "bg-muted/20"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          isTopThree ? "bg-white/20" : "bg-primary text-primary-foreground"
                        }`}
                      >
                        {user.rank <= 3 ? <RankIcon className="h-4 w-4" /> : user.rank}
                      </div>
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{user.name}</h3>
                        <Badge
                          variant={isTopThree ? "secondary" : "outline"}
                          className={`text-xs ${isTopThree ? "bg-white/20 text-white border-white/30" : ""}`}
                        >
                          Level {user.level}
                        </Badge>
                        <Badge
                          variant={isTopThree ? "secondary" : "outline"}
                          className={`text-xs ${isTopThree ? "bg-white/20 text-white border-white/30" : ""}`}
                        >
                          {user.badge}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="font-medium">{user.points.toLocaleString()}</div>
                          <div className={`text-xs ${isTopThree ? "text-white/70" : "text-muted-foreground"}`}>
                            Points
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">{user.reports}</div>
                          <div className={`text-xs ${isTopThree ? "text-white/70" : "text-muted-foreground"}`}>
                            Reports
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">{user.resolved}</div>
                          <div className={`text-xs ${isTopThree ? "text-white/70" : "text-muted-foreground"}`}>
                            Resolved
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">{user.streak} days</div>
                          <div className={`text-xs ${isTopThree ? "text-white/70" : "text-muted-foreground"}`}>
                            Streak
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
