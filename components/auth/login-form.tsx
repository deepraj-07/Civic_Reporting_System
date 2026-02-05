"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Award } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth"

export function LoginForm() {
  const router = useRouter()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [activeTab, setActiveTab] = useState("citizen")

  // Form state for login
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  // Form state for signup
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/"

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // First, check the user's role by making a login request
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: loginData.email,
        password: loginData.password
      }, {
        withCredentials: true
      })

      const userRole = response.data.user.role

      // Validate role access based on active tab
      if (activeTab === "citizen" && userRole !== "USER") {
        toast.error("Access denied. This login is for citizens only.")
        setIsLoading(false)
        return
      }

      if (activeTab === "municipality" && userRole !== "ADMIN") {
        toast.error("Access denied. This login is for municipality staff only.")
        setIsLoading(false)
        return
      }

      // If role validation passes, use the auth context login
      await login(loginData.email, loginData.password)
      toast.success("Login successful!")
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Login failed. Please try again."
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords match
    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password
      }, {
        withCredentials: true
      })

      toast.success("Account created successfully!")
      setIsSignUp(false) // Switch back to login
      setSignupData({ name: "", email: "", password: "", confirmPassword: "" }) // Clear form
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Signup failed. Please try again."
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-heading font-bold text-foreground">CivicReport</h1>
          </div>
          <p className="text-muted-foreground">Join your community in making a difference</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="citizen" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Citizen
            </TabsTrigger>
            <TabsTrigger value="municipality" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Municipality
            </TabsTrigger>
          </TabsList>

          <TabsContent value="citizen">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl font-heading">
                  {isSignUp ? "Citizen Sign Up" : "Citizen Login"}
                </CardTitle>
                <CardDescription>
                  {isSignUp
                    ? "Join the community and start making a difference"
                    : "Report issues and track your community impact"
                  }
                </CardDescription>
                <div className="flex gap-2 pt-2">
                  <Badge variant="secondary" className="text-xs">
                    <Award className="h-3 w-3 mr-1" />
                    Earn Points
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Track Issues
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {isSignUp ? (
                  <form onSubmit={handleSignUpSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="John Doe"
                        value={signupData.name}
                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a strong password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                      <Input
                        id="signup-confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                )}
                <div className="mt-4 text-center">
                  <Button
                    variant="link"
                    className="text-sm"
                    onClick={() => setIsSignUp(!isSignUp)}
                  >
                    {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="municipality">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl font-heading">Municipality Login</CardTitle>
                <CardDescription>Manage and resolve community issues efficiently</CardDescription>
                <div className="flex gap-2 pt-2">
                  <Badge variant="secondary" className="text-xs">
                    Admin Access
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Issue Management
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLoginSubmit} className="space-y-4">

                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="admin@municipality.gov"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Access Dashboard"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm text-muted-foreground">
          <p>Secure authentication powered by modern encryption</p>
        </div>
      </div>
    </div>
  )
}
