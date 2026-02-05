"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Eye,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  Wrench,
  AlertTriangle,
  TrendingUp,
  FileText,
  Star,
} from "lucide-react"

const myReports = [
  {
    id: "CR-001",
    title: "Large Pothole on Main Street",
    category: "Road Damage",
    priority: "high",
    status: "in-progress",
    location: "Main St & 5th Ave",
    reportedAt: "2024-01-15T10:30:00Z",
    lastUpdate: "2024-01-17T08:00:00Z",
    progress: 60,
    likes: 24,
    comments: 8,
    estimatedCompletion: "2024-01-20T17:00:00Z",
    assignedTo: "Mike Johnson",
    department: "Public Works",
  },
  {
    id: "CR-045",
    title: "Broken Street Light",
    category: "Street Lighting",
    priority: "medium",
    status: "resolved",
    location: "Oak Park",
    reportedAt: "2024-01-10T14:20:00Z",
    lastUpdate: "2024-01-14T16:30:00Z",
    progress: 100,
    likes: 12,
    comments: 3,
    resolvedAt: "2024-01-14T16:30:00Z",
    assignedTo: "Lisa Chen",
    department: "Electrical",
    resolutionTime: "4 days",
  },
  {
    id: "CR-032",
    title: "Overflowing Garbage Bin",
    category: "Waste Management",
    priority: "medium",
    status: "assigned",
    location: "Central Plaza",
    reportedAt: "2024-01-12T09:15:00Z",
    lastUpdate: "2024-01-13T11:00:00Z",
    progress: 25,
    likes: 8,
    comments: 2,
    estimatedCompletion: "2024-01-18T12:00:00Z",
    assignedTo: "David Park",
    department: "Sanitation",
  },
  {
    id: "CR-028",
    title: "Water Leak Near Fire Hydrant",
    category: "Water Infrastructure",
    priority: "urgent",
    status: "pending",
    location: "Elm Street",
    reportedAt: "2024-01-16T16:45:00Z",
    lastUpdate: "2024-01-16T16:45:00Z",
    progress: 10,
    likes: 15,
    comments: 5,
    estimatedCompletion: "2024-01-19T10:00:00Z",
  },
]

const userStats = {
  totalReports: 47,
  resolvedReports: 38,
  pendingReports: 9,
  averageResolutionTime: "3.2 days",
  totalPoints: 2450,
  currentStreak: 12,
}

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  assigned: { label: "Assigned", color: "bg-blue-100 text-blue-800", icon: AlertTriangle },
  "in-progress": { label: "In Progress", color: "bg-purple-100 text-purple-800", icon: Wrench },
  resolved: { label: "Resolved", color: "bg-green-100 text-green-800", icon: CheckCircle },
}

const priorityConfig = {
  low: { color: "bg-green-100 text-green-800" },
  medium: { color: "bg-yellow-100 text-yellow-800" },
  high: { color: "bg-orange-100 text-orange-800" },
  urgent: { color: "bg-red-100 text-red-800" },
}

export function MyReports() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filteredReports = myReports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    const matchesPriority = priorityFilter === "all" || report.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">My Reports</h1>
        <p className="text-muted-foreground">Track the progress of your civic issue reports</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">{userStats.totalReports}</div>
                <div className="text-sm text-muted-foreground">Total Reports</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{userStats.resolvedReports}</div>
                <div className="text-sm text-muted-foreground">Resolved</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">{userStats.pendingReports}</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{userStats.averageResolutionTime}</div>
                <div className="text-sm text-muted-foreground">Avg Resolution</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => {
          const StatusIcon = statusConfig[report.status as keyof typeof statusConfig].icon
          return (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-lg">{report.title}</h3>
                        <Badge variant="outline">{report.id}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {report.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(report.reportedAt).toLocaleDateString()}
                        </div>
                        <span>{report.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={priorityConfig[report.priority as keyof typeof priorityConfig].color}>
                        {report.priority}
                      </Badge>
                      <Badge className={statusConfig[report.status as keyof typeof statusConfig].color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusConfig[report.status as keyof typeof statusConfig].label}
                      </Badge>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{report.progress}% complete</span>
                    </div>
                    <Progress value={report.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Last updated: {new Date(report.lastUpdate).toLocaleDateString()}</span>
                      {report.status === "resolved" ? (
                        <span>Resolved in {report.resolutionTime}</span>
                      ) : (
                        <span>Est. completion: {new Date(report.estimatedCompletion!).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>

                  {/* Assignment Info */}
                  {report.assignedTo && (
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Assigned to:</span>
                        <span className="font-medium">{report.assignedTo}</span>
                        <Badge variant="outline" className="text-xs">
                          {report.department}
                        </Badge>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        {report.likes} likes
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {report.comments} comments
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredReports.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No reports found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== "all" || priorityFilter !== "all"
                  ? "Try adjusting your filters to see more results."
                  : "You haven't reported any issues yet."}
              </p>
              <Button>Report Your First Issue</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
