"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Heart,
  MapPin,
  Star,
  Clock,
  Calendar,
  User,
  Check,
  Filter,
  Edit3,
  ChevronLeft,
  ChevronRight,
  X,
  Search,
  ChevronDown,
  Navigation,
} from "lucide-react"
import Image from "next/image"
import { useRef } from "react"

type Screen = "home" | "filters" | "detail" | "schedule" | "confirmation" | "search-results"

const SissonePrototype = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedClass, setSelectedClass] = useState<(typeof classes)[0] | null>(null)
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

  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [mobileSearchStep, setMobileSearchStep] = useState<"where" | "when" | "modality">("where")
  const [showLoginDropdown, setShowLoginDropdown] = useState(false)

  // Search filters
  const [searchQuery, setSearchQuery] = useState("")
  const [searchDate, setSearchDate] = useState("")
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedSpecificDate, setSelectedSpecificDate] = useState("")

  const categoryRefs = {
    today: useRef<HTMLDivElement>(null),
    contemporary: useRef<HTMLDivElement>(null),
    "hip-hop": useRef<HTMLDivElement>(null),
    ballet: useRef<HTMLDivElement>(null),
    salsa: useRef<HTMLDivElement>(null),
    jazz: useRef<HTMLDivElement>(null),
    forro: useRef<HTMLDivElement>(null),
    ballroom: useRef<HTMLDivElement>(null),
    samba: useRef<HTMLDivElement>(null),
    zouk: useRef<HTMLDivElement>(null),
    bachata: useRef<HTMLDivElement>(null),
  }

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

  const handleMobileSearchOpen = () => {
    setShowMobileSearch(true)
    setMobileSearchStep("where")
  }

  const handleMobileSearchClose = () => {
    setShowMobileSearch(false)
    setMobileSearchStep("where")
  }

  const handleMobileSearchClear = () => {
    setSearchQuery("")
    setSearchDate("")
    setSearchModality([])
  }

  const handleMobileSearchSubmit = () => {
    setShowMobileSearch(false)
    handleSearch()
  }

  // Placeholder for the actual search logic
  const handleSearch = () => {
    console.log("Searching with:", {
      query: searchQuery,
      date: searchDate,
      modality: searchModality.join(", "),
    })
    setCurrentScreen("search-results") // Navigate to search results
  }

  const classes = [
    {
      id: 1,
      name: "Contemporary Flow",
      school: "Dance Studio",
      rating: 4.8,
      price: "R$ 45",
      time: "19:00",
      days: ["Segunda-feira", "Quarta-feira"],
      location: "Zona Oeste",
      image: "/contemporary-dance-class-studio.jpg",
      images: [
        "/contemporary-dance-class-studio-interior.jpg",
        "/contemporary-dance-students-practicing.jpg",
        "/contemporary-dance-instructor-teaching.jpg",
      ],
      tag: "Popular",
      tagColor: "bg-tag-orange text-tag-orange-foreground",
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
      tagColor: "bg-tag-purple text-tag-purple-foreground",
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
      tagColor: "bg-tag-green text-tag-green-foreground",
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
      images: ["/salsa-studio-interior.jpg", "/salsa-dancers-performance.jpg", "/salsa-dance-class-couple.jpg"],
      tag: "Quente",
      tagColor: "bg-tag-red text-tag-red-foreground",
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
      tagColor: "bg-tag-yellow text-tag-yellow-foreground",
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
      images: [
        "/contemporary-dance-class-studio.jpg",
        "/contemporary-dance-instructor-teaching.jpg",
        "/contemporary-dance-students-practicing.jpg",
      ],
      tag: "Intensivo",
      tagColor: "bg-tag-blue text-tag-blue-foreground",
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
      images: [
        "/hip-hop-dance-class-urban.jpg",
        "/urban-dance-class-group.jpg",
        "/hip-hop-dancers-performing-moves.jpg",
      ],
      tag: "Avançado",
      tagColor: "bg-tag-indigo text-tag-indigo-foreground",
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
      images: ["/classical-ballet-studio-interior.jpg", "/ballet-class-instructor.jpg", "/ballet-dancers-at-barre.jpg"],
      tag: "Premium",
      tagColor: "bg-tag-pink text-tag-pink-foreground",
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
      images: ["/salsa-dance-class-couple.jpg", "/salsa-studio-interior.jpg", "/salsa-dancers-performance.jpg"],
      tag: "Noturno",
      tagColor: "bg-tag-violet text-tag-violet-foreground",
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
      images: ["/jazz-dance-class-modern.jpg", "/jazz-studio-rehearsal.jpg", "/jazz-dancers-choreography.jpg"],
      tag: "Fusion",
      tagColor: "bg-tag-teal text-tag-teal-foreground",
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
      images: ["/salsa-studio-interior.jpg", "/salsa-dance-class-couple.jpg"],
      tag: "Tradicional",
      tagColor: "bg-tag-amber text-tag-amber-foreground",
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
      images: ["/salsa-dance-class-couple.jpg", "/salsa-dancers-performance.jpg"],
      tag: "Jovem",
      tagColor: "bg-tag-lime text-tag-lime-foreground",
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
      images: ["/salsa-studio-interior.jpg", "/salsa-dancers-performance.jpg", "/salsa-dance-class-couple.jpg"],
      tag: "Completo",
      tagColor: "bg-tag-cyan text-tag-cyan-foreground",
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
      images: ["/salsa-dance-class-couple.jpg", "/salsa-dancers-performance.jpg"],
      tag: "Elegante",
      tagColor: "bg-tag-rose text-tag-rose-foreground",
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
      images: ["/salsa-dancers-performance.jpg", "/salsa-studio-interior.jpg"],
      tag: "Carnaval",
      tagColor: "bg-tag-yellow text-tag-yellow-foreground",
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
      images: ["/salsa-studio-interior.jpg", "/salsa-dance-class-couple.jpg"],
      tag: "Carioca",
      tagColor: "bg-tag-emerald text-tag-emerald-foreground",
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
      images: ["/salsa-dance-class-couple.jpg", "/salsa-dancers-performance.jpg"],
      tag: "Sensual",
      tagColor: "bg-tag-fuchsia text-tag-fuchsia-foreground",
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
      images: ["/salsa-dancers-performance.jpg", "/salsa-studio-interior.jpg"],
      tag: "Pro",
      tagColor: "bg-tag-purple text-tag-purple-foreground",
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
      images: ["/salsa-studio-interior.jpg", "/salsa-dance-class-couple.jpg"],
      tag: "Romântico",
      tagColor: "bg-tag-red text-tag-red-foreground",
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
      images: ["/salsa-dance-class-couple.jpg", "/salsa-dancers-performance.jpg"],
      tag: "Autêntico",
      tagColor: "bg-tag-orange text-tag-orange-foreground",
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
    {
      id: 21,
      name: "Contemporary Flow Advanced",
      school: "Arte em Movimento",
      rating: 4.8,
      price: "R$ 52",
      time: "18:00",
      days: ["Terça-feira", "Quinta-feira"],
      location: "Zona Sul",
      image: "/contemporary-dance-instructor-teaching.jpg",
      images: ["/contemporary-dance-class-studio-interior.jpg", "/contemporary-dance-students-practicing.jpg"],
      tag: "Avançado",
      tagColor: "bg-tag-indigo text-tag-indigo-foreground",
      category: "contemporary",
      reviews: [
        {
          name: "Bruna Martins",
          avatar: "BM",
          hasPhoto: false,
          rating: 5,
          comment: "Técnica avançada com professores inspiradores!",
        },
      ],
    },
    {
      id: 22,
      name: "Contemporary Workshop",
      school: "Núcleo de Dança",
      rating: 4.7,
      price: "R$ 55",
      time: "14:00",
      days: ["Sábado"],
      location: "Centro",
      image: "/contemporary-dance-class-studio-interior.jpg",
      images: ["/contemporary-dance-students-practicing.jpg", "/contemporary-dance-instructor-teaching.jpg"],
      tag: "Workshop",
      tagColor: "bg-tag-purple text-tag-purple-foreground",
      category: "contemporary",
      reviews: [
        {
          name: "Gustavo Lima",
          avatar: "GL",
          hasPhoto: false,
          rating: 5,
          comment: "Workshop incrível, aprendi muito em um dia!",
        },
      ],
    },
    {
      id: 23,
      name: "Contemporary Express",
      school: "Dança Livre Studio",
      rating: 4.6,
      price: "R$ 40",
      time: "12:00",
      days: ["Quarta-feira"],
      location: "Zona Norte",
      image: "/contemporary-dance-students-practicing.jpg",
      images: ["/contemporary-dance-class-studio.jpg"],
      tag: "Express",
      tagColor: "bg-tag-green text-tag-green-foreground",
      category: "contemporary",
      reviews: [
        {
          name: "Tatiana Souza",
          avatar: "TS",
          hasPhoto: false,
          rating: 4,
          comment: "Perfeito para o horário de almoço!",
        },
      ],
    },
    {
      id: 24,
      name: "Contemporary Kids",
      school: "Pequenos Bailarinos",
      rating: 4.9,
      price: "R$ 35",
      time: "15:00",
      days: ["Terça-feira", "Quinta-feira"],
      location: "Zona Sul",
      image: "/contemporary-dance-class-studio.jpg",
      images: ["/contemporary-dance-instructor-teaching.jpg"],
      tag: "Infantil",
      tagColor: "bg-tag-pink text-tag-pink-foreground",
      category: "contemporary",
      reviews: [
        {
          name: "Adriana Mendes",
          avatar: "AM2",
          hasPhoto: false,
          rating: 5,
          comment: "Meu filho ama as aulas!",
        },
      ],
    },
    {
      id: 25,
      name: "Contemporary Open Class",
      school: "Open Dance Studio",
      rating: 4.7,
      price: "R$ 30",
      time: "10:00",
      days: ["Domingo"],
      location: "Centro",
      image: "/contemporary-dance-instructor-teaching.jpg",
      images: ["/contemporary-dance-class-studio-interior.jpg"],
      tag: "Open",
      tagColor: "bg-tag-blue text-tag-blue-foreground",
      category: "contemporary",
      reviews: [
        {
          name: "Rodrigo Alves",
          avatar: "RA2",
          hasPhoto: false,
          rating: 5,
          comment: "Aula aberta com ótima energia!",
        },
      ],
    },
    {
      id: 26,
      name: "Hip Hop Kids",
      school: "Urban Dance Kids",
      rating: 4.8,
      price: "R$ 32",
      time: "16:00",
      days: ["Quarta-feira", "Sexta-feira"],
      location: "Centro",
      image: "/hip-hop-dance-class-urban.jpg",
      images: ["/hip-hop-dance-studio-with-students.jpg"],
      tag: "Infantil",
      tagColor: "bg-tag-pink text-tag-pink-foreground",
      category: "hip-hop",
      reviews: [
        {
          name: "Mariana Costa",
          avatar: "MC",
          hasPhoto: false,
          rating: 5,
          comment: "Perfeito para crianças começarem no hip hop!",
        },
      ],
    },
    {
      id: 27,
      name: "Hip Hop Freestyle",
      school: "Free Style Collective",
      rating: 4.9,
      price: "R$ 38",
      time: "20:00",
      days: ["Sexta-feira"],
      location: "Zona Sul",
      image: "/urban-dance-class-group.jpg",
      images: ["/hip-hop-dancers-performing-moves.jpg"],
      tag: "Freestyle",
      tagColor: "bg-tag-yellow text-tag-yellow-foreground",
      category: "hip-hop",
      reviews: [
        {
          name: "André Silva",
          avatar: "AS2",
          hasPhoto: false,
          rating: 5,
          comment: "Ambiente livre e criativo!",
        },
      ],
    },
    {
      id: 28,
      name: "Hip Hop Coreografia",
      school: "Coreografia Urbana",
      rating: 4.7,
      price: "R$ 40",
      time: "19:00",
      days: ["Segunda-feira", "Quarta-feira"],
      location: "Centro",
      image: "/hip-hop-dance-studio-with-students.jpg",
      images: ["/hip-hop-dance-class-urban.jpg"],
      tag: "Coreografia",
      tagColor: "bg-tag-teal text-tag-teal-foreground",
      category: "hip-hop",
      reviews: [
        {
          name: "Lucas Oliveira",
          avatar: "LO2",
          hasPhoto: false,
          rating: 5,
          comment: "Coreografias incríveis toda semana!",
        },
      ],
    },
    {
      id: 29,
      name: "Hip Hop Battle",
      school: "Battle Ground Studio",
      rating: 4.8,
      price: "R$ 45",
      time: "21:30",
      days: ["Sábado"],
      location: "Zona Sul",
      image: "/hip-hop-dancers-performing-moves.jpg",
      images: ["/urban-dance-class-group.jpg"],
      tag: "Battle",
      tagColor: "bg-tag-red text-tag-red-foreground",
      category: "hip-hop",
      reviews: [
        {
          name: "Pedro Costa",
          avatar: "PC",
          hasPhoto: false,
          rating: 5,
          comment: "Adrenalina pura!",
        },
      ],
    },
    {
      id: 30,
      name: "Ballet Infantil",
      school: "Ballet para Crianças",
      rating: 4.9,
      price: "R$ 45",
      time: "15:30",
      days: ["Terça-feira", "Quinta-feira"],
      location: "Centro",
      image: "/ballet-class-instructor.jpg",
      images: ["/classical-ballet-studio-interior.jpg"],
      tag: "Infantil",
      tagColor: "bg-tag-pink text-tag-pink-foreground",
      category: "ballet",
      reviews: [
        {
          name: "Juliana Santos",
          avatar: "JS",
          hasPhoto: false,
          rating: 5,
          comment: "Minha filha está apaixonada pelo ballet!",
        },
      ],
    },
    {
      id: 31,
      name: "Ballet Adulto Iniciante",
      school: "Nunca é Tarde",
      rating: 4.7,
      price: "R$ 50",
      time: "20:00",
      days: ["Segunda-feira", "Quarta-feira"],
      location: "Zona Sul",
      image: "/classical-ballet-studio-interior.jpg",
      images: ["/ballet-dancers-at-barre.jpg"],
      tag: "Adulto",
      tagColor: "bg-tag-purple text-tag-purple-foreground",
      category: "ballet",
      reviews: [
        {
          name: "Carla Rodrigues",
          avatar: "CR2",
          hasPhoto: false,
          rating: 5,
          comment: "Realizando o sonho de criança!",
        },
      ],
    },
    {
      id: 32,
      name: "Ballet Repertório",
      school: "Companhia de Ballet",
      rating: 4.8,
      price: "R$ 70",
      time: "18:30",
      days: ["Terça-feira", "Quinta-feira", "Sábado"],
      location: "Zona Norte",
      image: "/ballet-dancers-at-barre.jpg",
      images: ["/ballet-class-instructor.jpg"],
      tag: "Avançado",
      tagColor: "bg-tag-indigo text-tag-indigo-foreground",
      category: "ballet",
      reviews: [
        {
          name: "Gabriela Alves",
          avatar: "GA",
          hasPhoto: false,
          rating: 5,
          comment: "Repertório clássico impecável!",
        },
      ],
    },
    {
      id: 33,
      name: "Ballet Fitness",
      school: "Barre Fitness Studio",
      rating: 4.6,
      price: "R$ 55",
      time: "07:00",
      days: ["Segunda-feira", "Quarta-feira", "Sexta-feira"],
      location: "Centro",
      image: "/classical-ballet-studio-interior.jpg",
      images: ["/ballet-dancers-at-barre.jpg"],
      tag: "Fitness",
      tagColor: "bg-tag-green text-tag-green-foreground",
      category: "ballet",
      reviews: [
        {
          name: "Renata Lima",
          avatar: "RL",
          hasPhoto: false,
          rating: 5,
          comment: "Ótimo treino com elementos de ballet!",
        },
      ],
    },
    {
      id: 34,
      name: "Salsa Cubana",
      school: "Cuba Dance Academy",
      rating: 4.8,
      price: "R$ 42",
      time: "19:00",
      days: ["Terça-feira", "Quinta-feira"],
      location: "Zona Sul",
      image: "/salsa-dance-class-couple.jpg",
      images: ["/salsa-studio-interior.jpg"],
      tag: "Cubana",
      tagColor: "bg-tag-orange text-tag-orange-foreground",
      category: "salsa",
      reviews: [
        {
          name: "Miguel Santos",
          avatar: "MS2",
          hasPhoto: false,
          rating: 5,
          comment: "Salsa cubana autêntica!",
        },
      ],
    },
    {
      id: 35,
      name: "Salsa em Linha",
      school: "LA Style Dance",
      rating: 4.7,
      price: "R$ 44",
      time: "20:30",
      days: ["Quarta-feira", "Sexta-feira"],
      location: "Centro",
      image: "/salsa-studio-interior.jpg",
      images: ["/salsa-dancers-performance.jpg"],
      tag: "LA Style",
      tagColor: "bg-tag-blue text-tag-blue-foreground",
      category: "salsa",
      reviews: [
        {
          name: "Laura Mendes",
          avatar: "LM",
          hasPhoto: false,
          rating: 5,
          comment: "Estilo LA perfeito!",
        },
      ],
    },
    {
      id: 36,
      name: "Salsa Shine",
      school: "Solo Salsa Studio",
      rating: 4.6,
      price: "R$ 38",
      time: "18:00",
      days: ["Segunda-feira"],
      location: "Zona Norte",
      image: "/salsa-dancers-performance.jpg",
      images: ["/salsa-dance-class-couple.jpg"],
      tag: "Solo",
      tagColor: "bg-tag-yellow text-tag-yellow-foreground",
      category: "salsa",
      reviews: [
        {
          name: "Rafael Costa",
          avatar: "RC",
          hasPhoto: false,
          rating: 5,
          comment: "Melhorei muito meus shines!",
        },
      ],
    },
    {
      id: 37,
      name: "Salsa Social",
      school: "Salsa Social Club",
      rating: 4.9,
      price: "R$ 35",
      time: "22:00",
      days: ["Sexta-feira", "Sábado"],
      location: "Centro",
      image: "/salsa-dance-class-couple.jpg",
      images: ["/salsa-studio-interior.jpg"],
      tag: "Social",
      tagColor: "bg-tag-purple text-tag-purple-foreground",
      category: "salsa",
      reviews: [
        {
          name: "Isabela Fernandes",
          avatar: "IF2",
          hasPhoto: false,
          rating: 5,
          comment: "Melhor lugar para dançar e socializar!",
        },
      ],
    },
    {
      id: 38,
      name: "Jazz Contemporâneo",
      school: "Jazz Fusion Center",
      rating: 4.8,
      price: "R$ 48",
      time: "19:00",
      days: ["Terça-feira", "Quinta-feira"],
      location: "Zona Sul",
      image: "/jazz-dance-class-modern.jpg",
      images: ["/jazz-studio-rehearsal.jpg"],
      tag: "Fusão",
      tagColor: "bg-tag-teal text-tag-teal-foreground",
      category: "jazz",
      reviews: [
        {
          name: "Bianca Silva",
          avatar: "BS",
          hasPhoto: false,
          rating: 5,
          comment: "Mistura perfeita de jazz e contemporary!",
        },
      ],
    },
    {
      id: 39,
      name: "Jazz Broadway",
      school: "Musical Theater Dance",
      rating: 4.7,
      price: "R$ 55",
      time: "18:30",
      days: ["Quarta-feira", "Sexta-feira"],
      location: "Centro",
      image: "/jazz-studio-rehearsal.jpg",
      images: ["/jazz-dancers-choreography.jpg"],
      tag: "Broadway",
      tagColor: "bg-tag-rose text-tag-rose-foreground",
      category: "jazz",
      reviews: [
        {
          name: "Thiago Oliveira",
          avatar: "TO",
          hasPhoto: false,
          rating: 5,
          comment: "Estilo Broadway autêntico!",
        },
      ],
    },
    {
      id: 40,
      name: "Jazz Lírico",
      school: "Expressão em Dança",
      rating: 4.9,
      price: "R$ 52",
      time: "17:00",
      days: ["Terça-feira", "Quinta-feira"],
      location: "Zona Norte",
      image: "/jazz-dancers-choreography.jpg",
      images: ["/jazz-dance-class-modern.jpg"],
      tag: "Lírico",
      tagColor: "bg-tag-purple text-tag-purple-foreground",
      category: "jazz",
      reviews: [
        {
          name: "Sofia Martins",
          avatar: "SM",
          hasPhoto: false,
          rating: 5,
          comment: "Emocionante e técnico!",
        },
      ],
    },
    {
      id: 41,
      name: "Jazz Kids",
      school: "Kids Jazz Academy",
      rating: 4.8,
      price: "R$ 40",
      time: "16:00",
      days: ["Segunda-feira", "Quarta-feira"],
      location: "Zona Sul",
      image: "/jazz-dance-class-modern.jpg",
      images: ["/jazz-studio-rehearsal.jpg"],
      tag: "Infantil",
      tagColor: "bg-tag-pink text-tag-pink-foreground",
      category: "jazz",
      reviews: [
        {
          name: "Patricia Souza",
          avatar: "PS2",
          hasPhoto: false,
          rating: 5,
          comment: "Meus filhos adoram!",
        },
      ],
    },
    {
      id: 42,
      name: "Forró Roots",
      school: "Forró Tradicional",
      rating: 4.8,
      price: "R$ 40",
      time: "20:00",
      days: ["Quarta-feira", "Sexta-feira"],
      location: "Centro",
      image: "/salsa-dance-class-couple.jpg",
      images: ["/salsa-studio-interior.jpg"],
      tag: "Raiz",
      tagColor: "bg-tag-amber text-tag-amber-foreground",
      category: "forro",
      reviews: [
        {
          name: "José Silva",
          avatar: "JSi",
          hasPhoto: false,
          rating: 5,
          comment: "Forró raiz de verdade!",
        },
      ],
    },
    {
      id: 43,
      name: "Forró Estilizado",
      school: "Estilo Nordeste",
      rating: 4.7,
      price: "R$ 42",
      time: "21:00",
      days: ["Terça-feira", "Quinta-feira"],
      location: "Zona Sul",
      image: "/salsa-dancers-performance.jpg",
      images: ["/salsa-dance-class-couple.jpg"],
      tag: "Estilizado",
      tagColor: "bg-tag-lime text-tag-lime-foreground",
      category: "forro",
      reviews: [
        {
          name: "Fernanda Rocha",
          avatar: "FR",
          hasPhoto: false,
          rating: 5,
          comment: "Movimentos lindos e técnicos!",
        },
      ],
    },
    {
      id: 44,
      name: "Forró Social",
      school: "Forró da Praça",
      rating: 4.6,
      price: "R$ 30",
      time: "19:30",
      days: ["Sexta-feira"],
      location: "Centro",
      image: "/salsa-studio-interior.jpg",
      images: ["/salsa-dancers-performance.jpg"],
      tag: "Social",
      tagColor: "bg-tag-green text-tag-green-foreground",
      category: "forro",
      reviews: [
        {
          name: "Amanda Lima",
          avatar: "AL",
          hasPhoto: false,
          rating: 5,
          comment: "Ambiente familiar e acolhedor!",
        },
      ],
    },
    {
      id: 45,
      name: "Forró Iniciante",
      school: "Primeiros Passos no Forró",
      rating: 4.7,
      price: "R$ 35",
      time: "18:00",
      days: ["Segunda-feira", "Quarta-feira"],
      location: "Zona Norte",
      image: "/salsa-dance-class-couple.jpg",
      images: ["/salsa-studio-interior.jpg"],
      tag: "Iniciante",
      tagColor: "bg-tag-blue text-tag-blue-foreground",
      category: "forro",
      reviews: [
        {
          name: "Carlos Mendes",
          avatar: "CM2",
          hasPhoto: false,
          rating: 5,
          comment: "Perfeito para começar!",
        },
      ],
    },
    {
      id: 46,
      name: "Dança de Salão Completa",
      school: "All Dance Academy",
      rating: 4.9,
      price: "R$ 55",
      time: "19:00",
      days: ["Terça-feira", "Quinta-feira", "Sábado"],
      location: "Centro",
      image: "/salsa-dancers-performance.jpg",
      images: ["/salsa-dance-class-couple.jpg"],
      tag: "Completo",
      tagColor: "bg-tag-cyan text-tag-cyan-foreground",
      category: "ballroom",
      reviews: [
        {
          name: "Vanessa Costa",
          avatar: "VC2",
          hasPhoto: false,
          rating: 5,
          comment: "Aprende-se tudo aqui!",
        },
      ],
    },
    {
      id: 47,
      name: "Bolero e Soltinho",
      school: "Salão de Dança Clássico",
      rating: 4.7,
      price: "R$ 48",
      time: "20:00",
      days: ["Quarta-feira", "Sexta-feira"],
      location: "Zona Sul",
      image: "/salsa-dance-class-couple.jpg",
      images: ["/salsa-studio-interior.jpg"],
      tag: "Romântico",
      tagColor: "bg-tag-rose text-tag-rose-foreground",
      category: "ballroom",
      reviews: [
        {
          name: "Eduardo Silva",
          avatar: "ES",
          hasPhoto: false,
          rating: 5,
          comment: "Danças românticas perfeitas!",
        },
      ],
    },
    {
      id: 48,
      name: "Dança de Salão Kids",
      school: "Pequenos Dançarinos de Salão",
      rating: 4.8,
      price: "R$ 40",
      time: "15:00",
      days: ["Terça-feira", "Quinta-feira"],
      location: "Centro",
      image: "/salsa-studio-interior.jpg",
      images: ["/salsa-dance-class-couple.jpg"],
      tag: "Infantil",
      tagColor: "bg-tag-pink text-tag-pink-foreground",
      category: "ballroom",
      reviews: [
        {
          name: "Monica Ferreira",
          avatar: "MF",
          hasPhoto: false,
          rating: 5,
          comment: "Meus filhos estão aprendendo muito!",
        },
      ],
    },
    {
      id: 49,
      name: "Dança de Salão Avançado",
      school: "Elite Ballroom",
      rating: 4.9,
      price: "R$ 70",
      time: "20:30",
      days: ["Segunda-feira", "Quarta-feira", "Sexta-feira"],
      location: "Zona Norte",
      image: "/salsa-dancers-performance.jpg",
      images: ["/salsa-dance-class-couple.jpg"],
      tag: "Avançado",
      tagColor: "bg-tag-indigo text-tag-indigo-foreground",
      category: "ballroom",
      reviews: [
        {
          name: "Ricardo Oliveira",
          avatar: "RO",
          hasPhoto: false,
          rating: 5,
          comment: "Nível profissional!",
        },
      ],
    },
    {
      id: 50,
      name: "Samba Rock",
      school: "Rock do Samba",
      rating: 4.8,
      price: "R$ 42",
      time: "19:00",
      days: ["Terça-feira", "Quinta-feira"],
      location: "Zona Sul",
      image: "/salsa-dance-class-couple.jpg",
      images: ["/salsa-studio-interior.jpg"],
      tag: "Rock",
      tagColor: "bg-tag-yellow text-tag-yellow-foreground",
      category: "samba",
      reviews: [
        {
          name: "Daniela Santos",
          avatar: "DS2",
          hasPhoto: false,
          rating: 5,
          comment: "Samba rock autêntico!",
        },
      ],
    },
    {
      id: 51,
      name: "Samba de Roda",
      school: "Roda de Samba Bahia",
      rating: 4.7,
      price: "R$ 38",
      time: "18:30",
      days: ["Quarta-feira"],
      location: "Centro",
      image: "/salsa-studio-interior.jpg",
      images: ["/salsa-dancers-performance.jpg"],
      tag: "Bahia",
      tagColor: "bg-tag-orange text-tag-orange-foreground",
      category: "samba",
      reviews: [
        {
          name: "Luciana Costa",
          avatar: "LC",
          hasPhoto: false,
          rating: 5,
          comment: "Tradição baiana pura!",
        },
      ],
    },
    {
      id: 52,
      name: "Samba Fitness",
      school: "Samba Workout",
      rating: 4.6,
      price: "R$ 45",
      time: "07:30",
      days: ["Segunda-feira", "Quarta-feira", "Sexta-feira"],
      location: "Zona Sul",
      image: "/salsa-dancers-performance.jpg",
      images: ["/salsa-dance-class-couple.jpg"],
      tag: "Fitness",
      tagColor: "bg-tag-green text-tag-green-foreground",
      category: "samba",
      reviews: [
        {
          name: "Aline Rodrigues",
          avatar: "AR",
          hasPhoto: false,
          rating: 5,
          comment: "Treino completo dançando!",
        },
      ],
    },
    {
      id: 53,
      name: "Samba Avançado",
      school: "Passistas Profissionais",
      rating: 4.9,
      price: "R$ 50",
      time: "21:00",
      days: ["Terça-feira", "Quinta-feira"],
      location: "Centro",
      image: "/salsa-dance-class-couple.jpg",
      images: ["/salsa-studio-interior.jpg"],
      tag: "Pro",
      tagColor: "bg-tag-indigo text-tag-indigo-foreground",
      category: "samba",
      reviews: [
        {
          name: "Bruno Alves",
          avatar: "BA",
          hasPhoto: false,
          rating: 5,
          comment: "Nível de passista!",
        },
      ],
    },
    {
      id: 54,
      name: "Zouk Flow",
      school: "Flow Zouk Academy",
      rating: 4.8,
      price: "R$ 52",
      time: "20:00",
      days: ["Quarta-feira", "Sexta-feira"],
      location: "Zona Sul",
      image: "/salsa-dancers-performance.jpg",
      images: ["/salsa-dance-class-couple.jpg"],
      tag: "Flow",
      tagColor: "bg-tag-purple text-tag-purple-foreground",
      category: "zouk",
      reviews: [
        {
          name: "Camila Martins",
          avatar: "CM3",
          hasPhoto: false,
          rating: 5,
          comment: "Fluidez e conexão incríveis!",
        },
      ],
    },
    {
      id: 55,
      name: "Zouk Lambada",
      school: "Lambada Zouk Studio",
      rating: 4.7,
      price: "R$ 48",
      time: "19:30",
      days: ["Terça-feira", "Quinta-feira"],
      location: "Centro",
      image: "/salsa-dance-class-couple.jpg",
      images: ["/salsa-studio-interior.jpg"],
      tag: "Lambada",
      tagColor: "bg-tag-yellow text-tag-yellow-foreground",
      category: "zouk",
      reviews: [
        {
          name: "Fabio Santos",
          avatar: "FS",
          hasPhoto: false,
          rating: 5,
          comment: "Zouk com raízes na lambada!",
        },
      ],
    },
    {
      id: 56,
      name: "Zouk Iniciante",
      school: "Primeiros Passos Zouk",
      rating: 4.6,
      price: "R$ 45",
      time: "18:00",
      days: ["Segunda-feira", "Quarta-feira"],
      location: "Zona Norte",
      image: "/salsa-studio-interior.jpg",
      images: ["/salsa-dancers-performance.jpg"],
      tag: "Iniciante",
      tagColor: "bg-tag-blue text-tag-blue-foreground",
      category: "zouk",
      reviews: [
        {
          name: "Priscila Lima",
          avatar: "PL2",
          hasPhoto: false,
          rating: 5,
          comment: "Ótimo para começar no zouk!",
        },
      ],
    },
    {
      id: 57,
      name: "Zouk Workshop",
      school: "Master Zouk Workshop",
      rating: 4.9,
      price: "R$ 80",
      time: "14:00",
      days: ["Sábado"],
      location: "Centro",
      image: "/salsa-dancers-performance.jpg",
      images: ["/salsa-dance-class-couple.jpg"],
      tag: "Workshop",
      tagColor: "bg-tag-red text-tag-red-foreground",
      category: "zouk",
      reviews: [
        {
          name: "Marcelo Costa",
          avatar: "MC2",
          hasPhoto: false,
          rating: 5,
          comment: "Workshop intensivo excelente!",
        },
      ],
    },
    {
      id: 58,
      name: "Bachata Tradicional",
      school: "Dominican Bachata School",
      rating: 4.8,
      price: "R$ 44",
      time: "19:00",
      days: ["Terça-feira", "Quinta-feira"],
      location: "Zona Sul",
      image: "/salsa-dance-class-couple.jpg",
      images: ["/salsa-studio-interior.jpg"],
      tag: "Tradicional",
      tagColor: "bg-tag-orange text-tag-orange-foreground",
      category: "bachata",
      reviews: [
        {
          name: "Gabriela Lima",
          avatar: "GL2",
          hasPhoto: false,
          rating: 5,
          comment: "Bachata tradicional como deve ser!",
        },
      ],
    },
    {
      id: 59,
      name: "Bachata Moderna",
      school: "Modern Bachata Fusion",
      rating: 4.7,
      price: "R$ 46",
      time: "20:30",
      days: ["Quarta-feira", "Sexta-feira"],
      location: "Centro",
      image: "/salsa-studio-interior.jpg",
      images: ["/salsa-dancers-performance.jpg"],
      tag: "Moderna",
      tagColor: "bg-tag-purple text-tag-purple-foreground",
      category: "bachata",
      reviews: [
        {
          name: "Leandro Souza",
          avatar: "LS",
          hasPhoto: false,
          rating: 5,
          comment: "Bachata moderna com muita técnica!",
        },
      ],
    },
    {
      id: 60,
      name: "Bachata Styling",
      school: "Style Bachata Academy",
      rating: 4.6,
      price: "R$ 40",
      time: "18:30",
      days: ["Segunda-feira"],
      location: "Zona Norte",
      image: "/salsa-dancers-performance.jpg",
      images: ["/salsa-dance-class-couple.jpg"],
      tag: "Styling",
      tagColor: "bg-tag-pink text-tag-pink-foreground",
      category: "bachata",
      reviews: [
        {
          name: "Natalia Rocha",
          avatar: "NR",
          hasPhoto: false,
          rating: 5,
          comment: "Melhorei muito meu styling!",
        },
      ],
    },
    {
      id: 61,
      name: "Bachata Social",
      school: "Social Dance Bachata",
      rating: 4.9,
      price: "R$ 35",
      time: "21:30",
      days: ["Sexta-feira", "Sábado"],
      location: "Centro",
      image: "/salsa-dance-class-couple.jpg",
      images: ["/salsa-studio-interior.jpg", "/salsa-dance-class-couple.jpg"],
      tag: "Social",
      tagColor: "bg-tag-cyan text-tag-cyan-foreground",
      category: "bachata",
      reviews: [
        {
          name: "Vinicius Alves",
          avatar: "VA",
          hasPhoto: false,
          rating: 5,
          comment: "Melhor lugar para dançar bachata!",
        },
      ],
    },
  ]

  // Today classes
  const todayClasses = classes.slice(0, 7)

  const getClassesByCategory = (category: string) => {
    return classes.filter((c) => c.category === category).slice(0, 7)
  }

  const scrollCategory = (categoryId: string, direction: "left" | "right") => {
    const container = document.getElementById(`category-${categoryId}`)
    if (container) {
      const scrollAmount = 320 // Card width + gap
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const handleCategoryScroll = (categoryId: keyof typeof categoryRefs, direction: "left" | "right") => {
    const container = categoryRefs[categoryId].current
    if (container) {
      const scrollAmount = 320 // Card width + gap
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const handleCategoryClick = (categoryId: keyof typeof categoryRefs) => {
    setCurrentScreen("search-results")
    setSearchModality([categoryId.replace("-", " ").charAt(0).toUpperCase() + categoryId.slice(1)])
  }

  const getSearchSummary = () => {
    const parts = []
    if (searchLocation) parts.push(searchLocation)
    if (searchWhen === "today") parts.push("Hoje")
    else if (searchWhen === "specific" && selectedSpecificDate) parts.push(selectedSpecificDate)
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
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <div className="mx-auto w-full max-w-[1040px]">
        {/* Header */}
        <header className="bg-background p-4 flex items-center justify-between shadow-sm flex-shrink-0">
          <div className="flex items-center gap-3">
            <Image src="/sissone-logo.svg" alt="Sissone" width={120} height={40} className="h-8 w-auto" />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="hidden md:inline-flex border-primary text-foreground hover:bg-secondary bg-transparent"
              asChild
            >
              <a
                href="https://v0-sissone-wireframes-git-usurio-b-lead-sissone-mvp.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                Cadastrar minha escola
              </a>
            </Button>
            <Button
              size="sm"
              className="hidden md:inline-flex border-primary text-foreground hover:bg-secondary bg-transparent"
              variant="outline"
              asChild
            >
              <a
                href="https://v0-sissone-wireframes-git-usurio-b-lead-sissone-mvp.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                Cadastrar minha escola
              </a>
            </Button>

            <div className="relative">
              <Button
                size="sm"
                variant="outline"
                className="border-primary text-foreground hover:bg-secondary bg-transparent"
                onClick={() => setShowLoginDropdown(!showLoginDropdown)}
              >
                Login
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              {showLoginDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
                  <a
                    href="https://v0-sissone-wireframes-git-usurio-b-logado-sissone-mvp.vercel.app/"
                    target="_blank"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-secondary rounded-t-lg"
                    rel="noreferrer"
                  >
                    Login Escola
                  </a>
                  <a
                    href="https://v0-sissone-wireframes-git-usurio-a-logado-sissone-mvp.vercel.app/"
                    target="_blank"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-secondary rounded-b-lg"
                    rel="noreferrer"
                  >
                    Login Aluno
                  </a>
                </div>
              )}
            </div>
          </div>
        </header>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[1040px] px-0">
          {/* Hero Section */}
          <div className="py-12 px-4">
            <h1 className="text-4xl text-foreground mb-6 text-balance font-normal md:text-4xl text-center">
              Encontre sua próxima Aula
            </h1>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex items-center bg-card rounded-full shadow-lg p-2 gap-2">
              {/* Onde */}
              <div className="flex-1 px-4 py-2 border-r border-border">
                <label className="block text-xs font-semibold text-foreground mb-1">Onde</label>
                <input
                  type="text"
                  placeholder="Buscar destinos"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm text-foreground bg-transparent border-none outline-none placeholder:text-muted-foreground"
                />
              </div>

              {/* Quando */}
              <div className="flex-1 px-4 py-2 border-r border-border">
                <label className="block text-xs font-semibold text-foreground mb-1">Quando</label>
                <div className="flex gap-2">
                  <Button
                    variant={searchDate === "today" ? "default" : "ghost"}
                    size="sm"
                    className={
                      searchDate === "today"
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 text-xs h-7"
                        : "text-xs h-7"
                    }
                    onClick={() => setSearchDate("today")}
                  >
                    Hoje
                  </Button>
                  <Button
                    variant={searchDate === "week" ? "default" : "ghost"}
                    size="sm"
                    className={
                      searchDate === "week"
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 text-xs h-7"
                        : "text-xs h-7"
                    }
                    onClick={() => setSearchDate("week")}
                  >
                    Semanalmente
                  </Button>
                  <Button
                    variant={searchDate === "specific" ? "default" : "ghost"}
                    size="sm"
                    className={
                      searchDate === "specific"
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 text-xs h-7"
                        : "text-xs h-7"
                    }
                    onClick={() => {
                      setSearchDate("specific")
                      setShowDatePicker(true)
                    }}
                  >
                    Dia específico
                  </Button>
                </div>
              </div>

              {/* Modalidade */}
              <div className="flex-1 px-4 py-2">
                <label className="block text-xs font-semibold text-foreground mb-1">Modalidade</label>
                <button
                  onClick={() => setShowSearchModal(true)}
                  className="text-sm text-foreground hover:text-primary text-left"
                >
                  {searchModality.length > 0 ? searchModality.join(", ") : "Escolher estilos"}
                </button>
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-3 flex items-center justify-center"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>

            <button
              onClick={handleMobileSearchOpen}
              className="md:hidden w-full bg-card rounded-full shadow-lg p-4 flex items-center gap-3 px-4"
            >
              <Search className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1 text-left">
                <div className="text-sm font-semibold text-foreground">Para onde?</div>
                <div className="text-xs text-muted-foreground">
                  {searchQuery || "Buscar destinos"} • {searchDate || "Quando"} •{" "}
                  {searchModality.length > 0 ? searchModality.join(", ") : "Modalidade"}
                </div>
              </div>
            </button>
          </div>

          {/* Categories */}
          <div className="px-0 space-y-6">
            {/* Faça uma aula ainda hoje */}
            <div>
              <div className="flex items-center justify-between mb-4 px-4">
                <button
                  onClick={() => handleCategoryClick("today")}
                  className="text-xl font-bold text-foreground hover:text-primary cursor-pointer"
                >
                  Faça uma aula ainda hoje
                </button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-border hover:bg-secondary bg-transparent"
                    onClick={() => handleCategoryScroll("today", "left")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-border hover:bg-secondary bg-transparent"
                    onClick={() => handleCategoryScroll("today", "right")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div
                ref={categoryRefs.today}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {todayClasses.map((classItem) => (
                  <Card
                    key={classItem.id}
                    className="flex-shrink-0 w-72 bg-card border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedClass(classItem)
                      setCurrentImageIndex(0)
                      setCurrentScreen("detail")
                    }}
                  >
                    <div className="relative h-48 w-full flex-shrink-0">
                      <Image
                        src={classItem.image || "/placeholder.svg"}
                        alt={classItem.name}
                        fill
                        className="object-cover"
                      />
                      <button
                        className="absolute top-2 right-2 w-8 h-8 bg-card/90 rounded-full flex items-center justify-center hover:bg-card transition-colors z-10"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(classItem.id)
                        }}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            favorites.includes(classItem.id) ? "fill-red-500 text-red-500" : "text-foreground"
                          }`}
                        />
                      </button>
                      <div className="absolute top-2 left-2">
                        <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>{classItem.tag}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-card-foreground text-lg line-clamp-1">{classItem.name}</h3>
                      <p className="text-sm text-card-foreground opacity-70 line-clamp-1">{classItem.school}</p>
                      <div className="flex items-center gap-1 my-2">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="text-sm font-medium text-card-foreground pointer-events-none">
                          {classItem.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-card-foreground pointer-events-none">
                          {classItem.price}
                        </span>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedClass(classItem)
                            setCurrentImageIndex(0)
                            setCurrentScreen("detail")
                          }}
                        >
                          Agendar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contemporary */}
            <div className="px-0">
              <div className="flex items-center justify-between mx-4">
                <button
                  onClick={() => handleCategoryClick("contemporary")}
                  className="text-xl font-bold text-foreground hover:text-primary cursor-pointer"
                >
                  Contemporary
                </button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-border hover:bg-secondary bg-transparent"
                    onClick={() => handleCategoryScroll("contemporary", "left")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-border hover:bg-secondary bg-transparent"
                    onClick={() => handleCategoryScroll("contemporary", "right")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div
                ref={categoryRefs.contemporary}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 mx-4 pt-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {getClassesByCategory("contemporary").map((classItem) => (
                  <Card
                    key={classItem.id}
                    className="flex-shrink-0 w-72 bg-card border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedClass(classItem)
                      setCurrentImageIndex(0)
                      setCurrentScreen("detail")
                    }}
                  >
                    <div className="relative h-48 w-full flex-shrink-0">
                      <Image
                        src={classItem.image || "/placeholder.svg"}
                        alt={classItem.name}
                        fill
                        className="object-cover"
                      />
                      <button
                        className="absolute top-2 right-2 w-8 h-8 bg-card/90 rounded-full flex items-center justify-center hover:bg-card transition-colors z-10"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(classItem.id)
                        }}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            favorites.includes(classItem.id) ? "fill-red-500 text-red-500" : "text-foreground"
                          }`}
                        />
                      </button>
                      <div className="absolute top-2 left-2">
                        <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>{classItem.tag}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-card-foreground text-lg line-clamp-1">{classItem.name}</h3>
                      <p className="text-sm text-card-foreground opacity-70 line-clamp-1">{classItem.school}</p>
                      <div className="flex items-center gap-1 my-2">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="text-sm font-medium text-card-foreground pointer-events-none">
                          {classItem.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-card-foreground pointer-events-none">
                          {classItem.price}
                        </span>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedClass(classItem)
                            setCurrentImageIndex(0)
                            setCurrentScreen("detail")
                          }}
                        >
                          Agendar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Hip Hop */}
            <div>
              <div className="flex items-center justify-between mb-4 px-4">
                <button
                  onClick={() => handleCategoryClick("hip-hop")}
                  className="text-xl font-bold text-foreground hover:text-primary cursor-pointer"
                >
                  Hip Hop
                </button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-border hover:bg-secondary bg-transparent"
                    onClick={() => handleCategoryScroll("hip-hop", "left")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-border hover:bg-secondary bg-transparent"
                    onClick={() => handleCategoryScroll("hip-hop", "right")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div
                ref={categoryRefs["hip-hop"]}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {getClassesByCategory("hip-hop").map((classItem) => (
                  <Card
                    key={classItem.id}
                    className="flex-shrink-0 w-72 bg-card border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedClass(classItem)
                      setCurrentImageIndex(0)
                      setCurrentScreen("detail")
                    }}
                  >
                    <div className="relative h-48 w-full flex-shrink-0">
                      <Image
                        src={classItem.image || "/placeholder.svg"}
                        alt={classItem.name}
                        fill
                        className="object-cover"
                      />
                      <button
                        className="absolute top-2 right-2 w-8 h-8 bg-card/90 rounded-full flex items-center justify-center hover:bg-card transition-colors z-10"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(classItem.id)
                        }}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            favorites.includes(classItem.id) ? "fill-red-500 text-red-500" : "text-foreground"
                          }`}
                        />
                      </button>
                      <div className="absolute top-2 left-2">
                        <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>{classItem.tag}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-card-foreground text-lg line-clamp-1">{classItem.name}</h3>
                      <p className="text-sm text-card-foreground opacity-70 line-clamp-1">{classItem.school}</p>
                      <div className="flex items-center gap-1 my-2">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="text-sm font-medium text-card-foreground pointer-events-none">
                          {classItem.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-card-foreground pointer-events-none">
                          {classItem.price}
                        </span>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedClass(classItem)
                            setCurrentImageIndex(0)
                            setCurrentScreen("detail")
                          }}
                        >
                          Agendar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Ballet */}
            <div>
              <div className="flex items-center justify-between mb-4 px-4">
                <button
                  onClick={() => handleCategoryClick("ballet")}
                  className="text-xl font-bold text-foreground hover:text-primary cursor-pointer"
                >
                  Ballet
                </button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-border hover:bg-secondary bg-transparent"
                    onClick={() => handleCategoryScroll("ballet", "left")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-border hover:bg-secondary bg-transparent"
                    onClick={() => handleCategoryScroll("ballet", "right")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div
                ref={categoryRefs.ballet}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 mx-0 pl-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {getClassesByCategory("ballet").map((classItem) => (
                  <Card
                    key={classItem.id}
                    className="flex-shrink-0 w-72 bg-card border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedClass(classItem)
                      setCurrentImageIndex(0)
                      setCurrentScreen("detail")
                    }}
                  >
                    <div className="relative h-48 w-full flex-shrink-0">
                      <Image
                        src={classItem.image || "/placeholder.svg"}
                        alt={classItem.name}
                        fill
                        className="object-cover"
                      />
                      <button
                        className="absolute top-2 right-2 w-8 h-8 bg-card/90 rounded-full flex items-center justify-center hover:bg-card transition-colors z-10"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(classItem.id)
                        }}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            favorites.includes(classItem.id) ? "fill-red-500 text-red-500" : "text-foreground"
                          }`}
                        />
                      </button>
                      <div className="absolute top-2 left-2">
                        <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>{classItem.tag}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-card-foreground text-lg line-clamp-1">{classItem.name}</h3>
                      <p className="text-sm text-card-foreground opacity-70 line-clamp-1">{classItem.school}</p>
                      <div className="flex items-center gap-1 my-2">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="text-sm font-medium text-card-foreground pointer-events-none">
                          {classItem.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-card-foreground pointer-events-none">
                          {classItem.price}
                        </span>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedClass(classItem)
                            setCurrentImageIndex(0)
                            setCurrentScreen("detail")
                          }}
                        >
                          Agendar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Salsa */}
            <div className="pl-4">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => handleCategoryClick("salsa")}
                  className="text-xl font-bold text-foreground hover:text-primary cursor-pointer"
                >
                  Salsa
                </button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-border hover:bg-secondary bg-transparent"
                    onClick={() => handleCategoryScroll("salsa", "left")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-border hover:bg-secondary bg-transparent"
                    onClick={() => handleCategoryScroll("salsa", "right")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div
                ref={categoryRefs.salsa}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {getClassesByCategory("salsa").map((classItem) => (
                  <Card
                    key={classItem.id}
                    className="flex-shrink-0 w-72 bg-card border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedClass(classItem)
                      setCurrentImageIndex(0)
                      setCurrentScreen("detail")
                    }}
                  >
                    <div className="relative h-48 w-full flex-shrink-0">
                      <Image
                        src={classItem.image || "/placeholder.svg"}
                        alt={classItem.name}
                        fill
                        className="object-cover"
                      />
                      <button
                        className="absolute top-2 right-2 w-8 h-8 bg-card/90 rounded-full flex items-center justify-center hover:bg-card transition-colors z-10"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(classItem.id)
                        }}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            favorites.includes(classItem.id) ? "fill-red-500 text-red-500" : "text-foreground"
                          }`}
                        />
                      </button>
                      <div className="absolute top-2 left-2">
                        <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>{classItem.tag}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-card-foreground text-lg line-clamp-1">{classItem.name}</h3>
                      <p className="text-sm text-card-foreground opacity-70 line-clamp-1">{classItem.school}</p>
                      <div className="flex items-center gap-1 my-2">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="text-sm font-medium text-card-foreground pointer-events-none">
                          {classItem.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-card-foreground pointer-events-none">
                          {classItem.price}
                        </span>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedClass(classItem)
                            setCurrentImageIndex(0)
                            setCurrentScreen("detail")
                          }}
                        >
                          Agendar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Jazz */}
            <div className="pl-4">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => handleCategoryClick("jazz")}
                  className="text-xl font-bold text-foreground hover:text-primary cursor-pointer"
                >
                  Jazz
                </button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-border hover:bg-secondary bg-transparent"
                    onClick={() => handleCategoryScroll("jazz", "left")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-border hover:bg-secondary bg-transparent"
                    onClick={() => handleCategoryScroll("jazz", "right")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div
                ref={categoryRefs.jazz}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 pl-0"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {getClassesByCategory("jazz").map((classItem) => (
                  <Card
                    key={classItem.id}
                    className="flex-shrink-0 w-72 bg-card border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedClass(classItem)
                      setCurrentImageIndex(0)
                      setCurrentScreen("detail")
                    }}
                  >
                    <div className="relative h-48 w-full flex-shrink-0">
                      <Image
                        src={classItem.image || "/placeholder.svg"}
                        alt={classItem.name}
                        fill
                        className="object-cover"
                      />
                      <button
                        className="absolute top-2 right-2 w-8 h-8 bg-card/90 rounded-full flex items-center justify-center hover:bg-card transition-colors z-10"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(classItem.id)
                        }}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            favorites.includes(classItem.id) ? "fill-red-500 text-red-500" : "text-foreground"
                          }`}
                        />
                      </button>
                      <div className="absolute top-2 left-2">
                        <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>{classItem.tag}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-card-foreground text-lg line-clamp-1">{classItem.name}</h3>
                      <p className="text-sm text-card-foreground opacity-70 line-clamp-1">{classItem.school}</p>
                      <div className="flex items-center gap-1 my-2">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="text-sm font-medium text-card-foreground pointer-events-none">
                          {classItem.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-card-foreground pointer-events-none">
                          {classItem.price}
                        </span>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedClass(classItem)
                            setCurrentImageIndex(0)
                            setCurrentScreen("detail")
                          }}
                        >
                          Agendar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Forró */}
            <div className="pl-4">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => handleCategoryClick("forro")}
                  className="text-xl font-bold text-foreground hover:text-primary cursor-pointer"
                >
                  Forró
                </button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-border hover:bg-secondary bg-transparent"
                    onClick={() => handleCategoryScroll("forro", "left")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-border hover:bg-secondary bg-transparent"
                    onClick={() => handleCategoryScroll("forro", "right")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div
                ref={categoryRefs.forro}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {getClassesByCategory("forro").map((classItem) => (
                  <Card
                    key={classItem.id}
                    className="flex-shrink-0 w-72 bg-card border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedClass(classItem)
                      setCurrentImageIndex(0)
                      setCurrentScreen("detail")
                    }}
                  >
                    <div className="relative h-48 w-full flex-shrink-0">
                      <Image
                        src={classItem.image || "/placeholder.svg"}
                        alt={classItem.name}
                        fill
                        className="object-cover"
                      />
                      <button
                        className="absolute top-2 right-2 w-8 h-8 bg-card/90 rounded-full flex items-center justify-center hover:bg-card transition-colors z-10"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(classItem.id)
                        }}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            favorites.includes(classItem.id) ? "fill-red-500 text-red-500" : "text-foreground"
                          }`}
                        />
                      </button>
                      <div className="absolute top-2 left-2">
                        <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>{classItem.tag}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-card-foreground text-lg line-clamp-1">{classItem.name}</h3>
                      <p className="text-sm text-card-foreground opacity-70 line-clamp-1">{classItem.school}</p>
                      <div className="flex items-center gap-1 my-2">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="text-sm font-medium text-card-foreground pointer-events-none">
                          {classItem.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-card-foreground pointer-events-none">
                          {classItem.price}
                        </span>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedClass(classItem)
                            setCurrentImageIndex(0)
                            setCurrentScreen("detail")
                          }}
                        >
                          Agendar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Dança de Salão */}
            <div className="pl-4">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => handleCategoryClick("ballroom")}
                  className="text-xl font-bold text-foreground hover:text-primary cursor-pointer"
                >
                  Dança de Salão
                </button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-border hover:bg-secondary bg-transparent"
                    onClick={() => handleCategoryScroll("ballroom", "left")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-border hover:bg-secondary bg-transparent"
                    onClick={() => handleCategoryScroll("ballroom", "right")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div
                ref={categoryRefs.ballroom}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {getClassesByCategory("ballroom").map((classItem) => (
                  <Card
                    key={classItem.id}
                    className="flex-shrink-0 w-72 bg-card border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedClass(classItem)
                      setCurrentImageIndex(0)
                      setCurrentScreen("detail")
                    }}
                  >
                    <div className="relative h-48 w-full flex-shrink-0">
                      <Image
                        src={classItem.image || "/placeholder.svg"}
                        alt={classItem.name}
                        fill
                        className="object-cover"
                      />
                      <button
                        className="absolute top-2 right-2 w-8 h-8 bg-card/90 rounded-full flex items-center justify-center hover:bg-card transition-colors z-10"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(classItem.id)
                        }}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            favorites.includes(classItem.id) ? "fill-red-500 text-red-500" : "text-foreground"
                          }`}
                        />
                      </button>
                      <div className="absolute top-2 left-2">
                        <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>{classItem.tag}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-card-foreground text-lg line-clamp-1">{classItem.name}</h3>
                      <p className="text-sm text-card-foreground opacity-70 line-clamp-1">{classItem.school}</p>
                      <div className="flex items-center gap-1 my-2">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="text-sm font-medium text-card-foreground pointer-events-none">
                          {classItem.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-card-foreground pointer-events-none">
                          {classItem.price}
                        </span>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedClass(classItem)
                            setCurrentImageIndex(0)
                            setCurrentScreen("detail")
                          }}
                        >
                          Agendar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Samba */}
            <div className="pl-4">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => handleCategoryClick("samba")}
                  className="text-xl font-bold text-foreground hover:text-primary cursor-pointer"
                >
                  Samba
                </button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-border hover:bg-secondary bg-transparent"
                    onClick={() => handleCategoryScroll("samba", "left")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-border hover:bg-secondary bg-transparent"
                    onClick={() => handleCategoryScroll("samba", "right")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div
                ref={categoryRefs.samba}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {getClassesByCategory("samba").map((classItem) => (
                  <Card
                    key={classItem.id}
                    className="flex-shrink-0 w-72 bg-card border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedClass(classItem)
                      setCurrentImageIndex(0)
                      setCurrentScreen("detail")
                    }}
                  >
                    <div className="relative h-48 w-full flex-shrink-0">
                      <Image
                        src={classItem.image || "/placeholder.svg"}
                        alt={classItem.name}
                        fill
                        className="object-cover"
                      />
                      <button
                        className="absolute top-2 right-2 w-8 h-8 bg-card/90 rounded-full flex items-center justify-center hover:bg-card transition-colors z-10"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(classItem.id)
                        }}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            favorites.includes(classItem.id) ? "fill-red-500 text-red-500" : "text-foreground"
                          }`}
                        />
                      </button>
                      <div className="absolute top-2 left-2">
                        <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>{classItem.tag}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-card-foreground text-lg line-clamp-1">{classItem.name}</h3>
                      <p className="text-sm text-card-foreground opacity-70 line-clamp-1">{classItem.school}</p>
                      <div className="flex items-center gap-1 my-2">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="text-sm font-medium text-card-foreground pointer-events-none">
                          {classItem.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-card-foreground pointer-events-none">
                          {classItem.price}
                        </span>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedClass(classItem)
                            setCurrentImageIndex(0)
                            setCurrentScreen("detail")
                          }}
                        >
                          Agendar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Zouk */}
            <div className="pl-4">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => handleCategoryClick("zouk")}
                  className="text-xl font-bold text-foreground hover:text-primary cursor-pointer"
                >
                  Zouk
                </button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-border hover:bg-secondary bg-transparent"
                    onClick={() => handleCategoryScroll("zouk", "left")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-border hover:bg-secondary bg-transparent"
                    onClick={() => handleCategoryScroll("zouk", "right")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div
                ref={categoryRefs.zouk}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 pl-0"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {getClassesByCategory("zouk").map((classItem) => (
                  <Card
                    key={classItem.id}
                    className="flex-shrink-0 w-72 bg-card border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedClass(classItem)
                      setCurrentImageIndex(0)
                      setCurrentScreen("detail")
                    }}
                  >
                    <div className="relative h-48 w-full flex-shrink-0">
                      <Image
                        src={classItem.image || "/placeholder.svg"}
                        alt={classItem.name}
                        fill
                        className="object-cover"
                      />
                      <button
                        className="absolute top-2 right-2 w-8 h-8 bg-card/90 rounded-full flex items-center justify-center hover:bg-card transition-colors z-10"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(classItem.id)
                        }}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            favorites.includes(classItem.id) ? "fill-red-500 text-red-500" : "text-foreground"
                          }`}
                        />
                      </button>
                      <div className="absolute top-2 left-2">
                        <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>{classItem.tag}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-card-foreground text-lg line-clamp-1">{classItem.name}</h3>
                      <p className="text-sm text-card-foreground opacity-70 line-clamp-1">{classItem.school}</p>
                      <div className="flex items-center gap-1 my-2">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="text-sm font-medium text-card-foreground pointer-events-none">
                          {classItem.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-card-foreground pointer-events-none">
                          {classItem.price}
                        </span>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedClass(classItem)
                            setCurrentImageIndex(0)
                            setCurrentScreen("detail")
                          }}
                        >
                          Agendar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Bachata */}
            <div className="pb-8 pl-4">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => handleCategoryClick("bachata")}
                  className="text-xl font-bold text-foreground hover:text-primary cursor-pointer"
                >
                  Bachata
                </button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-border hover:bg-secondary bg-transparent"
                    onClick={() => handleCategoryScroll("bachata", "left")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-border hover:bg-secondary bg-transparent"
                    onClick={() => handleCategoryScroll("bachata", "right")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div
                ref={categoryRefs.bachata}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {getClassesByCategory("bachata").map((classItem) => (
                  <Card
                    key={classItem.id}
                    className="flex-shrink-0 w-72 bg-card border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedClass(classItem)
                      setCurrentImageIndex(0)
                      setCurrentScreen("detail")
                    }}
                  >
                    <div className="relative h-48 w-full flex-shrink-0">
                      <Image
                        src={classItem.image || "/placeholder.svg"}
                        alt={classItem.name}
                        fill
                        className="object-cover"
                      />
                      <button
                        className="absolute top-2 right-2 w-8 h-8 bg-card/90 rounded-full flex items-center justify-center hover:bg-card transition-colors z-10"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(classItem.id)
                        }}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            favorites.includes(classItem.id) ? "fill-red-500 text-red-500" : "text-foreground"
                          }`}
                        />
                      </button>
                      <div className="absolute top-2 left-2">
                        <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>{classItem.tag}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-card-foreground text-lg line-clamp-1">{classItem.name}</h3>
                      <p className="text-sm text-card-foreground opacity-70 line-clamp-1">{classItem.school}</p>
                      <div className="flex items-center gap-1 my-2">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="text-sm font-medium text-card-foreground pointer-events-none">
                          {classItem.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-card-foreground pointer-events-none">
                          {classItem.price}
                        </span>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedClass(classItem)
                            setCurrentImageIndex(0)
                            setCurrentScreen("detail")
                          }}
                        >
                          Agendar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSearchModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card w-full max-w-md rounded-3xl max-h-[85vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Escolha a Modalidade</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowSearchModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex flex-wrap gap-2">
                    {["Ballet", "Contemporary", "Hip Hop", "Jazz", "Salsa", "Forró", "Samba", "Zouk", "Bachata"].map(
                      (mod) => (
                        <Button
                          key={mod}
                          variant={searchModality.includes(mod) ? "default" : "outline"}
                          className={
                            searchModality.includes(mod)
                              ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                              : "border-primary text-foreground bg-transparent hover:bg-primary hover:text-primary-foreground"
                          }
                          onClick={() => {
                            setSearchModality((prev) =>
                              prev.includes(mod) ? prev.filter((m) => m !== mod) : [...prev, mod],
                            )
                          }}
                        >
                          {mod}
                        </Button>
                      ),
                    )}
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12"
                onClick={() => {
                  setShowSearchModal(false)
                }}
              >
                Aplicar
              </Button>
            </div>
          </div>
        </div>
      )}

      {showMobileSearch && (
        <div className="fixed inset-0 bg-background z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <button onClick={handleMobileSearchClose} className="p-2">
              <X className="h-6 w-6 text-foreground" />
            </button>
            <button onClick={handleMobileSearchClear} className="text-sm font-medium text-foreground underline">
              Limpar tudo
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Onde Section */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Onde?</h2>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar destinos"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-foreground bg-card border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Recent Searches / Suggestions */}
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Buscas recentes</h3>
                  <button className="flex items-center gap-3 p-3 w-full text-left hover:bg-secondary rounded-lg">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium text-foreground">São Paulo • Centro</div>
                      <div className="text-xs text-muted-foreground">15 de dez. de 2025 - 4 aulas</div>
                    </div>
                  </button>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Destinos sugeridos</h3>
                  <button className="flex items-center gap-3 p-3 w-full text-left hover:bg-secondary rounded-lg">
                    <Navigation className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium text-foreground">Perto de você</div>
                      <div className="text-xs text-muted-foreground">Descubra o que há perto de você</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Quando Section */}
            <div className="mb-6 py-4 border-t border-border">
              <h2 className="text-lg font-semibold text-foreground mb-3">Quando</h2>
              <div className="flex gap-2">
                <Button
                  variant={searchDate === "today" ? "default" : "outline"}
                  className={
                    searchDate === "today"
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border-border text-foreground hover:bg-secondary"
                  }
                  onClick={() => setSearchDate("today")}
                >
                  Hoje
                </Button>
                <Button
                  variant={searchDate === "week" ? "default" : "outline"}
                  className={
                    searchDate === "week"
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border-border text-foreground hover:bg-secondary"
                  }
                  onClick={() => setSearchDate("week")}
                >
                  Semanalmente
                </Button>
                <Button
                  variant={searchDate === "specific" ? "default" : "outline"}
                  className={
                    searchDate === "specific"
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border-border text-foreground hover:bg-secondary"
                  }
                  onClick={() => {
                    setSearchDate("specific")
                    setShowDatePicker(true)
                  }}
                >
                  Dia específico
                </Button>
              </div>
            </div>

            {/* Modalidade Section */}
            <div className="py-4 border-t border-border">
              <h2 className="text-lg font-semibold text-foreground mb-3">Modalidade</h2>
              <div className="flex flex-wrap gap-2">
                {["Ballet", "Contemporary", "Hip Hop", "Jazz", "Salsa", "Forró", "Samba", "Zouk", "Bachata"].map(
                  (mod) => (
                    <Button
                      key={mod}
                      variant={searchModality.includes(mod) ? "default" : "outline"}
                      className={
                        searchModality.includes(mod)
                          ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                          : "border-border text-foreground hover:bg-secondary"
                      }
                      onClick={() => {
                        setSearchModality((prev) =>
                          prev.includes(mod) ? prev.filter((m) => m !== mod) : [...prev, mod],
                        )
                      }}
                    >
                      {mod}
                    </Button>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Footer with Search Button */}
          <div className="p-4 border-t border-border bg-background">
            <Button
              onClick={handleMobileSearchSubmit}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold"
            >
              <Search className="mr-2 h-5 w-5" />
              Buscar
            </Button>
          </div>
        </div>
      )}
    </div>
  )

  const renderSearchResultsScreen = () => (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <div className="mx-auto w-full max-w-[1040px]">
        {/* Header */}
        <div className="bg-background p-4 shadow-sm flex-shrink-0">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("home")} className="hover:bg-secondary">
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              className="flex-1 justify-start px-3 py-2 h-auto min-h-[40px] hover:bg-secondary"
              onClick={() => setShowSearchModal(true)}
            >
              <div className="flex items-center gap-2">
                <Edit3 className="h-4 w-4 text-foreground opacity-70" />
                <div className="text-left">
                  <div className="text-sm font-medium text-foreground truncate">{getSearchSummary()}</div>
                  <div className="text-xs text-foreground opacity-70">Toque para editar</div>
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="border-primary text-foreground bg-transparent hover:bg-primary hover:text-primary-foreground transition-colors"
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
            // Using semantic accent and border tokens
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23E5D6CD' width='100' height='100'/%3E%3Cpath d='M0 0L50 50M50 0L100 50M0 50L50 100M50 50L100 100' stroke='%23CFB2A8' strokeWidth='1'/%3E%3C/svg%3E")`,
              backgroundPosition: `${mapPosition.x}px ${mapPosition.y}px`,
            }}
          >
            {/* Map Markers */}
            {classes.slice(0, 8).map((classItem, idx) => (
              <div
                key={classItem.id}
                className="absolute w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold shadow-lg cursor-pointer hover:scale-110 transition-transform"
                style={{
                  left: `${30 + idx * 15 + mapPosition.x * 0.1}%`,
                  top: `${25 + (idx % 3) * 20 + mapPosition.y * 0.1}%`,
                }}
                onClick={() => {
                  setSelectedClass(classItem)
                  setCurrentImageIndex(0)
                  setCurrentScreen("detail")
                }}
              >
                {classItem.price.replace("R$ ", "")}
              </div>
            ))}
          </div>

          {/* Map hint */}
          {/* Using semantic card, foreground and muted-foreground tokens */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-card/90 px-4 py-2 rounded-full text-sm text-foreground shadow-md pointer-events-none">
            Arraste o mapa para explorar
          </div>
        </div>

        {/* Cards Section */}
        <div className="flex-1 overflow-y-auto bg-background">
          <div className="mx-auto w-full max-w-[1040px] p-4 space-y-4">
            {classes.map((classItem) => (
              <Card
                key={classItem.id}
                className="bg-card border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedClass(classItem)
                  setCurrentImageIndex(0)
                  setCurrentScreen("detail")
                }}
              >
                <div className="flex p-4 gap-4">
                  {/* Image */}
                  <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={classItem.image || "/placeholder.svg"}
                      alt={classItem.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col min-w-0">
                    {/* Top Row */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-lg line-clamp-1">{classItem.name}</h3>
                        <p className="text-sm text-foreground opacity-70 line-clamp-1">{classItem.school}</p>
                      </div>
                      <button
                        className="flex-shrink-0 w-8 h-8 flex items-center justify-center hover:bg-muted rounded-full transition-colors"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(classItem.id)
                        }}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            favorites.includes(classItem.id) ? "fill-accent text-accent" : "text-foreground"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Tag and Rating */}
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge className={`${classItem.tagColor} border-0 pointer-events-none text-xs`}>
                        {classItem.tag}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <span className="text-xs font-medium text-foreground pointer-events-none">
                          {classItem.rating}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex justify-between mt-auto pt-2 flex-col items-start">
                      <span className="text-lg font-bold text-foreground pointer-events-none">{classItem.price}</span>
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedClass(classItem)
                          setCurrentImageIndex(0)
                          setCurrentScreen("detail")
                        }}
                      >
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
    </div>
  )

  const renderFiltersScreen = () => (
    // Using semantic background token
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background p-4 shadow-sm flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("home")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-lg font-semibold text-foreground">Filtros</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Day of Week */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Dia da Semana</h3>
          <div className="grid grid-cols-2 gap-2">
            {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map((day) => (
              <Button key={day} variant="outline" className="border-primary text-foreground text-sm bg-transparent">
                {day}
              </Button>
            ))}
          </div>
        </div>

        {/* Shifts */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Turno</h3>
          <div className="grid grid-cols-3 gap-2">
            {["Manhã", "Tarde", "Noite"].map((shift) => (
              <Button key={shift} variant="outline" className="border-primary text-foreground text-sm bg-transparent">
                {shift}
              </Button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Faixa de Preço</h3>
          <div className="flex gap-2">
            <Input placeholder="Mínimo" className="border-primary" />
            <Input placeholder="Máximo" className="border-primary" />
          </div>
        </div>

        {/* Dance Styles */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Modalidade</h3>
          <div className="flex flex-wrap gap-2">
            {["Ballet", "Contemporary", "Hip Hop", "Jazz", "Salsa", "Forró"].map((style) => (
              <Button key={style} variant="outline" className="border-primary text-foreground text-sm bg-transparent">
                {style}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <div className="p-4 mt-6">
        {/* Using semantic primary token */}
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12"
          onClick={() => setCurrentScreen("search-results")}
        >
          Aplicar Filtros
        </Button>
      </div>
    </div>
  )

  const renderDetailScreen = () => (
    // Using semantic background token
    <div className="h-screen bg-background flex flex-col">
      {/* Header - Fixed at top */}
      <div className="flex-shrink-0 bg-background shadow-sm">
        <div className="mx-auto w-full max-w-[1040px] p-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("home")} className="hover:bg-secondary">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Detalhes da Aula</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleFavorite(selectedClass?.id)}
            className="ml-auto hover:bg-secondary"
          >
            <Heart
              className={`h-5 w-5 ${
                favorites.includes(selectedClass?.id) ? "fill-accent text-accent" : "text-foreground"
              }`}
            />
          </Button>
        </div>
      </div>

      {/* Scrollable Content */}
      {selectedClass && (
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1040px] p-4 space-y-6">
            <div className="relative w-full h-64 md:h-80 flex-shrink-0">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-200">
                <Image
                  src={selectedClass.images[currentImageIndex] || "/placeholder.svg"}
                  alt={selectedClass.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Carousel Navigation */}
              {selectedClass.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setCurrentImageIndex((prev) => (prev === 0 ? selectedClass.images.length - 1 : prev - 1))
                    }
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setCurrentImageIndex((prev) => (prev === selectedClass.images.length - 1 ? 0 : prev + 1))
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>

                  {/* Dots Indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedClass.images.map((_: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex ? "bg-white w-4" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Class Info */}
            <div>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground">{selectedClass.name}</h2>
                  <p className="text-foreground opacity-70">{selectedClass.school}</p>
                </div>
                <Badge className={`${selectedClass.tagColor} border-0 pointer-events-none`}>{selectedClass.tag}</Badge>
              </div>

              <div className="flex items-center gap-1 mt-2">
                <Star className="h-5 w-5 fill-accent text-accent" />
                <span className="font-medium text-foreground pointer-events-none">{selectedClass.rating}</span>
                <span className="text-sm text-foreground opacity-70 ml-1 pointer-events-none">
                  ({selectedClass.reviews.length} avaliações)
                </span>
              </div>

              {/* START: Updates */}
              <div className="mt-4 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {selectedClass.reviews.slice(0, 4).map((review: any, idx: number) => (
                    <div
                      key={idx}
                      // Using semantic accent and border tokens
                      className="w-8 h-8 rounded-full bg-accent border-2 border-white flex items-center justify-center overflow-hidden relative flex-shrink-0"
                    >
                      {review.hasPhoto ? (
                        <Image
                          src={review.avatar || "/placeholder.svg"}
                          alt={review.name}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      ) : (
                        // Using semantic primary-foreground token
                        <span className="text-xs font-medium text-primary-foreground">{review.avatar}</span>
                      )}
                    </div>
                  ))}
                  {/* Using semantic primary and primary-foreground tokens */}
                  <div className="w-8 h-8 rounded-full bg-primary border-2 border-white flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-primary-foreground">
                      {Math.floor(Math.random() * 20) + 5}
                    </span>
                  </div>
                </div>
                <span className="text-sm text-foreground opacity-70">Participantes</span>
              </div>
              {/* END: Updates */}

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-2 text-foreground">
                  <Clock className="h-5 w-5 opacity-70" />
                  <span>{selectedClass.time}</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <Calendar className="h-5 w-5 opacity-70" />
                  <span>{selectedClass.days.join(", ")}</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <MapPin className="h-5 w-5 opacity-70" />
                  <span>{selectedClass.location}</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <User className="h-5 w-5 opacity-70" />
                  <span>Todos os níveis</span>
                </div>
              </div>
            </div>

            {/* Price and CTA */}
            {/* Using semantic card and border tokens */}
            <Card className="bg-card border-border">
              <CardContent className="p-6 px-6 py-0">
                <div className="flex items-start flex-col gap-4 justify-between mb-0">
                  <div>
                    <p className="text-3xl font-bold text-foreground pointer-events-none">{selectedClass.price}</p>
                    <p className="text-sm text-foreground opacity-70">por aula</p>
                  </div>
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                    onClick={() => setCurrentScreen("schedule")}
                  >
                    Agendar Experimental
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            {/* Using semantic card and border tokens */}
            <Card className="bg-card border-border">
              <CardHeader>
                <h3 className="text-lg font-semibold text-foreground">Sobre a Aula</h3>
              </CardHeader>
              <CardContent>
                <p className="text-foreground opacity-70">
                  Uma experiência transformadora de dança que combina técnica, expressão e criatividade. Perfeito para
                  todos os níveis, desde iniciantes até avançados.
                </p>
              </CardContent>
            </Card>

            {/* Reviews */}
            {/* Using semantic card and border tokens */}
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Avaliações</h3>
                {selectedClass.reviews.length > 1 && (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        setCurrentReviewIndex((prev) => (prev === 0 ? selectedClass.reviews.length - 1 : prev - 1))
                      }
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        setCurrentReviewIndex((prev) => (prev === selectedClass.reviews.length - 1 ? 0 : prev + 1))
                      }
                    >
                      <ArrowLeft className="h-4 w-4 rotate-180" />
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  {/* Using semantic accent and border tokens */}
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center overflow-hidden flex-shrink-0">
                    {selectedClass.reviews[currentReviewIndex].hasPhoto ? (
                      <Image
                        src={selectedClass.reviews[currentReviewIndex].avatar || "/placeholder.svg"}
                        alt={selectedClass.reviews[currentReviewIndex].name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    ) : (
                      // Using semantic primary-foreground token
                      <span className="text-sm font-medium text-primary-foreground">
                        {selectedClass.reviews[currentReviewIndex].avatar}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{selectedClass.reviews[currentReviewIndex].name}</p>
                    <div className="flex gap-1 my-1">
                      {Array.from({ length: selectedClass.reviews[currentReviewIndex].rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-sm text-foreground opacity-70">
                      {selectedClass.reviews[currentReviewIndex].comment}
                    </p>
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
    // Using semantic background token
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <div className="mx-auto w-full max-w-[1040px]">
        {/* Header */}
        <div className="bg-background p-4 shadow-sm flex items-center gap-3 flex-shrink-0">
          <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("detail")} className="hover:bg-secondary">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Agendar Experimental</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="mx-auto w-full max-w-[1040px] space-y-6">
          {/* Class Summary */}
          {/* Using semantic card and border tokens */}
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground">{selectedClass?.name}</h3>
              <p className="text-sm text-foreground opacity-70">{selectedClass?.school}</p>
              <div className="flex items-center gap-3 mt-2 text-sm text-foreground opacity-70">
                <span>{selectedClass?.days.join(" e ")}</span>
                <span>{selectedClass?.time}</span>
                <span>{selectedClass?.price}</span>
              </div>
            </CardContent>
          </Card>

          {/* Sign Up Form */}
          {/* Using semantic card and border tokens */}
          <Card className="bg-card border-border">
            <CardHeader>
              <h3 className="font-semibold text-foreground">Cadastro Rápido</h3>
              <p className="text-sm text-foreground opacity-70">Apenas alguns detalhes para começar</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoggedIn ? (
                // Using semantic green tokens
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-600" />
                    <div>
                      {/* Using semantic green tokens */}
                      <p className="text-sm font-medium text-green-800">Conectado como</p>
                      <p className="text-sm text-green-700">{userEmail}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Nome Completo</label>
                    <Input placeholder="Digite seu nome completo" className="border-primary" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">E-mail</label>
                    <Input type="email" placeholder="seu@email.com" className="border-primary" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Telefone</label>
                    <Input type="tel" placeholder="(00) 00000-0000" className="border-primary" />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      {/* Using semantic border token */}
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      {/* Using semantic background and foreground tokens */}
                      <span className="bg-card px-2 text-foreground opacity-70">ou</span>
                    </div>
                  </div>

                  {/* Using semantic border, foreground, and primary tokens */}
                  <Button
                    variant="outline"
                    className="w-full border-primary text-foreground bg-card hover:bg-secondary"
                    onClick={handleGoogleLogin}
                  >
                    <Image src="/google-logo.png" alt="Google" width={20} height={20} className="mr-2" />
                    Continuar com Google
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Date Selection */}
          {/* Using semantic card and border tokens */}
          <Card className="bg-card border-border">
            <CardHeader>
              <h3 className="font-semibold text-foreground">Escolha o Dia</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedClass?.days.map((day: string) => (
                <Button
                  key={day}
                  variant="outline"
                  // Using semantic border, foreground, and secondary tokens
                  className="w-full justify-start border-primary text-foreground hover:bg-secondary bg-transparent"
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
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-12"
              onClick={() => setCurrentScreen("confirmation")}
            >
              Confirmar Agendamento
            </Button>
            {/* Using semantic border, foreground, and secondary tokens */}
            <Button
              variant="outline"
              className="px-6 border-primary text-foreground bg-card hover:bg-secondary h-12"
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
    // Using semantic background token
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <div className="mx-auto w-full max-w-[1040px]">
        {/* Header */}
        <div className="bg-background p-4 shadow-sm flex items-center gap-3 flex-shrink-0">
          <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("home")} className="hover:bg-secondary">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Confirmação</h1>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="mx-auto w-full max-w-[1040px]">
          {/* Using semantic card and border tokens */}
          <Card className="bg-card border-border">
            <CardContent className="p-8 text-center space-y-6">
              {/* Using semantic green tokens */}
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="h-8 w-8 text-green-600" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Aula Agendada!</h2>
                <p className="text-foreground opacity-70">Sua aula experimental foi agendada com sucesso</p>
              </div>

              {selectedClass && (
                // Using semantic background token
                <div className="bg-background rounded-lg p-4 space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-foreground">Aula:</span>
                    <span className="text-sm text-foreground">{selectedClass.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-foreground">Studio:</span>
                    <span className="text-sm text-foreground">{selectedClass.school}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-foreground">Data:</span>
                    <span className="text-sm text-foreground">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-foreground">Horário:</span>
                    <span className="text-sm text-foreground">{selectedTime}</span>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {/* Using semantic primary token */}
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={handleAddToCalendar}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Adicionar ao Calendário
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-primary text-foreground hover:bg-secondary bg-transparent"
                  asChild
                >
                  <a
                    href="https://v0-sissone-wireframes-git-usurio-a-logado-sissone-mvp.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Login como aluno
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
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
      <div className="w-full h-screen mx-auto bg-background shadow-xl overflow-hidden">
        {renderCurrentScreen()}

        {showToast && (
          // Using semantic background, border, foreground, and toast tokens
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-card border-2 border-green-500 px-6 py-3 rounded-full shadow-lg z-50 animate-in slide-in-from-bottom-5">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-600" />
              <p className="text-sm font-medium text-foreground">{toastMessage}</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default SissonePrototype
