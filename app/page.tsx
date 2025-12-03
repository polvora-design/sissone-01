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
    zumba: useRef<HTMLDivElement>(null), // Added for Zumba
    samba: useRef<HTMLDivElement>(null), // Renamed from 'hip-hop' to 'samba' for clarity
    forro: useRef<HTMLDivElement>(null),
    ballet: useRef<HTMLDivElement>(null),
    "hip-hop": useRef<HTMLDivElement>(null), // Kept for consistency with previous logic if needed, but 'samba' is preferred
    "belly-dance": useRef<HTMLDivElement>(null), // Added for Belly Dance
    funk: useRef<HTMLDivElement>(null), // Added for Funk
    // Removed zouk ref - This comment implies removing zouk, but it's still needed for data rendering.
    // The refs in updates were missing zouk, but the data includes it. Keeping it for now.
    bachata: useRef<HTMLDivElement>(null), // Added for Bachata category
    salsa: useRef<HTMLDivElement>(null), // Added for Salsa category
    jazz: useRef<HTMLDivElement>(null), // Added for Jazz category
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
      style: selectedStyle, // Added selectedStyle to search
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
    // ZUMBA / DANÇA FITNESS (7 classes)
    {
      id: 1,
      name: "Zumba Fitness Iniciante",
      school: "Academia Energia Total",
      rating: 4.9,
      price: "R$ 40",
      time: "18:00",
      days: ["Segunda-feira", "Quarta-feira", "Sexta-feira"],
      location: "Zona Sul",
      image: "/zumba-fitness-class-energy.jpg",
      images: ["/zumba-fitness-class-energy.jpg", "/zumba-students-dancing.jpg", "/zumba-instructor-leading.jpg"],
      tag: "Popular",
      tagColor: "bg-tag-orange text-tag-orange-foreground",
      category: "zumba",
      reviews: [
        {
          name: "Carla Santos",
          avatar: "CS",
          hasPhoto: false,
          rating: 5,
          comment: "Aula super animada! Perco calorias e me divirto muito.",
        },
        {
          name: "Lucas Oliveira",
          avatar: "LO",
          hasPhoto: false,
          rating: 5,
          comment: "Melhor aula de fitness que já fiz!",
        },
      ],
    },
    {
      id: 2,
      name: "FitDance Cardio",
      school: "Studio Movimento Fitness",
      rating: 4.8,
      price: "R$ 38",
      time: "19:00",
      days: ["Terça-feira", "Quinta-feira"],
      location: "Centro",
      image: "/fitdance-cardio-studio.jpg",
      images: ["/fitdance-cardio-studio.jpg", "/fitdance-group-class.jpg", "/fitdance-instructor-energy.jpg"],
      tag: "Queima Calorias",
      tagColor: "bg-tag-red text-tag-red-foreground",
      category: "zumba",
      reviews: [
        {
          name: "Amanda Silva",
          avatar: "AS",
          hasPhoto: false,
          rating: 5,
          comment: "Alto astral e muita energia!",
        },
      ],
    },
    {
      id: 3,
      name: "Zumba Strong",
      school: "Power Fitness Academia",
      rating: 4.7,
      price: "R$ 42",
      time: "20:00",
      days: ["Segunda-feira", "Quarta-feira"],
      location: "Zona Norte",
      image: "/zumba-strong-intense.jpg",
      images: ["/zumba-strong-intense.jpg", "/zumba-strong-workout.jpg", "/zumba-strong-class.jpg"],
      tag: "Intenso",
      tagColor: "bg-tag-red text-tag-red-foreground",
      category: "zumba",
      reviews: [
        {
          name: "Rodrigo Costa",
          avatar: "RC",
          hasPhoto: false,
          rating: 5,
          comment: "Treino completo e muito desafiador!",
        },
      ],
    },
    {
      id: 4,
      name: "Dança Fitness Mix",
      school: "Academia Viva Bem",
      rating: 4.8,
      price: "R$ 35",
      time: "17:30",
      days: ["Terça-feira", "Quinta-feira", "Sábado"],
      location: "Zona Oeste",
      image: "/dance-fitness-mix.jpg",
      images: ["/dance-fitness-mix.jpg", "/fitness-dance-group.jpg", "/dance-fitness-fun.jpg"],
      tag: "Variado",
      tagColor: "bg-tag-purple text-tag-purple-foreground",
      category: "zumba",
      reviews: [
        {
          name: "Juliana Martins",
          avatar: "JM",
          hasPhoto: false,
          rating: 5,
          comment: "Cada aula é diferente, nunca fica monótono!",
        },
      ],
    },
    {
      id: 5,
      name: "Zumba Gold (Terceira Idade)",
      school: "Espaço Senior Ativo",
      rating: 4.9,
      price: "R$ 30",
      time: "14:00",
      days: ["Segunda-feira", "Quarta-feira", "Sexta-feira"],
      location: "Centro",
      image: "/zumba-gold-seniors.jpg",
      images: ["/zumba-gold-seniors.jpg", "/zumba-gold-class.jpg", "/zumba-gold-group.jpg"],
      tag: "Terceira Idade",
      tagColor: "bg-tag-cyan text-tag-cyan-foreground",
      category: "zumba",
      reviews: [
        {
          name: "Maria Helena",
          avatar: "MH",
          hasPhoto: false,
          rating: 5,
          comment: "Perfeito para minha idade, muita alegria!",
        },
      ],
    },
    {
      id: 6,
      name: "Ritmos Latinos Fitness",
      school: "Latino Dance Fitness",
      rating: 4.8,
      price: "R$ 40",
      time: "19:30",
      days: ["Terça-feira", "Quinta-feira"],
      location: "Zona Sul",
      image: "/latin-rhythms-fitness.jpg",
      images: ["/latin-rhythms-fitness.jpg", "/latin-dance-class.jpg", "/latin-fitness-energy.jpg"],
      tag: "Latino",
      tagColor: "bg-tag-yellow text-tag-yellow-foreground",
      category: "zumba",
      reviews: [
        {
          name: "Patricia Lima",
          avatar: "PL",
          hasPhoto: false,
          rating: 5,
          comment: "Ritmos contagiantes e professores animados!",
        },
      ],
    },
    {
      id: 7,
      name: "Zumba Kids",
      school: "Espaço Criança Ativa",
      rating: 4.9,
      price: "R$ 32",
      time: "16:00",
      days: ["Sábado"],
      location: "Zona Norte",
      image: "/zumba-kids-fun.jpg",
      images: ["/zumba-kids-fun.jpg", "/zumba-kids-dancing.jpg", "/zumba-kids-class.jpg"],
      tag: "Infantil",
      tagColor: "bg-tag-lime text-tag-lime-foreground",
      category: "zumba",
      reviews: [
        {
          name: "Ana Paula",
          avatar: "AP",
          hasPhoto: false,
          rating: 5,
          comment: "Meus filhos adoram! Muita diversão e exercício.",
        },
      ],
    },

    // SAMBA E GAFIEIRA (7 classes)
    {
      id: 8,
      name: "Samba de Gafieira Iniciante",
      school: "Gafieira Carioca",
      rating: 4.8,
      price: "R$ 45",
      time: "20:00",
      days: ["Terça-feira", "Quinta-feira"],
      location: "Centro",
      image: "/samba-gafieira-couple.jpg",
      images: ["/samba-gafieira-couple.jpg", "/gafieira-dance-floor.jpg", "/samba-gafieira-class.jpg"],
      tag: "Tradicional",
      tagColor: "bg-tag-green text-tag-green-foreground",
      category: "samba",
      reviews: [
        {
          name: "Roberto Silva",
          avatar: "RS",
          hasPhoto: false,
          rating: 5,
          comment: "Samba autêntico e muita malícia na dança!",
        },
      ],
    },
    {
      id: 9,
      name: "Samba no Pé",
      school: "Escola de Samba Unidos da Dança",
      rating: 4.9,
      price: "R$ 40",
      time: "19:00",
      days: ["Segunda-feira", "Quarta-feira"],
      location: "Zona Sul",
      image: "/samba-no-pe-solo.jpg",
      images: ["/samba-no-pe-solo.jpg", "/samba-solo-dancers.jpg", "/samba-carnival-style.jpg"],
      tag: "Carnaval",
      tagColor: "bg-tag-yellow text-tag-yellow-foreground",
      category: "samba",
      reviews: [
        {
          name: "Fernanda Costa",
          avatar: "FC",
          hasPhoto: false,
          rating: 5,
          comment: "Energia do carnaval em cada aula!",
        },
      ],
    },
    {
      id: 10,
      name: "Samba Rock",
      school: "Studio Groove Brasileiro",
      rating: 4.7,
      price: "R$ 42",
      time: "21:00",
      days: ["Sexta-feira", "Sábado"],
      location: "Zona Oeste",
      image: "/samba-rock-couple-dance.jpg",
      images: ["/samba-rock-couple-dance.jpg", "/samba-rock-style.jpg", "/samba-rock-moves.jpg"],
      tag: "Swing",
      tagColor: "bg-tag-orange text-tag-orange-foreground",
      category: "samba",
      reviews: [
        {
          name: "Marcos Oliveira",
          avatar: "MO",
          hasPhoto: false,
          rating: 5,
          comment: "Gingado perfeito e muita pegada!",
        },
      ],
    },
    {
      id: 11,
      name: "Gafieira Avançada",
      school: "Academia Elite de Gafieira",
      rating: 4.9,
      price: "R$ 50",
      time: "20:30",
      days: ["Terça-feira", "Quinta-feira"],
      location: "Centro",
      image: "/gafieira-advanced-dancers.jpg",
      images: ["/gafieira-advanced-dancers.jpg", "/gafieira-elegant-moves.jpg", "/gafieira-couple-spin.jpg"],
      tag: "Avançado",
      tagColor: "bg-tag-indigo text-tag-indigo-foreground",
      category: "samba",
      reviews: [
        {
          name: "Helena Martins",
          avatar: "HM",
          hasPhoto: false,
          rating: 5,
          comment: "Técnica impecável e muita elegância!",
        },
      ],
    },
    {
      id: 12,
      name: "Samba Pagode",
      school: "Roda de Samba e Dança",
      rating: 4.7,
      price: "R$ 38",
      time: "19:30",
      days: ["Quarta-feira", "Sexta-feira"],
      location: "Zona Norte",
      image: "/samba-pagode-party.jpg",
      images: ["/samba-pagode-party.jpg", "/pagode-dancing.jpg", "/samba-pagode-fun.jpg"],
      tag: "Pagode",
      tagColor: "bg-tag-red text-tag-red-foreground",
      category: "samba",
      reviews: [
        {
          name: "Bruno Santos",
          avatar: "BS",
          hasPhoto: false,
          rating: 5,
          comment: "Pagode raiz e muita alegria!",
        },
      ],
    },
    {
      id: 13,
      name: "Samba de Salão Moderno",
      school: "Espaço Dança Brasileira",
      rating: 4.8,
      price: "R$ 44",
      time: "18:30",
      days: ["Segunda-feira", "Quarta-feira"],
      location: "Zona Sul",
      image: "/samba-modern-ballroom.jpg",
      images: ["/samba-modern-ballroom.jpg", "/samba-contemporary-style.jpg", "/samba-modern-couple.jpg"],
      tag: "Moderno",
      tagColor: "bg-tag-purple text-tag-purple-foreground",
      category: "samba",
      reviews: [
        {
          name: "Beatriz Lima",
          avatar: "BL",
          hasPhoto: false,
          rating: 5,
          comment: "Samba com toque moderno, adorei!",
        },
      ],
    },
    {
      id: 14,
      name: "Samba de Raiz",
      school: "Tradição Sambista",
      rating: 4.9,
      price: "R$ 42",
      time: "20:00",
      days: ["Quinta-feira", "Sábado"],
      location: "Centro",
      image: "/samba-raiz-authentic.jpg",
      images: ["/samba-raiz-authentic.jpg", "/samba-traditional-dance.jpg", "/samba-raiz-culture.jpg"],
      tag: "Autêntico",
      tagColor: "bg-tag-green text-tag-green-foreground",
      category: "samba",
      reviews: [
        {
          name: "Sandra Ferreira",
          avatar: "SF",
          hasPhoto: false,
          rating: 5,
          comment: "Samba de verdade, do jeito que tem que ser!",
        },
      ],
    },

    // FORRÓ (7 classes)
    {
      id: 15,
      name: "Forró Pé de Serra",
      school: "Casa do Forró Nordestino",
      rating: 4.8,
      price: "R$ 38",
      time: "20:00",
      days: ["Quinta-feira", "Sexta-feira"],
      location: "Centro",
      image: "/forro-pe-de-serra.jpg",
      images: ["/forro-pe-de-serra.jpg", "/forro-traditional-dance.jpg", "/forro-accordion-dancing.jpg"],
      tag: "Tradicional",
      tagColor: "bg-tag-amber text-tag-amber-foreground",
      category: "forro",
      reviews: [
        {
          name: "João Pedro",
          avatar: "JP",
          hasPhoto: false,
          rating: 5,
          comment: "Forró raiz, do jeito que tem que ser!",
        },
      ],
    },
    {
      id: 16,
      name: "Forró Universitário",
      school: "Pé de Valsa Studio",
      rating: 4.7,
      price: "R$ 35",
      time: "21:00",
      days: ["Terça-feira", "Sábado"],
      location: "Zona Sul",
      image: "/forro-universitario-young.jpg",
      images: ["/forro-universitario-young.jpg", "/forro-college-party.jpg", "/forro-young-dancers.jpg"],
      tag: "Universitário",
      tagColor: "bg-tag-lime text-tag-lime-foreground",
      category: "forro",
      reviews: [
        {
          name: "Camila Souza",
          avatar: "CS",
          hasPhoto: false,
          rating: 5,
          comment: "Ambiente jovem e descontraído!",
        },
      ],
    },
    {
      id: 17,
      name: "Forró Eletrônico",
      school: "Arena do Forró",
      rating: 4.6,
      price: "R$ 36",
      time: "22:00",
      days: ["Sexta-feira", "Sábado"],
      location: "Zona Norte",
      image: "/forro-eletronico-modern.jpg",
      images: ["/forro-eletronico-modern.jpg", "/forro-electronic-party.jpg", "/forro-modern-style.jpg"],
      tag: "Eletrônico",
      tagColor: "bg-tag-blue text-tag-blue-foreground",
      category: "forro",
      reviews: [
        {
          name: "Rafael Mendes",
          avatar: "RM",
          hasPhoto: false,
          rating: 5,
          comment: "Batida moderna e muito animado!",
        },
      ],
    },
    {
      id: 18,
      name: "Forró de Raiz",
      school: "Sanfona e Zabumba",
      rating: 4.9,
      price: "R$ 40",
      time: "19:30",
      days: ["Quarta-feira", "Sexta-feira"],
      location: "Centro",
      image: "/forro-raiz-authentic.jpg",
      images: ["/forro-raiz-authentic.jpg", "/forro-traditional-couple.jpg", "/forro-roots-culture.jpg"],
      tag: "Autêntico",
      tagColor: "bg-tag-orange text-tag-orange-foreground",
      category: "forro",
      reviews: [
        {
          name: "Maria José",
          avatar: "MJ",
          hasPhoto: false,
          rating: 5,
          comment: "Forró de verdade, com muita paixão!",
        },
      ],
    },
    {
      id: 19,
      name: "Forró Romântico",
      school: "Paixão Nordestina",
      rating: 4.8,
      price: "R$ 42",
      time: "20:30",
      days: ["Segunda-feira", "Quinta-feira"],
      location: "Zona Oeste",
      image: "/forro-romantico-couple.jpg",
      images: ["/forro-romantico-couple.jpg", "/forro-romantic-dance.jpg", "/forro-intimate-style.jpg"],
      tag: "Romântico",
      tagColor: "bg-tag-pink text-tag-pink-foreground",
      category: "forro",
      reviews: [
        {
          name: "Gustavo Silva",
          avatar: "GS",
          hasPhoto: false,
          rating: 5,
          comment: "Perfeito para dançar com minha namorada!",
        },
      ],
    },
    {
      id: 20,
      name: "Forró Iniciante",
      school: "Arrasta-Pé Dance School",
      rating: 4.7,
      price: "R$ 34",
      time: "18:00",
      days: ["Terça-feira", "Quinta-feira"],
      location: "Zona Sul",
      image: "/forro-beginners-class.jpg",
      images: ["/forro-beginners-class.jpg", "/forro-learning-basics.jpg", "/forro-starter-group.jpg"],
      tag: "Iniciante",
      tagColor: "bg-tag-green text-tag-green-foreground",
      category: "forro",
      reviews: [
        {
          name: "Larissa Costa",
          avatar: "LC",
          hasPhoto: false,
          rating: 5,
          comment: "Ótimo para quem está começando!",
        },
      ],
    },
    {
      id: 21,
      name: "Forró Avançado",
      school: "Mestres do Forró",
      rating: 4.9,
      price: "R$ 45",
      time: "21:30",
      days: ["Quarta-feira", "Sábado"],
      location: "Centro",
      image: "/forro-advanced-dancers.jpg",
      images: ["/forro-advanced-dancers.jpg", "/forro-expert-moves.jpg", "/forro-advanced-techniques.jpg"],
      tag: "Avançado",
      tagColor: "bg-tag-indigo text-tag-indigo-foreground",
      category: "forro",
      reviews: [
        {
          name: "Diego Oliveira",
          avatar: "DO",
          hasPhoto: false,
          rating: 5,
          comment: "Técnicas avançadas e muitos desafios!",
        },
      ],
    },

    // BALÉ CLÁSSICO (7 classes)
    {
      id: 22,
      name: "Balé Clássico Infantil",
      school: "Academia de Ballet Imperial",
      rating: 4.9,
      price: "R$ 55",
      time: "15:00",
      days: ["Segunda-feira", "Quarta-feira", "Sexta-feira"],
      location: "Zona Sul",
      image: "/ballet-children-class.jpg",
      images: ["/ballet-children-class.jpg", "/ballet-kids-barre.jpg", "/ballet-young-dancers.jpg"],
      tag: "Infantil",
      tagColor: "bg-tag-pink text-tag-pink-foreground",
      category: "ballet",
      reviews: [
        {
          name: "Julia Martins",
          avatar: "JM",
          hasPhoto: false,
          rating: 5,
          comment: "Minha filha adora! Professoras muito atenciosas.",
        },
      ],
    },
    {
      id: 23,
      name: "Balé Clássico Adulto Iniciante",
      school: "Studio Gracia",
      rating: 4.8,
      price: "R$ 50",
      time: "19:00",
      days: ["Terça-feira", "Quinta-feira"],
      location: "Centro",
      image: "/ballet-adult-beginners.jpg",
      images: ["/ballet-adult-beginners.jpg", "/ballet-adult-barre.jpg", "/ballet-adult-class.jpg"],
      tag: "Adulto",
      tagColor: "bg-tag-cyan text-tag-cyan-foreground",
      category: "ballet",
      reviews: [
        {
          name: "Adriana Santos",
          avatar: "AS",
          hasPhoto: false,
          rating: 5,
          comment: "Nunca é tarde para começar! Aulas lindas.",
        },
      ],
    },
    {
      id: 24,
      name: "Balé Clássico Avançado",
      school: "Companhia de Dança Clássica",
      rating: 4.9,
      price: "R$ 65",
      time: "18:00",
      days: ["Segunda-feira", "Quarta-feira", "Sexta-feira"],
      location: "Zona Sul",
      image: "/ballet-advanced-class.jpg",
      images: ["/ballet-advanced-class.jpg", "/ballet-pointe-work.jpg", "/ballet-advanced-technique.jpg"],
      tag: "Avançado",
      tagColor: "bg-tag-indigo text-tag-indigo-foreground",
      category: "ballet",
      reviews: [
        {
          name: "Carolina Silva",
          avatar: "CS",
          hasPhoto: false,
          rating: 5,
          comment: "Técnica impecável e repertório clássico!",
        },
      ],
    },
    {
      id: 25,
      name: "Balé Repertório",
      school: "Teatro de Dança",
      rating: 4.9,
      price: "R$ 60",
      time: "17:00",
      days: ["Terça-feira", "Quinta-feira", "Sábado"],
      location: "Centro",
      image: "/ballet-repertoire-performance.jpg",
      images: ["/ballet-repertoire-performance.jpg", "/ballet-classical-pieces.jpg", "/ballet-stage-rehearsal.jpg"],
      tag: "Repertório",
      tagColor: "bg-tag-purple text-tag-purple-foreground",
      category: "ballet",
      reviews: [
        {
          name: "Isabella Costa",
          avatar: "IC",
          hasPhoto: false,
          rating: 5,
          comment: "Repertório clássico maravilhoso!",
        },
      ],
    },
    {
      id: 26,
      name: "Balé Fitness",
      school: "Ballet Body Studio",
      rating: 4.7,
      price: "R$ 48",
      time: "20:00",
      days: ["Segunda-feira", "Quarta-feira"],
      location: "Zona Norte",
      image: "/ballet-fitness-workout.jpg",
      images: ["/ballet-fitness-workout.jpg", "/ballet-barre-fitness.jpg", "/ballet-body-conditioning.jpg"],
      tag: "Fitness",
      tagColor: "bg-tag-orange text-tag-orange-foreground",
      category: "ballet",
      reviews: [
        {
          name: "Patricia Lima",
          avatar: "PL",
          hasPhoto: false,
          rating: 5,
          comment: "Trabalho corporal incrível com base no ballet!",
        },
      ],
    },
    {
      id: 27,
      name: "Balé Clássico Intermediário",
      school: "Escola de Ballet Bela Arte",
      rating: 4.8,
      price: "R$ 52",
      time: "16:30",
      days: ["Terça-feira", "Quinta-feira", "Sábado"],
      location: "Zona Oeste",
      image: "/ballet-intermediate-students.jpg",
      images: ["/ballet-intermediate-students.jpg", "/ballet-center-work.jpg", "/ballet-intermediate-technique.jpg"],
      tag: "Intermediário",
      tagColor: "bg-tag-blue text-tag-blue-foreground",
      category: "ballet",
      reviews: [
        {
          name: "Sophia Rodrigues",
          avatar: "SR",
          hasPhoto: false,
          rating: 5,
          comment: "Evolução constante e professoras excelentes!",
        },
      ],
    },
    {
      id: 28,
      name: "Balé Baby Class",
      school: "Pequenos Bailarinos",
      rating: 4.9,
      price: "R$ 45",
      time: "14:00",
      days: ["Segunda-feira", "Quarta-feira"],
      location: "Zona Sul",
      image: "/ballet-baby-class-toddlers.jpg",
      images: ["/ballet-baby-class-toddlers.jpg", "/ballet-little-dancers.jpg", "/ballet-early-childhood.jpg"],
      tag: "3-5 anos",
      tagColor: "bg-tag-lime text-tag-lime-foreground",
      category: "ballet",
      reviews: [
        {
          name: "Mariana Souza",
          avatar: "MS",
          hasPhoto: false,
          rating: 5,
          comment: "Minha filha de 4 anos ama! Muito lúdico.",
        },
      ],
    },

    // HIP-HOP / DANÇAS URBANAS (7 classes)
    {
      id: 29,
      name: "Hip Hop Iniciante",
      school: "Urban Dance Academy",
      rating: 4.8,
      price: "R$ 38",
      time: "19:00",
      days: ["Terça-feira", "Quinta-feira"],
      location: "Centro",
      image: "/hip-hop-beginners-class.jpg",
      images: ["/hip-hop-beginners-class.jpg", "/hip-hop-basic-moves.jpg", "/hip-hop-starter-group.jpg"],
      tag: "Iniciante",
      tagColor: "bg-tag-green text-tag-green-foreground",
      category: "hip-hop",
      reviews: [
        {
          name: "Thiago Santos",
          avatar: "TS",
          hasPhoto: false,
          rating: 5,
          comment: "Ótimo para quem está começando no hip hop!",
        },
      ],
    },
    {
      id: 30,
      name: "Breaking / B-boying",
      school: "Street Style Crew",
      rating: 4.9,
      price: "R$ 42",
      time: "20:30",
      days: ["Segunda-feira", "Quarta-feira", "Sexta-feira"],
      location: "Zona Oeste",
      image: "/breaking-bboy-class.jpg",
      images: ["/breaking-bboy-class.jpg", "/breaking-power-moves.jpg", "/breaking-freeze-poses.jpg"],
      tag: "Breaking",
      tagColor: "bg-tag-red text-tag-red-foreground",
      category: "hip-hop",
      reviews: [
        {
          name: "Diego Oliveira",
          avatar: "DO",
          hasPhoto: false,
          rating: 5,
          comment: "Power moves incríveis! Aulas desafiadoras.",
        },
      ],
    },
    {
      id: 31,
      name: "Popping e Locking",
      school: "Funk Style Studio",
      rating: 4.7,
      price: "R$ 40",
      time: "18:30",
      days: ["Terça-feira", "Quinta-feira"],
      location: "Zona Sul",
      image: "/popping-locking-class.jpg",
      images: ["/popping-locking-class.jpg", "/funk-style-techniques.jpg", "/popping-isolation-moves.jpg"],
      tag: "Popping e Locking",
      tagColor: "bg-tag-purple text-tag-purple-foreground",
      category: "hip-hop",
      reviews: [
        {
          name: "Fernanda Costa",
          avatar: "FC",
          hasPhoto: false,
          rating: 5,
          comment: "Movimentos isolados incríveis e muito divertido!",
        },
      ],
    },
    {
      id: 32,
      name: "Funk Dance",
      school: "Funk Dance Studio",
      rating: 4.8,
      price: "R$ 45",
      time: "21:00",
      days: ["Sexta-feira", "Sábado"],
      location: "Zona Norte",
      image: "/funk-dance-class.jpg",
      images: ["/funk-dance-class.jpg", "/funk-dance-party.jpg", "/funk-dance-style.jpg"],
      tag: "Funk",
      tagColor: "bg-tag-yellow text-tag-yellow-foreground",
      category: "hip-hop",
      reviews: [
        {
          name: "Lucas Oliveira",
          avatar: "LO",
          hasPhoto: false,
          rating: 5,
          comment: "Batida funk animada e movimentos únicos!",
        },
      ],
    },
    {
      id: 33,
      name: "Street Dance",
      school: "Street Dance Academy",
      rating: 4.9,
      price: "R$ 50",
      time: "22:30",
      days: ["Segunda-feira", "Quarta-feira"],
      location: "Centro",
      image: "/street-dance-class.jpg",
      images: ["/street-dance-class.jpg", "/street-dance-group.jpg", "/street-dance-style.jpg"],
      tag: "Street Dance",
      tagColor: "bg-tag-indigo text-tag-indigo-foreground",
      category: "hip-hop",
      reviews: [
        {
          name: "Ana Paula",
          avatar: "AP",
          hasPhoto: false,
          rating: 5,
          comment: "Dança urbana intensa e muito divertida!",
        },
      ],
    },
    {
      id: 34,
      name: "Dancehall",
      school: "Dancehall Groove",
      rating: 4.7,
      price: "R$ 48",
      time: "18:00",
      days: ["Terça-feira", "Sábado"],
      location: "Zona Sul",
      image: "/dancehall-class.jpg",
      images: ["/dancehall-class.jpg", "/dancehall-group-dance.jpg", "/dancehall-style.jpg"],
      tag: "Dancehall",
      tagColor: "bg-tag-blue text-tag-blue-foreground",
      category: "hip-hop",
      reviews: [
        {
          name: "Carolina Silva",
          avatar: "CS",
          hasPhoto: false,
          rating: 5,
          comment: "Batida dancehall pegada e muita diversão!",
        },
      ],
    },
    {
      id: 35,
      name: "Urban Dance",
      school: "Urban Dance School",
      rating: 4.9,
      price: "R$ 52",
      time: "20:00",
      days: ["Quinta-feira", "Sábado"],
      location: "Zona Oeste",
      image: "/urban-dance-class.jpg",
      images: ["/urban-dance-class.jpg", "/urban-dance-group.jpg", "/urban-dance-style.jpg"],
      tag: "Urban Dance",
      tagColor: "bg-tag-green text-tag-green-foreground",
      category: "hip-hop",
      reviews: [
        {
          name: "Diego Oliveira",
          avatar: "DO",
          hasPhoto: false,
          rating: 5,
          comment: "Dança urbana moderna e muito desafiadora!",
        },
      ],
    },
  ]

  return <div>{/* Render your components here */}</div>
}

export default SissonePrototype
