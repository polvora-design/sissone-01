"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Home,
  User,
  Plus,
  Eye,
  Users,
  Calendar,
  BarChart3,
  ArrowLeft,
  Star,
  Clock,
  MapPin,
  DollarSign,
  Menu,
  X,
} from "lucide-react"

type Screen =
  | "dashboard"
  | "profile"
  | "create-event"
  | "event-preview"
  | "interested-students"
  | "scheduled-students"
  | "analytics"

export default function SissoneResponsivePrototype() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    time: "",
    price: "",
    description: "",
  })

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen)
    setSidebarOpen(false) // Close mobile sidebar after navigation
  }

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "create-event", label: "Create Class", icon: Plus },
    { id: "scheduled-students", label: "Students", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ]

  const renderSidebar = () => (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "#F5F0EB", borderRight: "1px solid #E5D6CD" }}
      >
        {/* Logo Section */}
        <div className="p-6 border-b" style={{ borderColor: "#E5D6CD" }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="w-32 h-8 rounded mb-2" style={{ backgroundColor: "#E5D6CD" }}>
                <div className="flex items-center justify-center h-full text-sm font-bold" style={{ color: "#3D2C2E" }}>
                  SISSONE
                </div>
              </div>
              <p className="text-xs" style={{ color: "#3D2C2E" }}>
                For those who want to learn, teach, and live dance
              </p>
            </div>
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" style={{ color: "#3D2C2E" }} />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = currentScreen === item.id
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`w-full justify-start h-12 px-4 ${isActive ? "font-medium" : ""}`}
                  onClick={() => navigateTo(item.id as Screen)}
                  style={{
                    backgroundColor: isActive ? "#CFB2A8" : "transparent",
                    color: "#3D2C2E",
                  }}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Button>
              )
            })}
          </div>
        </nav>

        {/* Quick Stats in Sidebar (Desktop only) */}
        <div className="hidden lg:block p-4 mt-8">
          <h3 className="text-sm font-semibold mb-3" style={{ color: "#3D2C2E" }}>
            Quick Stats
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs" style={{ color: "#3D2C2E" }}>
                Active Classes
              </span>
              <span className="text-sm font-bold" style={{ color: "#3D2C2E" }}>
                12
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs" style={{ color: "#3D2C2E" }}>
                Total Students
              </span>
              <span className="text-sm font-bold" style={{ color: "#3D2C2E" }}>
                48
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs" style={{ color: "#3D2C2E" }}>
                Rating
              </span>
              <span className="text-sm font-bold" style={{ color: "#3D2C2E" }}>
                4.8
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  const renderHeader = (title: string, showBack = true) => (
    <div className="flex items-center justify-between p-4 lg:p-6 border-b" style={{ borderColor: "#E5D6CD" }}>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
          <Menu className="w-5 h-5" style={{ color: "#3D2C2E" }} />
        </Button>
        {showBack && (
          <Button variant="ghost" size="sm" onClick={() => navigateTo("dashboard")} className="lg:hidden">
            <ArrowLeft className="w-4 h-4" style={{ color: "#3D2C2E" }} />
          </Button>
        )}
        <h1 className="text-lg lg:text-2xl font-semibold" style={{ color: "#3D2C2E" }}>
          {title}
        </h1>
      </div>
    </div>
  )

  const renderDashboard = () => (
    <div className="p-4 lg:p-6">
      {/* Welcome Section - Desktop only */}
      <div className="hidden lg:block mb-8">
        <h2 className="text-xl font-semibold mb-2" style={{ color: "#3D2C2E" }}>
          Welcome back, Instructor!
        </h2>
        <p className="text-sm" style={{ color: "#3D2C2E" }}>
          Here's what's happening with your classes today.
        </p>
      </div>

      {/* Stats Grid - Responsive */}
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
        <Card style={{ backgroundColor: "#E5D6CD" }} className="hover:shadow-md transition-shadow">
          <CardContent className="p-3 lg:p-6 text-center">
            <div className="text-lg lg:text-3xl font-bold" style={{ color: "#3D2C2E" }}>
              12
            </div>
            <div className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
              Active Classes
            </div>
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: "#E5D6CD" }} className="hover:shadow-md transition-shadow">
          <CardContent className="p-3 lg:p-6 text-center">
            <div className="text-lg lg:text-3xl font-bold" style={{ color: "#3D2C2E" }}>
              48
            </div>
            <div className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
              Students
            </div>
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: "#E5D6CD" }} className="hover:shadow-md transition-shadow">
          <CardContent className="p-3 lg:p-6 text-center">
            <div className="text-lg lg:text-3xl font-bold" style={{ color: "#3D2C2E" }}>
              4.8
            </div>
            <div className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
              Rating
            </div>
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: "#E5D6CD" }} className="hover:shadow-md transition-shadow hidden lg:block">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold" style={{ color: "#3D2C2E" }}>
              $2.4k
            </div>
            <div className="text-sm" style={{ color: "#3D2C2E" }}>
              This Month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <h2 className="text-sm lg:text-base font-semibold mb-3 lg:mb-4" style={{ color: "#3D2C2E" }}>
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
            <Button
              variant="outline"
              className="h-16 lg:h-20 flex flex-col gap-1 bg-transparent hover:shadow-md transition-all"
              onClick={() => navigateTo("create-event")}
              style={{ borderColor: "#CFB2A8", backgroundColor: "#F5F0EB" }}
            >
              <Plus className="w-5 h-5 lg:w-6 lg:h-6" style={{ color: "#3D2C2E" }} />
              <span className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                New Class
              </span>
            </Button>
            <Button
              variant="outline"
              className="h-16 lg:h-20 flex flex-col gap-1 bg-transparent hover:shadow-md transition-all"
              onClick={() => navigateTo("scheduled-students")}
              style={{ borderColor: "#CFB2A8", backgroundColor: "#F5F0EB" }}
            >
              <Users className="w-5 h-5 lg:w-6 lg:h-6" style={{ color: "#3D2C2E" }} />
              <span className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                Students
              </span>
            </Button>
            <Button
              variant="outline"
              className="h-16 lg:h-20 flex flex-col gap-1 bg-transparent hover:shadow-md transition-all lg:block hidden"
              onClick={() => navigateTo("analytics")}
              style={{ borderColor: "#CFB2A8", backgroundColor: "#F5F0EB" }}
            >
              <BarChart3 className="w-6 h-6" style={{ color: "#3D2C2E" }} />
              <span className="text-sm" style={{ color: "#3D2C2E" }}>
                Analytics
              </span>
            </Button>
          </div>
        </div>

        {/* Recent Classes */}
        <div className="lg:col-span-2">
          <h2 className="text-sm lg:text-base font-semibold mb-3 lg:mb-4" style={{ color: "#3D2C2E" }}>
            Recent Classes
          </h2>
          <div className="space-y-3 lg:space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} style={{ backgroundColor: "#E5D6CD" }} className="hover:shadow-md transition-shadow">
                <CardContent className="p-3 lg:p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm lg:text-base font-medium" style={{ color: "#3D2C2E" }}>
                        Beginner Ballet Class {i}
                      </h3>
                      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4 mt-1">
                        <p className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                          Today, 6:00 PM
                        </p>
                        <p className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                          8 students enrolled
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => navigateTo("event-preview")}
                        className="hover:bg-white/50"
                      >
                        <Eye className="w-4 h-4" style={{ color: "#3D2C2E" }} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderProfile = () => (
    <div className="p-4 lg:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="space-y-6 lg:space-y-8">
          {/* Profile Image */}
          <div className="text-center">
            <div className="w-24 h-24 lg:w-32 lg:h-32 mx-auto rounded-full" style={{ backgroundColor: "#E5D6CD" }}>
              <div className="flex items-center justify-center h-full">
                <User className="w-8 h-8 lg:w-12 lg:h-12" style={{ color: "#3D2C2E" }} />
              </div>
            </div>
            <Button variant="ghost" size="sm" className="mt-2 hover:bg-white/50">
              <span style={{ color: "#CFB2A8" }}>Change Photo</span>
            </Button>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div className="lg:col-span-2">
              <Label htmlFor="school-name" className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                School/Instructor Name
              </Label>
              <Input
                id="school-name"
                placeholder="Enter name"
                className="mt-1 h-10 lg:h-12"
                style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
              />
            </div>

            <div className="lg:col-span-2">
              <Label htmlFor="bio" className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                Bio
              </Label>
              <Textarea
                id="bio"
                placeholder="Tell students about yourself..."
                rows={4}
                className="mt-1"
                style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
              />
            </div>

            <div>
              <Label htmlFor="location" className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                Location
              </Label>
              <Input
                id="location"
                placeholder="City, State"
                className="mt-1 h-10 lg:h-12"
                style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
              />
            </div>

            <div>
              <Label htmlFor="specialties" className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                Dance Specialties
              </Label>
              <Input
                id="specialties"
                placeholder="Ballet, Jazz, Hip-hop..."
                className="mt-1 h-10 lg:h-12"
                style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
              />
            </div>
          </div>

          <Button
            className="w-full lg:w-auto lg:px-8 h-10 lg:h-12"
            style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}
          >
            Save Profile
          </Button>
        </div>
      </div>
    </div>
  )

  const renderCreateEvent = () => (
    <div className="p-4 lg:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="space-y-4 lg:space-y-6">
          <div>
            <Label htmlFor="title" className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
              Class Title
            </Label>
            <Input
              id="title"
              placeholder="e.g., Beginner Ballet"
              value={eventData.title}
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
              className="mt-1 h-10 lg:h-12"
              style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
            />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            <div>
              <Label htmlFor="date" className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={eventData.date}
                onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                className="mt-1 h-10 lg:h-12"
                style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
              />
            </div>
            <div>
              <Label htmlFor="time" className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                Time
              </Label>
              <Input
                id="time"
                type="time"
                value={eventData.time}
                onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
                className="mt-1 h-10 lg:h-12"
                style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
              />
            </div>
            <div>
              <Label htmlFor="price" className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                Price ($)
              </Label>
              <Input
                id="price"
                placeholder="25.00"
                value={eventData.price}
                onChange={(e) => setEventData({ ...eventData, price: e.target.value })}
                className="mt-1 h-10 lg:h-12"
                style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Class details, requirements, what to bring..."
              rows={4}
              value={eventData.description}
              onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
              className="mt-1"
              style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() => navigateTo("event-preview")}
              className="lg:flex-1 h-10 lg:h-12"
              style={{ borderColor: "#CFB2A8", color: "#3D2C2E" }}
            >
              Preview
            </Button>
            <Button className="lg:flex-1 h-10 lg:h-12" style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}>
              Save Draft
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderEventPreview = () => (
    <div className="p-4 lg:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Class Image */}
          <div className="w-full h-48 lg:h-64 rounded-lg" style={{ backgroundColor: "#E5D6CD" }}>
            <div className="flex items-center justify-center h-full text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
              Class Image Placeholder
            </div>
          </div>

          {/* Class Details */}
          <div className="space-y-4 lg:space-y-6">
            <h1 className="text-xl lg:text-3xl font-bold" style={{ color: "#3D2C2E" }}>
              {eventData.title || "Beginner Ballet Class"}
            </h1>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 lg:w-5 lg:h-5" style={{ color: "#CFB2A8" }} />
                <span className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                  {eventData.date || "March 15, 2024"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 lg:w-5 lg:h-5" style={{ color: "#CFB2A8" }} />
                <span className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                  {eventData.time || "6:00 PM"} - 7:30 PM
                </span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 lg:w-5 lg:h-5" style={{ color: "#CFB2A8" }} />
                <span className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                  Studio A
                </span>
              </div>

              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 lg:w-5 lg:h-5" style={{ color: "#CFB2A8" }} />
                <span className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                  ${eventData.price || "25.00"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 lg:w-5 lg:h-5" style={{ color: "#CFB2A8" }} />
                <span className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                  4.8 rating
                </span>
              </div>
            </div>

            <div className="space-y-3 lg:space-y-4">
              <Button className="w-full h-10 lg:h-12" style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}>
                Publish Class
              </Button>
              <Button
                variant="outline"
                className="w-full h-10 lg:h-12 bg-transparent"
                onClick={() => navigateTo("create-event")}
                style={{ borderColor: "#CFB2A8", color: "#3D2C2E" }}
              >
                Edit Class
              </Button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 lg:mt-8">
          <h3 className="font-semibold mb-2 lg:mb-3 text-base lg:text-lg" style={{ color: "#3D2C2E" }}>
            Description
          </h3>
          <p className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
            {eventData.description ||
              "Perfect for beginners looking to learn the fundamentals of ballet. We'll cover basic positions, movements, and terminology in a supportive environment."}
          </p>
        </div>
      </div>
    </div>
  )

  const renderStudentsList = (title: string, isScheduled = false) => (
    <div className="p-4 lg:p-6">
      <div className="max-w-4xl mx-auto">
        {isScheduled && (
          <div className="mb-6">
            <h2 className="text-base lg:text-lg font-semibold" style={{ color: "#3D2C2E" }}>
              Today's Classes
            </h2>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {isScheduled
            ? ["Beginner Ballet - 6:00 PM", "Jazz Fundamentals - 8:00 PM"].map((className, idx) => (
                <Card key={idx} style={{ backgroundColor: "#E5D6CD" }} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                      {className}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 lg:space-y-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center justify-between py-1">
                          <div className="flex items-center gap-2 lg:gap-3">
                            <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full" style={{ backgroundColor: "#CFB2A8" }}>
                              <div className="flex items-center justify-center h-full">
                                <User className="w-3 h-3 lg:w-4 lg:h-4" style={{ color: "#3D2C2E" }} />
                              </div>
                            </div>
                            <span className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                              Student {i}
                            </span>
                          </div>
                          <span
                            className="text-xs lg:text-sm px-2 py-1 rounded"
                            style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}
                          >
                            Confirmed
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            : [1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} style={{ backgroundColor: "#E5D6CD" }} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-3 lg:p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full" style={{ backgroundColor: "#CFB2A8" }}>
                          <div className="flex items-center justify-center h-full">
                            <User className="w-5 h-5 lg:w-6 lg:h-6" style={{ color: "#3D2C2E" }} />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm lg:text-base font-medium" style={{ color: "#3D2C2E" }}>
                            Student {i}
                          </h3>
                          <p className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                            Interested in Beginner Ballet
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" style={{ color: "#CFB2A8" }} />
                        <span className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                          4.{i}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="p-4 lg:p-6">
      <div className="max-w-6xl mx-auto space-y-6 lg:space-y-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
          <Card style={{ backgroundColor: "#E5D6CD" }} className="hover:shadow-md transition-shadow">
            <CardContent className="p-3 lg:p-6 text-center">
              <div className="text-2xl lg:text-3xl font-bold" style={{ color: "#3D2C2E" }}>
                156
              </div>
              <div className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                Total Check-ins
              </div>
              <div className="text-xs lg:text-sm" style={{ color: "#CFB2A8" }}>
                +12% this week
              </div>
            </CardContent>
          </Card>
          <Card style={{ backgroundColor: "#E5D6CD" }} className="hover:shadow-md transition-shadow">
            <CardContent className="p-3 lg:p-6 text-center">
              <div className="text-2xl lg:text-3xl font-bold" style={{ color: "#3D2C2E" }}>
                4.8
              </div>
              <div className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                Avg Rating
              </div>
              <div className="text-xs lg:text-sm" style={{ color: "#CFB2A8" }}>
                24 reviews
              </div>
            </CardContent>
          </Card>
          <Card style={{ backgroundColor: "#E5D6CD" }} className="hover:shadow-md transition-shadow hidden lg:block">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold" style={{ color: "#3D2C2E" }}>
                $2.4k
              </div>
              <div className="text-sm" style={{ color: "#3D2C2E" }}>
                Revenue
              </div>
              <div className="text-sm" style={{ color: "#CFB2A8" }}>
                This month
              </div>
            </CardContent>
          </Card>
          <Card style={{ backgroundColor: "#E5D6CD" }} className="hover:shadow-md transition-shadow hidden lg:block">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold" style={{ color: "#3D2C2E" }}>
                92%
              </div>
              <div className="text-sm" style={{ color: "#3D2C2E" }}>
                Attendance
              </div>
              <div className="text-sm" style={{ color: "#CFB2A8" }}>
                Average
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Peak Hours Chart */}
          <Card style={{ backgroundColor: "#E5D6CD" }} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                Peak Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32 lg:h-48 flex items-end justify-between gap-1">
                {[20, 35, 45, 60, 80, 65, 40].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t transition-all hover:opacity-80"
                    style={{
                      height: `${height}%`,
                      backgroundColor: "#CFB2A8",
                      minHeight: "8px",
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Feedback */}
          <Card style={{ backgroundColor: "#E5D6CD" }} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                Recent Feedback
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 lg:space-y-4">
              {[
                { rating: 5, comment: "Amazing class! Great instructor." },
                { rating: 4, comment: "Really enjoyed the session." },
                { rating: 5, comment: "Perfect for beginners like me." },
              ].map((feedback, i) => (
                <div key={i} className="border-b pb-2 lg:pb-3" style={{ borderColor: "#CFB2A8" }}>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        className="w-3 h-3 lg:w-4 lg:h-4"
                        style={{
                          color: starIdx < feedback.rating ? "#CFB2A8" : "#E5D6CD",
                          fill: starIdx < feedback.rating ? "#CFB2A8" : "none",
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                    {feedback.comment}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#F5F0EB" }}>
      {/* Sidebar */}
      <div className="hidden lg:block">{renderSidebar()}</div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">{renderSidebar()}</div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        {/* Header */}
        {currentScreen === "dashboard" && renderHeader("Dashboard", false)}
        {currentScreen === "profile" && renderHeader("Profile")}
        {currentScreen === "create-event" && renderHeader("Create Class")}
        {currentScreen === "event-preview" && renderHeader("Class Preview")}
        {currentScreen === "interested-students" && renderHeader("Interested Students")}
        {currentScreen === "scheduled-students" && renderHeader("Scheduled Students")}
        {currentScreen === "analytics" && renderHeader("Analytics")}

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {currentScreen === "dashboard" && renderDashboard()}
          {currentScreen === "profile" && renderProfile()}
          {currentScreen === "create-event" && renderCreateEvent()}
          {currentScreen === "event-preview" && renderEventPreview()}
          {currentScreen === "interested-students" && renderStudentsList("Interested Students")}
          {currentScreen === "scheduled-students" && renderStudentsList("Scheduled Students", true)}
          {currentScreen === "analytics" && renderAnalytics()}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 flex justify-around p-4 border-t"
        style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
      >
        {navigationItems.slice(0, 4).map((item) => {
          const Icon = item.icon
          return (
            <Button key={item.id} variant="ghost" size="sm" onClick={() => navigateTo(item.id as Screen)}>
              <Icon className="w-5 h-5" style={{ color: currentScreen === item.id ? "#CFB2A8" : "#3D2C2E" }} />
            </Button>
          )
        })}
      </div>
    </div>
  )
}
