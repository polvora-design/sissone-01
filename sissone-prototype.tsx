"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Star, Users, BarChart3, Calendar, CheckCircle, ArrowLeft } from "lucide-react"

const screens = ["landing", "registration", "onboarding"] as const

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

  return (
    <div className="w-full min-h-screen bg-[#F5F0EB]">
      {/* Navigation dots */}
      <div className="px-4 py-8 md:px-8 lg:px-12 xl:px-16">
        {currentScreen === "landing" && <LandingScreen onNext={nextScreen} />}
        {currentScreen === "registration" && <RegistrationScreen onNext={nextScreen} onPrev={prevScreen} />}
        {currentScreen === "onboarding" && <OnboardingScreen />}
      </div>
    </div>
  )
}

function LandingScreen({ onNext }: { onNext: () => void }) {
  const benefits = [
    {
      icon: Users,
      title: "Alcance Mais Alunos",
      description: "Conecte-se com dançarinos da sua região procurando aulas",
    },
    {
      icon: BarChart3,
      title: "Painel Inteligente",
      description: "Acompanhe reservas, pagamentos e engajamento dos alunos",
    },
    {
      icon: Calendar,
      title: "Publicação Fácil de Aulas",
      description: "Configure sua agenda e detalhes das aulas",
    },
  ]

  return (
    <div className="space-y-12 md:space-y-16 max-w-6xl mx-auto">
      <div className="flex justify-center">
        <img src="/sissone-logo.svg" alt="Sissone" className="h-8 md:h-10 lg:h-12" />
      </div>

      {/* Hero section */}
      <div className="text-center space-y-6 md:space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3D2C2E]">Compartilhe Suas Aulas de Dança</h1>
          <p className="text-lg md:text-xl text-[#3D2C2E] opacity-80">
            Para quem quer aprender, ensinar e viver a dança.
          </p>
        </div>

        <div className="w-full h-64 md:h-80 lg:h-96 bg-[#E5D6CD] rounded-lg flex items-center justify-center overflow-hidden">
          <img
            src="/dance-instructor-teaching-a-class-with-students.jpg"
            alt="Instrutor de dança ensinando alunos"
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-lg md:text-xl text-[#3D2C2E]">Conecte-se com alunos e expanda sua comunidade de dança</p>
      </div>

      {/* Benefits section */}
      <div className="space-y-6 md:space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#3D2C2E] text-center">Por Que Entrar na Sissone?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-white border-[#E5D6CD]">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                <div className="bg-[#E5D6CD] p-3 rounded-lg">
                  <benefit.icon className="h-6 w-6 text-[#3D2C2E]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#3D2C2E] text-lg">{benefit.title}</h3>
                  <p className="text-sm text-[#3D2C2E] opacity-80 mt-2">{benefit.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-6 md:space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#3D2C2E] text-center">Veja Como Seu Perfil Ficará</h2>

        {/* Profile mockup integrado */}
        <Card className="bg-white border-[#E5D6CD] overflow-hidden">
          {/* Header com foto de capa e perfil */}
          <div className="relative">
            <div className="h-40 md:h-56 bg-gradient-to-br from-[#CFB2A8] to-[#E5D6CD] overflow-hidden">
              <img
                src="/dance-instructor-teaching-a-class-with-students.jpg"
                alt="Capa da escola"
                className="w-full h-full object-cover opacity-60"
              />
            </div>
            <div className="absolute -bottom-12 md:-bottom-16 left-6 md:left-8">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full p-1.5 shadow-lg">
                <img
                  src="/dance-instructor-profile-photo.jpg"
                  alt="Foto do perfil"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          <CardContent className="pt-16 md:pt-20 px-6 md:px-8 pb-6">
            {/* Informações do perfil */}
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-[#3D2C2E]">[Nome da Sua Escola]</h3>
                <p className="text-sm text-[#3D2C2E] opacity-70 mt-1">Ballet Clássico & Contemporâneo</p>
              </div>

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-[#CFB2A8] text-[#CFB2A8]" />
                ))}
                <span className="text-sm text-[#3D2C2E] ml-2">4.8 (24 avaliações)</span>
                <span className="text-sm text-[#3D2C2E] opacity-70 ml-3">• 120 alunos</span>
              </div>

              <p className="text-sm text-[#3D2C2E] opacity-80 leading-relaxed">
                Professora especializada em ballet clássico e contemporâneo com mais de 10 anos de experiência.
                Oferecemos aulas para todos os níveis em um ambiente acolhedor e profissional.
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-[#E5D6CD] my-6" />

            {/* Lista de aulas */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-[#3D2C2E]">Aulas Disponíveis</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Aula 1 */}
                <div className="flex gap-3 p-3 rounded-lg hover:bg-[#F5F0EB] transition-colors border border-[#E5D6CD]">
                  <div className="w-24 h-24 md:w-28 md:h-28 bg-[#E5D6CD] rounded-lg flex-shrink-0 overflow-hidden">
                    <img src="/ballet-dance-class.png" alt="Ballet Clássico" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-[#3D2C2E] truncate">Ballet Clássico</h5>
                    <p className="text-xs text-[#3D2C2E] opacity-70 mt-0.5">Iniciante</p>
                    <p className="text-xs text-[#3D2C2E] opacity-70">60 minutos</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm font-semibold text-[#3D2C2E]">R$ 50/aula</p>
                      <Button size="sm" className="bg-[#3D2C2E] hover:bg-[#3D2C2E]/90 text-white text-xs px-3 py-1 h-7">
                        Ver
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Aula 2 */}
                <div className="flex gap-3 p-3 rounded-lg hover:bg-[#F5F0EB] transition-colors border border-[#E5D6CD]">
                  <div className="w-24 h-24 md:w-28 md:h-28 bg-[#E5D6CD] rounded-lg flex-shrink-0 overflow-hidden">
                    <img
                      src="/contemporary-dance-class.png"
                      alt="Dança Contemporânea"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-[#3D2C2E] truncate">Dança Contemporânea</h5>
                    <p className="text-xs text-[#3D2C2E] opacity-70 mt-0.5">Avançado</p>
                    <p className="text-xs text-[#3D2C2E] opacity-70">90 minutos</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm font-semibold text-[#3D2C2E]">R$ 75/aula</p>
                      <Button size="sm" className="bg-[#3D2C2E] hover:bg-[#3D2C2E]/90 text-white text-xs px-3 py-1 h-7">
                        Ver
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Aula 3 */}
                <div className="flex gap-3 p-3 rounded-lg hover:bg-[#F5F0EB] transition-colors border border-[#E5D6CD]">
                  <div className="w-24 h-24 md:w-28 md:h-28 bg-[#E5D6CD] rounded-lg flex-shrink-0 overflow-hidden">
                    <img src="/ballet-dance-class.png" alt="Ballet Infantil" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-[#3D2C2E] truncate">Ballet Infantil</h5>
                    <p className="text-xs text-[#3D2C2E] opacity-70 mt-0.5">Infantil (6-12 anos)</p>
                    <p className="text-xs text-[#3D2C2E] opacity-70">45 minutos</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm font-semibold text-[#3D2C2E]">R$ 40/aula</p>
                      <Button size="sm" className="bg-[#3D2C2E] hover:bg-[#3D2C2E]/90 text-white text-xs px-3 py-1 h-7">
                        Ver
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Aula 4 */}
                <div className="flex gap-3 p-3 rounded-lg hover:bg-[#F5F0EB] transition-colors border border-[#E5D6CD]">
                  <div className="w-24 h-24 md:w-28 md:h-28 bg-[#E5D6CD] rounded-lg flex-shrink-0 overflow-hidden">
                    <img
                      src="/contemporary-dance-class.png"
                      alt="Jazz Moderno"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-[#3D2C2E] truncate">Jazz Moderno</h5>
                    <p className="text-xs text-[#3D2C2E] opacity-70 mt-0.5">Intermediário</p>
                    <p className="text-xs text-[#3D2C2E] opacity-70">60 minutos</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm font-semibold text-[#3D2C2E]">R$ 55/aula</p>
                      <Button size="sm" className="bg-[#3D2C2E] hover:bg-[#3D2C2E]/90 text-white text-xs px-3 py-1 h-7">
                        Ver
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA section */}
      <div className="text-center space-y-6 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#3D2C2E]">Pronto Para Começar?</h2>
        <p className="text-lg text-[#3D2C2E] opacity-80">Junte-se a centenas de instrutores que já estão na Sissone</p>
        <Button
          onClick={onNext}
          className="w-full md:w-auto md:px-12 bg-[#3D2C2E] hover:bg-[#3D2C2E]/90 text-white font-semibold text-lg py-6"
        >
          Começar Agora
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

function RegistrationScreen({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  return (
    <div className="max-w-md mx-auto space-y-6 md:space-y-8">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onPrev} className="p-1">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl md:text-2xl font-bold text-[#3D2C2E]">Crie Sua Conta</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#3D2C2E]">Nome Completo</label>
          <Input placeholder="Digite seu nome completo" className="border-[#E5D6CD] focus:border-[#CFB2A8]" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#3D2C2E]">Email</label>
          <Input type="email" placeholder="Digite seu email" className="border-[#E5D6CD] focus:border-[#CFB2A8]" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#3D2C2E]">Senha</label>
          <Input type="password" placeholder="Crie uma senha" className="border-[#E5D6CD] focus:border-[#CFB2A8]" />
        </div>

        <Button onClick={onNext} className="w-full bg-[#3D2C2E] hover:bg-[#3D2C2E]/90 text-white font-semibold">
          Criar Conta
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E5D6CD]" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-[#F5F0EB] px-2 text-[#3D2C2E] opacity-80">ou</span>
          </div>
        </div>

        <Button
          onClick={onNext}
          variant="outline"
          className="w-full border-[#E5D6CD] text-[#3D2C2E] hover:bg-[#E5D6CD] bg-transparent"
        >
          Continuar com Google
        </Button>
      </div>
    </div>
  )
}

function OnboardingScreen() {
  const steps = [
    {
      icon: Users,
      title: "Crie Seu Perfil",
      description: "Adicione sua foto, biografia e experiência como professor",
    },
    {
      icon: Calendar,
      title: "Publique Sua Primeira Aula",
      description: "Configure sua agenda e detalhes das aulas",
    },
    {
      icon: BarChart3,
      title: "Acompanhe Seu Engajamento",
      description: "Monitore reservas e feedback dos alunos",
    },
  ]

  return (
    <div className="max-w-md mx-auto space-y-6 md:space-y-8">
      <h2 className="text-xl md:text-2xl font-bold text-[#3D2C2E] text-center">Bem-vindo à Sissone!</h2>

      <div className="text-center">
        <div className="w-16 h-16 bg-[#E5D6CD] rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-[#3D2C2E]" />
        </div>
        <p className="text-[#3D2C2E] opacity-80">Você está pronto! Veja o que fazer a seguir:</p>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <Card key={index} className="bg-white border-[#E5D6CD]">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="bg-[#E5D6CD] p-2 rounded-lg">
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

      <Button asChild className="w-full bg-[#3D2C2E] hover:bg-[#3D2C2E]/90 text-white font-semibold">
        <a
          href="https://v0-sissone-wireframes-git-usurio-b-logado-sissone-mvp.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Começar a Criar Seu Perfil
        </a>
      </Button>
    </div>
  )
}
