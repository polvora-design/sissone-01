"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Star, Calendar, Clock, MapPin, QrCode, ArrowLeft, User } from "lucide-react"

export default function SissonePrototype() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [rating, setRating] = useState(0)

  const screens = ["Login", "Dashboard", "Check-in", "Feedback", "Reviews"]

  const nextScreen = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1)
    }
  }

  const prevScreen = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1)
    }
  }

  const renderStars = (count: number, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= count ? "fill-[#CFB2A8] text-[#CFB2A8]" : "text-[#E5D6CD]"
            } ${interactive ? "cursor-pointer" : ""}`}
            onClick={interactive ? () => setRating(star) : undefined}
          />
        ))}
      </div>
    )
  }

  const LoginScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#F5F0EB]">
      <div className="w-full max-w-sm space-y-6">
        {/* Logo Placeholder */}
        <div className="text-center">
          <div className="w-24 h-24 mx-auto bg-[#E5D6CD] rounded-full flex items-center justify-center mb-4">
            <span className="text-[#3D2C2E] font-bold text-lg">LOGO</span>
          </div>
          <h1 className="text-2xl font-bold text-[#3D2C2E]">Sissone</h1>
          <p className="text-[#3D2C2E] opacity-70">Discover dance, connect with movement</p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-[#3D2C2E]">
              Email
            </Label>
            <Input id="email" type="email" placeholder="your@email.com" className="bg-white border-[#E5D6CD]" />
          </div>
          <div>
            <Label htmlFor="password" className="text-[#3D2C2E]">
              Password
            </Label>
            <Input id="password" type="password" placeholder="••••••••" className="bg-white border-[#E5D6CD]" />
          </div>
          <Button onClick={nextScreen} className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-[#3D2C2E]">
            Sign In
          </Button>
        </div>

        <div className="text-center">
          <a href="#" className="text-[#3D2C2E] opacity-70 text-sm underline">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  )

  const DashboardScreen = () => (
    <div className="min-h-screen bg-[#F5F0EB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5D6CD] p-4">
        <div className="flex items-center justify-between">
          <div className="w-8 h-8 bg-[#E5D6CD] rounded-full flex items-center justify-center">
            <span className="text-[#3D2C2E] text-xs font-bold">L</span>
          </div>
          <h1 className="text-lg font-bold text-[#3D2C2E]">Sissone</h1>
          <User className="w-6 h-6 text-[#3D2C2E]" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-[#3D2C2E] mb-1">Welcome back, Sarah!</h2>
          <p className="text-[#3D2C2E] opacity-70">Ready to dance today?</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#3D2C2E] mb-3">Upcoming Classes</h3>

          <Card className="bg-white border-[#E5D6CD] mb-3">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-[#3D2C2E]">Contemporary Flow</h4>
                  <p className="text-[#3D2C2E] opacity-70 text-sm">Movement Studio</p>
                </div>
                <div className="text-right text-sm text-[#3D2C2E] opacity-70">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Today
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    6:00 PM
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-3">
                <MapPin className="w-4 h-4 text-[#3D2C2E] opacity-70" />
                <span className="text-sm text-[#3D2C2E] opacity-70">Downtown Studio A</span>
              </div>
              <Button onClick={nextScreen} className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-[#3D2C2E]">
                Check In
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#E5D6CD]">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-[#3D2C2E]">Jazz Fundamentals</h4>
                  <p className="text-[#3D2C2E] opacity-70 text-sm">Rhythm Dance Academy</p>
                </div>
                <div className="text-right text-sm text-[#3D2C2E] opacity-70">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Tomorrow
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    7:30 PM
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-3">
                <MapPin className="w-4 h-4 text-[#3D2C2E] opacity-70" />
                <span className="text-sm text-[#3D2C2E] opacity-70">Uptown Studio B</span>
              </div>
              <Button variant="outline" className="w-full border-[#E5D6CD] text-[#3D2C2E] bg-transparent">
                View Details
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const CheckInScreen = () => (
    <div className="min-h-screen bg-[#F5F0EB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5D6CD] p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={prevScreen} className="text-[#3D2C2E]">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-bold text-[#3D2C2E]">Check In</h1>
        </div>
      </div>

      <div className="p-6 text-center space-y-6">
        <div>
          <h2 className="text-xl font-bold text-[#3D2C2E] mb-2">Contemporary Flow</h2>
          <p className="text-[#3D2C2E] opacity-70">Movement Studio</p>
          <p className="text-[#3D2C2E] opacity-70 text-sm">Today • 6:00 PM • Studio A</p>
        </div>

        <div className="bg-white rounded-lg p-8 border border-[#E5D6CD]">
          <div className="w-32 h-32 mx-auto bg-[#E5D6CD] rounded-lg flex items-center justify-center mb-4">
            <QrCode className="w-16 h-16 text-[#3D2C2E]" />
          </div>
          <p className="text-[#3D2C2E] opacity-70 text-sm">
            Show this QR code to your instructor or tap the button below
          </p>
        </div>

        <div className="space-y-3">
          <Button onClick={nextScreen} className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-[#3D2C2E]">
            Confirm Check-In
          </Button>
          <Button variant="outline" className="w-full border-[#E5D6CD] text-[#3D2C2E] bg-transparent">
            Need Help?
          </Button>
        </div>
      </div>
    </div>
  )

  const FeedbackScreen = () => (
    <div className="min-h-screen bg-[#F5F0EB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5D6CD] p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={prevScreen} className="text-[#3D2C2E]">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-bold text-[#3D2C2E]">How was your class?</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#3D2C2E] mb-2">Contemporary Flow</h2>
          <p className="text-[#3D2C2E] opacity-70">Movement Studio</p>
        </div>

        <Card className="bg-white border-[#E5D6CD]">
          <CardContent className="p-6 space-y-4">
            <div>
              <Label className="text-[#3D2C2E] font-medium">Rate your experience</Label>
              <div className="mt-2">{renderStars(rating, true)}</div>
            </div>

            <div>
              <Label htmlFor="review" className="text-[#3D2C2E] font-medium">
                Share your thoughts (optional)
              </Label>
              <Textarea
                id="review"
                placeholder="How was the class? What did you enjoy most?"
                className="mt-2 bg-white border-[#E5D6CD] min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Button onClick={nextScreen} className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-[#3D2C2E]">
            Submit Review
          </Button>
          <Button variant="outline" className="w-full border-[#E5D6CD] text-[#3D2C2E] bg-transparent">
            Skip for Now
          </Button>
        </div>
      </div>
    </div>
  )

  const ReviewsScreen = () => (
    <div className="min-h-screen bg-[#F5F0EB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5D6CD] p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={prevScreen} className="text-[#3D2C2E]">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-bold text-[#3D2C2E]">Class Reviews</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Card className="bg-white border-[#E5D6CD]">
          <CardHeader className="pb-3">
            <div className="text-center">
              <h2 className="text-xl font-bold text-[#3D2C2E]">Contemporary Flow</h2>
              <p className="text-[#3D2C2E] opacity-70">Movement Studio</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                {renderStars(4)}
                <span className="text-[#3D2C2E] opacity-70 text-sm">(24 reviews)</span>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="space-y-3">
          <Card className="bg-white border-[#E5D6CD]">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#E5D6CD] rounded-full flex items-center justify-center">
                  <span className="text-[#3D2C2E] text-xs font-bold">M</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-[#3D2C2E]">Maya K.</span>
                    {renderStars(5)}
                  </div>
                  <p className="text-[#3D2C2E] opacity-70 text-sm">
                    "Amazing class! The instructor was so encouraging and the flow was perfect for my level. Definitely
                    coming back!"
                  </p>
                  <p className="text-[#3D2C2E] opacity-50 text-xs mt-2">2 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#E5D6CD]">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#E5D6CD] rounded-full flex items-center justify-center">
                  <span className="text-[#3D2C2E] text-xs font-bold">J</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-[#3D2C2E]">Jordan L.</span>
                    {renderStars(4)}
                  </div>
                  <p className="text-[#3D2C2E] opacity-70 text-sm">
                    "Great studio space and wonderful energy. The movements felt really natural and flowing."
                  </p>
                  <p className="text-[#3D2C2E] opacity-50 text-xs mt-2">1 week ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#E5D6CD]">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#E5D6CD] rounded-full flex items-center justify-center">
                  <span className="text-[#3D2C2E] text-xs font-bold">A</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-[#3D2C2E]">Alex R.</span>
                    {renderStars(3)}
                  </div>
                  <p className="text-[#3D2C2E] opacity-70 text-sm">
                    "Good class overall. Could use a bit more structure but the creative elements were nice."
                  </p>
                  <p className="text-[#3D2C2E] opacity-50 text-xs mt-2">2 weeks ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderScreen = () => {
    switch (currentScreen) {
      case 0:
        return <LoginScreen />
      case 1:
        return <DashboardScreen />
      case 2:
        return <CheckInScreen />
      case 3:
        return <FeedbackScreen />
      case 4:
        return <ReviewsScreen />
      default:
        return <LoginScreen />
    }
  }

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg">
      {/* Screen Navigation */}
      <div className="bg-[#3D2C2E] text-white p-2 text-center text-sm">
        Screen {currentScreen + 1}/5: {screens[currentScreen]}
      </div>

      {renderScreen()}
    </div>
  )
}
