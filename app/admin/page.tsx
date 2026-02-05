"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navigation/navbar"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { IssueManagement } from "@/components/admin/issue-management"
import { StaffManagement } from "@/components/admin/staff-management"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, FileText, Users, Settings, Shield, Bell, Download } from "lucide-react"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const searchParams = useSearchParams()

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && ["dashboard", "issues", "staff", "settings"].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto p-6">
        {/* Admin Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">Municipality Admin</h1>
              <p className="text-muted-foreground">Manage civic issues and municipal operations</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Alerts (3)
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Reports
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Admin Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="issues" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Issue Management
            </TabsTrigger>
            <TabsTrigger value="staff" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Staff Management
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              System Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <AdminDashboard />
          </TabsContent>

          <TabsContent value="issues">
            <IssueManagement />
          </TabsContent>

          <TabsContent value="staff">
            <StaffManagement />
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">System Settings</h3>
                  <p className="text-muted-foreground">
                    Configure system preferences, notifications, and administrative settings.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
