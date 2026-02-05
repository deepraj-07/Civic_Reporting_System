"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserPlus, MoreHorizontal, Edit, Trash2, Mail, Phone, CheckCircle, Clock, AlertTriangle } from "lucide-react"

const mockStaff = [
  {
    id: "1",
    name: "Mike Johnson",
    email: "mike.johnson@municipality.gov",
    phone: "+1 (555) 123-4567",
    department: "Electrical",
    role: "Senior Technician",
    status: "active",
    assignedIssues: 5,
    completedIssues: 23,
    joinDate: "2023-01-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Sarah Wilson",
    email: "sarah.wilson@municipality.gov",
    phone: "+1 (555) 234-5678",
    department: "Public Works",
    role: "Field Supervisor",
    status: "active",
    assignedIssues: 8,
    completedIssues: 45,
    joinDate: "2022-08-20",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "David Park",
    email: "david.park@municipality.gov",
    phone: "+1 (555) 345-6789",
    department: "Sanitation",
    role: "Team Lead",
    status: "active",
    assignedIssues: 3,
    completedIssues: 67,
    joinDate: "2021-03-10",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Lisa Rodriguez",
    email: "lisa.rodriguez@municipality.gov",
    phone: "+1 (555) 456-7890",
    department: "Water & Sewer",
    role: "Inspector",
    status: "on-leave",
    assignedIssues: 0,
    completedIssues: 34,
    joinDate: "2023-06-01",
    avatar: "/placeholder.svg?height=40&width=40",
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

const roles = ["Technician", "Senior Technician", "Field Supervisor", "Team Lead", "Inspector", "Manager", "Director"]

const statusConfig = {
  active: { label: "Active", color: "bg-green-100 text-green-800", icon: CheckCircle },
  "on-leave": { label: "On Leave", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  inactive: { label: "Inactive", color: "bg-gray-100 text-gray-800", icon: AlertTriangle },
}

export function StaffManagement() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  const filteredStaff = mockStaff.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === "all" || staff.department === departmentFilter
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold">Staff Management</h2>
          <p className="text-muted-foreground">Manage municipality staff and assignments</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Staff Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
              <DialogDescription>Add a new staff member to the municipality team</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input placeholder="Enter full name" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="email@municipality.gov" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input placeholder="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select>
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
                  <Label>Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select defaultValue="active">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="on-leave">On Leave</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Add Staff Member</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Search Staff</Label>
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger>
                  <SelectValue />
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

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Members ({filteredStaff.length})</CardTitle>
          <CardDescription>Manage all municipality staff members</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff Member</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Workload</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((staff) => {
                const StatusIcon = statusConfig[staff.status as keyof typeof statusConfig].icon
                return (
                  <TableRow key={staff.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={staff.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{staff.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {staff.email}
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {staff.phone}
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{staff.department}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{staff.role}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusConfig[staff.status as keyof typeof statusConfig].color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusConfig[staff.status as keyof typeof statusConfig].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{staff.assignedIssues} active</div>
                        <div className="text-muted-foreground">{staff.completedIssues} completed</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">
                          {staff.completedIssues > 0
                            ? Math.round((staff.completedIssues / (staff.completedIssues + staff.assignedIssues)) * 100)
                            : 0}
                          %
                        </div>
                        <div className="text-muted-foreground">efficiency</div>
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
                          <DropdownMenuItem onClick={() => setSelectedStaff(staff)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove Staff
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
    </div>
  )
}
