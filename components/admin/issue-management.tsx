"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  UserPlus,
  CheckCircle,
  Clock,
  MapPin,
  Download,
  RefreshCw,
} from "lucide-react"

const mockIssues = [
  {
    id: "CR-001",
    title: "Pothole on Main Street",
    category: "Road Damage",
    priority: "high",
    status: "pending",
    location: "Main St & 5th Ave",
    reportedBy: "John Doe",
    reportedAt: "2024-01-15T10:30:00Z",
    assignedTo: null,
    department: null,
    description: "Large pothole causing traffic issues and potential vehicle damage",
    images: 2,
    likes: 12,
    comments: 3,
  },
  {
    id: "CR-002",
    title: "Broken Street Light",
    category: "Street Lighting",
    priority: "medium",
    status: "assigned",
    location: "Oak Park",
    reportedBy: "Sarah Wilson",
    reportedAt: "2024-01-15T08:15:00Z",
    assignedTo: "Mike Johnson",
    department: "Electrical",
    description: "Street light not working, creating safety concerns for pedestrians",
    images: 1,
    likes: 8,
    comments: 1,
  },
  {
    id: "CR-003",
    title: "Garbage Overflow",
    category: "Waste Management",
    priority: "urgent",
    status: "in-progress",
    location: "Central Plaza",
    reportedBy: "Lisa Chen",
    reportedAt: "2024-01-14T16:45:00Z",
    assignedTo: "David Park",
    department: "Sanitation",
    description: "Overflowing garbage bins attracting pests and creating health hazards",
    images: 3,
    likes: 15,
    comments: 5,
  },
]

const departments = [
  "Public Works",
  "Electrical",
  "Sanitation",
  "Water & Sewer",
  "Parks & Recreation",
  "Transportation",
  "Building & Safety",
]

const staff = [
  { id: "1", name: "Mike Johnson", department: "Electrical" },
  { id: "2", name: "David Park", department: "Sanitation" },
  { id: "3", name: "Lisa Rodriguez", department: "Public Works" },
  { id: "4", name: "Tom Wilson", department: "Water & Sewer" },
]

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  assigned: { label: "Assigned", color: "bg-blue-100 text-blue-800", icon: UserPlus },
  "in-progress": { label: "In Progress", color: "bg-purple-100 text-purple-800", icon: RefreshCw },
  resolved: { label: "Resolved", color: "bg-green-100 text-green-800", icon: CheckCircle },
}

const priorityConfig = {
  low: { color: "bg-green-100 text-green-800" },
  medium: { color: "bg-yellow-100 text-yellow-800" },
  high: { color: "bg-orange-100 text-orange-800" },
  urgent: { color: "bg-red-100 text-red-800" },
}

export function IssueManagement() {
  const [selectedIssues, setSelectedIssues] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedIssue, setSelectedIssue] = useState<any>(null)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIssues(mockIssues.map((issue) => issue.id))
    } else {
      setSelectedIssues([])
    }
  }

  const handleSelectIssue = (issueId: string, checked: boolean) => {
    if (checked) {
      setSelectedIssues([...selectedIssues, issueId])
    } else {
      setSelectedIssues(selectedIssues.filter((id) => id !== issueId))
    }
  }

  const handleBulkAssign = () => {
    console.log("Bulk assign issues:", selectedIssues)
  }

  const handleBulkStatusUpdate = () => {
    console.log("Bulk status update:", selectedIssues)
  }

  const filteredIssues = mockIssues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter
    const matchesPriority = priorityFilter === "all" || issue.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold">Issue Management</h2>
          <p className="text-muted-foreground">Review, assign, and track civic issues</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Search Issues</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
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
              <Label>Priority</Label>
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
            <div className="space-y-2">
              <Label>Department</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedIssues.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{selectedIssues.length} issue(s) selected</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleBulkAssign}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Bulk Assign
                </Button>
                <Button variant="outline" size="sm" onClick={handleBulkStatusUpdate}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Update Status
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Issues Table */}
      <Card>
        <CardHeader>
          <CardTitle>Issues ({filteredIssues.length})</CardTitle>
          <CardDescription>Manage and track all reported civic issues</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox checked={selectedIssues.length === mockIssues.length} onCheckedChange={handleSelectAll} />
                </TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Reported</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIssues.map((issue) => {
                const StatusIcon = statusConfig[issue.status as keyof typeof statusConfig].icon
                return (
                  <TableRow key={issue.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedIssues.includes(issue.id)}
                        onCheckedChange={(checked) => handleSelectIssue(issue.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{issue.title}</span>
                          <Badge variant="outline" className="text-xs">
                            {issue.id}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {issue.location}
                          </div>
                          <span>{issue.category}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusConfig[issue.status as keyof typeof statusConfig].color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusConfig[issue.status as keyof typeof statusConfig].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={priorityConfig[issue.priority as keyof typeof priorityConfig].color}>
                        {issue.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {issue.assignedTo ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">{issue.assignedTo.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{issue.assignedTo}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">Unassigned</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {issue.department ? (
                        <Badge variant="secondary" className="text-xs">
                          {issue.department}
                        </Badge>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        {new Date(issue.reportedAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => setSelectedIssue(issue)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Issue
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <UserPlus className="h-4 w-4 mr-2" />
                            Assign Staff
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark Resolved
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Issue Detail Dialog */}
      <Dialog open={!!selectedIssue} onOpenChange={() => setSelectedIssue(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Issue Details</DialogTitle>
            <DialogDescription>Review and manage issue #{selectedIssue?.id}</DialogDescription>
          </DialogHeader>
          {selectedIssue && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={selectedIssue.title} readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input value={selectedIssue.category} readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select defaultValue={selectedIssue.priority}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select defaultValue={selectedIssue.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="assigned">Assigned</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Assign to Department</Label>
                  <Select defaultValue={selectedIssue.department || ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Assign to Staff</Label>
                  <Select defaultValue={selectedIssue.assignedTo || ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select staff member" />
                    </SelectTrigger>
                    <SelectContent>
                      {staff.map((member) => (
                        <SelectItem key={member.id} value={member.name}>
                          {member.name} ({member.department})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={selectedIssue.description} readOnly className="min-h-[100px]" />
              </div>
              <div className="space-y-2">
                <Label>Admin Notes</Label>
                <Textarea placeholder="Add internal notes about this issue..." className="min-h-[80px]" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedIssue(null)}>
                  Cancel
                </Button>
                <Button>Update Issue</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
