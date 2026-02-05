"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Filter, Eye, Navigation, Layers } from "lucide-react"

const mapIssues = [
  {
    id: "CR-001",
    title: "Large Pothole",
    category: "Road Damage",
    priority: "high",
    status: "in-progress",
    location: { lat: 40.7128, lng: -74.006, address: "Main St & 5th Ave" },
    reportedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "CR-002",
    title: "Broken Street Light",
    category: "Street Lighting",
    priority: "medium",
    status: "assigned",
    location: { lat: 40.7589, lng: -73.9851, address: "Oak Park" },
    reportedAt: "2024-01-14T08:15:00Z",
  },
  {
    id: "CR-003",
    title: "Garbage Overflow",
    category: "Waste Management",
    priority: "urgent",
    status: "resolved",
    location: { lat: 40.7505, lng: -73.9934, address: "Central Plaza" },
    reportedAt: "2024-01-13T16:45:00Z",
  },
]

const statusConfig = {
  pending: { color: "bg-yellow-500", label: "Pending" },
  assigned: { color: "bg-blue-500", label: "Assigned" },
  "in-progress": { color: "bg-purple-500", label: "In Progress" },
  resolved: { color: "bg-green-500", label: "Resolved" },
}

export function IssueMap() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Community Map</h1>
          <p className="text-muted-foreground">View and track civic issues in your neighborhood</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Issues</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Map */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Interactive Map
              </CardTitle>
              <CardDescription>Click on markers to view issue details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative bg-muted rounded-lg h-[500px] flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Navigation className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">Interactive map would be integrated here</p>
                  <p className="text-sm text-muted-foreground">Showing {mapIssues.length} issues in your area</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4">
                  {Object.entries(statusConfig).map(([status, config]) => (
                    <div key={status} className="flex items-center gap-2 text-sm">
                      <div className={`w-3 h-3 rounded-full ${config.color}`} />
                      <span>{config.label}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm">
                  <Layers className="h-4 w-4 mr-2" />
                  Map Layers
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Issue List */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Nearby Issues</CardTitle>
              <CardDescription>Issues in your current area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mapIssues.map((issue) => (
                  <div key={issue.id} className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            statusConfig[issue.status as keyof typeof statusConfig].color
                          }`}
                        />
                        <span className="font-medium text-sm">{issue.title}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <div className="flex items-center gap-1 mb-1">
                          <MapPin className="h-3 w-3" />
                          {issue.location.address}
                        </div>
                        <div>{issue.category}</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {issue.id}
                        </Badge>
                        <Button variant="ghost" size="sm" className="h-6 text-xs">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
