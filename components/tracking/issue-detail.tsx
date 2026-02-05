"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Calendar,
  User,
  MessageSquare,
  ThumbsUp,
  Share2,
  Flag,
  CheckCircle,
  Clock,
  Wrench,
  Camera,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react"

const issueData = {
  id: "CR-001",
  title: "Large Pothole on Main Street",
  description:
    "There's a significant pothole at the intersection of Main Street and 5th Avenue that's causing damage to vehicles and creating a safety hazard. The hole is approximately 3 feet wide and 8 inches deep. Multiple cars have been damaged, and it's particularly dangerous during rain when it's hard to see.",
  category: "Road Damage",
  priority: "high",
  status: "in-progress",
  location: {
    address: "Main St & 5th Ave, Downtown",
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
  reportedBy: {
    name: "John Doe",
    avatar: "/placeholder.svg?height=40&width=40",
    level: 8,
    reports: 23,
  },
  reportedAt: "2024-01-15T10:30:00Z",
  assignedTo: {
    name: "Mike Johnson",
    department: "Public Works",
    phone: "+1 (555) 123-4567",
    email: "mike.johnson@municipality.gov",
  },
  images: ["/street-pothole.png", "/road-damage-close-up.jpg", "/street-intersection.jpg"],
  likes: 24,
  comments: 8,
  shares: 3,
  estimatedCompletion: "2024-01-20T17:00:00Z",
  lastUpdated: "2024-01-16T14:20:00Z",
}

const timeline = [
  {
    id: 1,
    type: "reported",
    title: "Issue Reported",
    description: "Citizen reported pothole with photos and location details",
    timestamp: "2024-01-15T10:30:00Z",
    user: "John Doe",
    status: "completed",
  },
  {
    id: 2,
    type: "ai-classified",
    title: "AI Classification",
    description: "Issue automatically classified as 'Road Damage' with high priority",
    timestamp: "2024-01-15T10:32:00Z",
    user: "System",
    status: "completed",
  },
  {
    id: 3,
    type: "routed",
    title: "Routed to Department",
    description: "Issue automatically routed to Public Works department",
    timestamp: "2024-01-15T10:35:00Z",
    user: "System",
    status: "completed",
  },
  {
    id: 4,
    type: "assigned",
    title: "Assigned to Staff",
    description: "Issue assigned to Mike Johnson for assessment and repair",
    timestamp: "2024-01-15T14:20:00Z",
    user: "Sarah Wilson (Supervisor)",
    status: "completed",
  },
  {
    id: 5,
    type: "assessment",
    title: "Site Assessment",
    description: "Field assessment completed. Repair materials ordered and crew scheduled.",
    timestamp: "2024-01-16T09:15:00Z",
    user: "Mike Johnson",
    status: "completed",
  },
  {
    id: 6,
    type: "in-progress",
    title: "Repair in Progress",
    description: "Repair crew on-site. Road closure in effect from 8 AM - 5 PM.",
    timestamp: "2024-01-17T08:00:00Z",
    user: "Mike Johnson",
    status: "current",
  },
  {
    id: 7,
    type: "completion",
    title: "Repair Completion",
    description: "Pothole repair completed and road reopened to traffic",
    timestamp: "2024-01-17T16:30:00Z",
    user: "Mike Johnson",
    status: "pending",
  },
  {
    id: 8,
    type: "verification",
    title: "Quality Verification",
    description: "Final inspection and quality verification by supervisor",
    timestamp: "2024-01-18T10:00:00Z",
    user: "Sarah Wilson",
    status: "pending",
  },
]

const comments = [
  {
    id: 1,
    user: {
      name: "Sarah Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Resident",
    },
    content: "Thank you for reporting this! I've also damaged my tire on this pothole. Really hope it gets fixed soon.",
    timestamp: "2024-01-15T12:45:00Z",
    likes: 5,
  },
  {
    id: 2,
    user: {
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Public Works",
    },
    content:
      "We've assessed the site and ordered the necessary materials. Weather permitting, we'll begin repairs tomorrow morning. Expect temporary traffic delays.",
    timestamp: "2024-01-16T16:30:00Z",
    likes: 12,
    isOfficial: true,
  },
  {
    id: 3,
    user: {
      name: "Lisa Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Resident",
    },
    content: "Great to see such quick response! This is exactly why I love using this platform.",
    timestamp: "2024-01-16T18:20:00Z",
    likes: 3,
  },
]

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", progress: 10 },
  assigned: { label: "Assigned", color: "bg-blue-100 text-blue-800", progress: 25 },
  "in-progress": { label: "In Progress", color: "bg-purple-100 text-purple-800", progress: 60 },
  resolved: { label: "Resolved", color: "bg-green-100 text-green-800", progress: 100 },
}

const priorityConfig = {
  low: { color: "bg-green-100 text-green-800" },
  medium: { color: "bg-yellow-100 text-yellow-800" },
  high: { color: "bg-orange-100 text-orange-800" },
  urgent: { color: "bg-red-100 text-red-800" },
}

export function IssueDetail() {
  const [newComment, setNewComment] = useState("")
  const [isLiked, setIsLiked] = useState(false)

  const currentStatus = statusConfig[issueData.status as keyof typeof statusConfig]
  const currentStep = timeline.findIndex((step) => step.status === "current") + 1
  const totalSteps = timeline.length

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleComment = () => {
    if (newComment.trim()) {
      console.log("Adding comment:", newComment)
      setNewComment("")
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-heading font-bold">{issueData.title}</h1>
                <Badge variant="outline">{issueData.id}</Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {issueData.location.address}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(issueData.reportedAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {issueData.reportedBy.name}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={priorityConfig[issueData.priority as keyof typeof priorityConfig].color}>
                {issueData.priority}
              </Badge>
              <Badge className={currentStatus.color}>{currentStatus.label}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>
                  Step {currentStep} of {totalSteps}
                </span>
              </div>
              <Progress value={currentStatus.progress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {currentStatus.progress < 100
                  ? `Estimated completion: ${new Date(issueData.estimatedCompletion).toLocaleDateString()}`
                  : "Issue resolved"}
              </p>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{issueData.description}</p>
            </div>

            {/* Images */}
            <div>
              <h3 className="font-medium mb-2">Photos ({issueData.images.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {issueData.images.map((image, index) => (
                  <div key={index} className="relative group cursor-pointer">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Issue photo ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                      <Camera className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={handleLike} className={isLiked ? "text-red-600" : ""}>
                  <ThumbsUp className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                  {issueData.likes + (isLiked ? 1 : 0)}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {issueData.comments}
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
              <Button variant="ghost" size="sm">
                <Flag className="h-4 w-4 mr-2" />
                Report Issue
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Timeline */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Progress Timeline
              </CardTitle>
              <CardDescription>Track the progress of this issue from report to resolution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline.map((step, index) => {
                  const isCompleted = step.status === "completed"
                  const isCurrent = step.status === "current"
                  const isPending = step.status === "pending"

                  return (
                    <div key={step.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isCompleted
                              ? "bg-green-100 text-green-600"
                              : isCurrent
                                ? "bg-blue-100 text-blue-600"
                                : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : isCurrent ? (
                            <Wrench className="h-4 w-4" />
                          ) : (
                            <Clock className="h-4 w-4" />
                          )}
                        </div>
                        {index < timeline.length - 1 && (
                          <div
                            className={`w-0.5 h-8 ${
                              isCompleted ? "bg-green-200" : isCurrent ? "bg-blue-200" : "bg-gray-200"
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`font-medium ${isCurrent ? "text-blue-600" : ""}`}>{step.title}</h4>
                          <span className="text-xs text-muted-foreground">
                            {new Date(step.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{step.description}</p>
                        <p className="text-xs text-muted-foreground">by {step.user}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Assigned Staff */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Assigned Staff</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{issueData.assignedTo.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{issueData.assignedTo.name}</p>
                    <p className="text-sm text-muted-foreground">{issueData.assignedTo.department}</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Phone className="h-4 w-4 mr-2" />
                    {issueData.assignedTo.phone}
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact via Email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reporter Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reported By</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={issueData.reportedBy.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{issueData.reportedBy.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{issueData.reportedBy.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline" className="text-xs">
                      Level {issueData.reportedBy.level}
                    </Badge>
                    <span>{issueData.reportedBy.reports} reports</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm">{issueData.location.address}</p>
                    <p className="text-xs text-muted-foreground">
                      {issueData.location.coordinates.lat}, {issueData.location.coordinates.lng}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Map
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Comments ({comments.length})
          </CardTitle>
          <CardDescription>Community discussion and official updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Add Comment */}
            <div className="space-y-3">
              <Textarea
                placeholder="Add a comment or ask a question..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px]"
              />
              <div className="flex justify-end">
                <Button onClick={handleComment} disabled={!newComment.trim()}>
                  Post Comment
                </Button>
              </div>
            </div>

            <Separator />

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{comment.user.name}</span>
                      <Badge
                        variant={comment.isOfficial ? "default" : "outline"}
                        className={`text-xs ${comment.isOfficial ? "bg-primary" : ""}`}
                      >
                        {comment.user.role}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">{comment.content}</p>
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {comment.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
