"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Star,
  Users,
  BarChart3,
  Calendar,
  CheckCircle,
  ArrowLeft,
  Clock,
  MapPin,
  Share2,
  Copy,
  Check,
} from "lucide-react"

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
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText("sissone.com.br/escola-ballet-maria-clara")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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

  const classSchedule = [
    {
      id: 1,
      name: "Ballet Clássico Iniciante",
      level: "Iniciante",
      duration: "60 min",
      price: "R$ 50",
      schedule: "Seg, Qua, Sex • 18:00",
      location: "Estúdio Principal",
      students: 12,
      maxStudents: 15,
      image: "/classical-ballet-class-with-barre-exercises.jpg",
    },
    {
      id: 2,
      name: "Dança Contemporânea Avançada",
      level: "Avançado",
      duration: "90 min",
      price: "R$ 75",
      schedule: "Ter, Qui • 19:30",
      location: "Sala 2",
      students: 8,
      maxStudents: 10,
      image: "/contemporary-dance-expressive-movement.jpg",
    },
    {
      id: 3,
      name: "Ballet Infantil",
      level: "Infantil (6-12 anos)",
      duration: "45 min",
      price: "R$ 40",
      schedule: "Seg, Qua • 16:00",
      location: "Estúdio Principal",
      students: 15,
      maxStudents: 15,
      image: "/children-kids-ballet-dance-class.jpg",
    },
    {
      id: 4,
      name: "Jazz Moderno",
      level: "Intermediário",
      duration: "60 min",
      price: "R$ 55",
      schedule: "Ter, Qui, Sáb • 17:00",
      location: "Sala 1",
      students: 10,
      maxStudents: 12,
      image: "/modern-jazz-dance-energetic-performance.jpg",
    },
    {
      id: 5,
      name: "Hip Hop Teens",
      level: "Intermediário",
      duration: "60 min",
      price: "R$ 50",
      schedule: "Qua, Sex • 17:30",
      location: "Sala 2",
      students: 14,
      maxStudents: 15,
      image: "/teen-hip-hop-street-dance-urban-style.jpg",
    },
    {
      id: 6,
      name: "Ballet Clássico Avançado",
      level: "Avançado",
      duration: "90 min",
      price: "R$ 80",
      schedule: "Seg, Qua, Sex • 20:00",
      location: "Estúdio Principal",
      students: 6,
      maxStudents: 8,
      image: "/advanced-ballet-pointe-shoes-professional-dancers.jpg",
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
            src="/dance-students-dancing-in-motion-studio.jpg"
            alt="Grupo de dançarinos praticando em estúdio de dança"
            className="w-full h-full object-cover object-center"
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
        <div className="text-center space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold text-[#3D2C2E]">Veja Como Seu Perfil Ficará</h2>
          <p className="text-base md:text-lg text-[#3D2C2E] opacity-80">
            Mostre sua escola, aulas e horários de forma profissional
          </p>
        </div>

        <Card className="bg-white border-[#E5D6CD] overflow-hidden shadow-lg">
          {/* Header com foto de capa grande */}
          <div className="relative h-48 md:h-64 lg:h-80">
            <img src="/images/image.png" alt="Capa da escola" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#3D2C2E]/20 to-[#3D2C2E]/60" />

            {/* Foto de perfil sobreposta */}
            <div className="absolute -bottom-16 md:-bottom-20 left-6 md:left-8">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full p-2 shadow-xl">
                <img
                  src="/dance-instructor-profile-photo.jpg"
                  alt="Foto do perfil"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          <CardContent className="pt-20 md:pt-24 px-6 md:px-8 pb-8">
            {/* Informações do perfil */}
            <div className="space-y-4 mb-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#3D2C2E]">Escola de Ballet Maria Clara</h3>
                <p className="text-base text-[#3D2C2E] opacity-70 mt-2">
                  Ballet Clássico • Contemporâneo • Jazz • Hip Hop
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-[#CFB2A8] text-[#CFB2A8]" />
                  ))}
                  <span className="text-base text-[#3D2C2E] ml-2 font-semibold">4.9</span>
                  <span className="text-sm text-[#3D2C2E] opacity-70 ml-1">(127 avaliações)</span>
                </div>
                <span className="text-sm text-[#3D2C2E] opacity-70">•</span>
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-[#3D2C2E] opacity-70" />
                  <span className="text-sm text-[#3D2C2E] opacity-70">320 alunos</span>
                </div>
                <span className="text-sm text-[#3D2C2E] opacity-70">•</span>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-[#3D2C2E] opacity-70" />
                  <span className="text-sm text-[#3D2C2E] opacity-70">São Paulo, SP</span>
                </div>
              </div>

              <p className="text-base text-[#3D2C2E] opacity-80 leading-relaxed">
                Escola especializada em ballet clássico e danças modernas com mais de 15 anos de tradição. Nossa missão
                é formar dançarinos técnicos e expressivos em um ambiente acolhedor, profissional e inspirador.
                Oferecemos aulas para todas as idades e níveis.
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-[#E5D6CD] my-8" />

            {/* QR code and shareable link section */}
            <div className="bg-[#F5F0EB] rounded-lg p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-6 items-center">
                {/* QR Code */}
                <div className="flex-shrink-0">
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <img src="/qr-code-for-dance-school-profile.jpg" alt="QR Code do perfil" className="w-40 h-40" />
                  </div>
                </div>

                {/* Link info */}
                <div className="flex-1 space-y-4 text-center lg:text-left">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 justify-center lg:justify-start">
                      <Share2 className="h-5 w-5 text-[#3D2C2E]" />
                      <h4 className="text-lg font-bold text-[#3D2C2E]">Compartilhe Seu Perfil</h4>
                    </div>
                    <p className="text-sm text-[#3D2C2E] opacity-80">
                      Use este link único e QR code em suas ações de marketing, redes sociais e materiais impressos
                    </p>
                  </div>

                  {/* Copyable link */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1 bg-white border border-[#E5D6CD] rounded-lg px-4 py-3 flex items-center justify-between">
                      <span className="text-sm text-[#3D2C2E] font-mono truncate">
                        sissone.com.br/escola-ballet-maria-clara
                      </span>
                    </div>
                    <Button
                      onClick={handleCopyLink}
                      className="bg-[#3D2C2E] hover:bg-[#3D2C2E]/90 text-white px-4 whitespace-nowrap"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copiar Link
                        </>
                      )}
                    </Button>
                  </div>

                  <p className="text-xs text-[#3D2C2E] opacity-70">
                    💡 Dica: Adicione o QR code em seus flyers, cartões de visita e na recepção da sua escola
                  </p>
                </div>
              </div>
            </div>

            {/* Cronograma de aulas */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl md:text-2xl font-bold text-[#3D2C2E]">Cronograma de Aulas</h4>
                  <p className="text-sm text-[#3D2C2E] opacity-70 mt-1">{classSchedule.length} aulas disponíveis</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {classSchedule.map((classItem) => (
                  <Card
                    key={classItem.id}
                    className="bg-[#F5F0EB] border-[#E5D6CD] overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Imagem da aula */}
                      <div className="w-full sm:w-40 h-40 sm:h-auto bg-[#E5D6CD] flex-shrink-0 overflow-hidden">
                        <img
                          src={classItem.image || "/placeholder.svg"}
                          alt={classItem.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>

                      {/* Conteúdo da aula */}
                      <CardContent className="p-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div>
                            <h5 className="font-bold text-[#3D2C2E] text-base leading-tight">{classItem.name}</h5>
                            <p className="text-xs text-[#3D2C2E] opacity-70 mt-0.5">{classItem.level}</p>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-xs text-[#3D2C2E] opacity-80">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{classItem.schedule}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-[#3D2C2E] opacity-80">
                              <Clock className="h-3.5 w-3.5" />
                              <span>{classItem.duration}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-[#3D2C2E] opacity-80">
                              <MapPin className="h-3.5 w-3.5" />
                              <span>{classItem.location}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-[#3D2C2E] opacity-80">
                              <Users className="h-3.5 w-3.5" />
                              <span>
                                {classItem.students}/{classItem.maxStudents} alunos
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E5D6CD]">
                          <p className="text-lg font-bold text-[#3D2C2E]">{classItem.price}</p>
                          <Button
                            size="sm"
                            className="bg-[#3D2C2E] hover:bg-[#3D2C2E]/90 text-white text-xs px-4 py-1.5 h-auto"
                          >
                            Ver Detalhes
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
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
