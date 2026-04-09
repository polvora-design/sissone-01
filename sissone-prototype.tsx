"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, Calendar, Clock, MapPin, ArrowLeft, Edit2, Check, X, QrCode, AlertCircle } from "lucide-react"
import Image from "next/image"

type ClassStatus = "today" | "future" | "past-not-reviewed" | "past-reviewed"

export default function SissonePrototype() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [rating, setRating] = useState(0)
  const [currentClassStatus, setCurrentClassStatus] = useState<ClassStatus>("today")
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [showCheckInNotification, setShowCheckInNotification] = useState(false)
  const [showProfileSaveNotification, setShowProfileSaveNotification] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [showEmailSentNotification, setShowEmailSentNotification] = useState(false)
  const [showReviewSentNotification, setShowReviewSentNotification] = useState(false)
  const [selectedStyles, setSelectedStyles] = useState<string[]>(["Contemporâneo", "Jazz", "Ballet"])
  const [selectedLevels, setSelectedLevels] = useState<string[]>(["Intermediário"])
  const [customStyle, setCustomStyle] = useState("")

  const screens = ["Login", "Dashboard", "Detalhes", "Check-in", "Feedback", "Reviews", "Perfil"]

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

  const goHome = () => {
    setCurrentScreen(1)
  }

  const goToDetails = (status: ClassStatus) => {
    setCurrentClassStatus(status)
    setCurrentScreen(2)
  }

  const goToProfile = () => {
    setCurrentScreen(6)
  }

  const goToFeedback = (status: ClassStatus) => {
    setCurrentClassStatus(status)
    setCurrentScreen(4)
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

  const handleCheckIn = () => {
    setIsCheckedIn(true)
    setShowCheckInNotification(true)
    setTimeout(() => setShowCheckInNotification(false), 3000)
  }

  const handleCancelCheckIn = () => {
    setIsCheckedIn(false)
    setShowCheckInNotification(true)
    setTimeout(() => setShowCheckInNotification(false), 3000)
  }

  const handleSaveProfile = () => {
    setShowProfileSaveNotification(true)
    setTimeout(() => {
      setShowProfileSaveNotification(false)
    }, 2000)
  }

  const ForgotPasswordScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#F5F0EB]">
      {showEmailSentNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
          <div className="bg-[#3D2C2E] text-white rounded-lg p-4 shadow-lg flex items-center gap-3 animate-in slide-in-from-top">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm font-medium">Email enviado</p>
          </div>
        </div>
      )}
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex items-center justify-center">
            <Image src="/sissone-logo.svg" alt="Sissone" width={200} height={62} className="h-auto" />
          </div>
          <h2 className="text-2xl font-semibold text-[#3D2C2E] mb-2">Redefinir Senha</h2>
          <p className="text-[#3D2C2E] opacity-70 text-sm">
            Digite seu e-mail para receber instruções de redefinição de senha
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="reset-email" className="text-[#3D2C2E]">
              E-mail
            </Label>
            <Input id="reset-email" type="email" placeholder="seu@email.com" className="bg-white border-[#E5D6CD]" />
          </div>
          <Button 
            onClick={() => {
              setShowEmailSentNotification(true)
              setTimeout(() => setShowEmailSentNotification(false), 2000)
            }}
            className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-white"
          >
            Criar nova senha
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowForgotPassword(false)}
            className="w-full border-[#E5D6CD] text-[#3D2C2E] bg-white hover:bg-white/90"
          >
            Voltar ao Login
          </Button>
        </div>
      </div>
    </div>
  )

  const LoginScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#F5F0EB]">
      {showForgotPassword ? (
        <ForgotPasswordScreen />
      ) : (
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <div className="mx-auto mb-4 flex items-center justify-center">
              <Image src="/sissone-logo.svg" alt="Sissone" width={200} height={62} className="h-auto" />
            </div>
            <p className="text-[#3D2C2E] opacity-70">Descubra dança, conecte-se com o movimento</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-[#3D2C2E]">
                E-mail
              </Label>
              <Input id="email" type="email" placeholder="seu@email.com" className="bg-white border-[#E5D6CD]" />
            </div>
            <div>
              <Label htmlFor="password" className="text-[#3D2C2E]">
                Senha
              </Label>
              <Input id="password" type="password" placeholder="••••••••" className="bg-white border-[#E5D6CD]" />
            </div>
            <Button onClick={nextScreen} className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-white">
              Entrar
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-full border-t border-[#E5D6CD]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#F5F0EB] px-2 text-[#3D2C2E] opacity-70">ou</span>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={nextScreen}
              className="w-full border-[#E5D6CD] text-[#3D2C2E] bg-white hover:bg-white/90"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continuar com Google
            </Button>
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowForgotPassword(true)}
              className="text-[#3D2C2E] opacity-70 text-sm underline"
            >
              Esqueci minha senha
            </button>
          </div>
        </div>
      )}
    </div>
  )

  const DashboardScreen = () => (
    <div className="min-h-screen bg-[#F5F0EB]">
      <div className="mx-auto max-w-[1440px]">
        <div className="bg-white border-b border-[#E5D6CD] p-4">
          <div className="flex items-center justify-between">
            <Image src="/sissone-logo.svg" alt="Sissone" width={120} height={37} className="h-auto" />
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open("https://v0-sissone-wireframes-git-usurio-a-lead-sissone-mvp.vercel.app/", "_blank")
                }
                className="border-[#CFB2A8] text-[#3D2C2E] hover:bg-[#CFB2A8] hover:text-white"
              >
                Buscar aula
              </Button>
              <Button variant="ghost" size="sm" onClick={goToProfile} className="p-0 h-auto">
                <div className="w-10 h-10 bg-[#CFB2A8] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">S</span>
                </div>
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-8 lg:p-12 space-y-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#3D2C2E] mb-1">Bem-vinda, Sarah!</h2>
            <p className="text-[#3D2C2E] opacity-70">Pronta para dançar hoje?</p>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-semibold text-[#3D2C2E] mb-4">Aulas de Hoje</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="bg-white border-[#E5D6CD]">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-[#3D2C2E] text-lg">Fluxo Contemporâneo</h4>
                      <p className="text-[#3D2C2E] opacity-70 text-sm">Estúdio Movement</p>
                    </div>
                    <div className="text-right text-sm text-[#3D2C2E] opacity-70">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Hoje
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        18:00
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-4">
                    <MapPin className="w-4 h-4 text-[#3D2C2E] opacity-70" />
                    <span className="text-sm text-[#3D2C2E] opacity-70">Centro - Sala A</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => goToDetails("today")}
                      variant="outline"
                      className="border-[#E5D6CD] text-[#3D2C2E] bg-white"
                    >
                      Ver Detalhes
                    </Button>
                    <Button
                      onClick={() => {
                        goToDetails("today")
                        setTimeout(() => setCurrentScreen(3), 100)
                      }}
                      className="bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-white"
                    >
                      Check-in
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-semibold text-[#3D2C2E] mb-4">Aulas da Semana</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="bg-white border-[#E5D6CD]">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-[#3D2C2E] text-lg">Fundamentos de Jazz</h4>
                      <p className="text-[#3D2C2E] opacity-70 text-sm">Academia Rhythm Dance</p>
                    </div>
                    <div className="text-right text-sm text-[#3D2C2E] opacity-70">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Amanhã
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        19:30
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-4">
                    <MapPin className="w-4 h-4 text-[#3D2C2E] opacity-70" />
                    <span className="text-sm text-[#3D2C2E] opacity-70">Zona Sul - Sala Principal</span>
                  </div>
                  <Button
                    onClick={() => goToDetails("future")}
                    variant="outline"
                    className="w-full border-[#E5D6CD] text-[#3D2C2E] bg-white"
                  >
                    Ver Detalhes
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white border-[#E5D6CD]">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-[#3D2C2E] text-lg">Dança de Salão</h4>
                      <p className="text-[#3D2C2E] opacity-70 text-sm">Estúdio Harmonia</p>
                    </div>
                    <div className="text-right text-sm text-[#3D2C2E] opacity-70">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Sábado
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        15:00
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-4">
                    <MapPin className="w-4 h-4 text-[#3D2C2E] opacity-70" />
                    <span className="text-sm text-[#3D2C2E] opacity-70">Bairro Novo - Salão 2</span>
                  </div>
                  <Button
                    onClick={() => goToDetails("future")}
                    variant="outline"
                    className="w-full border-[#E5D6CD] text-[#3D2C2E] bg-white"
                  >
                    Ver Detalhes
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-semibold text-[#3D2C2E] mb-4">Aulas Anteriores</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="bg-white border-[#E5D6CD]">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-[#3D2C2E] text-lg">Hip Hop Iniciante</h4>
                      <p className="text-[#3D2C2E] opacity-70 text-sm">Urban Move Studio</p>
                    </div>
                    <div className="text-right text-sm text-[#3D2C2E] opacity-70">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        12 de Janeiro
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        20:00
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    <MapPin className="w-4 h-4 text-[#3D2C2E] opacity-70" />
                    <span className="text-sm text-[#3D2C2E] opacity-70">Centro Urbano - Sala Hip Hop</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4 p-2 bg-[#E5D6CD]/30 rounded">
                    <AlertCircle className="w-4 h-4 text-[#CFB2A8]" />
                    <span className="text-sm text-[#3D2C2E]">Avaliação pendente</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => goToDetails("past-not-reviewed")}
                      variant="outline"
                      className="border-[#E5D6CD] text-[#3D2C2E] bg-white"
                    >
                      Ver Detalhes
                    </Button>
                    <Button
                      onClick={() => goToFeedback("past-not-reviewed")}
                      className="bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-white"
                    >
                      Avaliar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-[#E5D6CD]">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-[#3D2C2E] text-lg">Ballet Clássico</h4>
                      <p className="text-[#3D2C2E] opacity-70 text-sm">Estúdio Elegance</p>
                    </div>
                    <div className="text-right text-sm text-[#3D2C2E] opacity-70">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        15 de Janeiro
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        17:00
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    <MapPin className="w-4 h-4 text-[#3D2C2E] opacity-70" />
                    <span className="text-sm text-[#3D2C2E] opacity-70">Bairro Clássico - Estúdio Principal</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">{renderStars(5, false)}</div>
                    <span className="text-sm text-[#3D2C2E] font-medium">Você avaliou</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => goToDetails("past-reviewed")}
                      variant="outline"
                      className="border-[#E5D6CD] text-[#3D2C2E] bg-white"
                    >
                      Ver Detalhes
                    </Button>
                    <Button
                      onClick={() => goToFeedback("past-reviewed")}
                      variant="outline"
                      className="border-[#CFB2A8] text-[#CFB2A8] bg-transparent hover:bg-[#CFB2A8]/10"
                    >
                      Editar Avaliação
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const DetailsScreen = () => {
    const getTitleAndClass = () => {
      switch (currentClassStatus) {
        case "today":
          return {
            title: "Fluxo Contemporâneo",
            studio: "Estúdio Movement",
            date: "Hoje, 16 de Janeiro",
            time: "18:00 - 19:30",
            hasUserReview: false,
          }
        case "future":
          return {
            title: "Fundamentos de Jazz",
            studio: "Academia Rhythm Dance",
            date: "Amanhã, 17 de Janeiro",
            time: "19:30 - 21:00",
            hasUserReview: false,
          }
        case "past-reviewed":
          return {
            title: "Ballet Clássico",
            studio: "Estúdio Elegance",
            date: "15 de Janeiro",
            time: "17:00 - 18:30",
            hasUserReview: true,
            userRating: 5,
          }
        case "past-not-reviewed":
          return {
            title: "Hip Hop Iniciante",
            studio: "Urban Move Studio",
            date: "12 de Janeiro",
            time: "20:00 - 21:30",
            hasUserReview: false,
          }
      }
    }

    const classInfo = getTitleAndClass()

    return (
      <div className="min-h-screen bg-[#F5F0EB]">
        <div className="mx-auto max-w-[1440px]">
          <div className="bg-white border-b border-[#E5D6CD] p-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={prevScreen} className="text-[#3D2C2E]">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-lg font-bold text-[#3D2C2E]">Detalhes da Aula</h1>
            </div>
          </div>

          <div className="p-4 md:p-8 lg:p-12 space-y-6 max-w-4xl mx-auto">
            <Card className="bg-white border-[#E5D6CD]">
              <CardContent className="p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#3D2C2E] mb-2">{classInfo.title}</h2>
                  <p className="text-[#3D2C2E] opacity-70 font-medium">{classInfo.studio}</p>

                  {classInfo.hasUserReview && (
                    <div className="mt-3 p-3 bg-[#CFB2A8]/10 border border-[#CFB2A8]/30 rounded-lg">
                      <p className="text-[#3D2C2E] text-xs font-medium mb-1">Sua Avaliação</p>
                      <div className="flex items-center justify-center gap-2">{renderStars(classInfo.userRating!)}</div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#E5D6CD] justify-start">
                    {renderStars(4)}
                    <span className="text-[#3D2C2E] font-semibold">4.0</span>
                    <span className="text-[#3D2C2E] opacity-70 text-sm">(24 avaliações)</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#E5D6CD]">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#3D2C2E] opacity-70" />
                    <div>
                      <p className="text-[#3D2C2E] font-medium">{classInfo.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#3D2C2E] opacity-70" />
                    <div>
                      <p className="text-[#3D2C2E] font-medium">{classInfo.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#3D2C2E] opacity-70" />
                    <div>
                      <p className="text-[#3D2C2E] font-medium">Centro - Sala A</p>
                      <p className="text-sm text-[#3D2C2E] opacity-70">Rua da Dança, 123</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E5D6CD]">
                  <h3 className="text-lg font-semibold text-[#3D2C2E] mb-2">Instrutor</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#CFB2A8] rounded-full flex items-center justify-center">
                      <span className="text-white text-lg font-bold">M</span>
                    </div>
                    <div>
                      <p className="text-[#3D2C2E] font-medium">Maria Silva</p>
                      <p className="text-sm text-[#3D2C2E] opacity-70">10 anos de experiência</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E5D6CD]">
                  <h3 className="text-lg font-semibold text-[#3D2C2E] mb-2">Sobre a Aula</h3>
                  <p className="text-[#3D2C2E] opacity-70 text-sm leading-relaxed">
                    Uma experiência imersiva de dança contemporânea focada em fluidez e expressão corporal. Perfeita
                    para todos os níveis que querem explorar movimento criativo.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentClassStatus === "today" && (
                <Button
                  onClick={() => setCurrentScreen(3)}
                  className="bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-white w-full"
                >
                  Fazer Check-in
                </Button>
              )}

              {currentClassStatus === "past-not-reviewed" && (
                <Button
                  onClick={() => goToFeedback("past-not-reviewed")}
                  className="bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-white w-full"
                >
                  Avaliar Aula
                </Button>
              )}

              {currentClassStatus === "past-reviewed" && (
                <Button
                  onClick={() => goToFeedback("past-reviewed")}
                  className="bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-white w-full"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Editar Avaliação
                </Button>
              )}

              <Button
                onClick={() => setCurrentScreen(5)}
                variant="outline"
                className="border-[#E5D6CD] text-[#3D2C2E] bg-white w-full"
              >
                Ver Avaliações da Comunidade
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const CheckInScreen = () => (
    <div className="min-h-screen bg-[#F5F0EB]">
      {showCheckInNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
          <div className="bg-[#3D2C2E] text-white rounded-lg p-4 shadow-lg flex items-center gap-3 animate-in slide-in-from-top">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              {isCheckedIn ? <Check className="w-5 h-5 text-green-600" /> : <X className="w-5 h-5 text-red-600" />}
            </div>
            <p className="text-sm font-medium">
              {isCheckedIn ? "Check-in confirmado com sucesso!" : "Check-in cancelado"}
            </p>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[1440px]">
        <div className="bg-white border-b border-[#E5D6CD] p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={prevScreen} className="text-[#3D2C2E]">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-bold text-[#3D2C2E]">Check-in</h1>
          </div>
        </div>

        <div className="p-4 md:p-8 lg:p-12 space-y-6 max-w-3xl mx-auto">
          <div>
            <h2 className="text-xl font-bold text-[#3D2C2E] mb-2">Fluxo Contemporâneo</h2>
            <p className="text-[#3D2C2E] opacity-70">Estúdio Movement</p>
            <p className="text-[#3D2C2E] opacity-70 text-sm">Hoje • 18:00 • Sala A</p>
          </div>

          <div className="bg-white rounded-lg p-8 border border-[#E5D6CD]">
            <div className="w-32 h-32 mx-auto bg-[#E5D6CD] rounded-lg flex items-center justify-center mb-4">
              <QrCode className="w-16 h-16 text-[#3D2C2E]" />
            </div>
            <p className="text-center text-[#3D2C2E] opacity-70 text-sm">
              Mostre este QR code ao seu instrutor ou toque no botão abaixo
            </p>
          </div>

          <div className="space-y-3">
            {!isCheckedIn ? (
              <Button onClick={handleCheckIn} className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-white">
                Confirmar Check-in
              </Button>
            ) : (
              <Button
                onClick={handleCancelCheckIn}
                variant="outline"
                className="w-full border-[#CFB2A8] text-[#CFB2A8] bg-transparent hover:bg-[#CFB2A8]/10"
              >
                Cancelar Check-in
              </Button>
            )}

            <Button onClick={prevScreen} variant="outline" className="w-full border-[#E5D6CD] text-[#3D2C2E] bg-white">
              Voltar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const FeedbackScreen = () => (
    <div className="min-h-screen bg-[#F5F0EB]">
      {showReviewSentNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
          <div className="bg-[#3D2C2E] text-white rounded-lg p-4 shadow-lg flex items-center gap-3 animate-in slide-in-from-top">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm font-medium">Avaliação enviada</p>
          </div>
        </div>
      )}
      <div className="mx-auto max-w-[1440px]">
        <div className="bg-white border-b border-[#E5D6CD] p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={prevScreen} className="text-[#3D2C2E]">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-bold text-[#3D2C2E]">
              {currentClassStatus === "past-reviewed" ? "Editar Avaliação" : "Avaliar Aula"}
            </h1>
          </div>
        </div>

        <div className="p-4 md:p-8 lg:p-12 space-y-6 max-w-3xl mx-auto">
          <div>
            <h2 className="text-xl font-bold text-[#3D2C2E] mb-2">
              {currentClassStatus === "past-reviewed" ? "Ballet Clássico" : "Hip Hop Iniciante"}
            </h2>
            <p className="text-[#3D2C2E] opacity-70">
              {currentClassStatus === "past-reviewed" ? "Estúdio Elegance" : "Urban Move Studio"}
            </p>
            <p className="text-[#3D2C2E] opacity-70 text-sm">
              {currentClassStatus === "past-reviewed" ? "15 de Janeiro • 17:00" : "12 de Janeiro • 20:00"}
            </p>
          </div>

          <Card className="bg-white border-[#E5D6CD]">
            <CardContent className="p-8 space-y-6">
              <div className="text-center">
                <Label className="text-lg font-semibold text-[#3D2C2E] mb-4 block">Como foi sua experiência?</Label>
                <div className="flex justify-center">{renderStars(rating, true)}</div>
              </div>

              <div>
                <Label htmlFor="comment" className="text-[#3D2C2E] mb-2 block">
                  Comentário (opcional)
                </Label>
                <Textarea
                  id="comment"
                  placeholder="Compartilhe sua experiência..."
                  className="min-h-32 bg-white border-[#E5D6CD] resize-none"
                  defaultValue={
                    currentClassStatus === "past-reviewed"
                      ? "Aula maravilhosa! A professora é extremamente atenciosa e o conteúdo foi muito bem estruturado."
                      : ""
                  }
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button 
              onClick={() => {
                setShowReviewSentNotification(true)
                setTimeout(() => {
                  setShowReviewSentNotification(false)
                  nextScreen()
                }, 2000)
              }}
              className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-white"
            >
              {currentClassStatus === "past-reviewed" ? "Atualizar Avaliação" : "Enviar Avaliação"}
            </Button>
            <Button onClick={nextScreen} variant="outline" className="w-full border-[#E5D6CD] text-[#3D2C2E] bg-white">
              Pular por Enquanto
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const ReviewsScreen = () => (
    <div className="min-h-screen bg-[#F5F0EB]">
      <div className="mx-auto max-w-[1440px]">
        <div className="bg-white border-b border-[#E5D6CD] p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setCurrentScreen(2)} className="text-[#3D2C2E]">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-bold text-[#3D2C2E]">Avaliações da Comunidade</h1>
          </div>
        </div>

        <div className="p-4 md:p-8 lg:p-12 space-y-6 max-w-4xl mx-auto">
          <div>
            <h2 className="text-xl font-bold text-[#3D2C2E] mb-2">Fluxo Contemporâneo</h2>
            <p className="text-[#3D2C2E] opacity-70">Estúdio Movement</p>

            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[#E5D6CD]">
              {renderStars(4)}
              <span className="text-[#3D2C2E] font-semibold">4.0</span>
              <span className="text-[#3D2C2E] opacity-70 text-sm">(24 avaliações)</span>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="bg-white border-[#E5D6CD]">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#CFB2A8] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">J</span>
                    </div>
                    <div>
                      <p className="text-[#3D2C2E] font-medium">João Silva</p>
                      <p className="text-sm text-[#3D2C2E] opacity-70">Há 2 dias</p>
                    </div>
                  </div>
                  {renderStars(5)}
                </div>
                <p className="text-[#3D2C2E] opacity-70 text-sm">
                  Experiência incrível! A professora é super atenciosa e o ambiente é acolhedor. Recomendo muito!
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#E5D6CD]">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#CFB2A8] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">A</span>
                    </div>
                    <div>
                      <p className="text-[#3D2C2E] font-medium">Ana Costa</p>
                      <p className="text-sm text-[#3D2C2E] opacity-70">Há 1 semana</p>
                    </div>
                  </div>
                  {renderStars(4)}
                </div>
                <p className="text-[#3D2C2E] opacity-70 text-sm">
                  Ótima aula, aprendi muito sobre técnicas de fluxo. O único ponto é que estava um pouco cheia.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#E5D6CD]">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#CFB2A8] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">C</span>
                    </div>
                    <div>
                      <p className="text-[#3D2C2E] font-medium">Carlos Mendes</p>
                      <p className="text-sm text-[#3D2C2E] opacity-70">Há 2 semanas</p>
                    </div>
                  </div>
                  {renderStars(3)}
                </div>
                <p className="text-[#3D2C2E] opacity-70 text-sm">
                  Boa aula, mas esperava um pouco mais de desafio. Talvez seja melhor para iniciantes.
                </p>
              </CardContent>
            </Card>
          </div>

          <Button onClick={goHome} className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-white">
            Concluir
          </Button>
        </div>
      </div>
    </div>
  )

  const ProfileScreen = () => (
    <div className="min-h-screen bg-[#F5F0EB]">
      {showProfileSaveNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
          <div className="bg-[#3D2C2E] text-white rounded-lg p-4 shadow-lg flex items-center gap-3 animate-in slide-in-from-top">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm font-medium">Alterações salvas com sucesso</p>
          </div>
        </div>
      )}
      <div className="mx-auto max-w-[1440px]">
        <div className="bg-white border-b border-[#E5D6CD] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => setCurrentScreen(1)} className="text-[#3D2C2E]">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-lg font-bold text-[#3D2C2E]">Perfil e Configurações</h1>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-8 lg:p-12 space-y-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-20 h-20 bg-[#CFB2A8] rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">S</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#3D2C2E]">Sarah Oliveira</h2>
                <p className="text-[#3D2C2E] opacity-70">sarah@email.com</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-[#E5D6CD]">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-[#3D2C2E]">Informações Pessoais</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-[#3D2C2E]">
                      Nome Completo
                    </Label>
                    <Input id="name" defaultValue="Sarah Oliveira" className="bg-white border-[#E5D6CD]" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-[#3D2C2E]">
                      E-mail
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="sarah@email.com"
                      className="bg-white border-[#E5D6CD]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-[#3D2C2E]">
                      Telefone
                    </Label>
                    <Input id="phone" type="tel" defaultValue="(11) 98765-4321" className="bg-white border-[#E5D6CD]" />
                  </div>
                  <div>
                    <Label htmlFor="bio" className="text-[#3D2C2E]">
                      Sobre Você
                    </Label>
                    <Textarea
                      id="bio"
                      className="min-h-24 bg-white border-[#E5D6CD] resize-none"
                      defaultValue="Apaixonada por dança há 5 anos. Sempre em busca de novas experiências e desafios!"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-[#E5D6CD]">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-[#3D2C2E]">Preferências de Dança</h3>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-[#3D2C2E] mb-3 block">
                      Estilos de Dança
                    </Label>
                    <div className="space-y-3">
                      {["Ballet", "Jazz", "Contemporâneo", "Hip Hop", "Street Dance", "Dança de Salão"].map((style) => (
                        <div key={style} className="flex items-center gap-3">
                          <Checkbox
                            id={`style-${style}`}
                            checked={selectedStyles.includes(style)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedStyles([...selectedStyles, style])
                              } else {
                                setSelectedStyles(selectedStyles.filter((s) => s !== style))
                              }
                            }}
                            className="border-[#CFB2A8] data-[state=checked]:bg-[#CFB2A8] data-[state=checked]:border-[#CFB2A8]"
                          />
                          <Label htmlFor={`style-${style}`} className="text-[#3D2C2E] cursor-pointer font-normal">
                            {style}
                          </Label>
                        </div>
                      ))}
                      {selectedStyles
                        .filter(
                          (style) =>
                            !["Ballet", "Jazz", "Contemporâneo", "Hip Hop", "Street Dance", "Dança de Salão"].includes(
                              style
                            )
                        )
                        .map((style) => (
                          <div key={style} className="flex items-center gap-3">
                            <Checkbox
                              id={`style-${style}`}
                              checked={true}
                              onCheckedChange={() => {
                                setSelectedStyles(selectedStyles.filter((s) => s !== style))
                              }}
                              className="border-[#CFB2A8] data-[state=checked]:bg-[#CFB2A8] data-[state=checked]:border-[#CFB2A8]"
                            />
                            <Label htmlFor={`style-${style}`} className="text-[#3D2C2E] cursor-pointer font-normal">
                              {style}
                            </Label>
                          </div>
                        ))}
                      <div className="flex items-center gap-2 pt-2">
                        <Input
                          value={customStyle}
                          onChange={(e) => setCustomStyle(e.target.value)}
                          placeholder="Adicionar outro estilo..."
                          className="bg-white border-[#E5D6CD] flex-1"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && customStyle.trim()) {
                              setSelectedStyles([...selectedStyles, customStyle.trim()])
                              setCustomStyle("")
                            }
                          }}
                        />
                        <Button
                          onClick={() => {
                            if (customStyle.trim()) {
                              setSelectedStyles([...selectedStyles, customStyle.trim()])
                              setCustomStyle("")
                            }
                          }}
                          className="bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-white px-4"
                        >
                          Adicionar
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label className="text-[#3D2C2E] mb-3 block">
                      Nível de Experiência
                    </Label>
                    <div className="space-y-3">
                      {["Iniciante", "Intermediário", "Avançado", "Profissional"].map((level) => (
                        <div key={level} className="flex items-center gap-3">
                          <Checkbox
                            id={`level-${level}`}
                            checked={selectedLevels.includes(level)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedLevels([...selectedLevels, level])
                              } else {
                                setSelectedLevels(selectedLevels.filter((l) => l !== level))
                              }
                            }}
                            className="border-[#CFB2A8] data-[state=checked]:bg-[#CFB2A8] data-[state=checked]:border-[#CFB2A8]"
                          />
                          <Label htmlFor={`level-${level}`} className="text-[#3D2C2E] cursor-pointer font-normal">
                            {level}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 space-y-3 max-w-md mx-auto">
              <Button
                onClick={() =>
                  window.open("https://v0-sissone-wireframes-git-usurio-b-lead-sissone-mvp.vercel.app/", "_blank")
                }
                className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-white"
              >
                Cadastrar minha escola
              </Button>

              <Button
                onClick={() => {
                  setShowProfileSaveNotification(true)
                  setTimeout(() => {
                    setShowProfileSaveNotification(false)
                    goHome()
                  }, 2000)
                }}
                variant="outline"
                className="w-full border-[#CFB2A8] text-[#CFB2A8] bg-transparent hover:bg-[#CFB2A8]/10"
              >
                Salvar e fechar
              </Button>
            </div>
          </div>
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
        return <DetailsScreen />
      case 3:
        return <CheckInScreen />
      case 4:
        return <FeedbackScreen />
      case 5:
        return <ReviewsScreen />
      case 6:
        return <ProfileScreen />
      default:
        return <LoginScreen />
    }
  }

  return <div>{renderScreen()}</div>
}
