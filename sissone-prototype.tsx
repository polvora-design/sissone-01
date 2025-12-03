"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Star, Calendar, Clock, MapPin, ArrowLeft, Mail, Phone, Edit2, Check, X, QrCode } from "lucide-react"
import Image from "next/image"

type ClassStatus = "today" | "future" | "past-not-reviewed" | "past-reviewed"

export default function SissonePrototype() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [rating, setRating] = useState(0)
  const [currentClassStatus, setCurrentClassStatus] = useState<ClassStatus>("today")
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [showCheckInNotification, setShowCheckInNotification] = useState(false)
  const [showProfileSaveNotification, setShowProfileSaveNotification] = useState(false)

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

  const LoginScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#F5F0EB]">
      <div className="w-full max-w-sm space-y-6">
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
          <a href="#" className="text-[#3D2C2E] opacity-70 text-sm underline">
            Esqueceu a senha?
          </a>
        </div>
      </div>
    </div>
  )

  const DashboardScreen = () => (
    <div className="min-h-screen bg-[#F5F0EB]">
      <div className="mx-auto max-w-[1440px]">
        <div className="bg-white border-b border-[#E5D6CD] p-4">
          <div className="flex items-center justify-between">
            <Image src="/sissone-logo.svg" alt="Sissone" width={120} height={37} className="h-auto" />
            <Button variant="ghost" size="sm" onClick={goToProfile} className="p-0 h-auto">
              <div className="w-10 h-10 bg-[#CFB2A8] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">S</span>
              </div>
            </Button>
          </div>
        </div>

        <div className="p-4 md:p-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[#3D2C2E] mb-1">Bem-vinda, Sarah!</h2>
            <p className="text-[#3D2C2E] opacity-70">Pronta para dançar hoje?</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#3D2C2E] mb-3">Aulas de Hoje</h3>

            <Card className="bg-white border-[#E5D6CD]">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-[#3D2C2E]">Fluxo Contemporâneo</h4>
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
                <div className="flex items-center gap-1 mb-3">
                  <MapPin className="w-4 h-4 text-[#3D2C2E] opacity-70" />
                  <span className="text-sm text-[#3D2C2E] opacity-70">Centro - Sala A</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
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

          <div>
            <h3 className="text-lg font-semibold text-[#3D2C2E] mb-3">Aulas da Semana</h3>

            <Card className="bg-white border-[#E5D6CD] mb-3">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-[#3D2C2E]">Fundamentos de Jazz</h4>
                    <p className="text-[#3D2C2E] opacity-70 text-sm">Academia Rhythm Dance</p>
                  </div>
                  <div className="text-right text-sm text-[#3D2C2E] opacity-70">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      17 Jan
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      19:30
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  <MapPin className="w-4 h-4 text-[#3D2C2E] opacity-70" />
                  <span className="text-sm text-[#3D2C2E] opacity-70">Zona Norte - Sala B</span>
                </div>
                <Button
                  onClick={() => goToDetails("future")}
                  className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-white"
                >
                  Ver Detalhes
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#E5D6CD]">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-[#3D2C2E]">Dança de Salão</h4>
                    <p className="text-[#3D2C2E] opacity-70 text-sm">Studio Dance Flow</p>
                  </div>
                  <div className="text-right text-sm text-[#3D2C2E] opacity-70">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      19 Jan
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      16:00
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  <MapPin className="w-4 h-4 text-[#3D2C2E] opacity-70" />
                  <span className="text-sm text-[#3D2C2E] opacity-70">Centro - Sala 3</span>
                </div>
                <Button
                  onClick={() => goToDetails("future")}
                  className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-white"
                >
                  Ver Detalhes
                </Button>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#3D2C2E] mb-3">Aulas Anteriores</h3>

            <Card className="bg-white border-[#E5D6CD] mb-3">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-[#3D2C2E]">Ballet Clássico</h4>
                    <p className="text-[#3D2C2E] opacity-70 text-sm">Estúdio Elegance</p>
                    <div className="flex items-center gap-2 mt-1">
                      {renderStars(5)}
                      <span className="text-[#CFB2A8] text-xs font-medium">Sua avaliação</span>
                    </div>
                  </div>
                  <div className="text-right text-sm text-[#3D2C2E] opacity-70">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      15 Jan
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      17:00
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  <MapPin className="w-4 h-4 text-[#3D2C2E] opacity-70" />
                  <span className="text-sm text-[#3D2C2E] opacity-70">Centro - Sala Principal</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => goToDetails("past-reviewed")}
                    variant="outline"
                    className="border-[#E5D6CD] text-[#3D2C2E] bg-white"
                  >
                    Ver Detalhes
                  </Button>
                  <Button
                    onClick={() => {
                      goToDetails("past-reviewed")
                      setTimeout(() => setCurrentScreen(4), 100)
                    }}
                    className="bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-white"
                  >
                    <Edit2 className="w-4 h-4 mr-1" />
                    Editar Avaliação
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#E5D6CD]">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-[#3D2C2E]">Hip Hop Iniciante</h4>
                    <p className="text-[#3D2C2E] opacity-70 text-sm">Urban Move Studio</p>
                    <p className="text-[#CFB2A8] text-xs mt-1 font-medium">Aguardando avaliação</p>
                  </div>
                  <div className="text-right text-sm text-[#3D2C2E] opacity-70">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      12 Jan
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      20:00
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  <MapPin className="w-4 h-4 text-[#3D2C2E] opacity-70" />
                  <span className="text-sm text-[#3D2C2E] opacity-70">Zona Sul - Sala 2</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => goToDetails("past-not-reviewed")}
                    variant="outline"
                    className="border-[#E5D6CD] text-[#3D2C2E] bg-white"
                  >
                    Ver Detalhes
                  </Button>
                  <Button
                    onClick={() => {
                      goToDetails("past-not-reviewed")
                      setTimeout(() => setCurrentScreen(4), 100)
                    }}
                    className="bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-white"
                  >
                    Avaliar
                  </Button>
                </div>
              </CardContent>
            </Card>
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

          <div className="p-4 md:p-8 space-y-4 max-w-2xl mx-auto">
            <Card className="bg-white border-[#E5D6CD]">
              <CardContent className="p-6 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#3D2C2E] mb-2">{classInfo.title}</h2>
                  <p className="text-[#3D2C2E] opacity-70 font-medium">{classInfo.studio}</p>

                  {classInfo.hasUserReview && (
                    <div className="mt-3 p-3 bg-[#CFB2A8]/10 border border-[#CFB2A8]/30 rounded-lg">
                      <p className="text-[#3D2C2E] text-xs font-medium mb-1">Sua Avaliação</p>
                      <div className="flex items-center justify-center gap-2">{renderStars(classInfo.userRating!)}</div>
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-[#E5D6CD]">
                    {renderStars(4)}
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
                      <p className="text-[#3D2C2E] opacity-60 text-sm">Duração: 90 minutos</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#3D2C2E] opacity-70" />
                    <div>
                      <p className="text-[#3D2C2E] font-medium">Centro - Sala A</p>
                      <p className="text-[#3D2C2E] opacity-60 text-sm">Rua das Flores, 123</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E5D6CD]">
                  <h3 className="font-semibold text-[#3D2C2E] mb-2">Sobre a Aula</h3>
                  <p className="text-[#3D2C2E] opacity-70 text-sm leading-relaxed">
                    Uma experiência de dança contemporânea que explora movimentos fluidos e expressivos. Adequado para
                    todos os níveis. Traga roupas confortáveis e uma garrafa de água.
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E5D6CD]">
                  <h3 className="font-semibold text-[#3D2C2E] mb-2">Instrutor</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E5D6CD] rounded-full flex items-center justify-center">
                      <span className="text-[#3D2C2E] text-sm font-bold">CM</span>
                    </div>
                    <div>
                      <p className="text-[#3D2C2E] font-medium">Carolina Matos</p>
                      <p className="text-[#3D2C2E] opacity-60 text-sm">10 anos de experiência</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              {currentClassStatus === "today" && (
                <Button
                  onClick={() => setCurrentScreen(3)}
                  className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-white"
                >
                  Fazer Check-in
                </Button>
              )}

              {currentClassStatus === "past-not-reviewed" && (
                <Button
                  onClick={() => setCurrentScreen(4)}
                  className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-white"
                >
                  Avaliar Aula
                </Button>
              )}

              {currentClassStatus === "past-reviewed" && (
                <Button
                  onClick={() => setCurrentScreen(4)}
                  className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-white"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Editar Avaliação
                </Button>
              )}

              <Button
                onClick={() => setCurrentScreen(5)}
                variant="outline"
                className="w-full border-[#E5D6CD] text-[#3D2C2E] bg-white"
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
            <div className="w-8 h-8 bg-[#CFB2A8] rounded-full flex items-center justify-center flex-shrink-0">
              {isCheckedIn ? <Check className="w-5 h-5 text-white" /> : <X className="w-5 h-5 text-white" />}
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

        <div className="p-6 md:p-8 text-center space-y-6 max-w-md mx-auto">
          <div>
            <h2 className="text-xl font-bold text-[#3D2C2E] mb-2">Fluxo Contemporâneo</h2>
            <p className="text-[#3D2C2E] opacity-70">Estúdio Movement</p>
            <p className="text-[#3D2C2E] opacity-70 text-sm">Hoje • 18:00 • Sala A</p>
          </div>

          <div className="bg-white rounded-lg p-8 border border-[#E5D6CD]">
            <div className="w-32 h-32 mx-auto bg-[#E5D6CD] rounded-lg flex items-center justify-center mb-4">
              <QrCode className="w-16 h-16 text-[#3D2C2E]" />
            </div>
            <p className="text-[#3D2C2E] opacity-70 text-sm">
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
            <Button variant="outline" className="w-full border-[#E5D6CD] text-[#3D2C2E] bg-transparent">
              Precisa de ajuda?
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const FeedbackScreen = () => {
    const isEditing = currentClassStatus === "past-reviewed"
    const classInfo =
      currentClassStatus === "past-reviewed"
        ? { title: "Ballet Clássico", studio: "Estúdio Elegance", currentRating: 5 }
        : { title: "Hip Hop Iniciante", studio: "Urban Move Studio", currentRating: 0 }

    return (
      <div className="min-h-screen bg-[#F5F0EB]">
        <div className="mx-auto max-w-[1440px]">
          <div className="bg-white border-b border-[#E5D6CD] p-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={prevScreen} className="text-[#3D2C2E]">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-lg font-bold text-[#3D2C2E]">
                {isEditing ? "Editar Avaliação" : "Como foi sua aula?"}
              </h1>
            </div>
          </div>

          <div className="p-4 md:p-8 space-y-4 max-w-2xl mx-auto">
            <div className="text-center">
              <h2 className="text-xl font-bold text-[#3D2C2E] mb-2">{classInfo.title}</h2>
              <p className="text-[#3D2C2E] opacity-70">{classInfo.studio}</p>
            </div>

            <Card className="bg-white border-[#E5D6CD]">
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label className="text-[#3D2C2E] font-medium">Avalie sua experiência</Label>
                  <div className="mt-2">{renderStars(rating || classInfo.currentRating, true)}</div>
                </div>

                <div>
                  <Label htmlFor="review" className="text-[#3D2C2E] font-medium">
                    Compartilhe seus pensamentos (opcional)
                  </Label>
                  <Textarea
                    id="review"
                    placeholder="Como foi a aula? O que você mais gostou?"
                    defaultValue={
                      isEditing ? "Aula maravilhosa! A professora é excelente e o ambiente é muito acolhedor." : ""
                    }
                    className="mt-2 bg-white border-[#E5D6CD] min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button onClick={nextScreen} className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-white">
                {isEditing ? "Salvar Alterações" : "Enviar Avaliação"}
              </Button>
              {!isEditing && (
                <Button
                  onClick={nextScreen}
                  variant="outline"
                  className="w-full border-[#E5D6CD] text-[#3D2C2E] bg-transparent"
                >
                  Pular por Enquanto
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const ReviewsScreen = () => (
    <div className="min-h-screen bg-[#F5F0EB]">
      <div className="mx-auto max-w-[1440px]">
        <div className="bg-white border-b border-[#E5D6CD] p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={prevScreen} className="text-[#3D2C2E]">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-bold text-[#3D2C2E]">Avaliações da Comunidade</h1>
          </div>
        </div>

        <div className="p-4 md:p-8 space-y-4 max-w-2xl mx-auto">
          <Card className="bg-white border-[#E5D6CD]">
            <CardHeader className="pb-3">
              <div className="text-center">
                <h2 className="text-xl font-bold text-[#3D2C2E]">Fluxo Contemporâneo</h2>
                <p className="text-[#3D2C2E] opacity-70">Estúdio Movement</p>

                {currentClassStatus === "past-reviewed" && (
                  <div className="mt-3 p-3 bg-[#CFB2A8]/10 border border-[#CFB2A8]/30 rounded-lg">
                    <p className="text-[#3D2C2E] text-xs font-medium mb-1">Sua Avaliação</p>
                    <div className="flex items-center justify-center gap-2">{renderStars(5)}</div>
                  </div>
                )}

                <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-[#E5D6CD]">
                  {renderStars(4)}
                  <span className="text-[#3D2C2E] opacity-70 text-sm">(24 avaliações da comunidade)</span>
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
                      "Aula incrível! A instrutora foi muito encorajadora e o fluxo foi perfeito para o meu nível.
                      Definitivamente voltarei!"
                    </p>
                    <p className="text-[#3D2C2E] opacity-50 text-xs mt-2">há 2 dias</p>
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
                      "Ótimo espaço do estúdio e energia maravilhosa. Os movimentos pareceram realmente naturais e
                      fluidos."
                    </p>
                    <p className="text-[#3D2C2E] opacity-50 text-xs mt-2">há 1 semana</p>
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
                      "Aula boa no geral. Poderia ter um pouco mais de estrutura, mas os elementos criativos foram
                      legais."
                    </p>
                    <p className="text-[#3D2C2E] opacity-50 text-xs mt-2">há 2 semanas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button onClick={goHome} className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-white mt-4">
            Concluir
          </Button>
        </div>
      </div>
    </div>
  )

  const ProfileScreen = () => (
    <div className="min-h-screen bg-[#F5F0EB]">
      <div className="mx-auto max-w-[1440px]">
        {showProfileSaveNotification && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <Check className="w-5 h-5" />
            <span>Perfil atualizado com sucesso!</span>
          </div>
        )}

        <div className="bg-white border-b border-[#E5D6CD] p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={goHome} className="text-[#3D2C2E]">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-bold text-[#3D2C2E]">Perfil e Configurações</h1>
          </div>
        </div>

        <div className="p-4 md:p-8 space-y-6 max-w-2xl mx-auto">
          <div className="text-center py-6">
            <div className="w-24 h-24 bg-[#CFB2A8] rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-3xl font-bold">S</span>
            </div>
            <h2 className="text-xl font-bold text-[#3D2C2E]">Sarah Oliveira</h2>
            <p className="text-[#3D2C2E] opacity-70 text-sm">Membro desde Jan 2024</p>
          </div>

          <Card className="bg-white border-[#E5D6CD]">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-[#3D2C2E] mb-3">Informações Pessoais</h3>

              <div>
                <Label htmlFor="name" className="text-[#3D2C2E]">
                  Nome Completo
                </Label>
                <Input id="name" type="text" defaultValue="Sarah Oliveira" className="mt-1 bg-white border-[#E5D6CD]" />
              </div>

              <div>
                <Label htmlFor="email-profile" className="text-[#3D2C2E]">
                  E-mail
                </Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3D2C2E] opacity-50" />
                  <Input
                    id="email-profile"
                    type="email"
                    defaultValue="sarah.oliveira@email.com"
                    className="pl-10 bg-white border-[#E5D6CD]"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-[#3D2C2E]">
                  Telefone
                </Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3D2C2E] opacity-50" />
                  <Input
                    id="phone"
                    type="tel"
                    defaultValue="(11) 98765-4321"
                    className="pl-10 bg-white border-[#E5D6CD]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#E5D6CD]">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-[#3D2C2E] mb-3">Preferências de Dança</h3>

              <div>
                <Label className="text-[#3D2C2E]">Estilos Favoritos</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-3 py-1 bg-[#E5D6CD] text-[#3D2C2E] rounded-full text-sm">Contemporâneo</span>
                  <span className="px-3 py-1 bg-[#E5D6CD] text-[#3D2C2E] rounded-full text-sm">Jazz</span>
                  <span className="px-3 py-1 bg-[#E5D6CD] text-[#3D2C2E] rounded-full text-sm">Ballet</span>
                </div>
              </div>

              <div>
                <Label className="text-[#3D2C2E]">Nível de Experiência</Label>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" className="flex-1 border-[#CFB2A8] text-[#3D2C2E] bg-[#CFB2A8]/10">
                    Intermediário
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Button className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-white" onClick={handleSaveProfile}>
              Salvar Alterações
            </Button>
            <Button
              variant="outline"
              className="w-full border-[#CFB2A8] text-[#CFB2A8] bg-white hover:bg-[#CFB2A8]/10"
              onClick={() =>
                window.open("https://v0-sissone-wireframes-git-usurio-b-lead-sissone-mvp.vercel.app/", "_blank")
              }
            >
              Cadastrar minha escola
            </Button>
            <Button variant="outline" className="w-full border-red-300 text-red-600 bg-white hover:bg-red-50">
              Sair da Conta
            </Button>
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

  return (
    <div className="min-h-screen bg-[#F5F0EB] flex items-center justify-center">
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="max-w-sm mx-auto bg-white shadow-lg">{renderScreen()}</div>
      </div>
    </div>
  )
}
