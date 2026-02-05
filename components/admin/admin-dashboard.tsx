"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { CheckCircle, Clock, TrendingUp, TrendingDown, Calendar, UserCheck } from "lucide-react"

const adminStats = [
  {
    title: "Pending Reviews",
    value: "23",
    change: "+5",
    trend: "up",
    description: "Awaiting assignment",
    icon: Clock,
    color: "text-yellow-600",
  },
  {
    title: "Active Staff",
    value: "12",
    change: "+2",
    trend: "up",
    description: "Currently assigned",
    icon: UserCheck,
    color: "text-blue-600",
  },
  {
    title: "Resolved Today",
    value: "8",
    change: "+3",
    trend: "up",
    description: "Issues completed",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Avg Response Time",
    value: "2.4h",
    change: "-0.3h",
    trend: "down",
    description: "Time to assignment",
    icon: Calendar,
    color: "text-purple-600",
  },
]

const departmentPerformance = [
  { department: "Public Works", assigned: 45, completed: 38, efficiency: 84 },
  { department: "Electrical", assigned: 23, completed: 21, efficiency: 91 },
  { department: "Sanitation", assigned: 34, completed: 29, efficiency: 85 },
  { department: "Water & Sewer", assigned: 18, completed: 16, efficiency: 89 },
  { department: "Transportation", assigned: 12, completed: 10, efficiency: 83 },
]

const issuesByCategory = [
  { name: "Road Damage", value: 35, color: "#f97316" },
  { name: "Street Lighting", value: 25, color: "#eab308" },
  { name: "Waste Management", value: 20, color: "#22c55e" },
  { name: "Water Issues", value: 12, color: "#3b82f6" },
  { name: "Safety Concerns", value: 8, color: "#ef4444" },
]

const responseTimeData = [
  { day: "Mon", avgHours: 2.1 },
  { day: "Tue", avgHours: 1.8 },
  { day: "Wed", avgHours: 2.5 },
  { day: "Thu", avgHours: 2.2 },
  { day: "Fri", avgHours: 1.9 },
  { day: "Sat", avgHours: 3.2 },
  { day: "Sun", avgHours: 2.8 },
]

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-heading font-bold">Admin Dashboard</h2>
        <p className="text-muted-foreground">Municipality operations overview and performance metrics</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {adminStats.map((stat) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
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

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Department Performance */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Efficiency and workload by department</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="assigned" fill="hsl(var(--primary))" name="Assigned" />
                  <Bar dataKey="completed" fill="hsl(var(--chart-2))" name="Completed" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Issue Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Issue Distribution</CardTitle>
            <CardDescription>Issues by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={issuesByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {issuesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {issuesByCategory.map((category) => (
                <div key={category.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                    <span>{category.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {category.value}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Efficiency Details */}
      <Card>
        <CardHeader>
          <CardTitle>Department Efficiency</CardTitle>
          <CardDescription>Detailed performance metrics by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departmentPerformance.map((dept) => (
              <div key={dept.department} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{dept.department}</span>
                    <Badge variant="outline" className="text-xs">
                      {dept.assigned} assigned
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {dept.completed}/{dept.assigned} completed
                    </span>
                    <Badge
                      className={
                        dept.efficiency >= 85 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {dept.efficiency}%
                    </Badge>
                  </div>
                </div>
                <Progress value={dept.efficiency} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Response Time Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Response Time Trend</CardTitle>
          <CardDescription>Average time from report to assignment by day</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} hours`, "Avg Response Time"]} />
              <Line type="monotone" dataKey="avgHours" stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center">
            <Badge variant="secondary">Target: Under 2 hours</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
