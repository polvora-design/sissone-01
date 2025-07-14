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
} from "lucide-react"

type Screen =
  | "dashboard"
  | "profile"
  | "create-event"
  | "event-preview"
  | "interested-students"
  | "scheduled-students"
  | "analytics"

export default function SissonePrototype() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard")
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    time: "",
    price: "",
    description: "",
  })

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen)
  }

  const renderHeader = (title: string, showBack = true) => (
    <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "#E5D6CD" }}>
      {showBack ? (
        <Button variant="ghost" size="sm" onClick={() => navigateTo("dashboard")} className="p-2">
          <ArrowLeft className="w-4 h-4" style={{ color: "#3D2C2E" }} />
        </Button>
      ) : (
        <div className="w-8" />
      )}
      <h1 className="text-lg font-semibold" style={{ color: "#3D2C2E" }}>
        {title}
      </h1>
      <div className="w-8" />
    </div>
  )

  const renderBottomNav = () => (
    <div
      className="fixed bottom-0 left-0 right-0 flex justify-around p-4 border-t"
      style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
    >
      <Button variant="ghost" size="sm" onClick={() => navigateTo("dashboard")}>
        <Home className="w-5 h-5" style={{ color: currentScreen === "dashboard" ? "#CFB2A8" : "#3D2C2E" }} />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => navigateTo("profile")}>
        <User className="w-5 h-5" style={{ color: currentScreen === "profile" ? "#CFB2A8" : "#3D2C2E" }} />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => navigateTo("create-event")}>
        <Plus className="w-5 h-5" style={{ color: currentScreen === "create-event" ? "#CFB2A8" : "#3D2C2E" }} />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => navigateTo("analytics")}>
        <BarChart3 className="w-5 h-5" style={{ color: currentScreen === "analytics" ? "#CFB2A8" : "#3D2C2E" }} />
      </Button>
    </div>
  )

  const renderDashboard = () => (
    <div className="pb-20">
      {renderHeader("Dashboard", false)}

      {/* Logo Placeholder */}
      <div className="p-4 text-center">
        <div className="w-24 h-12 mx-auto mb-2 rounded" style={{ backgroundColor: "#E5D6CD" }}>
          <div className="flex items-center justify-center h-full text-sm" style={{ color: "#3D2C2E" }}>
            SISSONE
          </div>
        </div>
        <p className="text-xs" style={{ color: "#3D2C2E" }}>
          For those who want to learn, teach, and live dance
        </p>
      </div>

      {/* Quick Stats */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <Card style={{ backgroundColor: "#E5D6CD" }}>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold" style={{ color: "#3D2C2E" }}>
                12
              </div>
              <div className="text-xs" style={{ color: "#3D2C2E" }}>
                Active Classes
              </div>
            </CardContent>
          </Card>
          <Card style={{ backgroundColor: "#E5D6CD" }}>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold" style={{ color: "#3D2C2E" }}>
                48
              </div>
              <div className="text-xs" style={{ color: "#3D2C2E" }}>
                Students
              </div>
            </CardContent>
          </Card>
          <Card style={{ backgroundColor: "#E5D6CD" }}>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold" style={{ color: "#3D2C2E" }}>
                4.8
              </div>
              <div className="text-xs" style={{ color: "#3D2C2E" }}>
                Rating
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-6">
        <h2 className="text-sm font-semibold mb-3" style={{ color: "#3D2C2E" }}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="h-16 flex flex-col gap-1 bg-transparent"
            onClick={() => navigateTo("create-event")}
            style={{ borderColor: "#CFB2A8", backgroundColor: "#F5F0EB" }}
          >
            <Plus className="w-5 h-5" style={{ color: "#3D2C2E" }} />
            <span className="text-xs" style={{ color: "#3D2C2E" }}>
              New Class
            </span>
          </Button>
          <Button
            variant="outline"
            className="h-16 flex flex-col gap-1 bg-transparent"
            onClick={() => navigateTo("scheduled-students")}
            style={{ borderColor: "#CFB2A8", backgroundColor: "#F5F0EB" }}
          >
            <Users className="w-5 h-5" style={{ color: "#3D2C2E" }} />
            <span className="text-xs" style={{ color: "#3D2C2E" }}>
              Students
            </span>
          </Button>
        </div>
      </div>

      {/* Recent Classes */}
      <div className="px-4">
        <h2 className="text-sm font-semibold mb-3" style={{ color: "#3D2C2E" }}>
          Recent Classes
        </h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} style={{ backgroundColor: "#E5D6CD" }}>
              <CardContent className="p-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium" style={{ color: "#3D2C2E" }}>
                      Beginner Ballet Class {i}
                    </h3>
                    <p className="text-xs mt-1" style={{ color: "#3D2C2E" }}>
                      Today, 6:00 PM
                    </p>
                    <p className="text-xs" style={{ color: "#3D2C2E" }}>
                      8 students enrolled
                    </p>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => navigateTo("event-preview")}>
                    <Eye className="w-4 h-4" style={{ color: "#3D2C2E" }} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const renderProfile = () => (
    <div className="pb-20">
      {renderHeader("Profile")}

      <div className="p-4 space-y-4">
        {/* Profile Image Placeholder */}
        <div className="text-center">
          <div className="w-24 h-24 mx-auto rounded-full" style={{ backgroundColor: "#E5D6CD" }}>
            <div className="flex items-center justify-center h-full">
              <User className="w-8 h-8" style={{ color: "#3D2C2E" }} />
            </div>
          </div>
          <Button variant="ghost" size="sm" className="mt-2">
            <span style={{ color: "#CFB2A8" }}>Change Photo</span>
          </Button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="school-name" style={{ color: "#3D2C2E" }}>
              School/Instructor Name
            </Label>
            <Input
              id="school-name"
              placeholder="Enter name"
              style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
            />
          </div>

          <div>
            <Label htmlFor="bio" style={{ color: "#3D2C2E" }}>
              Bio
            </Label>
            <Textarea
              id="bio"
              placeholder="Tell students about yourself..."
              rows={4}
              style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
            />
          </div>

          <div>
            <Label htmlFor="location" style={{ color: "#3D2C2E" }}>
              Location
            </Label>
            <Input
              id="location"
              placeholder="City, State"
              style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
            />
          </div>

          <div>
            <Label htmlFor="specialties" style={{ color: "#3D2C2E" }}>
              Dance Specialties
            </Label>
            <Input
              id="specialties"
              placeholder="Ballet, Jazz, Hip-hop..."
              style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
            />
          </div>
        </div>

        <Button className="w-full mt-6" style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}>
          Save Profile
        </Button>
      </div>
    </div>
  )

  const renderCreateEvent = () => (
    <div className="pb-20">
      {renderHeader("Create Class")}

      <div className="p-4 space-y-4">
        <div>
          <Label htmlFor="title" style={{ color: "#3D2C2E" }}>
            Class Title
          </Label>
          <Input
            id="title"
            placeholder="e.g., Beginner Ballet"
            value={eventData.title}
            onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
            style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="date" style={{ color: "#3D2C2E" }}>
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={eventData.date}
              onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
              style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
            />
          </div>
          <div>
            <Label htmlFor="time" style={{ color: "#3D2C2E" }}>
              Time
            </Label>
            <Input
              id="time"
              type="time"
              value={eventData.time}
              onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
              style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="price" style={{ color: "#3D2C2E" }}>
            Price ($)
          </Label>
          <Input
            id="price"
            placeholder="25.00"
            value={eventData.price}
            onChange={(e) => setEventData({ ...eventData, price: e.target.value })}
            style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
          />
        </div>

        <div>
          <Label htmlFor="description" style={{ color: "#3D2C2E" }}>
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Class details, requirements, what to bring..."
            rows={4}
            value={eventData.description}
            onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
            style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => navigateTo("event-preview")}
            style={{ borderColor: "#CFB2A8", color: "#3D2C2E" }}
          >
            Preview
          </Button>
          <Button style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}>Save Draft</Button>
        </div>
      </div>
    </div>
  )

  const renderEventPreview = () => (
    <div className="pb-20">
      {renderHeader("Class Preview")}

      <div className="p-4">
        {/* Class Image Placeholder */}
        <div className="w-full h-48 rounded-lg mb-4" style={{ backgroundColor: "#E5D6CD" }}>
          <div className="flex items-center justify-center h-full text-sm" style={{ color: "#3D2C2E" }}>
            Class Image Placeholder
          </div>
        </div>

        {/* Class Details */}
        <div className="space-y-3">
          <h1 className="text-xl font-bold" style={{ color: "#3D2C2E" }}>
            {eventData.title || "Beginner Ballet Class"}
          </h1>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" style={{ color: "#CFB2A8" }} />
            <span className="text-sm" style={{ color: "#3D2C2E" }}>
              {eventData.date || "March 15, 2024"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" style={{ color: "#CFB2A8" }} />
            <span className="text-sm" style={{ color: "#3D2C2E" }}>
              {eventData.time || "6:00 PM"} - 7:30 PM
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" style={{ color: "#CFB2A8" }} />
            <span className="text-sm" style={{ color: "#3D2C2E" }}>
              Studio A
            </span>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" style={{ color: "#CFB2A8" }} />
            <span className="text-sm" style={{ color: "#3D2C2E" }}>
              ${eventData.price || "25.00"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Star className="w-4 h-4" style={{ color: "#CFB2A8" }} />
            <span className="text-sm" style={{ color: "#3D2C2E" }}>
              4.8 rating
            </span>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-2" style={{ color: "#3D2C2E" }}>
            Description
          </h3>
          <p className="text-sm" style={{ color: "#3D2C2E" }}>
            {eventData.description ||
              "Perfect for beginners looking to learn the fundamentals of ballet. We'll cover basic positions, movements, and terminology in a supportive environment."}
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <Button className="w-full" style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}>
            Publish Class
          </Button>
          <Button
            variant="outline"
            className="w-full bg-transparent"
            onClick={() => navigateTo("create-event")}
            style={{ borderColor: "#CFB2A8", color: "#3D2C2E" }}
          >
            Edit Class
          </Button>
        </div>
      </div>
    </div>
  )

  const renderInterestedStudents = () => (
    <div className="pb-20">
      {renderHeader("Interested Students")}

      <div className="p-4">
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} style={{ backgroundColor: "#E5D6CD" }}>
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full" style={{ backgroundColor: "#CFB2A8" }}>
                      <div className="flex items-center justify-center h-full">
                        <User className="w-5 h-5" style={{ color: "#3D2C2E" }} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium" style={{ color: "#3D2C2E" }}>
                        Student {i}
                      </h3>
                      <p className="text-xs" style={{ color: "#3D2C2E" }}>
                        Interested in Beginner Ballet
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" style={{ color: "#CFB2A8" }} />
                    <span className="text-xs" style={{ color: "#3D2C2E" }}>
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

  const renderScheduledStudents = () => (
    <div className="pb-20">
      {renderHeader("Scheduled Students")}

      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-sm font-semibold" style={{ color: "#3D2C2E" }}>
            Today's Classes
          </h2>
        </div>

        <div className="space-y-4">
          {["Beginner Ballet - 6:00 PM", "Jazz Fundamentals - 8:00 PM"].map((className, idx) => (
            <Card key={idx} style={{ backgroundColor: "#E5D6CD" }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm" style={{ color: "#3D2C2E" }}>
                  {className}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#CFB2A8" }}>
                          <div className="flex items-center justify-center h-full">
                            <User className="w-3 h-3" style={{ color: "#3D2C2E" }} />
                          </div>
                        </div>
                        <span className="text-xs" style={{ color: "#3D2C2E" }}>
                          Student {i}
                        </span>
                      </div>
                      <span
                        className="text-xs px-2 py-1 rounded"
                        style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}
                      >
                        Confirmed
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="pb-20">
      {renderHeader("Analytics")}

      <div className="p-4 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card style={{ backgroundColor: "#E5D6CD" }}>
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold" style={{ color: "#3D2C2E" }}>
                156
              </div>
              <div className="text-xs" style={{ color: "#3D2C2E" }}>
                Total Check-ins
              </div>
              <div className="text-xs" style={{ color: "#CFB2A8" }}>
                +12% this week
              </div>
            </CardContent>
          </Card>
          <Card style={{ backgroundColor: "#E5D6CD" }}>
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold" style={{ color: "#3D2C2E" }}>
                4.8
              </div>
              <div className="text-xs" style={{ color: "#3D2C2E" }}>
                Avg Rating
              </div>
              <div className="text-xs" style={{ color: "#CFB2A8" }}>
                24 reviews
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Peak Hours Chart Placeholder */}
        <Card style={{ backgroundColor: "#E5D6CD" }}>
          <CardHeader>
            <CardTitle className="text-sm" style={{ color: "#3D2C2E" }}>
              Peak Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-end justify-between gap-1">
              {[20, 35, 45, 60, 80, 65, 40].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t"
                  style={{
                    height: `${height}%`,
                    backgroundColor: "#CFB2A8",
                    minHeight: "8px",
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs" style={{ color: "#3D2C2E" }}>
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
        <Card style={{ backgroundColor: "#E5D6CD" }}>
          <CardHeader>
            <CardTitle className="text-sm" style={{ color: "#3D2C2E" }}>
              Recent Feedback
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { rating: 5, comment: "Amazing class! Great instructor." },
              { rating: 4, comment: "Really enjoyed the session." },
              { rating: 5, comment: "Perfect for beginners like me." },
            ].map((feedback, i) => (
              <div key={i} className="border-b pb-2" style={{ borderColor: "#CFB2A8" }}>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, starIdx) => (
                    <Star
                      key={starIdx}
                      className="w-3 h-3"
                      style={{
                        color: starIdx < feedback.rating ? "#CFB2A8" : "#E5D6CD",
                        fill: starIdx < feedback.rating ? "#CFB2A8" : "none",
                      }}
                    />
                  ))}
                </div>
                <p className="text-xs" style={{ color: "#3D2C2E" }}>
                  {feedback.comment}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="max-w-sm mx-auto min-h-screen" style={{ backgroundColor: "#F5F0EB" }}>
      {currentScreen === "dashboard" && renderDashboard()}
      {currentScreen === "profile" && renderProfile()}
      {currentScreen === "create-event" && renderCreateEvent()}
      {currentScreen === "event-preview" && renderEventPreview()}
      {currentScreen === "interested-students" && renderInterestedStudents()}
      {currentScreen === "scheduled-students" && renderScheduledStudents()}
      {currentScreen === "analytics" && renderAnalytics()}

      {renderBottomNav()}
    </div>
  )
}
