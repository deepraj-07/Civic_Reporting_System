"use client"

import type React from "react"
import { useState, useRef } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Camera,
  MapPin,
  Upload,
  AlertTriangle,
  Lightbulb,
  Trash2,
  Droplets,
  Car,
  Construction,
  TreePine,
  Wifi,
  X,
  CheckCircle,
  Loader2,
  LightbulbIcon,
} from "lucide-react"

const issueCategories = [
  { id: "pothole", label: "Potholes & Road Damage", icon: Car, color: "bg-orange-500" },
  { id: "streetlight", label: "Street Lighting", icon: Lightbulb, color: "bg-yellow-500" },
  { id: "garbage", label: "Garbage & Waste", icon: Trash2, color: "bg-green-600" },
  { id: "water", label: "Water Leakage", icon: Droplets, color: "bg-blue-500" },
  { id: "construction", label: "Construction Issues", icon: Construction, color: "bg-gray-600" },
  { id: "trees", label: "Trees & Vegetation", icon: TreePine, color: "bg-emerald-600" },
  { id: "utilities", label: "Utilities & Infrastructure", icon: Wifi, color: "bg-purple-500" },
  { id: "safety", label: "Safety Concerns", icon: AlertTriangle, color: "bg-red-500" },
  { id: "others", label: "Others", icon: LightbulbIcon, color: "bg-black" }
]

const priorityLevels = [
  { value: "low", label: "Low Priority", color: "bg-green-100 text-green-800" },
  { value: "medium", label: "Medium Priority", color: "bg-yellow-100 text-yellow-800" },
  { value: "high", label: "High Priority", color: "bg-orange-100 text-orange-800" },
  { value: "urgent", label: "Urgent", color: "bg-red-100 text-red-800" },
]

export function ReportForm() {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedPriority, setSelectedPriority] = useState<string>("")
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [description, setDescription] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [aiDetection, setAiDetection] = useState<string>("")
  const [step, setStep] = useState(1)
  const [latitude, setLatitude] = useState<string>("")
  const [longitude, setLongitude] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      const newImages = Array.from(files).slice(0, 3 - uploadedImages.length)
      setUploadedImages((prev) => [...prev, ...newImages])

      // Simulate AI analysis
      if (newImages.length > 0) {
        setIsAnalyzing(true)
        setTimeout(() => {
          const detectedCategory = issueCategories[Math.floor(Math.random() * issueCategories.length)]
          setAiDetection(detectedCategory.id)
          setSelectedCategory(detectedCategory.id)
          setIsAnalyzing(false)
        }, 2000)
      }
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          setLocation({ lat, lng })
          setLatitude(lat.toString())
          setLongitude(lng.toString())
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      // Backend expects single field name "image"
      if (uploadedImages[0]) {
        formData.append("image", uploadedImages[0])
      }
      formData.append("title", selectedCategory || "Issue Report")
      formData.append("description", description)
      if (latitude) formData.append("latitude", latitude)
      if (longitude) formData.append("longitude", longitude)
      // Optional: address could be added if you have it

      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

      await axios.post(
        "http://localhost:5000/api/issues",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      )

      setStep(4)
    } catch (err) {
      console.error("Error submitting report:", err)
      alert("Something went wrong submitting your report")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setStep(1)
    setSelectedCategory("")
    setSelectedPriority("")
    setUploadedImages([])
    setLocation(null)
    setAiDetection("")
    setLatitude("")
    setLongitude("")
  }

  if (step === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold mb-2">Report Submitted!</h2>
            <p className="text-muted-foreground mb-4">
              Your issue has been reported and will be reviewed by the appropriate authorities.
            </p>
            <div className="space-y-2 mb-6">
              <Badge variant="outline" className="text-sm">
                Report ID: #CR-{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </Badge>
              <p className="text-sm text-muted-foreground">
                You'll receive updates via email and can track progress in your dashboard.
              </p>
            </div>
            <Button onClick={resetForm} className="w-full">
              Report Another Issue
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-heading font-bold text-foreground">Report an Issue</h1>
          <p className="text-muted-foreground">Help improve your community by reporting civic issues</p>
          <Progress value={(step / 3) * 100} className="w-full max-w-md mx-auto" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Photo Upload */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Upload Photos
                </CardTitle>
                <CardDescription>
                  Take or upload photos of the issue. Our AI will help identify the problem type.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-24 flex-col gap-2 bg-transparent"
                    onClick={() => cameraInputRef.current?.click()}
                  >
                    <Camera className="h-6 w-6" />
                    Take Photo
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-24 flex-col gap-2 bg-transparent"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-6 w-6" />
                    Upload Photo
                  </Button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleImageUpload(e.target.files)}
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e.target.files)}
                />

                {uploadedImages.length > 0 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(image) || "/placeholder.svg"}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-20 object-cover rounded-md"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    {isAnalyzing && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        AI is analyzing your photos...
                      </div>
                    )}

                    {aiDetection && (
                      <div className="p-3 bg-primary/10 rounded-md">
                        <p className="text-sm font-medium text-primary">
                          AI Detection: Issue appears to be related to{" "}
                          {issueCategories.find((cat) => cat.id === aiDetection)?.label}
                        </p>
                      </div>
                    )}

                    <Button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full"
                      disabled={uploadedImages.length === 0}
                    >
                      Continue to Details
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 2: Issue Details */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Issue Details</CardTitle>
                <CardDescription>Provide more information about the issue you're reporting.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Issue Category</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {issueCategories.map((category) => {
                      const Icon = category.icon
                      return (
                        <Button
                          key={category.id}
                          type="button"
                          variant={selectedCategory === category.id ? "default" : "outline"}
                          className="h-auto p-3 flex-col gap-2"
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="text-xs text-center">{category.label}</span>
                        </Button>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority level" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityLevels.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${priority.color.split(" ")[0]}`} />
                            {priority.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the issue in detail..."
                    className="min-h-[100px]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="latitude" className="text-sm">Latitude</Label>
                      <Input
                        id="latitude"
                        type="number"
                        step="any"
                        placeholder="Enter latitude"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="longitude" className="text-sm">Longitude</Label>
                      <Input
                        id="longitude"
                        type="number"
                        step="any"
                        placeholder="Enter longitude"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button type="button" variant="outline" onClick={getCurrentLocation} className="w-full">
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Current Location
                  </Button>
                </div>

                <Button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-full"
                  disabled={!selectedCategory || !selectedPriority}
                >
                  Review & Submit
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Review Your Report</CardTitle>
                <CardDescription>Please review your report before submitting.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Category:</span>
                    <Badge variant="secondary">
                      {issueCategories.find((cat) => cat.id === selectedCategory)?.label}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-medium">Priority:</span>
                    <Badge className={priorityLevels.find((p) => p.value === selectedPriority)?.color}>
                      {priorityLevels.find((p) => p.value === selectedPriority)?.label}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-medium">Photos:</span>
                    <span className="text-sm text-muted-foreground">{uploadedImages.length} uploaded</span>
                  </div>

                  {location && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Location:</span>
                      <span className="text-sm text-muted-foreground">GPS coordinates captured</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                    Back to Edit
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Report"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </div>
    </div>
  )
}
