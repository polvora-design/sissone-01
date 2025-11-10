"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Star, Calendar, Clock, MapPin, QrCode, ArrowLeft, User } from "lucide-react"
import Image from "next/image"

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

  const goHome = () => {
    setCurrentScreen(1)
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
      <div className="bg-white border-b border-[#E5D6CD] p-4">
        <div className="flex items-center justify-between">
          <div className="w-8 h-8 bg-[#E5D6CD] rounded-full flex items-center justify-center">
            <span className="text-[#3D2C2E] text-xs font-bold">S</span>
          </div>
          <Image src="/sissone-logo.svg" alt="Sissone" width={120} height={37} className="h-auto" />
          <User className="w-6 h-6 text-[#3D2C2E]" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-[#3D2C2E] mb-1">Bem-vinda, Sarah!</h2>
          <p className="text-[#3D2C2E] opacity-70">Pronta para dançar hoje?</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#3D2C2E] mb-3">Próximas Aulas</h3>

          <Card className="bg-white border-[#E5D6CD] mb-3">
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
              <Button onClick={nextScreen} className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-white">
                Fazer Check-in
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#E5D6CD]">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-[#3D2C2E]">Fundamentos de Jazz</h4>
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
              <div className="flex items-center gap-1 mb-3">
                <MapPin className="w-4 h-4 text-[#3D2C2E] opacity-70" />
                <span className="text-sm text-[#3D2C2E] opacity-70">Zona Norte - Sala B</span>
              </div>
              <Button variant="outline" className="w-full border-[#E5D6CD] text-[#3D2C2E] bg-transparent">
                Ver Detalhes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const CheckInScreen = () => (
    <div className="min-h-screen bg-[#F5F0EB]">
      <div className="bg-white border-b border-[#E5D6CD] p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={prevScreen} className="text-[#3D2C2E]">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-bold text-[#3D2C2E]">Check-in</h1>
        </div>
      </div>

      <div className="p-6 text-center space-y-6">
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
          <Button onClick={nextScreen} className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-white">
            Confirmar Check-in
          </Button>
          <Button variant="outline" className="w-full border-[#E5D6CD] text-[#3D2C2E] bg-transparent">
            Precisa de ajuda?
          </Button>
        </div>
      </div>
    </div>
  )

  const FeedbackScreen = () => (
    <div className="min-h-screen bg-[#F5F0EB]">
      <div className="bg-white border-b border-[#E5D6CD] p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={prevScreen} className="text-[#3D2C2E]">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-bold text-[#3D2C2E]">Como foi sua aula?</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#3D2C2E] mb-2">Fluxo Contemporâneo</h2>
          <p className="text-[#3D2C2E] opacity-70">Estúdio Movement</p>
        </div>

        <Card className="bg-white border-[#E5D6CD]">
          <CardContent className="p-6 space-y-4">
            <div>
              <Label className="text-[#3D2C2E] font-medium">Avalie sua experiência</Label>
              <div className="mt-2">{renderStars(rating, true)}</div>
            </div>

            <div>
              <Label htmlFor="review" className="text-[#3D2C2E] font-medium">
                Compartilhe seus pensamentos (opcional)
              </Label>
              <Textarea
                id="review"
                placeholder="Como foi a aula? O que você mais gostou?"
                className="mt-2 bg-white border-[#E5D6CD] min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Button onClick={nextScreen} className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-white">
            Enviar Avaliação
          </Button>
          <Button variant="outline" className="w-full border-[#E5D6CD] text-[#3D2C2E] bg-transparent">
            Pular por Enquanto
          </Button>
        </div>
      </div>
    </div>
  )

  const ReviewsScreen = () => (
    <div className="min-h-screen bg-[#F5F0EB]">
      <div className="bg-white border-b border-[#E5D6CD] p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={prevScreen} className="text-[#3D2C2E]">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-bold text-[#3D2C2E]">Avaliações da Aula</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Card className="bg-white border-[#E5D6CD]">
          <CardHeader className="pb-3">
            <div className="text-center">
              <h2 className="text-xl font-bold text-[#3D2C2E]">Fluxo Contemporâneo</h2>
              <p className="text-[#3D2C2E] opacity-70">Estúdio Movement</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                {renderStars(4)}
                <span className="text-[#3D2C2E] opacity-70 text-sm">(24 avaliações)</span>
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
    <div className="min-h-screen bg-[#F5F0EB] flex items-center justify-center">
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="max-w-sm mx-auto bg-white shadow-lg">
          {/* Screen Navigation */}
          <div className="bg-[#3D2C2E] text-white p-2 text-center text-sm">
            Tela {currentScreen + 1}/5: {screens[currentScreen]}
          </div>

          {renderScreen()}
        </div>
      </div>
    </div>
  )
}
