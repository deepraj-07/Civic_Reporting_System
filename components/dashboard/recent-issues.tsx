"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, MapPin, User, CheckCircle, AlertCircle, Wrench, Eye, MessageSquare, ThumbsUp } from "lucide-react"

const recentIssues = [
  {
    id: "CR-001",
    title: "Pothole on Main Street",
    category: "Road Damage",
    priority: "high",
    status: "in-progress",
    location: "Main St & 5th Ave",
    reportedBy: "John Doe",
    reportedAt: "2 hours ago",
    description: "Large pothole causing traffic issues",
    likes: 12,
    comments: 3,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "CR-002",
    title: "Broken Street Light",
    category: "Street Lighting",
    priority: "medium",
    status: "pending",
    location: "Oak Park",
    reportedBy: "Sarah Wilson",
    reportedAt: "4 hours ago",
    description: "Street light not working, safety concern",
    likes: 8,
    comments: 1,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "CR-003",
    title: "Garbage Overflow",
    category: "Waste Management",
    priority: "urgent",
    status: "resolved",
    location: "Central Plaza",
    reportedBy: "Mike Johnson",
    reportedAt: "1 day ago",
    description: "Overflowing garbage bins attracting pests",
    likes: 15,
    comments: 5,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "CR-004",
    title: "Water Leak",
    category: "Water Infrastructure",
    priority: "high",
    status: "assigned",
    location: "Elm Street",
    reportedBy: "Lisa Chen",
    reportedAt: "6 hours ago",
    description: "Water leak near fire hydrant",
    likes: 6,
    comments: 2,
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  "in-progress": { label: "In Progress", color: "bg-blue-100 text-blue-800", icon: Wrench },
  assigned: { label: "Assigned", color: "bg-purple-100 text-purple-800", icon: User },
  resolved: { label: "Resolved", color: "bg-green-100 text-green-800", icon: CheckCircle },
}

const priorityConfig = {
  low: { color: "bg-green-100 text-green-800" },
  medium: { color: "bg-yellow-100 text-yellow-800" },
  high: { color: "bg-orange-100 text-orange-800" },
  urgent: { color: "bg-red-100 text-red-800" },
}

export function RecentIssues() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Recent Issues
        </CardTitle>
        <CardDescription>Latest reports from your community</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentIssues.map((issue) => {
            const StatusIcon = statusConfig[issue.status as keyof typeof statusConfig].icon
            return (
              <div key={issue.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm">{issue.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {issue.id}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{issue.description}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Badge className={statusConfig[issue.status as keyof typeof statusConfig].color}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {statusConfig[issue.status as keyof typeof statusConfig].label}
                    </Badge>
                    <Badge className={priorityConfig[issue.priority as keyof typeof priorityConfig].color}>
                      {issue.priority}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Avatar className="h-4 w-4">
                        <AvatarImage src={issue.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{issue.reportedBy.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{issue.reportedBy}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{issue.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{issue.reportedAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{issue.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      <span>{issue.comments}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-6 text-xs">
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-4 text-center">
          <Button variant="outline" className="w-full bg-transparent">
            View All Issues
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
