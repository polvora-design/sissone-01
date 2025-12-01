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
} from "lucide-react"
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
      images: ["/salsa-studio-interior.jpg", "/salsa-dancers-performance.jpg", "/salsa-dance-class-couple.jpg"],
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
      images: [
        "/contemporary-dance-class-studio.jpg",
        "/contemporary-dance-instructor-teaching.jpg",
        "/contemporary-dance-students-practicing.jpg",
      ],
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
      images: [
        "/hip-hop-dance-class-urban.jpg",
        "/urban-dance-class-group.jpg",
        "/hip-hop-dancers-performing-moves.jpg",
      ],
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
      images: ["/classical-ballet-studio-interior.jpg", "/ballet-class-instructor.jpg", "/ballet-dancers-at-barre.jpg"],
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
      images: ["/salsa-dance-class-couple.jpg", "/salsa-studio-interior.jpg", "/salsa-dancers-performance.jpg"],
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
      images: ["/jazz-dance-class-modern.jpg", "/jazz-studio-rehearsal.jpg", "/jazz-dancers-choreography.jpg"],
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
      images: ["/salsa-studio-interior.jpg", "/salsa-dance-class-couple.jpg"],
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
      images: ["/salsa-dance-class-couple.jpg", "/salsa-dancers-performance.jpg"],
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
      images: ["/salsa-studio-interior.jpg", "/salsa-dancers-performance.jpg", "/salsa-dance-class-couple.jpg"],
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
      images: ["/salsa-dance-class-couple.jpg", "/salsa-dancers-performance.jpg"],
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
      images: ["/salsa-dancers-performance.jpg", "/salsa-studio-interior.jpg"],
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
      images: ["/salsa-studio-interior.jpg", "/salsa-dance-class-couple.jpg"],
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
      images: ["/salsa-dance-class-couple.jpg", "/salsa-dancers-performance.jpg"],
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
      images: ["/salsa-dancers-performance.jpg", "/salsa-studio-interior.jpg"],
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
      images: ["/salsa-studio-interior.jpg", "/salsa-dance-class-couple.jpg"],
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
      images: ["/salsa-dance-class-couple.jpg", "/salsa-dancers-performance.jpg"],
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
      tagColor: "bg-indigo-100 text-indigo-800",
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
      tagColor: "bg-purple-100 text-purple-800",
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
      tagColor: "bg-green-100 text-green-800",
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
      tagColor: "bg-pink-100 text-pink-800",
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
      tagColor: "bg-blue-100 text-blue-800",
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
      tagColor: "bg-pink-100 text-pink-800",
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
      tagColor: "bg-yellow-100 text-yellow-800",
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
      tagColor: "bg-teal-100 text-teal-800",
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
      tagColor: "bg-red-100 text-red-800",
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
      tagColor: "bg-pink-100 text-pink-800",
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
      tagColor: "bg-purple-100 text-purple-800",
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
      tagColor: "bg-indigo-100 text-indigo-800",
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
      tagColor: "bg-green-100 text-green-800",
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
      tagColor: "bg-orange-100 text-orange-800",
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
      tagColor: "bg-blue-100 text-blue-800",
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
      tagColor: "bg-yellow-100 text-yellow-800",
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
      tagColor: "bg-purple-100 text-purple-800",
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
      tagColor: "bg-teal-100 text-teal-800",
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
      tagColor: "bg-rose-100 text-rose-800",
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
      tagColor: "bg-purple-100 text-purple-800",
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
      tagColor: "bg-pink-100 text-pink-800",
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
      tagColor: "bg-amber-100 text-amber-800",
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
      tagColor: "bg-lime-100 text-lime-800",
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
      tagColor: "bg-green-100 text-green-800",
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
      tagColor: "bg-blue-100 text-blue-800",
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
      tagColor: "bg-cyan-100 text-cyan-800",
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
      tagColor: "bg-rose-100 text-rose-800",
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
      tagColor: "bg-pink-100 text-pink-800",
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
      tagColor: "bg-indigo-100 text-indigo-800",
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
      tagColor: "bg-yellow-100 text-yellow-800",
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
      tagColor: "bg-orange-100 text-orange-800",
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
      tagColor: "bg-green-100 text-green-800",
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
      tagColor: "bg-indigo-100 text-indigo-800",
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
      tagColor: "bg-purple-100 text-purple-800",
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
      tagColor: "bg-yellow-100 text-yellow-800",
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
      tagColor: "bg-blue-100 text-blue-800",
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
      tagColor: "bg-red-100 text-red-800",
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
      tagColor: "bg-orange-100 text-orange-800",
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
      tagColor: "bg-purple-100 text-purple-800",
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
      tagColor: "bg-pink-100 text-pink-800",
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
      images: ["/salsa-studio-interior.jpg"],
      tag: "Social",
      tagColor: "bg-cyan-100 text-cyan-800",
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
        <div className="bg-[#F5F0EB] p-4 shadow-sm flex items-center justify-between flex-shrink-0">
          <Image src="/sissone-logo.svg" alt="Sissone" width={120} height={40} className="h-10 w-auto" />
          <div className="flex gap-2">
            <a
              href="https://v0-sissone-wireframes-git-usurio-b-lead-sissone-mvp.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#8B7355] hover:bg-[#6F5C46] text-white h-9 px-4 py-2 rounded-md"
            >
              Cadastrar minha escola
            </a>
            <a
              href="https://v0-sissone-wireframes-git-usurio-a-logado-sissone-mvp.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[#8B7355] bg-transparent hover:bg-[#E5D6CD] text-[#8B7355] h-9 px-4 py-2 rounded-md"
            >
              Login Aluno
            </a>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[1040px]">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-[#CFB2A8] to-[#E5D6CD] py-12 mb-8">
            <div className="text-center mb-8 px-4">
              <h1 className="text-4xl font-bold text-[#3D2C2E] mb-2">Encontre sua próxima aula</h1>
              <p className="text-[#3D2C2E] opacity-80">Descubra aulas de dança perto de você</p>
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => setShowSearchModal(true)}
              className="md:hidden w-full bg-white rounded-full shadow-lg p-4 flex items-center gap-3 text-left"
            >
              <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-sm font-semibold text-[#3D2C2E]">
                  {searchLocation || searchModality.length > 0
                    ? `${searchLocation ? searchLocation : "Qualquer lugar"} · ${searchModality.length > 0 ? searchModality.join(", ") : "Qualquer modalidade"}`
                    : "Onde · Quando · Modalidade"}
                </div>
              </div>
            </button>

            {/* Desktop Search Bar - Airbnb style */}
            <div className="hidden md:flex bg-white rounded-full shadow-lg p-2 items-center gap-2">
              {/* Onde - Where */}
              <div className="flex-1 px-6 py-3 border-r border-gray-200 cursor-pointer hover:bg-gray-50 rounded-full transition-colors">
                <div className="text-xs font-semibold text-[#3D2C2E] mb-1">Onde</div>
                <input
                  type="text"
                  placeholder="Buscar localização"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="text-sm text-[#3D2C2E] w-full outline-none bg-transparent placeholder:text-gray-400"
                />
              </div>

              {/* Quando - When */}
              <div className="flex-1 px-6 py-3 border-r border-gray-200 relative">
                <div className="text-xs font-semibold text-[#3D2C2E] mb-1">Quando</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSearchWhen("today")}
                    className={`text-sm px-3 py-1 rounded-full transition-colors ${
                      searchWhen === "today" ? "bg-[#8B7355] text-white" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Hoje
                  </button>
                  <button
                    onClick={() => {
                      setSearchWhen("specific")
                      setShowCalendarModal(true)
                    }}
                    className={`text-sm px-3 py-1 rounded-full transition-colors ${
                      searchWhen === "specific" ? "bg-[#8B7355] text-white" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Data
                  </button>
                  <button
                    onClick={() => {
                      setSearchWhen("weekly")
                      setShowWeeklyModal(true)
                    }}
                    className={`text-sm px-3 py-1 rounded-full transition-colors ${
                      searchWhen === "weekly" ? "bg-[#8B7355] text-white" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Semanal
                  </button>
                </div>
              </div>

              {/* Modalidade - Dance Style */}
              <div className="flex-1 px-6 py-3 cursor-pointer hover:bg-gray-50 rounded-full transition-colors">
                <div className="text-xs font-semibold text-[#3D2C2E] mb-1">Modalidade</div>
                <button
                  onClick={() => setShowSearchModal(true)}
                  className="text-sm text-gray-600 hover:text-[#3D2C2E] w-full text-left"
                >
                  {searchModality.length > 0 ? searchModality.join(", ") : "Escolha a modalidade"}
                </button>
              </div>

              {/* Search Button */}
              <button
                onClick={() => setCurrentScreen("search-results")}
                className="bg-[#8B7355] hover:bg-[#6F5C46] text-white rounded-full p-4 transition-colors flex-shrink-0"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="px-4 space-y-12">
            {/* Faça uma aula ainda hoje */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setCurrentScreen("search-results")}
                  className="text-2xl font-bold text-[#3D2C2E] hover:text-[#8B7355] transition-colors"
                >
                  Faça uma aula ainda hoje
                </button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-[#CFB2A8] hover:bg-[#E5D6CD] bg-transparent"
                    onClick={() => scrollCategory("today", "left")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-[#CFB2A8] hover:bg-[#E5D6CD] bg-transparent"
                    onClick={() => scrollCategory("today", "right")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div id="category-today" className="flex gap-4 overflow-x-auto scrollbar-hide">
                {classes.slice(0, 7).map((classItem) => (
                  <Card
                    key={classItem.id}
                    className="flex-shrink-0 w-72 bg-white border-[#E5D6CD] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedClass(classItem)
                      setCurrentImageIndex(0)
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
                        <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>{classItem.tag}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-[#3D2C2E] text-lg line-clamp-1">{classItem.name}</h3>
                      <p className="text-sm text-[#3D2C2E] opacity-70 line-clamp-1">{classItem.school}</p>
                      <div className="flex items-center gap-1 my-2">
                        <Star className="h-4 w-4 fill-[#CFB2A8] text-[#CFB2A8]" />
                        <span className="text-sm font-medium text-[#3D2C2E] pointer-events-none">
                          {classItem.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-[#3D2C2E] pointer-events-none">{classItem.price}</span>
                        <Button
                          size="sm"
                          className="bg-[#8B7355] hover:bg-[#6F5C46] text-white"
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contemporary */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => navigateToSearchResults("Contemporary")}
                  className="text-2xl font-bold text-[#3D2C2E] hover:text-[#8B7355] transition-colors"
                >
                  Contemporary
                </button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-[#CFB2A8] hover:bg-[#E5D6CD] bg-transparent"
                    onClick={() => scrollCategory("contemporary", "left")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-[#CFB2A8] hover:bg-[#E5D6CD] bg-transparent"
                    onClick={() => scrollCategory("contemporary", "right")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div id="category-contemporary" className="flex gap-4 overflow-x-auto scrollbar-hide">
                {getClassesByCategory("contemporary").map((classItem) => (
                  <Card
                    key={classItem.id}
                    className="flex-shrink-0 w-72 bg-white border-[#E5D6CD] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedClass(classItem)
                      setCurrentImageIndex(0)
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
                        <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>{classItem.tag}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-[#3D2C2E] text-lg line-clamp-1">{classItem.name}</h3>
                      <p className="text-sm text-[#3D2C2E] opacity-70 line-clamp-1">{classItem.school}</p>
                      <div className="flex items-center gap-1 my-2">
                        <Star className="h-4 w-4 fill-[#CFB2A8] text-[#CFB2A8]" />
                        <span className="text-sm font-medium text-[#3D2C2E] pointer-events-none">
                          {classItem.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-[#3D2C2E] pointer-events-none">{classItem.price}</span>
                        <Button
                          size="sm"
                          className="bg-[#8B7355] hover:bg-[#6F5C46] text-white"
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Hip Hop */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => navigateToSearchResults("Hip Hop")}
                  className="text-2xl font-bold text-[#3D2C2E] hover:text-[#8B7355] transition-colors"
                >
                  Hip Hop
                </button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-[#CFB2A8] hover:bg-[#E5D6CD] bg-transparent"
                    onClick={() => scrollCategory("hip-hop", "left")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-[#CFB2A8] hover:bg-[#E5D6CD] bg-transparent"
                    onClick={() => scrollCategory("hip-hop", "right")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div id="category-hip-hop" className="flex gap-4 overflow-x-auto scrollbar-hide">
                {getClassesByCategory("hip-hop").map((classItem) => (
                  <Card
                    key={classItem.id}
                    className="flex-shrink-0 w-72 bg-white border-[#E5D6CD] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedClass(classItem)
                      setCurrentImageIndex(0)
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
                        <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>{classItem.tag}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-[#3D2C2E] text-lg line-clamp-1">{classItem.name}</h3>
                      <p className="text-sm text-[#3D2C2E] opacity-70 line-clamp-1">{classItem.school}</p>
                      <div className="flex items-center gap-1 my-2">
                        <Star className="h-4 w-4 fill-[#CFB2A8] text-[#CFB2A8]" />
                        <span className="text-sm font-medium text-[#3D2C2E] pointer-events-none">
                          {classItem.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-[#3D2C2E] pointer-events-none">{classItem.price}</span>
                        <Button
                          size="sm"
                          className="bg-[#8B7355] hover:bg-[#6F5C46] text-white"
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Ballet */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => navigateToSearchResults("Ballet")}
                  className="text-2xl font-bold text-[#3D2C2E] hover:text-[#8B7355] transition-colors"
                >
                  Ballet
                </button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-[#CFB2A8] hover:bg-[#E5D6CD] bg-transparent"
                    onClick={() => scrollCategory("ballet", "left")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-[#CFB2A8] hover:bg-[#E5D6CD] bg-transparent"
                    onClick={() => scrollCategory("ballet", "right")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div id="category-ballet" className="flex gap-4 overflow-x-auto scrollbar-hide">
                {getClassesByCategory("ballet").map((classItem) => (
                  <Card
                    key={classItem.id}
                    className="flex-shrink-0 w-72 bg-white border-[#E5D6CD] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedClass(classItem)
                      setCurrentImageIndex(0)
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
                        <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>{classItem.tag}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-[#3D2C2E] text-lg line-clamp-1">{classItem.name}</h3>
                      <p className="text-sm text-[#3D2C2E] opacity-70 line-clamp-1">{classItem.school}</p>
                      <div className="flex items-center gap-1 my-2">
                        <Star className="h-4 w-4 fill-[#CFB2A8] text-[#CFB2A8]" />
                        <span className="text-sm font-medium text-[#3D2C2E] pointer-events-none">
                          {classItem.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-[#3D2C2E] pointer-events-none">{classItem.price}</span>
                        <Button
                          size="sm"
                          className="bg-[#8B7355] hover:bg-[#6F5C46] text-white"
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Salsa */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => navigateToSearchResults("Salsa")}
                  className="text-2xl font-bold text-[#3D2C2E] hover:text-[#8B7355] transition-colors"
                >
                  Salsa
                </button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-[#CFB2A8] hover:bg-[#E5D6CD] bg-transparent"
                    onClick={() => scrollCategory("salsa", "left")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-[#CFB2A8] hover:bg-[#E5D6CD] bg-transparent"
                    onClick={() => scrollCategory("salsa", "right")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div id="category-salsa" className="flex gap-4 overflow-x-auto scrollbar-hide">
                {getClassesByCategory("salsa").map((classItem) => (
                  <Card
                    key={classItem.id}
                    className="flex-shrink-0 w-72 bg-white border-[#E5D6CD] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedClass(classItem)
                      setCurrentImageIndex(0)
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
                        <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>{classItem.tag}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-[#3D2C2E] text-lg line-clamp-1">{classItem.name}</h3>
                      <p className="text-sm text-[#3D2C2E] opacity-70 line-clamp-1">{classItem.school}</p>
                      <div className="flex items-center gap-1 my-2">
                        <Star className="h-4 w-4 fill-[#CFB2A8] text-[#CFB2A8]" />
                        <span className="text-sm font-medium text-[#3D2C2E] pointer-events-none">
                          {classItem.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-[#3D2C2E] pointer-events-none">{classItem.price}</span>
                        <Button
                          size="sm"
                          className="bg-[#8B7355] hover:bg-[#6F5C46] text-white"
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Jazz */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => navigateToSearchResults("Jazz")}
                  className="text-2xl font-bold text-[#3D2C2E] hover:text-[#8B7355] transition-colors"
                >
                  Jazz
                </button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-[#CFB2A8] hover:bg-[#E5D6CD] bg-transparent"
                    onClick={() => scrollCategory("jazz", "left")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-[#CFB2A8] hover:bg-[#E5D6CD] bg-transparent"
                    onClick={() => scrollCategory("jazz", "right")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div id="category-jazz" className="flex gap-4 overflow-x-auto scrollbar-hide">
                {getClassesByCategory("jazz").map((classItem) => (
                  <Card
                    key={classItem.id}
                    className="flex-shrink-0 w-72 bg-white border-[#E5D6CD] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedClass(classItem)
                      setCurrentImageIndex(0)
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
                        <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>{classItem.tag}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-[#3D2C2E] text-lg line-clamp-1">{classItem.name}</h3>
                      <p className="text-sm text-[#3D2C2E] opacity-70 line-clamp-1">{classItem.school}</p>
                      <div className="flex items-center gap-1 my-2">
                        <Star className="h-4 w-4 fill-[#CFB2A8] text-[#CFB2A8]" />
                        <span className="text-sm font-medium text-[#3D2C2E] pointer-events-none">
                          {classItem.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-[#3D2C2E] pointer-events-none">{classItem.price}</span>
                        <Button
                          size="sm"
                          className="bg-[#8B7355] hover:bg-[#6F5C46] text-white"
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Forró */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => navigateToSearchResults("Forró")}
                  className="text-2xl font-bold text-[#3D2C2E] hover:text-[#8B7355] transition-colors"
                >
                  Forró
                </button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-[#CFB2A8] hover:bg-[#E5D6CD] bg-transparent"
                    onClick={() => scrollCategory("forro", "left")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-[#CFB2A8] hover:bg-[#E5D6CD] bg-transparent"
                    onClick={() => scrollCategory("forro", "right")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div id="category-forro" className="flex gap-4 overflow-x-auto scrollbar-hide">
                {getClassesByCategory("forro").map((classItem) => (
                  <Card
                    key={classItem.id}
                    className="flex-shrink-0 w-72 bg-white border-[#E5D6CD] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedClass(classItem)
                      setCurrentImageIndex(0)
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
                        <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>{classItem.tag}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-[#3D2C2E] text-lg line-clamp-1">{classItem.name}</h3>
                      <p className="text-sm text-[#3D2C2E] opacity-70 line-clamp-1">{classItem.school}</p>
                      <div className="flex items-center gap-1 my-2">
                        <Star className="h-4 w-4 fill-[#CFB2A8] text-[#CFB2A8]" />
                        <span className="text-sm font-medium text-[#3D2C2E] pointer-events-none">
                          {classItem.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-[#3D2C2E] pointer-events-none">{classItem.price}</span>
                        <Button
                          size="sm"
                          className="bg-[#8B7355] hover:bg-[#6F5C46] text-white"
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Dança de Salão */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => navigateToSearchResults("Dança de Salão")}
                  className="text-2xl font-bold text-[#3D2C2E] hover:text-[#8B7355] transition-colors"
                >
                  Dança de Salão
                </button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-[#CFB2A8] hover:bg-[#E5D6CD] bg-transparent"
                    onClick={() => scrollCategory("ballroom", "left")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-[#CFB2A8] hover:bg-[#E5D6CD] bg-transparent"
                    onClick={() => scrollCategory("ballroom", "right")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div id="category-ballroom" className="flex gap-4 overflow-x-auto scrollbar-hide">
                {getClassesByCategory("ballroom").map((classItem) => (
                  <Card
                    key={classItem.id}
                    className="flex-shrink-0 w-72 bg-white border-[#E5D6CD] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedClass(classItem)
                      setCurrentImageIndex(0)
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
                        <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>{classItem.tag}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-[#3D2C2E] text-lg line-clamp-1">{classItem.name}</h3>
                      <p className="text-sm text-[#3D2C2E] opacity-70 line-clamp-1">{classItem.school}</p>
                      <div className="flex items-center gap-1 my-2">
                        <Star className="h-4 w-4 fill-[#CFB2A8] text-[#CFB2A8]" />
                        <span className="text-sm font-medium text-[#3D2C2E] pointer-events-none">
                          {classItem.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-[#3D2C2E] pointer-events-none">{classItem.price}</span>
                        <Button
                          size="sm"
                          className="bg-[#8B7355] hover:bg-[#6F5C46] text-white"
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Samba */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => navigateToSearchResults("Samba")}
                  className="text-2xl font-bold text-[#3D2C2E] hover:text-[#8B7355] transition-colors"
                >
                  Samba
                </button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-[#CFB2A8] hover:bg-[#E5D6CD] bg-transparent"
                    onClick={() => scrollCategory("samba", "left")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-[#CFB2A8] hover:bg-[#E5D6CD] bg-transparent"
                    onClick={() => scrollCategory("samba", "right")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div id="category-samba" className="flex gap-4 overflow-x-auto scrollbar-hide">
                {getClassesByCategory("samba").map((classItem) => (
                  <Card
                    key={classItem.id}
                    className="flex-shrink-0 w-72 bg-white border-[#E5D6CD] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedClass(classItem)
                      setCurrentImageIndex(0)
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
                        <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>{classItem.tag}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-[#3D2C2E] text-lg line-clamp-1">{classItem.name}</h3>
                      <p className="text-sm text-[#3D2C2E] opacity-70 line-clamp-1">{classItem.school}</p>
                      <div className="flex items-center gap-1 my-2">
                        <Star className="h-4 w-4 fill-[#CFB2A8] text-[#CFB2A8]" />
                        <span className="text-sm font-medium text-[#3D2C2E] pointer-events-none">
                          {classItem.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-[#3D2C2E] pointer-events-none">{classItem.price}</span>
                        <Button
                          size="sm"
                          className="bg-[#8B7355] hover:bg-[#6F5C46] text-white"
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Zouk */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => navigateToSearchResults("Zouk")}
                  className="text-2xl font-bold text-[#3D2C2E] hover:text-[#8B7355] transition-colors"
                >
                  Zouk
                </button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-[#CFB2A8] hover:bg-[#E5D6CD] bg-transparent"
                    onClick={() => scrollCategory("zouk", "left")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-[#CFB2A8] hover:bg-[#E5D6CD] bg-transparent"
                    onClick={() => scrollCategory("zouk", "right")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div id="category-zouk" className="flex gap-4 overflow-x-auto scrollbar-hide">
                {getClassesByCategory("zouk").map((classItem) => (
                  <Card
                    key={classItem.id}
                    className="flex-shrink-0 w-72 bg-white border-[#E5D6CD] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedClass(classItem)
                      setCurrentImageIndex(0)
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
                        <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>{classItem.tag}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-[#3D2C2E] text-lg line-clamp-1">{classItem.name}</h3>
                      <p className="text-sm text-[#3D2C2E] opacity-70 line-clamp-1">{classItem.school}</p>
                      <div className="flex items-center gap-1 my-2">
                        <Star className="h-4 w-4 fill-[#CFB2A8] text-[#CFB2A8]" />
                        <span className="text-sm font-medium text-[#3D2C2E] pointer-events-none">
                          {classItem.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-[#3D2C2E] pointer-events-none">{classItem.price}</span>
                        <Button
                          size="sm"
                          className="bg-[#8B7355] hover:bg-[#6F5C46] text-white"
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Bachata */}
            <div className="pb-8">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => navigateToSearchResults("Bachata")}
                  className="text-2xl font-bold text-[#3D2C2E] hover:text-[#8B7355] transition-colors"
                >
                  Bachata
                </button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-[#CFB2A8] hover:bg-[#E5D6CD] bg-transparent"
                    onClick={() => scrollCategory("bachata", "left")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-[#CFB2A8] hover:bg-[#E5D6CD] bg-transparent"
                    onClick={() => scrollCategory("bachata", "right")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div id="category-bachata" className="flex gap-4 overflow-x-auto scrollbar-hide">
                {getClassesByCategory("bachata").map((classItem) => (
                  <Card
                    key={classItem.id}
                    className="flex-shrink-0 w-72 bg-white border-[#E5D6CD] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedClass(classItem)
                      setCurrentImageIndex(0)
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
                        <Badge className={`${classItem.tagColor} border-0 pointer-events-none`}>{classItem.tag}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-[#3D2C2E] text-lg line-clamp-1">{classItem.name}</h3>
                      <p className="text-sm text-[#3D2C2E] opacity-70 line-clamp-1">{classItem.school}</p>
                      <div className="flex items-center gap-1 my-2">
                        <Star className="h-4 w-4 fill-[#CFB2A8] text-[#CFB2A8]" />
                        <span className="text-sm font-medium text-[#3D2C2E] pointer-events-none">
                          {classItem.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-[#3D2C2E] pointer-events-none">{classItem.price}</span>
                        <Button
                          size="sm"
                          className="bg-[#8B7355] hover:bg-[#6F5C46] text-white"
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
          <div className="bg-white w-full max-w-md rounded-3xl max-h-[85vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#3D2C2E]">Escolha a Modalidade</h2>
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
                      ),
                    )}
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-[#8B7355] hover:bg-[#6F5C46] text-white h-12"
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
            {classes.slice(0, 8).map((classItem, idx) => (
              <div
                key={classItem.id}
                className="absolute w-10 h-10 bg-[#8B7355] rounded-full flex items-center justify-center text-white font-bold shadow-lg cursor-pointer hover:scale-110 transition-transform"
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
                  setCurrentImageIndex(0)
                  setCurrentScreen("detail")
                }}
              >
                <div className="flex gap-4 p-4">
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
                        <h3 className="font-semibold text-[#3D2C2E] text-lg line-clamp-1">{classItem.name}</h3>
                        <p className="text-sm text-[#3D2C2E] opacity-70 line-clamp-1">{classItem.school}</p>
                      </div>
                      <button
                        className="flex-shrink-0 w-8 h-8 flex items-center justify-center hover:bg-[#F5F0EB] rounded-full transition-colors"
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
                    </div>

                    {/* Tag and Rating */}
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge className={`${classItem.tagColor} border-0 pointer-events-none text-xs`}>
                        {classItem.tag}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-[#CFB2A8] text-[#CFB2A8]" />
                        <span className="text-xs font-medium text-[#3D2C2E] pointer-events-none">
                          {classItem.rating}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <span className="text-lg font-bold text-[#3D2C2E] pointer-events-none">{classItem.price}</span>
                      <Button
                        size="sm"
                        className="bg-[#8B7355] hover:bg-[#6F5C46] text-white"
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
    <div className="h-screen bg-[#F5F0EB] flex flex-col">
      {/* Header - Fixed at top */}
      <div className="flex-shrink-0 bg-[#F5F0EB] shadow-sm">
        <div className="mx-auto w-full max-w-[1040px] p-4 flex items-center gap-3">
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
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setCurrentImageIndex((prev) => (prev === selectedClass.images.length - 1 ? 0 : prev + 1))
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
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
                  <h2 className="text-2xl font-bold text-[#3D2C2E]">{selectedClass.name}</h2>
                  <p className="text-[#3D2C2E] opacity-70">{selectedClass.school}</p>
                </div>
                <Badge className={`${selectedClass.tagColor} border-0 pointer-events-none`}>{selectedClass.tag}</Badge>
              </div>

              <div className="flex items-center gap-1 mt-2">
                <Star className="h-5 w-5 fill-[#CFB2A8] text-[#CFB2A8]" />
                <span className="font-medium text-[#3D2C2E] pointer-events-none">{selectedClass.rating}</span>
                <span className="text-sm text-[#3D2C2E] opacity-70 ml-1 pointer-events-none">
                  ({selectedClass.reviews.length} avaliações)
                </span>
              </div>

              {/* START: Updates */}
              <div className="mt-4 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {selectedClass.reviews.slice(0, 4).map((review: any, idx: number) => (
                    <div
                      key={idx}
                      className="w-8 h-8 rounded-full bg-[#CFB2A8] border-2 border-white flex items-center justify-center overflow-hidden relative flex-shrink-0"
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
                        <span className="text-xs font-medium text-white">{review.avatar}</span>
                      )}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-[#8B7355] border-2 border-white flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-white">+{Math.floor(Math.random() * 20) + 5}</span>
                  </div>
                </div>
                <span className="text-sm text-[#3D2C2E] opacity-70">Participantes</span>
              </div>
              {/* END: Updates */}

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
                    <p className="text-sm text-[#3D2C2E] opacity-70">
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
                    <Image src="/google-logo.png" alt="Google" width={20} height={20} className="mr-2" />
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
                  className="w-full justify-start border-[#CFB2A8] text-[#3D2C2E] hover:bg-[#F5F0EB] bg-transparent"
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
        <div className="bg-[#F5F0EB] p-4 shadow-sm flex items-center gap-3 flex-shrink-0">
          <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("home")} className="hover:bg-[#E5D6CD]">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold text-[#3D2C2E]">Confirmação</h1>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="mx-auto w-full max-w-[1040px]">
          <Card className="bg-white border-[#E5D6CD]">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="h-8 w-8 text-green-600" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-[#3D2C2E]">Aula Agendada!</h2>
                <p className="text-[#3D2C2E] opacity-70">Sua aula experimental foi agendada com sucesso</p>
              </div>

              {selectedClass && (
                <div className="bg-[#F5F0EB] rounded-lg p-4 space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-[#3D2C2E]">Aula:</span>
                    <span className="text-sm text-[#3D2C2E]">{selectedClass.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-[#3D2C2E]">Studio:</span>
                    <span className="text-sm text-[#3D2C2E]">{selectedClass.school}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-[#3D2C2E]">Data:</span>
                    <span className="text-sm text-[#3D2C2E]">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-[#3D2C2E]">Horário:</span>
                    <span className="text-sm text-[#3D2C2E]">{selectedTime}</span>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Button className="w-full bg-[#8B7355] hover:bg-[#6F5C46] text-white" onClick={handleAddToCalendar}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Adicionar ao Calendário
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-[#CFB2A8] text-[#3D2C2E] hover:bg-[#E5D6CD] bg-transparent"
                  onClick={() => setCurrentScreen("home")}
                >
                  Voltar para Home
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
