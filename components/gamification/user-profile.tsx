"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  Star,
  Award,
  Target,
  Calendar,
  MapPin,
  TrendingUp,
  CheckCircle,
  Clock,
  Camera,
  Zap,
  Crown,
  Medal,
  Shield,
  Flame,
} from "lucide-react"

const userStats = {
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  joinDate: "2023-06-15",
  avatar: "/placeholder.svg?height=80&width=80",
  level: 12,
  currentXP: 2450,
  nextLevelXP: 3000,
  totalPoints: 15750,
  rank: 3,
  totalReports: 47,
  resolvedReports: 38,
  streak: 12,
  badges: 15,
}

const achievements = [
  {
    id: "first-report",
    title: "First Reporter",
    description: "Submit your first civic issue report",
    icon: Camera,
    earned: true,
    earnedDate: "2023-06-16",
    rarity: "common",
    points: 50,
  },
  {
    id: "community-champion",
    title: "Community Champion",
    description: "Report 25 issues that get resolved",
    icon: Crown,
    earned: true,
    earnedDate: "2023-11-20",
    rarity: "legendary",
    points: 500,
  },
  {
    id: "streak-master",
    title: "Streak Master",
    description: "Maintain a 10-day reporting streak",
    icon: Flame,
    earned: true,
    earnedDate: "2023-12-01",
    rarity: "epic",
    points: 300,
  },
  {
    id: "problem-solver",
    title: "Problem Solver",
    description: "Have 50 reports successfully resolved",
    icon: CheckCircle,
    earned: false,
    progress: 38,
    target: 50,
    rarity: "rare",
    points: 200,
  },
  {
    id: "civic-hero",
    title: "Civic Hero",
    description: "Reach level 15 in community engagement",
    icon: Shield,
    earned: false,
    progress: 12,
    target: 15,
    rarity: "epic",
    points: 400,
  },
  {
    id: "speed-reporter",
    title: "Speed Reporter",
    description: "Report 5 issues in a single day",
    icon: Zap,
    earned: true,
    earnedDate: "2023-10-15",
    rarity: "rare",
    points: 150,
  },
]

const recentActivity = [
  {
    type: "report",
    title: "Reported pothole on Main Street",
    points: 25,
    date: "2024-01-15T10:30:00Z",
    status: "resolved",
  },
  {
    type: "achievement",
    title: "Earned 'Streak Master' badge",
    points: 300,
    date: "2024-01-14T16:45:00Z",
    badge: "Streak Master",
  },
  {
    type: "level",
    title: "Reached Level 12",
    points: 100,
    date: "2024-01-13T09:20:00Z",
  },
  {
    type: "report",
    title: "Reported broken streetlight",
    points: 25,
    date: "2024-01-12T14:15:00Z",
    status: "in-progress",
  },
]

const rarityConfig = {
  common: { color: "bg-gray-100 text-gray-800", border: "border-gray-300" },
  rare: { color: "bg-blue-100 text-blue-800", border: "border-blue-300" },
  epic: { color: "bg-purple-100 text-purple-800", border: "border-purple-300" },
  legendary: { color: "bg-yellow-100 text-yellow-800", border: "border-yellow-300" },
}

export function UserProfile() {
  const progressToNextLevel = (userStats.currentXP / userStats.nextLevelXP) * 100
  const earnedAchievements = achievements.filter((a) => a.earned)
  const inProgressAchievements = achievements.filter((a) => !a.earned)

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={userStats.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl">{userStats.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                {userStats.level}
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-heading font-bold">{userStats.name}</h1>
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                    <Crown className="h-3 w-3 mr-1" />
                    Rank #{userStats.rank}
                  </Badge>
                </div>
                <p className="text-muted-foreground">
                  Community member since {new Date(userStats.joinDate).toLocaleDateString()}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{userStats.totalPoints.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{userStats.resolvedReports}</div>
                  <div className="text-sm text-muted-foreground">Issues Resolved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{userStats.streak}</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{userStats.badges}</div>
                  <div className="text-sm text-muted-foreground">Badges Earned</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Level {userStats.level} Progress</span>
                  <span>
                    {userStats.currentXP} / {userStats.nextLevelXP} XP
                  </span>
                </div>
                <Progress value={progressToNextLevel} className="h-3" />
                <p className="text-xs text-muted-foreground">
                  {userStats.nextLevelXP - userStats.currentXP} XP needed for Level {userStats.level + 1}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different sections */}
      <Tabs defaultValue="achievements" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-6">
          {/* Earned Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Earned Achievements ({earnedAchievements.length})
              </CardTitle>
              <CardDescription>Badges you've unlocked through your civic contributions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {earnedAchievements.map((achievement) => {
                  const Icon = achievement.icon
                  const rarity = rarityConfig[achievement.rarity as keyof typeof rarityConfig]
                  return (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg border-2 ${rarity.border} bg-gradient-to-br from-background to-muted/20`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-sm">{achievement.title}</h3>
                            <Badge className={rarity.color}>{achievement.rarity}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">
                              Earned {new Date(achievement.earnedDate!).toLocaleDateString()}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              +{achievement.points} pts
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* In Progress Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                In Progress ({inProgressAchievements.length})
              </CardTitle>
              <CardDescription>Achievements you're working towards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {inProgressAchievements.map((achievement) => {
                  const Icon = achievement.icon
                  const rarity = rarityConfig[achievement.rarity as keyof typeof rarityConfig]
                  const progress =
                    achievement.progress && achievement.target ? (achievement.progress / achievement.target) * 100 : 0
                  return (
                    <div key={achievement.id} className="p-4 rounded-lg border bg-muted/20">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-muted rounded-lg">
                          <Icon className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-sm">{achievement.title}</h3>
                            <Badge className={rarity.color}>{achievement.rarity}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3">{achievement.description}</p>
                          {achievement.progress && achievement.target && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span>Progress</span>
                                <span>
                                  {achievement.progress} / {achievement.target}
                                </span>
                              </div>
                              <Progress value={progress} className="h-2" />
                            </div>
                          )}
                          <div className="mt-2 text-right">
                            <Badge variant="outline" className="text-xs">
                              +{achievement.points} pts
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest contributions and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {activity.type === "report" && <MapPin className="h-4 w-4 text-primary" />}
                      {activity.type === "achievement" && <Award className="h-4 w-4 text-primary" />}
                      {activity.type === "level" && <Star className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{activity.title}</p>
                        <Badge variant="outline" className="text-xs">
                          +{activity.points} pts
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.date).toLocaleDateString()} at {new Date(activity.date).toLocaleTimeString()}
                      </p>
                      {activity.status && (
                        <Badge
                          className={`mt-1 text-xs ${
                            activity.status === "resolved"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {activity.status}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Resolution Rate</span>
                  <div className="flex items-center gap-2">
                    <Progress value={(userStats.resolvedReports / userStats.totalReports) * 100} className="w-20 h-2" />
                    <span className="text-sm font-medium">
                      {Math.round((userStats.resolvedReports / userStats.totalReports) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Community Impact</span>
                  <Badge variant="secondary">High</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Avg Response Time</span>
                  <span className="text-sm font-medium">2.3 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Most Active Category</span>
                  <Badge variant="outline">Road Damage</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Medal className="h-5 w-5" />
                  Milestones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">First report submitted</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">10 reports milestone</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Level 10 reached</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">50 reports milestone (12 to go)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Level 15 (3 levels to go)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
