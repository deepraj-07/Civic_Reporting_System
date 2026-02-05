"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Camera, Crown, Shield, Flame, CheckCircle, Zap, Users } from "lucide-react"

const featuredAchievements = [
  {
    id: "community-champion",
    title: "Community Champion",
    description: "Report 25 issues that get resolved by authorities",
    icon: Crown,
    rarity: "legendary",
    points: 500,
    holders: 23,
    difficulty: "Very Hard",
  },
  {
    id: "streak-master",
    title: "Streak Master",
    description: "Maintain a 10-day consecutive reporting streak",
    icon: Flame,
    rarity: "epic",
    points: 300,
    holders: 67,
    difficulty: "Hard",
  },
  {
    id: "civic-hero",
    title: "Civic Hero",
    description: "Reach level 15 in community engagement",
    icon: Shield,
    rarity: "epic",
    points: 400,
    holders: 45,
    difficulty: "Hard",
  },
  {
    id: "speed-reporter",
    title: "Speed Reporter",
    description: "Report 5 issues in a single day",
    icon: Zap,
    rarity: "rare",
    points: 150,
    holders: 156,
    difficulty: "Medium",
  },
  {
    id: "problem-solver",
    title: "Problem Solver",
    description: "Have 50 reports successfully resolved",
    icon: CheckCircle,
    rarity: "rare",
    points: 200,
    holders: 89,
    difficulty: "Medium",
  },
  {
    id: "first-reporter",
    title: "First Reporter",
    description: "Submit your first civic issue report",
    icon: Camera,
    rarity: "common",
    points: 50,
    holders: 2847,
    difficulty: "Easy",
  },
]

const rarityConfig = {
  common: {
    color: "bg-gray-100 text-gray-800",
    border: "border-gray-300",
    gradient: "from-gray-100 to-gray-200",
  },
  rare: {
    color: "bg-blue-100 text-blue-800",
    border: "border-blue-300",
    gradient: "from-blue-100 to-blue-200",
  },
  epic: {
    color: "bg-purple-100 text-purple-800",
    border: "border-purple-300",
    gradient: "from-purple-100 to-purple-200",
  },
  legendary: {
    color: "bg-yellow-100 text-yellow-800",
    border: "border-yellow-300",
    gradient: "from-yellow-100 to-yellow-200",
  },
}

const difficultyConfig = {
  Easy: { color: "bg-green-100 text-green-800" },
  Medium: { color: "bg-yellow-100 text-yellow-800" },
  Hard: { color: "bg-orange-100 text-orange-800" },
  "Very Hard": { color: "bg-red-100 text-red-800" },
}

export function AchievementsShowcase() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-heading font-bold text-foreground">Achievement Gallery</h1>
        <p className="text-muted-foreground">Discover all the badges you can earn through civic participation</p>
      </div>

      {/* Achievement Categories */}
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              All Achievements
            </CardTitle>
            <CardDescription>Complete civic actions to unlock these badges and earn points</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featuredAchievements.map((achievement) => {
                const Icon = achievement.icon
                const rarity = rarityConfig[achievement.rarity as keyof typeof rarityConfig]
                const difficulty = difficultyConfig[achievement.difficulty as keyof typeof difficultyConfig]

                return (
                  <div
                    key={achievement.id}
                    className={`p-6 rounded-lg border-2 ${rarity.border} bg-gradient-to-br ${rarity.gradient} hover:shadow-lg transition-all cursor-pointer`}
                  >
                    <div className="space-y-4">
                      {/* Icon and Title */}
                      <div className="flex items-start gap-3">
                        <div className="p-3 bg-white/50 rounded-lg">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-lg">{achievement.title}</h3>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={rarity.color}>{achievement.rarity}</Badge>
                            <Badge className={difficulty.color}>{achievement.difficulty}</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed">{achievement.description}</p>

                      {/* Stats */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/20">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            <span className="font-medium">{achievement.points} pts</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span className="text-muted-foreground">{achievement.holders} earned</span>
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

        {/* Achievement Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                <div>
                  <div className="text-2xl font-bold">24</div>
                  <div className="text-sm text-muted-foreground">Total Achievements</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-muted-foreground">Legendary Badges</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">3,456</div>
                  <div className="text-sm text-muted-foreground">Badge Holders</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">45,200</div>
                  <div className="text-sm text-muted-foreground">Points Awarded</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
