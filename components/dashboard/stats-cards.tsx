"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Clock, CheckCircle, AlertTriangle, Users, MapPin } from "lucide-react"

const statsData = [
  {
    title: "Total Reports",
    value: "1,247",
    change: "+12%",
    trend: "up",
    description: "This month",
    icon: MapPin,
  },
  {
    title: "Resolved Issues",
    value: "892",
    change: "+8%",
    trend: "up",
    description: "71% resolution rate",
    icon: CheckCircle,
  },
  {
    title: "Pending Issues",
    value: "234",
    change: "-5%",
    trend: "down",
    description: "Average 3.2 days",
    icon: Clock,
  },
  {
    title: "Active Citizens",
    value: "3,456",
    change: "+18%",
    trend: "up",
    description: "Community members",
    icon: Users,
  },
]

const priorityStats = [
  { label: "Urgent", count: 12, color: "bg-red-500", percentage: 15 },
  { label: "High", count: 45, color: "bg-orange-500", percentage: 35 },
  { label: "Medium", count: 89, color: "bg-yellow-500", percentage: 40 },
  { label: "Low", count: 88, color: "bg-green-500", percentage: 10 },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat) => {
        const Icon = stat.icon
        const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <div className={`flex items-center ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  <TrendIcon className="h-3 w-3 mr-1" />
                  {stat.change}
                </div>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export function PriorityBreakdown() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Issues by Priority
        </CardTitle>
        <CardDescription>Current distribution of issue priorities</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {priorityStats.map((priority) => (
          <div key={priority.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${priority.color}`} />
                <span className="text-sm font-medium">{priority.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{priority.count}</span>
                <Badge variant="outline" className="text-xs">
                  {priority.percentage}%
                </Badge>
              </div>
            </div>
            <Progress value={priority.percentage} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
