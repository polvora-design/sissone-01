"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Filter, Heart, MapPin, Star, Clock, Calendar, User, Check } from "lucide-react"

type Screen = "home" | "filters" | "detail" | "schedule" | "confirmation"

export default function SissonePrototype() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedClass, setSelectedClass] = useState<any>(null)

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const classes = [
    {
      id: 1,
      name: "Contemporary Flow",
      school: "Movement Studio",
      rating: 4.8,
      price: "$25",
      time: "7:00 PM",
      day: "Monday",
      location: "Downtown",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 2,
      name: "Hip Hop Basics",
      school: "Urban Dance Co.",
      rating: 4.9,
      price: "$20",
      time: "6:30 PM",
      day: "Wednesday",
      location: "Midtown",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 3,
      name: "Ballet Fundamentals",
      school: "Classical Arts",
      rating: 4.7,
      price: "$30",
      time: "5:00 PM",
      day: "Tuesday",
      location: "Uptown",
      image: "/placeholder.svg?height=120&width=200",
    },
  ]

  const renderHomeScreen = () => (
    <div className="min-h-screen bg-[#F5F0EB]">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#3D2C2E]">Sissone</h1>
          <p className="text-sm text-[#3D2C2E] opacity-70">For those who want to learn, teach, and live dance</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="p-4 bg-white border-b">
        <div className="flex gap-2">
          <Input placeholder="Search classes, styles, instructors..." className="flex-1 border-[#CFB2A8]" />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentScreen("filters")}
            className="border-[#CFB2A8] text-[#3D2C2E]"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Classes Feed */}
      <div className="p-4 space-y-4">
        <h2 className="text-lg font-semibold text-[#3D2C2E]">Discover Classes</h2>

        {classes.map((classItem) => (
          <Card
            key={classItem.id}
            className="bg-white border-[#E5D6CD] cursor-pointer"
            onClick={() => {
              setSelectedClass(classItem)
              setCurrentScreen("detail")
            }}
          >
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="w-20 h-20 bg-[#E5D6CD] rounded-lg flex items-center justify-center">
                  <span className="text-xs text-[#3D2C2E]">IMAGE</span>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-[#3D2C2E]">{classItem.name}</h3>
                      <p className="text-sm text-[#3D2C2E] opacity-70">{classItem.school}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(classItem.id)
                      }}
                      className="p-1"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(classItem.id) ? "fill-[#CFB2A8] text-[#CFB2A8]" : "text-[#3D2C2E]"
                        }`}
                      />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-[#CFB2A8] text-[#CFB2A8]" />
                      <span className="text-xs text-[#3D2C2E]">{classItem.rating}</span>
                    </div>
                    <Badge variant="secondary" className="bg-[#E5D6CD] text-[#3D2C2E] text-xs">
                      {classItem.price}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3 mt-2 text-xs text-[#3D2C2E] opacity-70">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{classItem.day}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{classItem.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{classItem.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderFiltersScreen = () => (
    <div className="min-h-screen bg-[#F5F0EB]">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("home")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-lg font-semibold text-[#3D2C2E]">Filters</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Day of Week */}
        <div>
          <h3 className="font-medium text-[#3D2C2E] mb-3">Day of Week</h3>
          <div className="grid grid-cols-2 gap-2">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
              <Button key={day} variant="outline" className="border-[#CFB2A8] text-[#3D2C2E] text-sm bg-transparent">
                {day.slice(0, 3)}
              </Button>
            ))}
          </div>
        </div>

        {/* Time */}
        <div>
          <h3 className="font-medium text-[#3D2C2E] mb-3">Time</h3>
          <div className="grid grid-cols-2 gap-2">
            {["Morning", "Afternoon", "Evening", "Night"].map((time) => (
              <Button key={time} variant="outline" className="border-[#CFB2A8] text-[#3D2C2E] bg-transparent">
                {time}
              </Button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <h3 className="font-medium text-[#3D2C2E] mb-3">Location</h3>
          <Input placeholder="Enter location or zip code" className="border-[#CFB2A8]" />
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-medium text-[#3D2C2E] mb-3">Price Range</h3>
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="Min" className="border-[#CFB2A8]" />
            <Input placeholder="Max" className="border-[#CFB2A8]" />
          </div>
        </div>

        {/* Rating */}
        <div>
          <h3 className="font-medium text-[#3D2C2E] mb-3">Minimum Rating</h3>
          <div className="flex gap-2">
            {[4, 4.5, 5].map((rating) => (
              <Button key={rating} variant="outline" className="border-[#CFB2A8] text-[#3D2C2E] bg-transparent">
                {rating}+ ⭐
              </Button>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <div className="pt-4">
          <Button
            className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-[#3D2C2E]"
            onClick={() => setCurrentScreen("home")}
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  )

  const renderDetailScreen = () => (
    <div className="min-h-screen bg-[#F5F0EB]">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("home")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-lg font-semibold text-[#3D2C2E]">Class Details</h1>
        <Button variant="ghost" size="icon" onClick={() => toggleFavorite(selectedClass?.id)} className="ml-auto">
          <Heart
            className={`h-5 w-5 ${
              favorites.includes(selectedClass?.id) ? "fill-[#CFB2A8] text-[#CFB2A8]" : "text-[#3D2C2E]"
            }`}
          />
        </Button>
      </div>

      {selectedClass && (
        <div className="p-4 space-y-6">
          {/* Image */}
          <div className="w-full h-48 bg-[#E5D6CD] rounded-lg flex items-center justify-center">
            <span className="text-[#3D2C2E]">CLASS IMAGE</span>
          </div>

          {/* Class Info */}
          <div>
            <h2 className="text-2xl font-bold text-[#3D2C2E]">{selectedClass.name}</h2>
            <p className="text-lg text-[#3D2C2E] opacity-70">{selectedClass.school}</p>

            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-[#CFB2A8] text-[#CFB2A8]" />
                <span className="text-[#3D2C2E]">{selectedClass.rating}</span>
              </div>
              <Badge className="bg-[#CFB2A8] text-[#3D2C2E]">{selectedClass.price}</Badge>
            </div>
          </div>

          {/* Schedule Info */}
          <Card className="bg-white border-[#E5D6CD]">
            <CardHeader>
              <h3 className="font-semibold text-[#3D2C2E]">Schedule</h3>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#3D2C2E]" />
                <span className="text-[#3D2C2E]">{selectedClass.day}s</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#3D2C2E]" />
                <span className="text-[#3D2C2E]">{selectedClass.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#3D2C2E]" />
                <span className="text-[#3D2C2E]">{selectedClass.location}</span>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="bg-white border-[#E5D6CD]">
            <CardHeader>
              <h3 className="font-semibold text-[#3D2C2E]">About This Class</h3>
            </CardHeader>
            <CardContent>
              <p className="text-[#3D2C2E] opacity-80">
                Perfect for beginners and intermediate dancers looking to explore movement and expression. This class
                focuses on building strength, flexibility, and artistic interpretation through contemporary dance
                techniques.
              </p>
            </CardContent>
          </Card>

          {/* CTA Button */}
          <Button
            className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-[#3D2C2E] py-6 text-lg"
            onClick={() => setCurrentScreen("schedule")}
          >
            Schedule Trial Class
          </Button>
        </div>
      )}
    </div>
  )

  const renderScheduleScreen = () => (
    <div className="min-h-screen bg-[#F5F0EB]">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("detail")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-lg font-semibold text-[#3D2C2E]">Schedule Trial</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Class Summary */}
        <Card className="bg-white border-[#E5D6CD]">
          <CardContent className="p-4">
            <h3 className="font-semibold text-[#3D2C2E]">{selectedClass?.name}</h3>
            <p className="text-sm text-[#3D2C2E] opacity-70">{selectedClass?.school}</p>
            <div className="flex items-center gap-3 mt-2 text-sm text-[#3D2C2E] opacity-70">
              <span>{selectedClass?.day}</span>
              <span>{selectedClass?.time}</span>
              <span>{selectedClass?.price}</span>
            </div>
          </CardContent>
        </Card>

        {/* Sign Up Form */}
        <Card className="bg-white border-[#E5D6CD]">
          <CardHeader>
            <h3 className="font-semibold text-[#3D2C2E]">Quick Sign Up</h3>
            <p className="text-sm text-[#3D2C2E] opacity-70">Just a few details to get started</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#3D2C2E]">Full Name</label>
              <Input placeholder="Enter your full name" className="border-[#CFB2A8]" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#3D2C2E]">Email</label>
              <Input type="email" placeholder="Enter your email" className="border-[#CFB2A8]" />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#E5D6CD]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-[#3D2C2E] opacity-70">Or</span>
              </div>
            </div>

            <Button variant="outline" className="w-full border-[#CFB2A8] text-[#3D2C2E] bg-transparent">
              <User className="h-4 w-4 mr-2" />
              Continue with Google
            </Button>
          </CardContent>
        </Card>

        {/* Terms */}
        <p className="text-xs text-[#3D2C2E] opacity-70 text-center">
          By scheduling, you agree to our Terms of Service and Privacy Policy. Your trial class is free and no payment
          is required today.
        </p>

        {/* Schedule Button */}
        <Button
          className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-[#3D2C2E] py-6 text-lg"
          onClick={() => setCurrentScreen("confirmation")}
        >
          Schedule My Trial Class
        </Button>
      </div>
    </div>
  )

  const renderConfirmationScreen = () => (
    <div className="min-h-screen bg-[#F5F0EB] flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <h1 className="text-lg font-semibold text-[#3D2C2E] text-center">Confirmation</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 space-y-6">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-[#CFB2A8] rounded-full flex items-center justify-center">
          <Check className="h-10 w-10 text-white" />
        </div>

        {/* Success Message */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-[#3D2C2E]">You're All Set!</h2>
          <p className="text-[#3D2C2E] opacity-70">Your trial class has been scheduled successfully.</p>
        </div>

        {/* Class Details */}
        <Card className="bg-white border-[#E5D6CD] w-full max-w-sm">
          <CardContent className="p-4 text-center space-y-2">
            <h3 className="font-semibold text-[#3D2C2E]">{selectedClass?.name}</h3>
            <p className="text-sm text-[#3D2C2E] opacity-70">{selectedClass?.school}</p>
            <div className="text-sm text-[#3D2C2E] opacity-70">
              <p>
                {selectedClass?.day} at {selectedClass?.time}
              </p>
              <p>{selectedClass?.location}</p>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="text-center space-y-2">
          <p className="text-sm text-[#3D2C2E] opacity-70">We've sent a confirmation email with all the details.</p>
          <p className="text-sm text-[#3D2C2E] opacity-70">Arrive 15 minutes early for your first class.</p>
        </div>

        {/* Actions */}
        <div className="space-y-3 w-full max-w-sm">
          <Button
            className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-[#3D2C2E]"
            onClick={() => setCurrentScreen("home")}
          >
            Explore More Classes
          </Button>
          <Button variant="outline" className="w-full border-[#CFB2A8] text-[#3D2C2E] bg-transparent">
            Add to Calendar
          </Button>
        </div>
      </div>
    </div>
  )

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case "home":
        return renderHomeScreen()
      case "filters":
        return renderFiltersScreen()
      case "detail":
        return renderDetailScreen()
      case "schedule":
        return renderScheduleScreen()
      case "confirmation":
        return renderConfirmationScreen()
      default:
        return renderHomeScreen()
    }
  }

  return <div className="max-w-sm mx-auto bg-white shadow-xl">{renderCurrentScreen()}</div>
}
