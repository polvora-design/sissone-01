"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowRight, Star, Users, BarChart3, Calendar, CheckCircle, ArrowLeft } from "lucide-react"

const screens = ["landing", "benefits", "examples", "registration", "onboarding"] as const

type Screen = (typeof screens)[number]

export default function SissonePrototype() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("landing")

  const nextScreen = () => {
    const currentIndex = screens.indexOf(currentScreen)
    if (currentIndex < screens.length - 1) {
      setCurrentScreen(screens[currentIndex + 1])
    }
  }

  const prevScreen = () => {
    const currentIndex = screens.indexOf(currentScreen)
    if (currentIndex > 0) {
      setCurrentScreen(screens[currentIndex - 1])
    }
  }

  const goToScreen = (screen: Screen) => {
    setCurrentScreen(screen)
  }

  return (
    <div className="max-w-sm mx-auto bg-[#F5F0EB] min-h-screen">
      {/* Navigation dots */}
      <div className="flex justify-center gap-2 p-4">
        {screens.map((screen, index) => (
          <button
            key={screen}
            onClick={() => goToScreen(screen)}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentScreen === screen ? "bg-[#CFB2A8]" : "bg-[#E5D6CD]"
            }`}
          />
        ))}
      </div>

      {/* Screen Content */}
      <div className="px-4 pb-4">
        {currentScreen === "landing" && <LandingScreen onNext={nextScreen} />}
        {currentScreen === "benefits" && <BenefitsScreen onNext={nextScreen} onPrev={prevScreen} />}
        {currentScreen === "examples" && <ExamplesScreen onNext={nextScreen} onPrev={prevScreen} />}
        {currentScreen === "registration" && <RegistrationScreen onNext={nextScreen} onPrev={prevScreen} />}
        {currentScreen === "onboarding" && <OnboardingScreen onPrev={prevScreen} />}
      </div>
    </div>
  )
}

function LandingScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center space-y-6">
      {/* Logo placeholder */}
      <div className="h-12 bg-[#E5D6CD] rounded-lg flex items-center justify-center">
        <span className="text-[#3D2C2E] font-semibold">SISSONE LOGO</span>
      </div>

      {/* Hero section */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-[#3D2C2E]">Share Your Dance Classes</h1>
        <p className="text-[#3D2C2E] opacity-80">For those who want to learn, teach, and live dance.</p>

        {/* Hero image placeholder */}
        <div className="h-48 bg-[#E5D6CD] rounded-lg flex items-center justify-center">
          <span className="text-[#3D2C2E]">Dance Instructor Image</span>
        </div>
      </div>

      {/* CTA */}
      <div className="space-y-4">
        <p className="text-[#3D2C2E]">Connect with students and grow your dance community</p>
        <Button onClick={onNext} className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-[#3D2C2E] font-semibold">
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

function BenefitsScreen({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const benefits = [
    {
      icon: Users,
      title: "Reach More Students",
      description: "Connect with dancers in your area looking for classes",
    },
    {
      icon: BarChart3,
      title: "Smart Dashboard",
      description: "Track bookings, payments, and student engagement",
    },
    {
      icon: Calendar,
      title: "Easy Class Publishing",
      description: "Create and manage your class schedule effortlessly",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onPrev} className="p-1">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-bold text-[#3D2C2E]">Why Join Sissone?</h2>
      </div>

      <div className="space-y-4">
        {benefits.map((benefit, index) => (
          <Card key={index} className="bg-white border-[#E5D6CD]">
            <CardContent className="p-4 flex items-start gap-3">
              <div className="bg-[#CFB2A8] p-2 rounded-lg">
                <benefit.icon className="h-5 w-5 text-[#3D2C2E]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#3D2C2E]">{benefit.title}</h3>
                <p className="text-sm text-[#3D2C2E] opacity-80">{benefit.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button onClick={onNext} className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-[#3D2C2E] font-semibold">
        See Examples
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}

function ExamplesScreen({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onPrev} className="p-1">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-bold text-[#3D2C2E]">Your Profile Preview</h2>
      </div>

      {/* Profile mockup */}
      <Card className="bg-white border-[#E5D6CD]">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#E5D6CD] rounded-full flex items-center justify-center">
              <span className="text-xs text-[#3D2C2E]">PHOTO</span>
            </div>
            <div>
              <h3 className="font-semibold text-[#3D2C2E]">[Your School Name]</h3>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-3 w-3 fill-[#CFB2A8] text-[#CFB2A8]" />
                ))}
                <span className="text-xs text-[#3D2C2E] ml-1">4.8 (24 reviews)</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Class listing mockup */}
      <div className="space-y-3">
        <h3 className="font-semibold text-[#3D2C2E]">Your Classes</h3>
        <Card className="bg-white border-[#E5D6CD]">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <div className="w-16 h-16 bg-[#E5D6CD] rounded-lg flex items-center justify-center">
                <span className="text-xs text-[#3D2C2E]">CLASS IMAGE</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-[#3D2C2E]">[Class Name]</h4>
                <p className="text-sm text-[#3D2C2E] opacity-80">Beginner • 60 min</p>
                <p className="text-sm font-semibold text-[#3D2C2E]">$25/class</p>
              </div>
              <Button size="sm" className="bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-[#3D2C2E]">
                Book
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button onClick={onNext} className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-[#3D2C2E] font-semibold">
        Join Now
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}

function RegistrationScreen({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onPrev} className="p-1">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-bold text-[#3D2C2E]">Create Your Account</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#3D2C2E]">Full Name</label>
          <Input placeholder="Enter your full name" className="border-[#E5D6CD] focus:border-[#CFB2A8]" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#3D2C2E]">Email</label>
          <Input type="email" placeholder="Enter your email" className="border-[#E5D6CD] focus:border-[#CFB2A8]" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#3D2C2E]">Password</label>
          <Input type="password" placeholder="Create a password" className="border-[#E5D6CD] focus:border-[#CFB2A8]" />
        </div>

        <Button onClick={onNext} className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-[#3D2C2E] font-semibold">
          Create Account
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E5D6CD]" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-[#F5F0EB] px-2 text-[#3D2C2E] opacity-80">or</span>
          </div>
        </div>

        <Button variant="outline" className="w-full border-[#E5D6CD] text-[#3D2C2E] hover:bg-[#E5D6CD] bg-transparent">
          Continue with Google
        </Button>
      </div>
    </div>
  )
}

function OnboardingScreen({ onPrev }: { onPrev: () => void }) {
  const steps = [
    {
      icon: Users,
      title: "Create Your Profile",
      description: "Add your photo, bio, and teaching experience",
    },
    {
      icon: Calendar,
      title: "Publish Your First Class",
      description: "Set up your schedule and class details",
    },
    {
      icon: BarChart3,
      title: "Track Your Engagement",
      description: "Monitor bookings and student feedback",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onPrev} className="p-1">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-bold text-[#3D2C2E]">Welcome to Sissone!</h2>
      </div>

      <div className="text-center">
        <div className="w-16 h-16 bg-[#CFB2A8] rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-[#3D2C2E]" />
        </div>
        <p className="text-[#3D2C2E] opacity-80">You're all set! Here's what to do next:</p>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <Card key={index} className="bg-white border-[#E5D6CD]">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="bg-[#CFB2A8] p-2 rounded-lg">
                <step.icon className="h-5 w-5 text-[#3D2C2E]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#3D2C2E]">{step.title}</h3>
                <p className="text-sm text-[#3D2C2E] opacity-80">{step.description}</p>
              </div>
              <div className="w-6 h-6 border-2 border-[#E5D6CD] rounded-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Button className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-[#3D2C2E] font-semibold">
        Start Building Your Profile
      </Button>
    </div>
  )
}
