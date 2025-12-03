"use client"

import { useState, useRef } from "react"

type Screen = "home" | "filters" | "detail" | "schedule" | "confirmation" | "search-results"

const SissonePrototype = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedClass, setSelectedClass] = useState<(typeof classes)[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const [showSearchModal, setShowSearchModal] = useState(false)
  // const [searchLocation, setSearchLocation] = useState("") // Removed from updates
  // const [searchWhen, setSearchWhen] = useState("") // Removed from updates
  const [searchModality, setSearchModality] = useState<string[]>([])
  // const [showCalendarModal, setShowCalendarModal] = useState(false) // Removed from updates
  // const [selectedDate, setSelectedDate] = useState("") // Replaced by selectedDate state in updates
  // const [selectedTime, setSelectedTime] = useState("") // Removed from updates
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState("")

  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // New state variables for weekly selection // These seem to be from a previous iteration and are not fully utilized in the provided updates
  // const [showWeeklyModal, setShowWeeklyModal] = useState(false)
  // const [selectedDays, setSelectedDays] = useState<string[]>([])
  // const [selectedShifts, setSelectedShifts] = useState<string[]>([])

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
  // const [mobileSearchStep, setMobileSearchStep] = useState<"where" | "when" | "modality">("where") // Removed from updates
  const [showLoginDropdown, setShowLoginDropdown] = useState(false)
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)

  // Search filters
  const [searchQuery, setSearchQuery] = useState("")
  // const [searchDate, setSearchDate] = useState("") // Replaced by selectedDate in updates
  const [showDatePicker, setShowDatePicker] = useState(false)
  // const [selectedSpecificDate, setSelectedSpecificDate] = useState("") // Replaced by dateRangeStart/End logic

  const [dateRangeStart, setDateRangeStart] = useState<Date | null>(null)
  const [dateRangeEnd, setDateRangeEnd] = useState<Date | null>(null)
  const [calendarMonth, setCalendarMonth] = useState(new Date())
  const [showMobileDatePicker, setShowMobileDatePicker] = useState(false)

  // Moved from updates
  const [selectedLocation, setSelectedLocation] = useState("") // From updates
  const [selectedDate, setSelectedDate] = useState("Hoje") // From updates, replaces searchDate
  const [selectedStyle, setSelectedStyle] = useState("") // From updates, replaces searchModality for single selection
  const [showMobileSearchModal, setShowMobileSearchModal] = useState(false) // From updates
  const [selectedTime, setSelectedTime] = useState<string>("") // New state for selected time

  const categoryRefs = {
    today: useRef<HTMLDivElement>(null),
    contemporary: useRef<HTMLDivElement>(null),
    "hip-hop": useRef<HTMLDivElement>(null), // Changed key to match updates
    ballet: useRef<HTMLDivElement>(null),
    salsa: useRef<HTMLDivElement>(null),
    jazz: useRef<HTMLDivElement>(null),
    forro: useRef<HTMLDivElement>(null),
    ballroom: useRef<HTMLDivElement>(null),
    samba: useRef<HTMLDivElement>(null),
    zouk: useRef<HTMLDivElement>(null), // Kept as it's in the original data, though not in updates' refs
    // Removed zouk ref - This comment implies removing zouk, but it's still needed for data rendering.
    // The refs in updates were missing zouk, but the data includes it. Keeping it for now.
    bachata: useRef<HTMLDivElement>(null), // Added for Bachata category
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

  // const handleMobileSearchOpen = () => { // Replaced by logic within showMobileSearchModal toggle
  //   setShowMobileSearchModal(true)
  //   // setMobileSearchStep("where")
  // }

  const handleMobileSearchClose = () => {
    setShowMobileSearchModal(false)
    // setMobileSearchStep("where")
    setShowMobileDatePicker(false)
    // Reset search query and other mobile search specific states if needed
    setSearchQuery("")
    setSelectedLocation("")
    setSelectedDate("Hoje")
    setSelectedStyle("")
    setDateRangeStart(null)
    setDateRangeEnd(null)
  }

  // const handleMobileSearchClear = () => { // Logic integrated into handleMobileSearchClose
  //   setSearchQuery("")
  //   setSearchDate("")
  //   setSearchModality([])
  //   setDateRangeStart(null)
  //   setDateRangeEnd(null)
  // }

  const handleMobileSearchSubmit = () => {
    setShowMobileSearchModal(false)
    // Trigger actual search based on current mobile search state
    handleSearch()
  }

  // Placeholder for the actual search logic
  const handleSearch = () => {
    console.log("Searching with:", {
      query: searchQuery,
      date: selectedDate, // Using selectedDate
      modality: searchModality.join(", "), // Still using searchModality for multi-select
      location: selectedLocation, // From updates
    })
    setCurrentScreen("search-results") // Navigate to search results
  }

  const formatDateRange = () => {
    if (!dateRangeStart && !dateRangeEnd) return ""
    if (dateRangeStart && !dateRangeEnd) {
      return dateRangeStart.toLocaleDateString("pt-BR", { day: "numeric", month: "short" })
    }
    if (dateRangeStart && dateRangeEnd) {
      return `${dateRangeStart.toLocaleDateString("pt-BR", { day: "numeric", month: "short" })} - ${dateRangeEnd.toLocaleDateString("pt-BR", { day: "numeric", month: "short" })}`
    }
    return ""
  }

  const handleDateClick = (date: Date) => {
    if (!dateRangeStart || (dateRangeStart && dateRangeEnd)) {
      setDateRangeStart(date)
      setDateRangeEnd(null)
    } else {
      if (date < dateRangeStart) {
        setDateRangeEnd(dateRangeStart)
        setDateRangeStart(date)
      } else {
        setDateRangeEnd(date)
      }
    }
    // Update selectedDate based on range if it's "specific"
    if (selectedDate === "specific") {
      if (dateRangeStart && dateRangeEnd) {
        // You might want to set a more specific string representation or keep it as a range object
      } else if (dateRangeStart) {
        // Set to the start date for now, or indicate a range is being selected
        setSelectedDate(`${dateRangeStart.toLocaleDateString("pt-BR", { day: "numeric", month: "short" })}`)
      }
    }
  }

  const isDateInRange = (date: Date) => {
    if (!dateRangeStart) return false
    if (!dateRangeEnd) return date.toDateString() === dateRangeStart.toDateString()
    return date >= dateRangeStart && date <= dateRangeEnd
  }

  const isDateRangeStart = (date: Date) => {
    return dateRangeStart && date.toDateString() === dateRangeStart.toDateString()
  }

  const isDateRangeEnd = (date: Date) => {
    return dateRangeEnd && date.toDateString() === dateRangeEnd.toDateString()
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    return { daysInMonth, startingDayOfWeek }
  }

  const changeMonth = (offset: number) => {
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + offset, 1))
  }

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(calendarMonth)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day)
      const isInRange = isDateInRange(date)
      const isStart = isDateRangeStart(date)
      const isEnd = isDateRangeEnd(date)
      const isToday = date.toDateString() === new Date().toDateString()

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(date)}
          className={`h-10 flex items-center justify-center text-sm rounded-full transition-colors
            ${isStart || isEnd ? "bg-primary text-primary-foreground font-semibold" : ""}
            ${isInRange && !isStart && !isEnd ? "bg-primary/20 text-foreground" : ""}
            ${!isInRange && !isStart && !isEnd ? "hover:bg-secondary text-foreground" : ""}
            ${isToday && !isInRange ? "border-2 border-primary" : ""}
          `}
        >
          {day}
        </button>,
      )
    }

    return days
  }

  const classes = [
    {
      id: 1,
      name: "Dança Contemporânea Flow",
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
          comment: "Melhor aula de dança contemporânea da cidade. Recomendo muito!",
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
      name: "Hip Hop Básico",
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
      name: "Dança Contemporânea Intensivo",
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
      name: "Hip Hop Avançado",
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
      name: "Dança de Salão Avançada",
      school: "Salão de Elite",
      rating: 4.9,
      price: "R$ 58",
      time: "21:00",
      days: ["Terça-feira", "Quinta-feira"],
      location: "Zona Sul",
      image: "/salsa-dancers-performance.jpg",
      images: ["/salsa-dance-class-couple.jpg", "/salsa-studio-interior.jpg", "/salsa-dancers-performance.jpg"],
      tag: "Avançado",
      tagColor: "bg-tag-indigo text-tag-indigo-foreground",
      category: "ballroom",
      reviews: [
        {
          name: "Patrícia Lima",
          avatar: "PL",
          hasPhoto: false,
          rating: 5,
          comment: "Técnica impecável e muita elegância!",
        },
      ],
    },
    {
      id: 15,
      name: "Samba no Pé",
      school: "Escola de Samba Primeira",
      rating: 4.8,
      price: "R$ 40",
      time: "20:00",
      days: ["Segunda-feira", "Quarta-feira"],
      location: "Centro",
      image: "/salsa-dance-class-couple.jpg",
      images: ["/salsa-studio-interior.jpg", "/salsa-dance-class-couple.jpg"],
      tag: "Raiz",
      tagColor: "bg-tag-green text-tag-green-foreground",
      category: "samba",
      reviews: [
        {
          name: "Roberto Carlos",
          avatar: "RC",
          hasPhoto: false,
          rating: 5,
          comment: "Energia do carnaval em cada aula!",
        },
      ],
    },
    {
      id: 16,
      name: "Samba Rock",
      school: "Gafieira Urbana",
      rating: 4.7,
      price: "R$ 42",
      time: "19:00",
      days: ["Terça-feira", "Quinta-feira"],
      location: "Zona Oeste",
      image: "/salsa-dancers-performance.jpg",
      images: ["/salsa-dance-class-couple.jpg", "/salsa-dancers-performance.jpg"],
      tag: "Swing",
      tagColor: "bg-tag-orange text-tag-orange-foreground",
      category: "samba",
      reviews: [
        {
          name: "Fábio Santos",
          avatar: "FS",
          hasPhoto: false,
          rating: 5,
          comment: "Gingado perfeito e muita diversão!",
        },
      ],
    },
    {
      id: 17,
      name: "Zouk Flow",
      school: "Studio Sensual",
      rating: 4.9,
      price: "R$ 48",
      time: "21:00",
      days: ["Sexta-feira", "Sábado"],
      location: "Zona Sul",
      image: "/salsa-dance-class-couple.jpg",
      images: ["/salsa-studio-interior.jpg", "/salsa-dancers-performance.jpg", "/salsa-dance-class-couple.jpg"],
      tag: "Sensual",
      tagColor: "bg-tag-purple text-tag-purple-foreground",
      category: "zouk",
      reviews: [
        {
          name: "Bianca Costa",
          avatar: "BC",
          hasPhoto: false,
          rating: 5,
          comment: "Conexão incrível e movimentos suaves!",
        },
      ],
    },
    {
      id: 18,
      name: "Zouk Lambazouk",
      school: "Dançando na Penumbra",
      rating: 4.8,
      price: "R$ 46",
      time: "20:30",
      days: ["Quinta-feira", "Domingo"],
      location: "Centro",
      image: "/salsa-dancers-performance.jpg",
      images: ["/salsa-dance-class-couple.jpg", "/salsa-studio-interior.jpg", "/salsa-dancers-performance.jpg"],
      tag: "Romântico",
      tagColor: "bg-tag-pink text-tag-pink-foreground",
      category: "zouk",
      reviews: [
        {
          name: "Eduardo Lima",
          avatar: "EL",
          hasPhoto: false,
          rating: 5,
          comment: "Ritmo envolvente e professores muito atenciosos!",
        },
      ],
    },
    {
      id: 19,
      name: "Dança Contemporânea Experimental",
      school: "Arte em Movimento",
      rating: 4.7,
      price: "R$ 52",
      time: "18:30",
      days: ["Quarta-feira", "Sexta-feira"],
      location: "Zona Sul",
      image: "/contemporary-dance-instructor-teaching.jpg",
      images: [
        "/contemporary-dance-class-studio.jpg",
        "/contemporary-dance-students-practicing.jpg",
        "/contemporary-dance-instructor-teaching.jpg",
      ],
      tag: "Experimental",
      tagColor: "bg-tag-violet text-tag-violet-foreground",
      category: "contemporary",
      reviews: [
        {
          name: "Júlia Martins",
          avatar: "JM",
          hasPhoto: false,
          rating: 5,
          comment: "Aulas muito criativas e inspiradoras!",
        },
      ],
    },
    {
      id: 20,
      name: "Dança Contemporânea para Iniciantes",
      school: "Núcleo Dança",
      rating: 4.6,
      price: "R$ 40",
      time: "17:30",
      days: ["Segunda-feira", "Quarta-feira"],
      location: "Zona Norte",
      image: "/contemporary-dance-class-studio-interior.jpg",
      images: [
        "/contemporary-dance-students-practicing.jpg",
        "/contemporary-dance-class-studio.jpg",
        "/contemporary-dance-class-studio-interior.jpg",
      ],
      tag: "Iniciante",
      tagColor: "bg-tag-green text-tag-green-foreground",
      category: "contemporary",
      reviews: [
        {
          name: "Carlos Pereira",
          avatar: "CP",
          hasPhoto: false,
          rating: 5,
          comment: "Aulas muito inspiradoras e divertidas!",
        },
      ],
    },
  ]

  return <div>{/* Render your components here */}</div>
}

export default SissonePrototype
