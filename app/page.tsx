"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, MapPin, Star, Clock, Calendar, User, Check, Filter, Edit3, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from "next/image"

type Screen = "home" | "filters" | "detail" | "schedule" | "confirmation" | "search-results"

const SissonePrototype = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedClass, setSelectedClass] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [searchLocation, setSearchLocation] = useState("")
  const [searchWhen, setSearchWhen] = useState("")
  const [searchModality, setSearchModality] = useState<string[]>([])
  const [showCalendarModal, setShowCalendarModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState("")

  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // New state variables for weekly selection
  const [showWeeklyModal, setShowWeeklyModal] = useState(false)
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [selectedShifts, setSelectedShifts] = useState<string[]>([])

  // Search results state
  const [showSearchFiltersModal, setShowSearchFiltersModal] = useState(false)
  const [searchFilters, setSearchFilters] = useState({
    categories: [] as string[],
    days: [] as string[],
    shifts: [] as string[],
    priceMin: "",
    priceMax: "",
    rating: "",
  })

  const [categoryScrollPositions, setCategoryScrollPositions] = useState<Record<string, number>>({})

  const showToastNotification = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleGoogleLogin = () => {
    setIsLoggedIn(true)
    setUserEmail("usuario@exemplo.com")
    showToastNotification("Login realizado com sucesso!")
  }

  const handleAddToCalendar = () => {
    showToastNotification("Aula adicionada ao calendário com sucesso!")
  }

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const classes = [
    {
      id: 1,
      name: "Contemporary Flow",
      school: "Movement Studio",
      rating: 4.8,
      price: "R$ 45",
      time: "19:00",
      days: ["Segunda-feira", "Quarta-feira"],
      location: "Centro",
      image: "/contemporary-dance-class-studio.jpg",
      images: [
        "/contemporary-dance-class-studio-interior.jpg",
        "/contemporary-dance-students-practicing.jpg",
        "/contemporary-dance-instructor-teaching.jpg",
      ],
      tag: "Popular",
      tagColor: "bg-orange-100 text-orange-800",
      category: "contemporary",
      reviews: [
        {
          name: "Ana Silva",
          avatar: "AS",
          hasPhoto: false,
          rating: 5,
          comment: "Aula incrível! A professora é muito atenciosa e o ambiente é acolhedor.",
        },
        {
          name: "Carlos Santos",
          avatar: "/male-profile.png",
          hasPhoto: true,
          rating: 5,
          comment: "Melhor aula de contemporary da cidade. Recomendo muito!",
        },
        {
          name: "Maria Oliveira",
          avatar: "MO",
          hasPhoto: false,
          rating: 4,
          comment: "Ótima para iniciantes, explicações claras e didáticas.",
        },
      ],
    },
    {
      id: 2,
      name: "Hip Hop Basics",
      school: "Urban Dance Co.",
      rating: 4.9,
      price: "R$ 35",
      time: "18:30",
      days: ["Terça-feira", "Quinta-feira"],
      location: "Zona Sul",
      image: "/hip-hop-dance-class-urban.jpg",
      images: [
        "/hip-hop-dance-studio-with-students.jpg",
        "/hip-hop-dancers-performing-moves.jpg",
        "/urban-dance-class-group.jpg",
      ],
      tag: "Preferido dos Alunos",
      tagColor: "bg-purple-100 text-purple-800",
      category: "hip-hop",
      reviews: [
        {
          name: "João Pedro",
          avatar: "/young-male-profile.png",
          hasPhoto: true,
          rating: 5,
          comment: "Energia incrível! Saio de cada aula motivado e feliz.",
        },
        {
          name: "Beatriz Costa",
          avatar: "BC",
          hasPhoto: false,
          rating: 5,
          comment: "Professor top, ensina com muita paciência e técnica.",
        },
        {
          name: "Rafael Lima",
          avatar: "/male-student-photo.jpg",
          hasPhoto: true,
          rating: 5,
          comment: "Ambiente descontraído e aulas muito bem estruturadas.",
        },
      ],
    },
    {
      id: 3,
      name: "Ballet Fundamentals",
      school: "Classical Arts",
      rating: 4.7,
      price: "R$ 55",
      time: "17:00",
      days: ["Segunda-feira", "Sexta-feira"],
      location: "Zona Norte",
      image: "/ballet-dance-class-studio.jpg",
      images: ["/classical-ballet-studio-interior.jpg", "/ballet-dancers-at-barre.jpg", "/ballet-class-instructor.jpg"],
      tag: "Novo",
      tagColor: "bg-green-100 text-green-800",
      category: "ballet",
      reviews: [
        {
          name: "Isabella Ferreira",
          avatar: "IF",
          hasPhoto: false,
          rating: 5,
          comment: "Técnica impecável, professora com formação clássica excelente.",
        },
        {
          name: "Sophia Rodrigues",
          avatar: "/female-ballet-dancer.jpg",
          hasPhoto: true,
          rating: 4,
          comment: "Aulas bem estruturadas, ótima para quem quer base sólida.",
        },
        {
          name: "Helena Martins",
          avatar: "HM",
          hasPhoto: false,
          rating: 5,
          comment: "Ambiente elegante e profissional, recomendo muito!",
        },
      ],
    },
    {
      id: 4,
      name: "Salsa Iniciante",
      school: "Ritmo Latino",
      rating: 4.6,
      price: "R$ 40",
      time: "20:00",
      days: ["Quinta-feira", "Sábado"],
      location: "Centro",
      image: "/salsa-dance-class-couple.jpg",
      images: [
        "/salsa-studio-interior.jpg",
        "/salsa-dancers-performance.jpg",
        "/salsa-dance-class-couple.jpg",
      ],
      tag: "Quente",
      tagColor: "bg-red-100 text-red-800",
      category: "salsa",
      reviews: [
        {
          name: "Pedro Oliveira",
          avatar: "/instructor-profile.jpg",
          hasPhoto: true,
          rating: 5,
          comment: "Ambiente descontraído e professores incríveis!",
        },
        {
          name: "Carla Mendes",
          avatar: "CM",
          hasPhoto: false,
          rating: 4,
          comment: "Ótimo para quem está começando na salsa.",
        },
        {
          name: "Roberto Silva",
          avatar: "/male-dancer-avatar.jpg",
          hasPhoto: true,
          rating: 5,
          comment: "Melhor escola de salsa da cidade!",
        },
      ],
    },
    {
      id: 5,
      name: "Jazz Moderno",
      school: "Studio Movimento",
      rating: 4.8,
      price: "R$ 50",
      time: "19:30",
      days: ["Segunda-feira", "Quarta-feira"],
      location: "Zona Sul",
      image: "/jazz-dance-class-modern.jpg",
      images: ["/jazz-studio-rehearsal.jpg", "/jazz-dancers-choreography.jpg", "/jazz-dance-class-modern.jpg"],
      tag: "Trending",
      tagColor: "bg-yellow-100 text-yellow-800",
      category: "jazz",
      reviews: [
        {
          name: "Marina Santos",
          avatar: "/female-dancer-avatar.jpg",
          hasPhoto: true,
          rating: 5,
          comment: "Técnica excelente e coreografias incríveis!",
        },
        {
          name: "Lucas Ferreira",
          avatar: "LF",
          hasPhoto: false,
          rating: 5,
          comment: "Professor muito didático e paciente.",
        },
        {
          name: "Amanda Costa",
          avatar: "/instructor-profile.jpg",
          hasPhoto: true,
          rating: 4,
          comment: "Aulas dinâmicas e muito divertidas.",
        },
      ],
    },
    {
      id: 6,
      name: "Contemporary Intensive",
      school: "Espaço Dança",
      rating: 4.9,
      price: "R$ 48",
      time: "20:30",
      days: ["Terça-feira", "Quinta-feira"],
      location: "Centro",
      image: "/contemporary-dance-students-practicing.jpg",
      images: ["/contemporary-dance-class-studio.jpg", "/contemporary-dance-instructor-teaching.jpg"],
      tag: "Intensivo",
      tagColor: "bg-blue-100 text-blue-800",
      category: "contemporary",
      reviews: [
        {
          name: "Fernanda Lima",
          avatar: "FL",
          hasPhoto: false,
          rating: 5,
          comment: "Desafia os limites! Ótima para quem já tem experiência.",
        },
      ],
    },
    {
      id: 7,
      name: "Hip Hop Advanced",
      school: "Street Style Academy",
      rating: 4.8,
      price: "R$ 42",
      time: "21:00",
      days: ["Segunda-feira", "Quarta-feira"],
      location: "Zona Sul",
      image: "/hip-hop-dancers-performing-moves.jpg",
      images: ["/hip-hop-dance-class-urban.jpg", "/urban-dance-class-group.jpg"],
      tag: "Avançado",
      tagColor: "bg-indigo-100 text-indigo-800",
      category: "hip-hop",
      reviews: [
        {
          name: "Diego Santos",
          avatar: "DS",
          hasPhoto: false,
          rating: 5,
          comment: "Coreografias desafiadoras e muito criativas!",
        },
      ],
    },
    {
      id: 8,
      name: "Ballet Clássico",
      school: "Academia de Ballet Real",
      rating: 4.9,
      price: "R$ 60",
      time: "16:00",
      days: ["Terça-feira", "Quinta-feira", "Sábado"],
      location: "Zona Norte",
      image: "/ballet-dancers-at-barre.jpg",
      images: ["/classical-ballet-studio-interior.jpg", "/ballet-class-instructor.jpg"],
      tag: "Premium",
      tagColor: "bg-pink-100 text-pink-800",
      category: "ballet",
      reviews: [
        {
          name: "Valentina Costa",
          avatar: "VC",
          hasPhoto: false,
          rating: 5,
          comment: "Ensino de altíssimo nível, vale cada centavo!",
        },
      ],
    },
    {
      id: 9,
      name: "Salsa Avançada",
      school: "Clube Latino",
      rating: 4.7,
      price: "R$ 45",
      time: "21:30",
      days: ["Sexta-feira", "Sábado"],
      location: "Centro",
      image: "/salsa-dancers-performance.jpg",
      images: ["/salsa-dance-class-couple.jpg", "/salsa-studio-interior.jpg"],
      tag: "Noturno",
      tagColor: "bg-violet-100 text-violet-800",
      category: "salsa",
      reviews: [
        {
          name: "Ricardo Alves",
          avatar: "RA",
          hasPhoto: false,
          rating: 5,
          comment: "Ambiente animado e muita prática!",
        },
      ],
    },
    {
      id: 10,
      name: "Jazz Funk",
      school: "Fusion Dance Studio",
      rating: 4.8,
      price: "R$ 52",
      time: "18:00",
      days: ["Quarta-feira", "Sexta-feira"],
      location: "Zona Sul",
      image: "/jazz-dancers-choreography.jpg",
      images: ["/jazz-dance-class-modern.jpg", "/jazz-studio-rehearsal.jpg"],
      tag: "Fusion",
      tagColor: "bg-teal-100 text-teal-800",
      category: "jazz",
      reviews: [
        {
          name: "Camila Rocha",
          avatar: "CR",
          hasPhoto: false,
          rating: 5,
          comment: "Mistura perfeita de estilos, super dinâmica!",
        },
      ],
    },
    {
      id: 11,
      name: "Forró Pé de Serra",
      school: "Arraiá do Nordeste",
      rating: 4.7,
      price: "R$ 38",
      time: "19:00",
      days: ["Quinta-feira", "Sexta-feira"],
      location: "Centro",
      image: "/salsa-dance-class-couple.jpg",
      images: ["/salsa-studio-interior.jpg"],
      tag: "Tradicional",
      tagColor: "bg-amber-100 text-amber-800",
      category: "forro",
      reviews: [
        {
          name: "João Mendes",
          avatar: "JM",
          hasPhoto: false,
          rating: 5,
          comment: "Melhor forró da cidade!",
        },
      ],
    },
    {
      id: 12,
      name: "Forró Universitário",
      school: "Pé de Valsa",
      rating: 4.6,
      price: "R$ 35",
      time: "20:30",
      days: ["Terça-feira", "Sábado"],
      location: "Zona Sul",
      image: "/salsa-dancers-performance.jpg",
      images: ["/salsa-dance-class-couple.jpg"],
      tag: "Jovem",
      tagColor: "bg-lime-100 text-lime-800",
      category: "forro",
      reviews: [
        {
          name: "Paula Santos",
          avatar: "PS",
          hasPhoto: false,
          rating: 5,
          comment: "Ambiente descontraído e muita diversão!",
        },
      ],
    },
    {
      id: 13,
      name: "Dança de Salão Iniciante",
      school: "Centro de Dança Social",
      rating: 4.8,
      price: "R$ 50",
      time: "19:30",
      days: ["Segunda-feira", "Quarta-feira"],
      location: "Centro",
      image: "/salsa-dance-class-couple.jpg",
      images: ["/salsa-studio-interior.jpg", "/salsa-dancers-performance.jpg"],
      tag: "Completo",
      tagColor: "bg-cyan-100 text-cyan-800",
      category: "ballroom",
      reviews: [
        {
          name: "Marcos Silva",
          avatar: "MS",
          hasPhoto: false,
          rating: 5,
          comment: "Aprendi vários estilos de uma vez!",
        },
      ],
    },
    {
      id: 14,
      name: "Valsa e Tango",
      school: "Academia de Dança Elegante",
      rating: 4.9,
      price: "R$ 65",
      time: "18:00",
      days: ["Terça-feira", "Quinta-feira"],
      location: "Zona Norte",
      image: "/salsa-dancers-performance.jpg",
      images: ["/salsa-dance-class-couple.jpg"],
      tag: "Elegante",
      tagColor: "bg-rose-100 text-rose-800",
      category: "ballroom",
      reviews: [
        {
          name: "Patricia Lima",
          avatar: "PL",
          hasPhoto: false,
          rating: 5,
          comment: "Elegância pura, professores impecáveis!",
        },
      ],
    },
    {
      id: 15,
      name: "Samba no Pé",
      school: "Escola de Samba Unidos",
      rating: 4.7,
      price: "R$ 40",
      time: "20:00",
      days: ["Quarta-feira", "Sexta-feira"],
      location: "Zona Sul",
      image: "/salsa-studio-interior.jpg",
      images: ["/salsa-dancers-performance.jpg"],
      tag: "Carnaval",
      tagColor: "bg-yellow-100 text-yellow-800",
      category: "samba",
      reviews: [
        {
          name: "Juliana Costa",
          avatar: "JC",
          hasPhoto: false,
          rating: 5,
          comment: "Preparação perfeita para o carnaval!",
        },
      ],
    },
    {
      id: 16,
      name: "Samba de Gafieira",
      school: "Gafieira Carioca",
      rating: 4.8,
      price: "R$ 45",
      time: "21:00",
      days: ["Quinta-feira", "Sábado"],
      location: "Centro",
      image: "/salsa-dance-class-couple.jpg",
      images: ["/salsa-studio-interior.jpg"],
      tag: "Carioca",
      tagColor: "bg-emerald-100 text-emerald-800",
      category: "samba",
      reviews: [
        {
          name: "Roberto Souza",
          avatar: "RS",
          hasPhoto: false,
          rating: 5,
          comment: "Tradição e qualidade!",
        },
      ],
    },
    {
      id: 17,
      name: "Zouk Brasileiro",
      school: "Studio Zouk Brasil",
      rating: 4.9,
      price: "R$ 55",
      time: "19:00",
      days: ["Segunda-feira", "Quarta-feira"],
      location: "Zona Sul",
      image: "/salsa-dancers-performance.jpg",
      images: ["/salsa-dance-class-couple.jpg"],
      tag: "Sensual",
      tagColor: "bg-fuchsia-100 text-fuchsia-800",
      category: "zouk",
      reviews: [
        {
          name: "Larissa Oliveira",
          avatar: "LO",
          hasPhoto: false,
          rating: 5,
          comment: "Conexão e técnica perfeitas!",
        },
      ],
    },
    {
      id: 18,
      name: "Zouk Avançado",
      school: "Escola de Zouk Pro",
      rating: 4.8,
      price: "R$ 60",
      time: "20:30",
      days: ["Terça-feira", "Quinta-feira"],
      location: "Centro",
      image: "/salsa-studio-interior.jpg",
      images: ["/salsa-dancers-performance.jpg"],
      tag: "Pro",
      tagColor: "bg-purple-100 text-purple-800",
      category: "zouk",
      reviews: [
        {
          name: "André Martins",
          avatar: "AM",
          hasPhoto: false,
          rating: 5,
          comment: "Nível avançado de verdade!",
        },
      ],
    },
    {
      id: 19,
      name: "Bachata Sensual",
      school: "Ritmo Latino Dance",
      rating: 4.7,
      price: "R$ 42",
      time: "19:30",
      days: ["Quarta-feira", "Sexta-feira"],
      location: "Zona Sul",
      image: "/salsa-dance-class-couple.jpg",
      images: ["/salsa-studio-interior.jpg"],
      tag: "Romântico",
      tagColor: "bg-red-100 text-red-800",
      category: "bachata",
      reviews: [
        {
          name: "Renata Silva",
          avatar: "RS2",
          hasPhoto: false,
          rating: 5,
          comment: "Aprendi a me conectar com a música!",
        },
      ],
    },
    {
      id: 20,
      name: "Bachata Dominicana",
      school: "Caribe Dance School",
      rating: 4.8,
      price: "R$ 48",
      time: "21:00",
      days: ["Sexta-feira", "Sábado"],
      location: "Centro",
      image: "/salsa-dancers-performance.jpg",
      images: ["/salsa-dance-class-couple.jpg"],
      tag: "Autêntico",
      tagColor: "bg-orange-100 text-orange-800",
      category: "bachata",
      reviews: [
        {
          name: "Felipe Costa",
          avatar: "FC",
          hasPhoto: false,
          rating: 5,
          comment: "Bachata raiz, como deve ser!",
        },
      ],
    },
  ]

  const getClassesByCategory = (category: string) => {
    return classes.filter(c => c.category === category)
  }

  const scrollCategory = (categoryId: string, direction: 'left' | 'right') => {
    const container = document.getElementById(`category-${categoryId}`)
    if (container) {
      const scrollAmount = 320 // Card width + gap
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const getSearchSummary = () => {
    const parts = []
    if (searchLocation) parts.push(searchLocation)
    if (searchWhen === "today") parts.push("Hoje")
    else if (searchWhen === "specific" && selectedDate) parts.push(selectedDate)
    else if (searchWhen === "weekly" && selectedDays.length > 0) parts.push(selectedDays.join(", "))
    if (searchModality.length > 0) parts.push(searchModality.join(", "))

    return parts.length > 0 ? parts.join(" • ") : "Buscar aulas"
  }

  const handleMapMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - mapPosition.x, y: e.clientY - mapPosition.y })
  }

  const handleMapMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setMapPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMapMouseUp = () => {
    setIsDragging(false)
  }

  const navigateToSearchResults = (filter: string) => {
    setSearchModality([filter])
    setCurrentScreen("search-results")
  }

  const renderHomeScreen = () => (
    <div className="h-screen bg-[#F5F0EB] flex flex-col overflow-hidden">
      <div className="mx-auto w-full max-w-[1040px]">
        {/* Header */}
        <div className="bg-[#F5F0EB] p-4 shadow-sm flex-shrink-0">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Image src="/sissone-logo.svg" alt="Sissone" width={120} height={40} className="h-10 w-auto" />
            </div>
            <p className="text-sm text-[#3D2C2E] opacity-70">Para quem quer aprender, ensinar e viver a dança</p>
          </div>
        </div>

        {/* Search Button */}
        <div className="p-4 bg-[#F5F0EB] border-b flex-shrink-0">
          <Button
            variant="outline"
            className="w-full h-12 border-[#CFB2A8] text-[#3D2C2E] bg-white justify-start px-4 hover:bg-[#E5D6CD]"
            onClick={() => setShowSearchModal(true)}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#CFB2A8] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-medium text-sm">{"Iniciar busca"} </div>
                <div className="text-xs text-gray-500">{"Lugar • Data • Modalidade"}</div>
              </div>
            </div>
          </Button>
        </div>

        {/* Quick Filters */}
        <div className="p-4 bg-[#F5F0EB] border-b flex-shrink-0">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {["Ballet", "Jazz", "Forró", "Ao ar livre", "Profissionais", "Dança de salão", "Aula Particular"].map(
              (filter) => (
                <Button
                  key={filter}
                  variant="outline"
                  className="flex-shrink-0 h-10 px-4 border-[#CFB2A8] text-[#3D2C2E] bg-transparent hover:bg-[#8B7355] hover:text-white transition-colors"
                  onClick={() => navigateToSearchResults(filter)}
                >
                  <span className="text-sm font-medium whitespace-nowrap">{filter}</span>
                </Button>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto bg-[#F5F0EB]">
        <div className="mx-auto w-full max-w-[1040px]">
          
          {/* Faça uma aula ainda hoje */}
          <div className="py-8">
            <div className="px-4 mb-4 flex items-center justify-between">
              <button 
                onClick={() => navigateToSearchResults("Hoje")}
                className="text-xl font-bold text-[#3D2C2E] hover:text-[#8B7355] transition-colors"
              >
                Faça uma aula ainda hoje
              </button>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-[#E5D6CD]"
                  onClick={() => scrollCategory('today', 'left')}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-[#E5D6CD]"
                  onClick={() => scrollCategory('today', 'right')}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div id="category-today" className="flex gap-4 overflow-x-auto scrollbar-hide px-4">
              {classes.slice(0, 8).map((classItem) => (
                <Card
                  key={classItem.id}
                  className="flex-shrink-0 w-72 bg-white border-[#E5D6CD] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedClass(classItem)
                    setCurrentScreen("detail")
                  }}
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={classItem.image || "/placeholder.svg"}
                      alt={classItem.name}
                      fill
                      className="object-cover"
                    />
                    <button
                      className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(classItem.id)
                      }}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(classItem.id) ? "fill-[#CFB2A8] text-[#CFB2A8]" : "text-[#3D2C2E]"
                        }`}
                      />
                    </button>
                    <div className="absolute top-2 left-2">
                      <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>
                        {classItem.tag}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-[#3D2C2E] text-lg line-clamp-1">{classItem.name}</h3>
                    <p className="text-sm text-[#3D2C2E] opacity-70 line-clamp-1">{classItem.school}</p>
                    <div className="flex items-center gap-1 my-2">
                      <Star className="h-4 w-4 fill-[#CFB2A8] text-[#CFB2A8]" />
                      <span className="text-sm font-medium text-[#3D2C2E] pointer-events-none">{classItem.rating}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-lg font-bold text-[#3D2C2E] pointer-events-none">{classItem.price}</span>
                      <Button size="sm" className="bg-[#8B7355] hover:bg-[#6F5C46] text-white">
                        Ver detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contemporary */}
          <div className="py-8">
            <div className="px-4 mb-4 flex items-center justify-between">
              <button 
                onClick={() => navigateToSearchResults("Contemporary")}
                className="text-xl font-bold text-[#3D2C2E] hover:text-[#8B7355] transition-colors"
              >
                Contemporary
              </button>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-[#E5D6CD]"
                  onClick={() => scrollCategory('contemporary', 'left')}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-[#E5D6CD]"
                  onClick={() => scrollCategory('contemporary', 'right')}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div id="category-contemporary" className="flex gap-4 overflow-x-auto scrollbar-hide px-4">
              {getClassesByCategory('contemporary').map((classItem) => (
                <Card
                  key={classItem.id}
                  className="flex-shrink-0 w-72 bg-white border-[#E5D6CD] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedClass(classItem)
                    setCurrentScreen("detail")
                  }}
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={classItem.image || "/placeholder.svg"}
                      alt={classItem.name}
                      fill
                      className="object-cover"
                    />
                    <button
                      className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(classItem.id)
                      }}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(classItem.id) ? "fill-[#CFB2A8] text-[#CFB2A8]" : "text-[#3D2C2E]"
                        }`}
                      />
                    </button>
                    <div className="absolute top-2 left-2">
                      <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>
                        {classItem.tag}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-[#3D2C2E] text-lg line-clamp-1">{classItem.name}</h3>
                    <p className="text-sm text-[#3D2C2E] opacity-70 line-clamp-1">{classItem.school}</p>
                    <div className="flex items-center gap-1 my-2">
                      <Star className="h-4 w-4 fill-[#CFB2A8] text-[#CFB2A8]" />
                      <span className="text-sm font-medium text-[#3D2C2E] pointer-events-none">{classItem.rating}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-lg font-bold text-[#3D2C2E] pointer-events-none">{classItem.price}</span>
                      <Button size="sm" className="bg-[#8B7355] hover:bg-[#6F5C46] text-white">
                        Ver detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Hip Hop */}
          <div className="py-8">
            <div className="px-4 mb-4 flex items-center justify-between">
              <button 
                onClick={() => navigateToSearchResults("Hip Hop")}
                className="text-xl font-bold text-[#3D2C2E] hover:text-[#8B7355] transition-colors"
              >
                Hip Hop
              </button>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-[#E5D6CD]"
                  onClick={() => scrollCategory('hip-hop', 'left')}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-[#E5D6CD]"
                  onClick={() => scrollCategory('hip-hop', 'right')}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div id="category-hip-hop" className="flex gap-4 overflow-x-auto scrollbar-hide px-4">
              {getClassesByCategory('hip-hop').map((classItem) => (
                <Card
                  key={classItem.id}
                  className="flex-shrink-0 w-72 bg-white border-[#E5D6CD] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedClass(classItem)
                    setCurrentScreen("detail")
                  }}
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={classItem.image || "/placeholder.svg"}
                      alt={classItem.name}
                      fill
                      className="object-cover"
                    />
                    <button
                      className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(classItem.id)
                      }}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(classItem.id) ? "fill-[#CFB2A8] text-[#CFB2A8]" : "text-[#3D2C2E]"
                        }`}
                      />
                    </button>
                    <div className="absolute top-2 left-2">
                      <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>
                        {classItem.tag}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-[#3D2C2E] text-lg line-clamp-1">{classItem.name}</h3>
                    <p className="text-sm text-[#3D2C2E] opacity-70 line-clamp-1">{classItem.school}</p>
                    <div className="flex items-center gap-1 my-2">
                      <Star className="h-4 w-4 fill-[#CFB2A8] text-[#CFB2A8]" />
                      <span className="text-sm font-medium text-[#3D2C2E] pointer-events-none">{classItem.rating}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-lg font-bold text-[#3D2C2E] pointer-events-none">{classItem.price}</span>
                      <Button size="sm" className="bg-[#8B7355] hover:bg-[#6F5C46] text-white">
                        Ver detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Ballet */}
          <div className="py-8">
            <div className="px-4 mb-4 flex items-center justify-between">
              <button 
                onClick={() => navigateToSearchResults("Ballet")}
                className="text-xl font-bold text-[#3D2C2E] hover:text-[#8B7355] transition-colors"
              >
                Ballet
              </button>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-[#E5D6CD]"
                  onClick={() => scrollCategory('ballet', 'left')}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-[#E5D6CD]"
                  onClick={() => scrollCategory('ballet', 'right')}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div id="category-ballet" className="flex gap-4 overflow-x-auto scrollbar-hide px-4">
              {getClassesByCategory('ballet').map((classItem) => (
                <Card
                  key={classItem.id}
                  className="flex-shrink-0 w-72 bg-white border-[#E5D6CD] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedClass(classItem)
                    setCurrentScreen("detail")
                  }}
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={classItem.image || "/placeholder.svg"}
                      alt={classItem.name}
                      fill
                      className="object-cover"
                    />
                    <button
                      className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(classItem.id)
                      }}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(classItem.id) ? "fill-[#CFB2A8] text-[#CFB2A8]" : "text-[#3D2C2E]"
                        }`}
                      />
                    </button>
                    <div className="absolute top-2 left-2">
                      <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>
                        {classItem.tag}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-[#3D2C2E] text-lg line-clamp-1">{classItem.name}</h3>
                    <p className="text-sm text-[#3D2C2E] opacity-70 line-clamp-1">{classItem.school}</p>
                    <div className="flex items-center gap-1 my-2">
                      <Star className="h-4 w-4 fill-[#CFB2A8] text-[#CFB2A8]" />
                      <span className="text-sm font-medium text-[#3D2C2E] pointer-events-none">{classItem.rating}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-lg font-bold text-[#3D2C2E] pointer-events-none">{classItem.price}</span>
                      <Button size="sm" className="bg-[#8B7355] hover:bg-[#6F5C46] text-white">
                        Ver detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="py-8">
            <div className="px-4 mb-4 flex items-center justify-between">
              <button 
                onClick={() => navigateToSearchResults("Forró")}
                className="text-xl font-bold text-[#3D2C2E] hover:text-[#8B7355] transition-colors"
              >
                Forró
              </button>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-[#E5D6CD]"
                  onClick={() => scrollCategory('forro', 'left')}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-[#E5D6CD]"
                  onClick={() => scrollCategory('forro', 'right')}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div id="category-forro" className="flex gap-4 overflow-x-auto scrollbar-hide px-4">
              {getClassesByCategory('forro').map((classItem) => (
                <Card
                  key={classItem.id}
                  className="flex-shrink-0 w-72 bg-white border-[#E5D6CD] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedClass(classItem)
                    setCurrentScreen("detail")
                  }}
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={classItem.image || "/placeholder.svg"}
                      alt={classItem.name}
                      fill
                      className="object-cover"
                    />
                    <button
                      className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(classItem.id)
                      }}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(classItem.id) ? "fill-[#CFB2A8] text-[#CFB2A8]" : "text-[#3D2C2E]"
                        }`}
                      />
                    </button>
                    <div className="absolute top-2 left-2">
                      <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>
                        {classItem.tag}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-[#3D2C2E] text-lg line-clamp-1">{classItem.name}</h3>
                    <p className="text-sm text-[#3D2C2E] opacity-70 line-clamp-1">{classItem.school}</p>
                    <div className="flex items-center gap-1 my-2">
                      <Star className="h-4 w-4 fill-[#CFB2A8] text-[#CFB2A8]" />
                      <span className="text-sm font-medium text-[#3D2C2E] pointer-events-none">{classItem.rating}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-lg font-bold text-[#3D2C2E] pointer-events-none">{classItem.price}</span>
                      <Button size="sm" className="bg-[#8B7355] hover:bg-[#6F5C46] text-white">
                        Ver detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="py-8">
            <div className="px-4 mb-4 flex items-center justify-between">
              <button 
                onClick={() => navigateToSearchResults("Dança de salão")}
                className="text-xl font-bold text-[#3D2C2E] hover:text-[#8B7355] transition-colors"
              >
                Dança de Salão
              </button>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-[#E5D6CD]"
                  onClick={() => scrollCategory('ballroom', 'left')}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-[#E5D6CD]"
                  onClick={() => scrollCategory('ballroom', 'right')}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div id="category-ballroom" className="flex gap-4 overflow-x-auto scrollbar-hide px-4">
              {getClassesByCategory('ballroom').map((classItem) => (
                <Card
                  key={classItem.id}
                  className="flex-shrink-0 w-72 bg-white border-[#E5D6CD] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedClass(classItem)
                    setCurrentScreen("detail")
                  }}
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={classItem.image || "/placeholder.svg"}
                      alt={classItem.name}
                      fill
                      className="object-cover"
                    />
                    <button
                      className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(classItem.id)
                      }}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(classItem.id) ? "fill-[#CFB2A8] text-[#CFB2A8]" : "text-[#3D2C2E]"
                        }`}
                      />
                    </button>
                    <div className="absolute top-2 left-2">
                      <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>
                        {classItem.tag}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-[#3D2C2E] text-lg line-clamp-1">{classItem.name}</h3>
                    <p className="text-sm text-[#3D2C2E] opacity-70 line-clamp-1">{classItem.school}</p>
                    <div className="flex items-center gap-1 my-2">
                      <Star className="h-4 w-4 fill-[#CFB2A8] text-[#CFB2A8]" />
                      <span className="text-sm font-medium text-[#3D2C2E] pointer-events-none">{classItem.rating}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-lg font-bold text-[#3D2C2E] pointer-events-none">{classItem.price}</span>
                      <Button size="sm" className="bg-[#8B7355] hover:bg-[#6F5C46] text-white">
                        Ver detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="py-8">
            <div className="px-4 mb-4 flex items-center justify-between">
              <button 
                onClick={() => navigateToSearchResults("Samba")}
                className="text-xl font-bold text-[#3D2C2E] hover:text-[#8B7355] transition-colors"
              >
                Samba
              </button>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-[#E5D6CD]"
                  onClick={() => scrollCategory('samba', 'left')}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-[#E5D6CD]"
                  onClick={() => scrollCategory('samba', 'right')}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div id="category-samba" className="flex gap-4 overflow-x-auto scrollbar-hide px-4">
              {getClassesByCategory('samba').map((classItem) => (
                <Card
                  key={classItem.id}
                  className="flex-shrink-0 w-72 bg-white border-[#E5D6CD] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedClass(classItem)
                    setCurrentScreen("detail")
                  }}
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={classItem.image || "/placeholder.svg"}
                      alt={classItem.name}
                      fill
                      className="object-cover"
                    />
                    <button
                      className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(classItem.id)
                      }}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(classItem.id) ? "fill-[#CFB2A8] text-[#CFB2A8]" : "text-[#3D2C2E]"
                        }`}
                      />
                    </button>
                    <div className="absolute top-2 left-2">
                      <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>
                        {classItem.tag}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-[#3D2C2E] text-lg line-clamp-1">{classItem.name}</h3>
                    <p className="text-sm text-[#3D2C2E] opacity-70 line-clamp-1">{classItem.school}</p>
                    <div className="flex items-center gap-1 my-2">
                      <Star className="h-4 w-4 fill-[#CFB2A8] text-[#CFB2A8]" />
                      <span className="text-sm font-medium text-[#3D2C2E] pointer-events-none">{classItem.rating}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-lg font-bold text-[#3D2C2E] pointer-events-none">{classItem.price}</span>
                      <Button size="sm" className="bg-[#8B7355] hover:bg-[#6F5C46] text-white">
                        Ver detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="py-8">
            <div className="px-4 mb-4 flex items-center justify-between">
              <button 
                onClick={() => navigateToSearchResults("Zouk")}
                className="text-xl font-bold text-[#3D2C2E] hover:text-[#8B7355] transition-colors"
              >
                Zouk
              </button>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-[#E5D6CD]"
                  onClick={() => scrollCategory('zouk', 'left')}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-[#E5D6CD]"
                  onClick={() => scrollCategory('zouk', 'right')}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div id="category-zouk" className="flex gap-4 overflow-x-auto scrollbar-hide px-4">
              {getClassesByCategory('zouk').map((classItem) => (
                <Card
                  key={classItem.id}
                  className="flex-shrink-0 w-72 bg-white border-[#E5D6CD] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedClass(classItem)
                    setCurrentScreen("detail")
                  }}
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={classItem.image || "/placeholder.svg"}
                      alt={classItem.name}
                      fill
                      className="object-cover"
                    />
                    <button
                      className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(classItem.id)
                      }}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(classItem.id) ? "fill-[#CFB2A8] text-[#CFB2A8]" : "text-[#3D2C2E]"
                        }`}
                      />
                    </button>
                    <div className="absolute top-2 left-2">
                      <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>
                        {classItem.tag}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-[#3D2C2E] text-lg line-clamp-1">{classItem.name}</h3>
                    <p className="text-sm text-[#3D2C2E] opacity-70 line-clamp-1">{classItem.school}</p>
                    <div className="flex items-center gap-1 my-2">
                      <Star className="h-4 w-4 fill-[#CFB2A8] text-[#CFB2A8]" />
                      <span className="text-sm font-medium text-[#3D2C2E] pointer-events-none">{classItem.rating}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-lg font-bold text-[#3D2C2E] pointer-events-none">{classItem.price}</span>
                      <Button size="sm" className="bg-[#8B7355] hover:bg-[#6F5C46] text-white">
                        Ver detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="py-8 mb-8">
            <div className="px-4 mb-4 flex items-center justify-between">
              <button 
                onClick={() => navigateToSearchResults("Bachata")}
                className="text-xl font-bold text-[#3D2C2E] hover:text-[#8B7355] transition-colors"
              >
                Bachata
              </button>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-[#E5D6CD]"
                  onClick={() => scrollCategory('bachata', 'left')}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-[#E5D6CD]"
                  onClick={() => scrollCategory('bachata', 'right')}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div id="category-bachata" className="flex gap-4 overflow-x-auto scrollbar-hide px-4">
              {getClassesByCategory('bachata').map((classItem) => (
                <Card
                  key={classItem.id}
                  className="flex-shrink-0 w-72 bg-white border-[#E5D6CD] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedClass(classItem)
                    setCurrentScreen("detail")
                  }}
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={classItem.image || "/placeholder.svg"}
                      alt={classItem.name}
                      fill
                      className="object-cover"
                    />
                    <button
                      className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(classItem.id)
                      }}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(classItem.id) ? "fill-[#CFB2A8] text-[#CFB2A8]" : "text-[#3D2C2E]"
                        }`}
                      />
                    </button>
                    <div className="absolute top-2 left-2">
                      <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>
                        {classItem.tag}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-[#3D2C2E] text-lg line-clamp-1">{classItem.name}</h3>
                    <p className="text-sm text-[#3D2C2E] opacity-70 line-clamp-1">{classItem.school}</p>
                    <div className="flex items-center gap-1 my-2">
                      <Star className="h-4 w-4 fill-[#CFB2A8] text-[#CFB2A8]" />
                      <span className="text-sm font-medium text-[#3D2C2E] pointer-events-none">{classItem.rating}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-lg font-bold text-[#3D2C2E] pointer-events-none">{classItem.price}</span>
                      <Button size="sm" className="bg-[#8B7355] hover:bg-[#6F5C46] text-white">
                        Ver detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#3D2C2E]">Buscar Aulas</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowSearchModal(false)}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-[#3D2C2E] mb-2 block">Onde?</label>
                  <Input
                    placeholder="Digite o local"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="border-[#CFB2A8]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#3D2C2E] mb-2 block">Quando?</label>
                  <div className="flex gap-2">
                    <Button
                      variant={searchWhen === "today" ? "default" : "outline"}
                      className={
                        searchWhen === "today"
                          ? "bg-[#8B7355] hover:bg-[#6F5C46] text-white"
                          : "border-[#CFB2A8] text-[#3D2C2E] bg-transparent hover:bg-[#8B7355] hover:text-white"
                      }
                      onClick={() => setSearchWhen("today")}
                    >
                      Hoje
                    </Button>
                    <Button
                      variant={searchWhen === "specific" ? "default" : "outline"}
                      className={
                        searchWhen === "specific"
                          ? "bg-[#8B7355] hover:bg-[#6F5C46] text-white"
                          : "border-[#CFB2A8] text-[#3D2C2E] bg-transparent hover:bg-[#8B7355] hover:text-white"
                      }
                      onClick={() => {
                        setSearchWhen("specific")
                        setShowCalendarModal(true)
                      }}
                    >
                      Data Específica
                    </Button>
                    <Button
                      variant={searchWhen === "weekly" ? "default" : "outline"}
                      className={
                        searchWhen === "weekly"
                          ? "bg-[#8B7355] hover:bg-[#6F5C46] text-white"
                          : "border-[#CFB2A8] text-[#3D2C2E] bg-transparent hover:bg-[#8B7355] hover:text-white"
                      }
                      onClick={() => {
                        setSearchWhen("weekly")
                        setShowWeeklyModal(true)
                      }}
                    >
                      Semanalmente
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#3D2C2E] mb-2 block">Modalidade</label>
                  <div className="flex flex-wrap gap-2">
                    {["Ballet", "Contemporary", "Hip Hop", "Jazz", "Salsa", "Forró"].map((mod) => (
                      <Button
                        key={mod}
                        variant={searchModality.includes(mod) ? "default" : "outline"}
                        className={
                          searchModality.includes(mod)
                            ? "bg-[#8B7355] hover:bg-[#6F5C46] text-white"
                            : "border-[#CFB2A8] text-[#3D2C2E] bg-transparent hover:bg-[#8B7355] hover:text-white"
                        }
                        onClick={() => {
                          setSearchModality((prev) =>
                            prev.includes(mod) ? prev.filter((m) => m !== mod) : [...prev, mod],
                          )
                        }}
                      >
                        {mod}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-[#8B7355] hover:bg-[#6F5C46] text-white h-12"
                onClick={() => {
                  setShowSearchModal(false)
                  setCurrentScreen("search-results")
                }}
              >
                Buscar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Modal */}
      {showCalendarModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-96 bg-white">
            <CardHeader>
              <h3 className="text-lg font-semibold text-[#3D2C2E]">Selecione a Data</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border-[#CFB2A8]"
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-[#CFB2A8]"
                  onClick={() => {
                    setShowCalendarModal(false)
                    setSelectedDate("")
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  className="flex-1 bg-[#8B7355] hover:bg-[#6F5C46] text-white"
                  onClick={() => setShowCalendarModal(false)}
                >
                  Confirmar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Weekly Modal */}
      {showWeeklyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-white">
            <CardHeader>
              <h3 className="text-lg font-semibold text-[#3D2C2E]">Selecione Dias e Turnos</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#3D2C2E] mb-2 block">Dias da Semana</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map((day) => (
                    <Button
                      key={day}
                      variant={selectedDays.includes(day) ? "default" : "outline"}
                      className={
                        selectedDays.includes(day)
                          ? "bg-[#8B7355] hover:bg-[#6F5C46] text-white"
                          : "border-[#CFB2A8] text-[#3D2C2E]"
                      }
                      onClick={() => {
                        setSelectedDays((prev) =>
                          prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
                        )
                      }}
                    >
                      {day}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#3D2C2E] mb-2 block">Turnos</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Manhã", "Tarde", "Noite"].map((shift) => (
                    <Button
                      key={shift}
                      variant={selectedShifts.includes(shift) ? "default" : "outline"}
                      className={
                        selectedShifts.includes(shift)
                          ? "bg-[#8B7355] hover:bg-[#6F5C46] text-white"
                          : "border-[#CFB2A8] text-[#3D2C2E]"
                      }
                      onClick={() => {
                        setSelectedShifts((prev) =>
                          prev.includes(shift) ? prev.filter((s) => s !== shift) : [...prev, shift],
                        )
                      }}
                    >
                      {shift}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-[#CFB2A8]"
                  onClick={() => {
                    setShowWeeklyModal(false)
                    setSelectedDays([])
                    setSelectedShifts([])
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  className="flex-1 bg-[#8B7355] hover:bg-[#6F5C46] text-white"
                  onClick={() => setShowWeeklyModal(false)}
                >
                  Confirmar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )

  const renderSearchResultsScreen = () => (
    <div className="h-screen bg-[#F5F0EB] flex flex-col overflow-hidden">
      <div className="mx-auto w-full max-w-[1040px]">
        {/* Header */}
        <div className="bg-[#F5F0EB] p-4 shadow-sm flex-shrink-0">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("home")} className="hover:bg-[#E5D6CD]">
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              className="flex-1 justify-start px-3 py-2 h-auto min-h-[40px] hover:bg-[#E5D6CD]"
              onClick={() => setShowSearchModal(true)}
            >
              <div className="flex items-center gap-2">
                <Edit3 className="h-4 w-4 text-[#3D2C2E] opacity-70" />
                <div className="text-left">
                  <div className="text-sm font-medium text-[#3D2C2E] truncate">{getSearchSummary()}</div>
                  <div className="text-xs text-[#3D2C2E] opacity-70">Toque para editar</div>
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="border-[#CFB2A8] text-[#3D2C2E] bg-transparent hover:bg-[#8B7355] hover:text-white transition-colors"
              onClick={() => setShowSearchFiltersModal(true)}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Map Section */}
        <div className="h-1/2 relative bg-gray-200 flex-shrink-0">
          <div
            className="absolute inset-0 cursor-move select-none"
            onMouseDown={handleMapMouseDown}
            onMouseMove={handleMapMouseMove}
            onMouseUp={handleMapMouseUp}
            onMouseLeave={handleMapMouseUp}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23E5D6CD' width='100' height='100'/%3E%3Cpath d='M0 0L50 50M50 0L100 50M0 50L50 100M50 50L100 100' stroke='%23CFB2A8' strokeWidth='1'/%3E%3C/svg%3E")`,
              backgroundPosition: `${mapPosition.x}px ${mapPosition.y}px`,
            }}
          >
            {/* Map Markers */}
            {classes.slice(0, 5).map((classItem, idx) => (
              <div
                key={classItem.id}
                className="absolute w-10 h-10 bg-[#8B7355] rounded-full flex items-center justify-center text-white font-bold shadow-lg cursor-pointer hover:scale-110 transition-transform"
                style={{
                  left: `${30 + idx * 15 + mapPosition.x * 0.1}%`,
                  top: `${25 + (idx % 3) * 20 + mapPosition.y * 0.1}%`,
                }}
                onClick={() => {
                  setSelectedClass(classItem)
                  setCurrentScreen("detail")
                }}
              >
                {classItem.price.replace("R$ ", "")}
              </div>
            ))}
          </div>
          
          {/* Map hint */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/90 px-4 py-2 rounded-full text-sm text-[#3D2C2E] shadow-md pointer-events-none">
            Arraste o mapa para explorar
          </div>
        </div>

        {/* Cards Section */}
        <div className="flex-1 overflow-y-auto bg-[#F5F0EB]">
          <div className="mx-auto w-full max-w-[1040px] p-4 space-y-4">
            {classes.map((classItem) => (
              <Card
                key={classItem.id}
                className="bg-white border-[#E5D6CD] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedClass(classItem)
                  setCurrentScreen("detail")
                }}
              >
                <div className="flex gap-4 p-4">
                  {/* Image */}
                  <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image src={classItem.image || "/placeholder.svg"} alt={classItem.name} fill className="object-cover" />
                    <button
                      className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(classItem.id)
                      }}
                    >
                      <Heart
                        className={`h-3.5 w-3.5 ${
                          favorites.includes(classItem.id) ? "fill-[#CFB2A8] text-[#CFB2A8]" : "text-[#3D2C2E]"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    {/* Top section with tag */}
                    <div className="space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-[#3D2C2E] text-base line-clamp-1">{classItem.name}</h3>
                          <p className="text-sm text-[#3D2C2E] opacity-70 line-clamp-1">{classItem.school}</p>
                        </div>
                        <Badge className={`${classItem.tagColor} border-0 text-xs flex-shrink-0 pointer-events-none`}>
                          {classItem.tag}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-[#CFB2A8] text-[#CFB2A8]" />
                        <span className="text-sm font-medium text-[#3D2C2E] pointer-events-none">{classItem.rating}</span>
                      </div>
                    </div>

                    {/* Bottom section with price and button */}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-bold text-[#3D2C2E] pointer-events-none">{classItem.price}</span>
                      <Button size="sm" className="bg-[#8B7355] hover:bg-[#6F5C46] text-white">
                        Ver detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Search Filters Modal */}
      {showSearchFiltersModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#3D2C2E]">Filtros</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowSearchFiltersModal(false)}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-[#3D2C2E] mb-2 block">Categorias</label>
                  <div className="flex flex-wrap gap-2">
                    {["Ballet", "Contemporary", "Hip Hop", "Jazz", "Salsa", "Forró"].map((cat) => (
                      <Button
                        key={cat}
                        variant={searchFilters.categories.includes(cat) ? "default" : "outline"}
                        className={
                          searchFilters.categories.includes(cat)
                            ? "bg-[#8B7355] hover:bg-[#6F5C46] text-white"
                            : "border-[#CFB2A8] text-[#3D2C2E]"
                        }
                        onClick={() => {
                          setSearchFilters((prev) => ({
                            ...prev,
                            categories: prev.categories.includes(cat)
                              ? prev.categories.filter((c) => c !== cat)
                              : [...prev.categories, cat],
                          }))
                        }}
                      >
                        {cat}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#3D2C2E] mb-2 block">Dias da Semana</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map((day) => (
                      <Button
                        key={day}
                        variant={searchFilters.days.includes(day) ? "default" : "outline"}
                        className={
                          searchFilters.days.includes(day)
                            ? "bg-[#8B7355] hover:bg-[#6F5C46] text-white"
                            : "border-[#CFB2A8] text-[#3D2C2E]"
                        }
                        onClick={() => {
                          setSearchFilters((prev) => ({
                            ...prev,
                            days: prev.days.includes(day) ? prev.days.filter((d) => d !== day) : [...prev.days, day],
                          }))
                        }}
                      >
                        {day}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#3D2C2E] mb-2 block">Turnos</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Manhã", "Tarde", "Noite"].map((shift) => (
                      <Button
                        key={shift}
                        variant={searchFilters.shifts.includes(shift) ? "default" : "outline"}
                        className={
                          searchFilters.shifts.includes(shift)
                            ? "bg-[#8B7355] hover:bg-[#6F5C46] text-white"
                            : "border-[#CFB2A8] text-[#3D2C2E]"
                        }
                        onClick={() => {
                          setSearchFilters((prev) => ({
                            ...prev,
                            shifts: prev.shifts.includes(shift)
                              ? prev.shifts.filter((s) => s !== shift)
                              : [...prev.shifts, shift],
                          }))
                        }}
                      >
                        {shift}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#3D2C2E] mb-2 block">Faixa de Preço</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Mín"
                      value={searchFilters.priceMin}
                      onChange={(e) => setSearchFilters((prev) => ({ ...prev, priceMin: e.target.value }))}
                      className="border-[#CFB2A8]"
                    />
                    <Input
                      placeholder="Máx"
                      value={searchFilters.priceMax}
                      onChange={(e) => setSearchFilters((prev) => ({ ...prev, priceMax: e.target.value }))}
                      className="border-[#CFB2A8]"
                    />
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-[#8B7355] hover:bg-[#6F5C46] text-white h-12"
                onClick={() => setShowSearchFiltersModal(false)}
              >
                Aplicar Filtros
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderFiltersScreen = () => (
    <div className="min-h-screen bg-[#F5F0EB]">
      {/* Header */}
      <div className="bg-[#F5F0EB] p-4 shadow-sm flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("home")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-lg font-semibold text-[#3D2C2E]">Filtros</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Day of Week */}
        <div>
          <h3 className="font-medium text-[#3D2C2E] mb-3">Dia da Semana</h3>
          <div className="grid grid-cols-2 gap-2">
            {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map((day) => (
              <Button key={day} variant="outline" className="border-[#CFB2A8] text-[#3D2C2E] text-sm bg-transparent">
                {day}
              </Button>
            ))}
          </div>
        </div>

        {/* Shifts */}
        <div>
          <h3 className="font-medium text-[#3D2C2E] mb-3">Turno</h3>
          <div className="grid grid-cols-3 gap-2">
            {["Manhã", "Tarde", "Noite"].map((shift) => (
              <Button key={shift} variant="outline" className="border-[#CFB2A8] text-[#3D2C2E] text-sm bg-transparent">
                {shift}
              </Button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-medium text-[#3D2C2E] mb-3">Faixa de Preço</h3>
          <div className="flex gap-2">
            <Input placeholder="Mínimo" className="border-[#CFB2A8]" />
            <Input placeholder="Máximo" className="border-[#CFB2A8]" />
          </div>
        </div>

        {/* Dance Styles */}
        <div>
          <h3 className="font-medium text-[#3D2C2E] mb-3">Modalidade</h3>
          <div className="flex flex-wrap gap-2">
            {["Ballet", "Contemporary", "Hip Hop", "Jazz", "Salsa", "Forró"].map((style) => (
              <Button key={style} variant="outline" className="border-[#CFB2A8] text-[#3D2C2E] text-sm bg-transparent">
                {style}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <div className="p-4 mt-6">
        <Button
          className="w-full bg-[#8B7355] hover:bg-[#6F5C46] text-white h-12"
          onClick={() => setCurrentScreen("search-results")}
        >
          Aplicar Filtros
        </Button>
      </div>
    </div>
  )

  const renderDetailScreen = () => (
    <div className="h-screen bg-[#F5F0EB] flex flex-col overflow-hidden">
      <div className="mx-auto w-full max-w-[1040px]">
        {/* Header */}
        <div className="bg-[#F5F0EB] p-4 shadow-sm flex items-center gap-3 flex-shrink-0">
          <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("home")} className="hover:bg-[#E5D6CD]">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold text-[#3D2C2E]">Detalhes da Aula</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleFavorite(selectedClass?.id)}
            className="ml-auto hover:bg-[#E5D6CD]"
          >
            <Heart
              className={`h-5 w-5 ${
                favorites.includes(selectedClass?.id) ? "fill-[#CFB2A8] text-[#CFB2A8]" : "text-[#3D2C2E]"
              }`}
            />
          </Button>
        </div>
      </div>

      {selectedClass && (
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="mx-auto w-full max-w-[1040px] space-y-6">
            {/* Carrossel de Imagens */}
            <div className="relative w-full h-80 rounded-xl overflow-hidden">
              <Image src={selectedClass.images[currentImageIndex] || "/placeholder.svg"} alt={selectedClass.name} fill className="object-cover" />
              
              {selectedClass.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === 0 ? selectedClass.images.length - 1 : prev - 1,
                      )
                    }
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === selectedClass.images.length - 1 ? 0 : prev + 1,
                      )
                    }
                  >
                    <ArrowLeft className="h-5 w-5 rotate-180" />
                  </Button>
                </>
              )}

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {selectedClass.images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full ${
                      idx === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Class Info */}
            <div>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-[#3D2C2E]">{selectedClass.name}</h2>
                  <p className="text-[#3D2C2E] opacity-70">{selectedClass.school}</p>
                </div>
                <Badge className={`${selectedClass.tagColor} border-0 pointer-events-none`}>
                  {selectedClass.tag}
                </Badge>
              </div>

              <div className="flex items-center gap-1 mt-2">
                <Star className="h-5 w-5 fill-[#CFB2A8] text-[#CFB2A8]" />
                <span className="font-medium text-[#3D2C2E] pointer-events-none">{selectedClass.rating}</span>
                <span className="text-sm text-[#3D2C2E] opacity-70 ml-1 pointer-events-none">
                  ({selectedClass.reviews.length} avaliações)
                </span>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {selectedClass.reviews.slice(0, 4).map((review: any, idx: number) => (
                    <div
                      key={idx}
                      className="w-8 h-8 rounded-full bg-[#CFB2A8] border-2 border-white flex items-center justify-center overflow-hidden"
                    >
                      {review.hasPhoto ? (
                        <Image src={review.avatar || "/placeholder.svg"} alt={review.name} fill className="object-cover" />
                      ) : (
                        <span className="text-xs font-medium text-white">{review.avatar}</span>
                      )}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-[#8B7355] border-2 border-white flex items-center justify-center">
                    <span className="text-xs font-medium text-white">+{Math.floor(Math.random() * 20) + 5}</span>
                  </div>
                </div>
                <span className="text-sm text-[#3D2C2E] opacity-70">Participantes</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-2 text-[#3D2C2E]">
                  <Clock className="h-5 w-5 opacity-70" />
                  <span>{selectedClass.time}</span>
                </div>
                <div className="flex items-center gap-2 text-[#3D2C2E]">
                  <Calendar className="h-5 w-5 opacity-70" />
                  <span>{selectedClass.days.join(", ")}</span>
                </div>
                <div className="flex items-center gap-2 text-[#3D2C2E]">
                  <MapPin className="h-5 w-5 opacity-70" />
                  <span>{selectedClass.location}</span>
                </div>
                <div className="flex items-center gap-2 text-[#3D2C2E]">
                  <User className="h-5 w-5 opacity-70" />
                  <span>Todos os níveis</span>
                </div>
              </div>
            </div>

            {/* Price and CTA */}
            <Card className="bg-white border-[#E5D6CD]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-3xl font-bold text-[#3D2C2E] pointer-events-none">{selectedClass.price}</p>
                    <p className="text-sm text-[#3D2C2E] opacity-70">por aula</p>
                  </div>
                  <Button
                    className="bg-[#8B7355] hover:bg-[#6F5C46] text-white px-8"
                    onClick={() => setCurrentScreen("schedule")}
                  >
                    Agendar Experimental
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="bg-white border-[#E5D6CD]">
              <CardHeader>
                <h3 className="text-lg font-semibold text-[#3D2C2E]">Sobre a Aula</h3>
              </CardHeader>
              <CardContent>
                <p className="text-[#3D2C2E] opacity-70">
                  Uma experiência transformadora de dança que combina técnica, expressão e criatividade. Perfeito para
                  todos os níveis, desde iniciantes até avançados.
                </p>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="bg-white border-[#E5D6CD]">
              <CardHeader className="flex flex-row items-center justify-between">
                <h3 className="text-lg font-semibold text-[#3D2C2E]">Avaliações</h3>
                {selectedClass.reviews.length > 1 && (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        setCurrentReviewIndex((prev) =>
                          prev === 0 ? selectedClass.reviews.length - 1 : prev - 1,
                        )
                      }
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        setCurrentReviewIndex((prev) =>
                          prev === selectedClass.reviews.length - 1 ? 0 : prev + 1,
                        )
                      }
                    >
                      <ArrowLeft className="h-4 w-4 rotate-180" />
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#CFB2A8] flex items-center justify-center overflow-hidden flex-shrink-0">
                    {selectedClass.reviews[currentReviewIndex].hasPhoto ? (
                      <Image
                        src={selectedClass.reviews[currentReviewIndex].avatar || "/placeholder.svg"}
                        alt={selectedClass.reviews[currentReviewIndex].name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-sm font-medium text-white">
                        {selectedClass.reviews[currentReviewIndex].avatar}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-[#3D2C2E]">{selectedClass.reviews[currentReviewIndex].name}</p>
                    <div className="flex gap-1 my-1">
                      {Array.from({ length: selectedClass.reviews[currentReviewIndex].rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#CFB2A8] text-[#CFB2A8]" />
                      ))}
                    </div>
                    <p className="text-sm text-[#3D2C2E] opacity-70">{selectedClass.reviews[currentReviewIndex].comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )

  const renderScheduleScreen = () => renderScheduleScreenContent()

  const renderScheduleScreenContent = () => (
    <div className="h-screen bg-[#F5F0EB] flex flex-col overflow-hidden">
      <div className="mx-auto w-full max-w-[1040px]">
        {/* Header */}
        <div className="bg-[#F5F0EB] p-4 shadow-sm flex items-center gap-3 flex-shrink-0">
          <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("detail")} className="hover:bg-[#E5D6CD]">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold text-[#3D2C2E]">Agendar Experimental</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="mx-auto w-full max-w-[1040px] space-y-6">
          {/* Class Summary */}
          <Card className="bg-white border-[#E5D6CD]">
            <CardContent className="p-4">
              <h3 className="font-semibold text-[#3D2C2E]">{selectedClass?.name}</h3>
              <p className="text-sm text-[#3D2C2E] opacity-70">{selectedClass?.school}</p>
              <div className="flex items-center gap-3 mt-2 text-sm text-[#3D2C2E] opacity-70">
                <span>{selectedClass?.days.join(" e ")}</span>
                <span>{selectedClass?.time}</span>
                <span>{selectedClass?.price}</span>
              </div>
            </CardContent>
          </Card>

          {/* Sign Up Form */}
          <Card className="bg-white border-[#E5D6CD]">
            <CardHeader>
              <h3 className="font-semibold text-[#3D2C2E]">Cadastro Rápido</h3>
              <p className="text-sm text-[#3D2C2E] opacity-70">Apenas alguns detalhes para começar</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoggedIn ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Conectado como</p>
                      <p className="text-sm text-green-700">{userEmail}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#3D2C2E]">Nome Completo</label>
                    <Input placeholder="Digite seu nome completo" className="border-[#CFB2A8]" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#3D2C2E]">E-mail</label>
                    <Input type="email" placeholder="seu@email.com" className="border-[#CFB2A8]" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#3D2C2E]">Telefone</label>
                    <Input type="tel" placeholder="(00) 00000-0000" className="border-[#CFB2A8]" />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-[#E5D6CD]" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-[#3D2C2E] opacity-70">ou</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-[#CFB2A8] text-[#3D2C2E] bg-white hover:bg-[#F5F0EB]"
                    onClick={handleGoogleLogin}
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
                </>
              )}
            </CardContent>
          </Card>

          {/* Date Selection */}
          <Card className="bg-white border-[#E5D6CD]">
            <CardHeader>
              <h3 className="font-semibold text-[#3D2C2E]">Escolha o Dia</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedClass?.days.map((day: string) => (
                <Button
                  key={day}
                  variant="outline"
                  className="w-full justify-start border-[#CFB2A8] text-[#3D2C2E] hover:bg-[#F5F0EB]"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  {day} - {selectedClass.time}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Confirm Button */}
          <div className="flex gap-3">
            <Button
              className="flex-1 bg-[#8B7355] hover:bg-[#6F5C46] text-white h-12"
              onClick={() => setCurrentScreen("confirmation")}
            >
              Confirmar Agendamento
            </Button>
            <Button
              variant="outline"
              className="px-6 border-[#CFB2A8] text-[#3D2C2E] bg-white hover:bg-[#F5F0EB] h-12"
              onClick={handleAddToCalendar}
            >
              <Calendar className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderConfirmationScreen = () => (
    <div className="h-screen bg-[#F5F0EB] flex flex-col overflow-hidden">
      <div className="mx-auto w-full max-w-[1040px]">
        {/* Header */}
        <div className="bg-[#F5F0EB] p-4 shadow-sm flex-shrink-0">
          <h1 className="text-lg font-semibold text-[#3D2C2E] text-center">Confirmação</h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 space-y-6 overflow-y-auto">
        <div className="mx-auto w-full max-w-[520px] flex flex-col items-center space-y-6">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-[#CFB2A8] rounded-full flex items-center justify-center">
            <Check className="h-10 w-10 text-white" />
          </div>

          {/* Success Message */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-[#3D2C2E]">Tudo Pronto!</h2>
            <p className="text-[#3D2C2E] opacity-70">Sua aula experimental foi agendada com sucesso.</p>
          </div>

          {/* Class Details */}
          <Card className="bg-white border-[#E5D6CD] w-full max-w-sm">
            <CardContent className="p-4 text-center space-y-2">
              <h3 className="font-semibold text-[#3D2C2E]">{selectedClass?.name}</h3>
              <p className="text-sm text-[#3D2C2E] opacity-70">{selectedClass?.school}</p>
              <div className="text-sm text-[#3D2C2E] opacity-70">
                <p>
                  {selectedClass?.days.join(" e ")} às {selectedClass?.time}
                </p>
                <p>{selectedClass?.location}</p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="w-full max-w-sm space-y-3">
            <Button className="w-full bg-[#8B7355] hover:bg-[#6F5C46] text-white" onClick={() => setCurrentScreen("home")}>
              Voltar ao Início
            </Button>
            <Button
              variant="outline"
              className="w-full border-[#CFB2A8] text-[#3D2C2E] bg-white hover:bg-[#F5F0EB]"
              onClick={handleAddToCalendar}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Adicionar ao Calendário
            </Button>
          </div>
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
      case "search-results":
        return renderSearchResultsScreen()
      default:
        return renderHomeScreen()
    }
  }

  const scrollbarHideStyle = `
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
  `

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: scrollbarHideStyle }} />
      <div className="w-full h-screen mx-auto bg-[#F5F0EB] shadow-xl overflow-hidden">
        {renderCurrentScreen()}
        
        {showToast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white border-2 border-green-500 px-6 py-3 rounded-full shadow-lg z-50 animate-in slide-in-from-bottom-5">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-600" />
              <p className="text-sm font-medium text-[#3D2C2E]">{toastMessage}</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default SissonePrototype
