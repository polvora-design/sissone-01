"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, MapPin, Star, Clock, Calendar, User, Check, Filter, Edit3, Map } from "lucide-react"

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
      image: "/placeholder.svg?height=120&width=200",
      images: [
        "/placeholder.svg?height=300&width=400&text=Aula+Contemporary+1",
        "/placeholder.svg?height=300&width=400&text=Aula+Contemporary+2",
        "/placeholder.svg?height=300&width=400&text=Aula+Contemporary+3",
      ],
      tag: "Popular",
      tagColor: "bg-orange-100 text-orange-800",
      reviews: [
        {
          name: "Ana Silva",
          rating: 5,
          comment: "Aula incrível! A professora é muito atenciosa e o ambiente é acolhedor.",
        },
        { name: "Carlos Santos", rating: 5, comment: "Melhor aula de contemporary da cidade. Recomendo muito!" },
        { name: "Maria Oliveira", rating: 4, comment: "Ótima para iniciantes, explicações claras e didáticas." },
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
      image: "/placeholder.svg?height=120&width=200",
      images: [
        "/placeholder.svg?height=300&width=400&text=Aula+Hip+Hop+1",
        "/placeholder.svg?height=300&width=400&text=Aula+Hip+Hop+2",
        "/placeholder.svg?height=300&width=400&text=Aula+Hip+Hop+3",
      ],
      tag: "Preferido dos Alunos",
      tagColor: "bg-purple-100 text-purple-800",
      reviews: [
        { name: "João Pedro", rating: 5, comment: "Energia incrível! Saio de cada aula motivado e feliz." },
        { name: "Beatriz Costa", rating: 5, comment: "Professor top, ensina com muita paciência e técnica." },
        { name: "Rafael Lima", rating: 5, comment: "Ambiente descontraído e aulas muito bem estruturadas." },
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
      image: "/placeholder.svg?height=120&width=200",
      images: [
        "/placeholder.svg?height=300&width=400&text=Aula+Ballet+1",
        "/placeholder.svg?height=300&width=400&text=Aula+Ballet+2",
        "/placeholder.svg?height=300&width=400&text=Aula+Ballet+3",
      ],
      tag: "Novo",
      tagColor: "bg-green-100 text-green-800",
      reviews: [
        {
          name: "Isabella Ferreira",
          rating: 5,
          comment: "Técnica impecável, professora com formação clássica excelente.",
        },
        { name: "Sophia Rodrigues", rating: 4, comment: "Aulas bem estruturadas, ótima para quem quer base sólida." },
        { name: "Helena Martins", rating: 5, comment: "Ambiente elegante e profissional, recomendo muito!" },
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
      image: "/placeholder.svg?height=120&width=200",
      images: [
        "/placeholder.svg?height=300&width=400&text=Aula+Salsa+1",
        "/placeholder.svg?height=300&width=400&text=Aula+Salsa+2",
        "/placeholder.svg?height=300&width=400&text=Aula+Salsa+3",
      ],
      tag: "Quente",
      tagColor: "bg-red-100 text-red-800",
      reviews: [
        { name: "Pedro Oliveira", rating: 5, comment: "Ambiente descontraído e professores incríveis!" },
        { name: "Carla Mendes", rating: 4, comment: "Ótimo para quem está começando na salsa." },
        { name: "Roberto Silva", rating: 5, comment: "Melhor escola de salsa da cidade!" },
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
      image: "/placeholder.svg?height=120&width=200",
      images: [
        "/placeholder.svg?height=300&width=400&text=Aula+Jazz+1",
        "/placeholder.svg?height=300&width=400&text=Aula+Jazz+3",
      ],
      tag: "Trending",
      tagColor: "bg-yellow-100 text-yellow-800",
      reviews: [
        { name: "Marina Santos", rating: 5, comment: "Técnica excelente e coreografias incríveis!" },
        { name: "Lucas Ferreira", rating: 5, comment: "Professor muito didático e paciente." },
        { name: "Amanda Costa", rating: 4, comment: "Aulas dinâmicas e muito divertidas." },
      ],
    },
  ]

  const getSearchSummary = () => {
    const parts = []
    if (searchLocation) parts.push(searchLocation)
    if (searchWhen === "today") parts.push("Hoje")
    else if (searchWhen === "specific" && selectedDate) parts.push(selectedDate)
    else if (searchWhen === "weekly" && selectedDays.length > 0) parts.push(selectedDays.join(", "))
    if (searchModality.length > 0) parts.push(searchModality.join(", "))

    return parts.length > 0 ? parts.join(" • ") : "Buscar aulas"
  }

  const renderHomeScreen = () => (
    <div className="min-h-screen bg-[#F5F0EB]">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#3D2C2E]">Sissone</h1>
          <p className="text-sm text-[#3D2C2E] opacity-70">Para quem quer aprender, ensinar e viver a dança</p>
        </div>
      </div>

      {/* Search Button */}
      <div className="p-4 bg-white border-b">
        <Button
          variant="outline"
          className="w-full h-12 border-[#CFB2A8] text-[#3D2C2E] bg-white justify-start px-4"
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
      <div className="p-4 bg-white border-b">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {[
            { name: "Ballet", icon: "🩰" },
            { name: "Jazz", icon: "🎷" },
            { name: "Forró", icon: "🪗" },
            { name: "Ao ar livre", icon: "🌳" },
            { name: "Profissionais", icon: "👨‍🏫" },
            { name: "Dança de salão", icon: "💃🕺" },
            { name: "Aula Particular", icon: "👤" },
          ].map((filter) => (
            <Button
              key={filter.name}
              variant="outline"
              className="flex-shrink-0 h-12 px-4 border-[#CFB2A8] text-[#3D2C2E] bg-transparent hover:bg-[#CFB2A8] hover:text-white"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{filter.icon}</span>
                <span className="text-sm font-medium whitespace-nowrap">{filter.name}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <Button variant="ghost" size="icon" onClick={() => setShowSearchModal(false)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-semibold text-[#3D2C2E]">Buscar</h2>
            <div className="w-10" />
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto">
            {/* ONDE Section */}
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold text-[#3D2C2E] mb-4">Onde</h3>
              <Input
                placeholder="Buscar destinos"
                className="w-full h-12 border-[#CFB2A8] mb-4"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
              <Button
                variant="ghost"
                className="w-full justify-start p-3 h-auto"
                onClick={() => setSearchLocation("Perto de mim")}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#E5D6CD] rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-[#3D2C2E]" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-[#3D2C2E]">Perto de mim</div>
                    <div className="text-sm text-gray-500">Encontrar aulas próximas</div>
                  </div>
                </div>
              </Button>
            </div>

            {/* QUANDO Section */}
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold text-[#3D2C2E] mb-4">Quando</h3>
              <div className="space-y-3">
                <Button
                  variant={searchWhen === "specific" ? "default" : "outline"}
                  className={`w-full justify-start p-3 h-auto ${
                    searchWhen === "specific"
                      ? "bg-[#CFB2A8] text-[#3D2C2E]"
                      : "border-[#CFB2A8] text-[#3D2C2E] bg-transparent"
                  }`}
                  onClick={() => {
                    setSearchWhen("specific")
                    setShowCalendarModal(true)
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Data específica</div>
                      <div className="text-sm opacity-70">
                        {selectedDate && selectedTime
                          ? `${selectedDate} às ${selectedTime}`
                          : "Escolher data e horário"}
                      </div>
                    </div>
                  </div>
                </Button>

                <Button
                  variant={searchWhen === "weekly" ? "default" : "outline"}
                  className={`w-full justify-start p-3 h-auto ${
                    searchWhen === "weekly"
                      ? "bg-[#CFB2A8] text-[#3D2C2E]"
                      : "border-[#CFB2A8] text-[#3D2C2E] bg-transparent"
                  }`}
                  onClick={() => {
                    setSearchWhen("weekly")
                    setShowWeeklyModal(true)
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Dias da semana</div>
                      <div className="text-sm opacity-70">
                        {selectedDays.length > 0 && selectedShifts.length > 0
                          ? `${selectedDays.join(" e ")} - ${selectedShifts.join(", ")}`
                          : "Escolher dias e turnos"}
                      </div>
                    </div>
                  </div>
                </Button>

                <Button
                  variant={searchWhen === "today" ? "default" : "outline"}
                  className={`w-full justify-start p-3 h-auto ${
                    searchWhen === "today"
                      ? "bg-[#CFB2A8] text-[#3D2C2E]"
                      : "border-[#CFB2A8] text-[#3D2C2E] bg-transparent"
                  }`}
                  onClick={() => setSearchWhen("today")}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#CFB2A8] rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Hoje</div>
                      <div className="text-sm opacity-70">Aulas disponíveis hoje</div>
                    </div>
                  </div>
                </Button>
              </div>
            </div>

            {/* MODALIDADE Section */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#3D2C2E] mb-4">Modalidade</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Ballet", icon: "🩰" },
                  { name: "Hip Hop", icon: "🎤" },
                  { name: "Contemporary", icon: "💃" },
                  { name: "Jazz", icon: "🎷" },
                  { name: "Salsa", icon: "💃🏻" },
                  { name: "Tango", icon: "🌹" },
                ].map((modality) => (
                  <Button
                    key={modality.name}
                    variant={searchModality.includes(modality.name) ? "default" : "outline"}
                    className={`h-16 ${
                      searchModality.includes(modality.name)
                        ? "bg-[#CFB2A8] text-[#3D2C2E]"
                        : "border-[#CFB2A8] text-[#3D2C2E] bg-transparent"
                    }`}
                    onClick={() => {
                      if (searchModality.includes(modality.name)) {
                        setSearchModality(searchModality.filter((m) => m !== modality.name))
                      } else {
                        setSearchModality([...searchModality, modality.name])
                      }
                    }}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xl">{modality.icon}</span>
                      <span className="text-xs font-medium">{modality.name}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Calendar Modal */}
          {showCalendarModal && (
            <div className="fixed inset-0 bg-white z-60 flex flex-col">
              {/* Calendar Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <Button variant="ghost" size="icon" onClick={() => setShowCalendarModal(false)}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-lg font-semibold text-[#3D2C2E]">Selecionar Data</h2>
                <div className="w-10" />
              </div>

              {/* Calendar Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Date Selection */}
                <div>
                  <h3 className="text-base font-semibold text-[#3D2C2E] mb-3">Data</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {["Hoje", "Amanhã", "Esta semana", "Próxima semana"].map((dateOption) => (
                      <Button
                        key={dateOption}
                        variant={selectedDate === dateOption ? "default" : "outline"}
                        className={`h-12 ${
                          selectedDate === dateOption
                            ? "bg-[#CFB2A8] text-[#3D2C2E]"
                            : "border-[#CFB2A8] text-[#3D2C2E] bg-transparent"
                        }`}
                        onClick={() => setSelectedDate(dateOption)}
                      >
                        {dateOption}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div>
                  <h3 className="text-base font-semibold text-[#3D2C2E] mb-3">Horário</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {["08:00", "10:00", "14:00", "16:00", "18:00", "20:00"].map((timeOption) => (
                      <Button
                        key={timeOption}
                        variant={selectedTime === timeOption ? "default" : "outline"}
                        className={`h-10 ${
                          selectedTime === timeOption
                            ? "bg-[#CFB2A8] text-[#3D2C2E]"
                            : "border-[#CFB2A8] text-[#3D2C2E] bg-transparent"
                        }`}
                        onClick={() => setSelectedTime(timeOption)}
                      >
                        {timeOption}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calendar Footer */}
              <div className="p-4 border-t bg-white">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-[#CFB2A8] text-[#3D2C2E] bg-transparent"
                    onClick={() => {
                      setSelectedDate("")
                      setSelectedTime("")
                    }}
                  >
                    Limpar
                  </Button>
                  <Button
                    className="flex-1 bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-[#3D2C2E]"
                    onClick={() => {
                      setShowCalendarModal(false)
                    }}
                    disabled={!selectedDate || !selectedTime}
                  >
                    Confirmar
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Weekly Selection Modal */}
          {showWeeklyModal && (
            <div className="fixed inset-0 bg-white z-60 flex flex-col">
              {/* Weekly Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <Button variant="ghost" size="icon" onClick={() => setShowWeeklyModal(false)}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-lg font-semibold text-[#3D2C2E]">Dias e Turnos</h2>
                <div className="w-10" />
              </div>

              {/* Weekly Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Days Selection */}
                <div>
                  <h3 className="text-base font-semibold text-[#3D2C2E] mb-3">Dias da Semana</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map((day) => (
                      <Button
                        key={day}
                        variant={selectedDays.includes(day) ? "default" : "outline"}
                        className={`h-12 ${
                          selectedDays.includes(day)
                            ? "bg-[#CFB2A8] text-[#3D2C2E]"
                            : "border-[#CFB2A8] text-[#3D2C2E] bg-transparent"
                        }`}
                        onClick={() => {
                          if (selectedDays.includes(day)) {
                            setSelectedDays(selectedDays.filter((d) => d !== day))
                          } else {
                            setSelectedDays([...selectedDays, day])
                          }
                        }}
                      >
                        {day}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Shifts Selection */}
                <div>
                  <h3 className="text-base font-semibold text-[#3D2C2E] mb-3">Turnos</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { name: "Manhã", time: "06:00 - 12:00" },
                      { name: "Tarde", time: "12:00 - 18:00" },
                      { name: "Noite", time: "18:00 - 23:00" },
                    ].map((shift) => (
                      <Button
                        key={shift.name}
                        variant={selectedShifts.includes(shift.name) ? "default" : "outline"}
                        className={`h-16 justify-start ${
                          selectedShifts.includes(shift.name)
                            ? "bg-[#CFB2A8] text-[#3D2C2E]"
                            : "border-[#CFB2A8] text-[#3D2C2E] bg-transparent"
                        }`}
                        onClick={() => {
                          if (selectedShifts.includes(shift.name)) {
                            setSelectedShifts(selectedShifts.filter((s) => s !== shift.name))
                          } else {
                            setSelectedShifts([...selectedShifts, shift.name])
                          }
                        }}
                      >
                        <div className="text-left">
                          <div className="font-medium">{shift.name}</div>
                          <div className="text-sm opacity-70">{shift.time}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Weekly Footer */}
              <div className="p-4 border-t bg-white">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-[#CFB2A8] text-[#3D2C2E] bg-transparent"
                    onClick={() => {
                      setSelectedDays([])
                      setSelectedShifts([])
                    }}
                  >
                    Limpar
                  </Button>
                  <Button
                    className="flex-1 bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-[#3D2C2E]"
                    onClick={() => {
                      setShowWeeklyModal(false)
                    }}
                    disabled={selectedDays.length === 0 || selectedShifts.length === 0}
                  >
                    Confirmar
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-[#CFB2A8] text-[#3D2C2E] bg-transparent"
                onClick={() => {
                  setSearchLocation("")
                  setSearchWhen("")
                  setSearchModality([])
                }}
              >
                Limpar tudo
              </Button>
              <Button
                className="flex-1 bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-[#3D2C2E]"
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

      {/* Classes Feed */}
      <div className="space-y-6">
        {/* Faça uma aula ainda hoje */}
        <div>
          <div className="px-4 mb-3 mt-3">
            <h2 className="text-lg font-semibold text-[#3D2C2E]">Faça uma aula ainda hoje</h2>
          </div>
          <div className="flex gap-3 px-4 overflow-x-auto scrollbar-hide">
            {classes.slice(0, 3).map((classItem) => (
              <div
                key={classItem.id}
                className="flex-shrink-0 w-64 cursor-pointer"
                onClick={() => {
                  setSelectedClass(classItem)
                  setCurrentScreen("detail")
                }}
              >
                <Card className="bg-white border-[#E5D6CD]">
                  <CardContent className="p-0">
                    {/* Foto com overlay de tag e like */}
                    <div className="relative">
                      <div className="w-full h-40 bg-[#E5D6CD] rounded-t-lg flex items-center justify-center">
                        <span className="text-xs text-[#3D2C2E]">FOTO</span>
                      </div>

                      {/* Tag no canto superior esquerdo */}
                      <div className="absolute top-2 left-2 z-10">
                        <Badge className={`${classItem.tagColor} text-xs font-medium shadow-sm`}>{classItem.tag}</Badge>
                      </div>

                      {/* Botão de like no canto superior direito */}
                      <div className="absolute top-2 right-2 z-10">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(classItem.id)
                          }}
                          className={`p-1.5 rounded-full shadow-sm ${
                            favorites.includes(classItem.id)
                              ? "bg-white/90 hover:bg-white"
                              : "bg-white/70 hover:bg-white/90"
                          }`}
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              favorites.includes(classItem.id) ? "fill-[#CFB2A8] text-[#CFB2A8]" : "text-[#3D2C2E]"
                            }`}
                          />
                        </Button>
                      </div>
                    </div>

                    {/* Informações abaixo da foto */}
                    <div className="p-3 space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#3D2C2E] text-sm leading-tight">{classItem.name}</h3>
                          <p className="text-xs text-[#3D2C2E] opacity-70">{classItem.school}</p>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          <Star className="h-3 w-3 fill-[#CFB2A8] text-[#CFB2A8]" />
                          <span className="text-xs text-[#3D2C2E] font-medium">{classItem.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-[#3D2C2E] opacity-70">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{classItem.days[0]}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{classItem.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-[#3D2C2E] opacity-70" />
                          <span className="text-xs text-[#3D2C2E] opacity-70">{classItem.location}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-semibold text-[#3D2C2E]">{classItem.price}</span>
                          <span className="text-xs text-[#3D2C2E] opacity-70"> /aula</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Próximos eventos */}
        <div>
          <div className="px-4 mb-3">
            <h2 className="text-lg font-semibold text-[#3D2C2E]">Próximos eventos</h2>
          </div>
          <div className="flex gap-3 px-4 overflow-x-auto scrollbar-hide">
            {classes.map((classItem) => (
              <div
                key={`event-${classItem.id}`}
                className="flex-shrink-0 w-64 cursor-pointer"
                onClick={() => {
                  setSelectedClass(classItem)
                  setCurrentScreen("detail")
                }}
              >
                <Card className="bg-white border-[#E5D6CD]">
                  <CardContent className="p-0">
                    {/* Foto com overlay de tag e like */}
                    <div className="relative">
                      <div className="w-full h-40 bg-[#E5D6CD] rounded-t-lg flex items-center justify-center">
                        <span className="text-xs text-[#3D2C2E]">FOTO</span>
                      </div>

                      {/* Tag no canto superior esquerdo */}
                      <div className="absolute top-2 left-2 z-10">
                        <Badge className="bg-blue-100 text-blue-800 text-xs font-medium shadow-sm">Evento</Badge>
                      </div>

                      {/* Botão de like no canto superior direito */}
                      <div className="absolute top-2 right-2 z-10">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(classItem.id)
                          }}
                          className={`p-1.5 rounded-full shadow-sm ${
                            favorites.includes(classItem.id)
                              ? "bg-white/90 hover:bg-white"
                              : "bg-white/70 hover:bg-white/90"
                          }`}
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              favorites.includes(classItem.id) ? "fill-[#CFB2A8] text-[#CFB2A8]" : "text-[#3D2C2E]"
                            }`}
                          />
                        </Button>
                      </div>
                    </div>

                    {/* Informações abaixo da foto */}
                    <div className="p-3 space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#3D2C2E] text-sm leading-tight">{classItem.name}</h3>
                          <p className="text-xs text-[#3D2C2E] opacity-70">{classItem.school}</p>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          <Star className="h-3 w-3 fill-[#CFB2A8] text-[#CFB2A8]" />
                          <span className="text-xs text-[#3D2C2E] font-medium">{classItem.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-[#3D2C2E] opacity-70">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{classItem.days[0]}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{classItem.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-[#3D2C2E] opacity-70" />
                          <span className="text-xs text-[#3D2C2E] opacity-70">{classItem.location}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-semibold text-[#3D2C2E]">{classItem.price}</span>
                          <span className="text-xs text-[#3D2C2E] opacity-70"> /aula</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Mais populares */}
        <div>
          <div className="px-4 mb-3">
            <h2 className="text-lg font-semibold text-[#3D2C2E]">Mais populares</h2>
          </div>
          <div className="flex gap-3 px-4 overflow-x-auto scrollbar-hide">
            {classes.reverse().map((classItem) => (
              <div
                key={`popular-${classItem.id}`}
                className="flex-shrink-0 w-64 cursor-pointer"
                onClick={() => {
                  setSelectedClass(classItem)
                  setCurrentScreen("detail")
                }}
              >
                <Card className="bg-white border-[#E5D6CD]">
                  <CardContent className="p-0">
                    {/* Foto com overlay de tag e like */}
                    <div className="relative">
                      <div className="w-full h-40 bg-[#E5D6CD] rounded-t-lg flex items-center justify-center">
                        <span className="text-xs text-[#3D2C2E]">FOTO</span>
                      </div>

                      {/* Tag no canto superior esquerdo */}
                      <div className="absolute top-2 left-2 z-10">
                        <Badge className={`${classItem.tagColor} text-xs font-medium shadow-sm`}>{classItem.tag}</Badge>
                      </div>

                      {/* Botão de like no canto superior direito */}
                      <div className="absolute top-2 right-2 z-10">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(classItem.id)
                          }}
                          className={`p-1.5 rounded-full shadow-sm ${
                            favorites.includes(classItem.id)
                              ? "bg-white/90 hover:bg-white"
                              : "bg-white/70 hover:bg-white/90"
                          }`}
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              favorites.includes(classItem.id) ? "fill-[#CFB2A8] text-[#CFB2A8]" : "text-[#3D2C2E]"
                            }`}
                          />
                        </Button>
                      </div>
                    </div>

                    {/* Informações abaixo da foto */}
                    <div className="p-3 space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#3D2C2E] text-sm leading-tight">{classItem.name}</h3>
                          <p className="text-xs text-[#3D2C2E] opacity-70">{classItem.school}</p>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          <Star className="h-3 w-3 fill-[#CFB2A8] text-[#CFB2A8]" />
                          <span className="text-xs text-[#3D2C2E] font-medium">{classItem.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-[#3D2C2E] opacity-70">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{classItem.days[0]}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{classItem.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-[#3D2C2E] opacity-70" />
                          <span className="text-xs text-[#3D2C2E] opacity-70">{classItem.location}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-semibold text-[#3D2C2E]">{classItem.price}</span>
                          <span className="text-xs text-[#3D2C2E] opacity-70"> /aula</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderSearchResultsScreen = () => (
    <div className="min-h-screen bg-[#F5F0EB]">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("home")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>

          {/* Search Summary - Editable */}
          <Button
            variant="ghost"
            className="flex-1 justify-start px-3 py-2 h-auto min-h-[40px]"
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

          {/* Filter Button */}
          <Button
            variant="outline"
            size="sm"
            className="border-[#CFB2A8] text-[#3D2C2E] bg-transparent"
            onClick={() => setShowSearchFiltersModal(true)}
          >
            <Filter className="h-4 w-4 mr-1" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="px-4 py-2 bg-white border-b">
        <p className="text-sm text-[#3D2C2E] opacity-70">{classes.length} aulas encontradas</p>
      </div>

      {/* Map Section */}
      <div className="bg-white border-b">
        <div className="h-48 bg-[#E5D6CD] flex items-center justify-center relative">
          <div className="text-center">
            <Map className="h-8 w-8 text-[#3D2C2E] opacity-70 mx-auto mb-2" />
            <span className="text-sm text-[#3D2C2E] opacity-70">Mapa com resultados</span>
          </div>

          {/* Mock map pins */}
          <div className="absolute top-4 left-8 w-6 h-6 bg-[#CFB2A8] rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">3</span>
          </div>
          <div className="absolute top-12 right-12 w-6 h-6 bg-[#CFB2A8] rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">2</span>
          </div>
          <div className="absolute bottom-8 left-1/3 w-6 h-6 bg-[#CFB2A8] rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">1</span>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="p-4 space-y-4">
        {classes.map((classItem) => (
          <Card
            key={classItem.id}
            className="bg-white border-[#E5D6CD] cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => {
              setSelectedClass(classItem)
              setCurrentScreen("detail")
            }}
          >
            <CardContent className="p-0">
              <div className="flex h-32">
                {/* Image - Full Height */}
                <div className="relative w-32 h-full flex-shrink-0">
                  <div className="w-full h-full bg-[#E5D6CD] rounded-l-lg flex items-center justify-center">
                    <span className="text-xs text-[#3D2C2E]">FOTO</span>
                  </div>
                </div>

                {/* Content */}
                {/* Content */}
                <div className="p-4 space-y-2 min-w-0 overflow-hidden flex-shrink-0 py-4">
                  {/* Top row with tag and like button */}
                  <div className="flex justify-between items-center gap-2">
                    <Badge className={`${classItem.tagColor} text-xs font-medium flex-shrink-0`}>{classItem.tag}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(classItem.id)
                      }}
                      className="p-1 flex-shrink-0"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(classItem.id) ? "fill-[#CFB2A8] text-[#CFB2A8]" : "text-[#3D2C2E]"
                        }`}
                      />
                    </Button>
                  </div>

                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <h3 className="font-semibold text-[#3D2C2E] text-base leading-tight truncate">
                        {classItem.name}
                      </h3>
                      <p className="text-sm text-[#3D2C2E] opacity-70 truncate">{classItem.school}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Star className="h-4 w-4 fill-[#CFB2A8] text-[#CFB2A8]" />
                      <span className="text-sm text-[#3D2C2E] font-medium">{classItem.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-[#3D2C2E] opacity-70 overflow-hidden">
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Calendar className="h-4 w-4" />
                      <span className="truncate">{classItem.days[0]}</span>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Clock className="h-4 w-4" />
                      <span>{classItem.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 overflow-hidden">
                    <div className="flex items-center gap-1 min-w-0 overflow-hidden">
                      <MapPin className="h-4 w-4 text-[#3D2C2E] opacity-70 flex-shrink-0" />
                      <span className="text-sm text-[#3D2C2E] opacity-70 truncate">{classItem.location}</span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-lg font-semibold text-[#3D2C2E]">{classItem.price}</span>
                      <span className="text-sm text-[#3D2C2E] opacity-70"> /aula</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search Filters Modal */}
      {showSearchFiltersModal && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <Button variant="ghost" size="icon" onClick={() => setShowSearchFiltersModal(false)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-semibold text-[#3D2C2E]">Filtros</h2>
            <Button
              variant="ghost"
              className="text-sm text-[#3D2C2E]"
              onClick={() => {
                setSearchFilters({
                  categories: [],
                  days: [],
                  shifts: [],
                  priceMin: "",
                  priceMax: "",
                  rating: "",
                })
              }}
            >
              Limpar
            </Button>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold text-[#3D2C2E] mb-4">Categorias</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Ballet", icon: "🩰" },
                  { name: "Jazz", icon: "🎷" },
                  { name: "Hip Hop", icon: "🎤" },
                  { name: "Contemporary", icon: "💃" },
                  { name: "Salsa", icon: "💃🏻" },
                  { name: "Forró", icon: "🪗" },
                ].map((category) => (
                  <Button
                    key={category.name}
                    variant={searchFilters.categories.includes(category.name) ? "default" : "outline"}
                    className={`h-16 ${
                      searchFilters.categories.includes(category.name)
                        ? "bg-[#CFB2A8] text-[#3D2C2E]"
                        : "border-[#CFB2A8] text-[#3D2C2E] bg-transparent"
                    }`}
                    onClick={() => {
                      const newCategories = searchFilters.categories.includes(category.name)
                        ? searchFilters.categories.filter((c) => c !== category.name)
                        : [...searchFilters.categories, category.name]
                      setSearchFilters({ ...searchFilters, categories: newCategories })
                    }}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xl">{category.icon}</span>
                      <span className="text-xs font-medium">{category.name}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Days of Week */}
            <div>
              <h3 className="text-lg font-semibold text-[#3D2C2E] mb-4">Dias da Semana</h3>
              <div className="grid grid-cols-2 gap-2">
                {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map((day) => (
                  <Button
                    key={day}
                    variant={searchFilters.days.includes(day) ? "default" : "outline"}
                    className={`h-12 ${
                      searchFilters.days.includes(day)
                        ? "bg-[#CFB2A8] text-[#3D2C2E]"
                        : "border-[#CFB2A8] text-[#3D2C2E] bg-transparent"
                    }`}
                    onClick={() => {
                      const newDays = searchFilters.days.includes(day)
                        ? searchFilters.days.filter((d) => d !== day)
                        : [...searchFilters.days, day]
                      setSearchFilters({ ...searchFilters, days: newDays })
                    }}
                  >
                    {day}
                  </Button>
                ))}
              </div>
            </div>

            {/* Shifts */}
            <div>
              <h3 className="text-lg font-semibold text-[#3D2C2E] mb-4">Turnos</h3>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { name: "Manhã", time: "06:00 - 12:00" },
                  { name: "Tarde", time: "12:00 - 18:00" },
                  { name: "Noite", time: "18:00 - 23:00" },
                ].map((shift) => (
                  <Button
                    key={shift.name}
                    variant={searchFilters.shifts.includes(shift.name) ? "default" : "outline"}
                    className={`h-16 justify-start ${
                      searchFilters.shifts.includes(shift.name)
                        ? "bg-[#CFB2A8] text-[#3D2C2E]"
                        : "border-[#CFB2A8] text-[#3D2C2E] bg-transparent"
                    }`}
                    onClick={() => {
                      const newShifts = searchFilters.shifts.includes(shift.name)
                        ? searchFilters.shifts.filter((s) => s !== shift.name)
                        : [...searchFilters.shifts, shift.name]
                      setSearchFilters({ ...searchFilters, shifts: newShifts })
                    }}
                  >
                    <div className="text-left">
                      <div className="font-medium">{shift.name}</div>
                      <div className="text-sm opacity-70">{shift.time}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-lg font-semibold text-[#3D2C2E] mb-4">Faixa de Preço</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-[#3D2C2E] mb-2 block">Mínimo</label>
                  <Input
                    placeholder="R$ 0"
                    className="border-[#CFB2A8]"
                    value={searchFilters.priceMin}
                    onChange={(e) => setSearchFilters({ ...searchFilters, priceMin: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#3D2C2E] mb-2 block">Máximo</label>
                  <Input
                    placeholder="R$ 100"
                    className="border-[#CFB2A8]"
                    value={searchFilters.priceMax}
                    onChange={(e) => setSearchFilters({ ...searchFilters, priceMax: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Rating */}
            <div>
              <h3 className="text-lg font-semibold text-[#3D2C2E] mb-4">Avaliação Mínima</h3>
              <div className="flex gap-2">
                {["4.0", "4.5", "4.8", "5.0"].map((rating) => (
                  <Button
                    key={rating}
                    variant={searchFilters.rating === rating ? "default" : "outline"}
                    className={`flex-1 ${
                      searchFilters.rating === rating
                        ? "bg-[#CFB2A8] text-[#3D2C2E]"
                        : "border-[#CFB2A8] text-[#3D2C2E] bg-transparent"
                    }`}
                    onClick={() => {
                      setSearchFilters({
                        ...searchFilters,
                        rating: searchFilters.rating === rating ? "" : rating,
                      })
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current" />
                      <span>{rating}+</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 border-t bg-white">
            <Button
              className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-[#3D2C2E]"
              onClick={() => {
                setShowSearchFiltersModal(false)
                // Apply filters logic here
              }}
            >
              Aplicar Filtros
            </Button>
          </div>
        </div>
      )}

      {/* Search Modal (reused from home) */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <Button variant="ghost" size="icon" onClick={() => setShowSearchModal(false)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-semibold text-[#3D2C2E]">Editar Busca</h2>
            <div className="w-10" />
          </div>

          {/* Modal Content - Same as home screen search modal */}
          <div className="flex-1 overflow-y-auto">
            {/* ONDE Section */}
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold text-[#3D2C2E] mb-4">Onde</h3>
              <Input
                placeholder="Buscar destinos"
                className="w-full h-12 border-[#CFB2A8] mb-4"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
              <Button
                variant="ghost"
                className="w-full justify-start p-3 h-auto"
                onClick={() => setSearchLocation("Perto de mim")}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#E5D6CD] rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-[#3D2C2E]" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-[#3D2C2E]">Perto de mim</div>
                    <div className="text-sm text-gray-500">Encontrar aulas próximas</div>
                  </div>
                </div>
              </Button>
            </div>

            {/* QUANDO Section */}
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold text-[#3D2C2E] mb-4">Quando</h3>
              <div className="space-y-3">
                <Button
                  variant={searchWhen === "specific" ? "default" : "outline"}
                  className={`w-full justify-start p-3 h-auto ${
                    searchWhen === "specific"
                      ? "bg-[#CFB2A8] text-[#3D2C2E]"
                      : "border-[#CFB2A8] text-[#3D2C2E] bg-transparent"
                  }`}
                  onClick={() => {
                    setSearchWhen("specific")
                    setShowCalendarModal(true)
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Data específica</div>
                      <div className="text-sm opacity-70">
                        {selectedDate && selectedTime
                          ? `${selectedDate} às ${selectedTime}`
                          : "Escolher data e horário"}
                      </div>
                    </div>
                  </div>
                </Button>

                <Button
                  variant={searchWhen === "weekly" ? "default" : "outline"}
                  className={`w-full justify-start p-3 h-auto ${
                    searchWhen === "weekly"
                      ? "bg-[#CFB2A8] text-[#3D2C2E]"
                      : "border-[#CFB2A8] text-[#3D2C2E] bg-transparent"
                  }`}
                  onClick={() => {
                    setSearchWhen("weekly")
                    setShowWeeklyModal(true)
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Dias da semana</div>
                      <div className="text-sm opacity-70">
                        {selectedDays.length > 0 && selectedShifts.length > 0
                          ? `${selectedDays.join(" e ")} - ${selectedShifts.join(", ")}`
                          : "Escolher dias e turnos"}
                      </div>
                    </div>
                  </div>
                </Button>

                <Button
                  variant={searchWhen === "today" ? "default" : "outline"}
                  className={`w-full justify-start p-3 h-auto ${
                    searchWhen === "today"
                      ? "bg-[#CFB2A8] text-[#3D2C2E]"
                      : "border-[#CFB2A8] text-[#3D2C2E] bg-transparent"
                  }`}
                  onClick={() => setSearchWhen("today")}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#CFB2A8] rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Hoje</div>
                      <div className="text-sm opacity-70">Aulas disponíveis hoje</div>
                    </div>
                  </div>
                </Button>
              </div>
            </div>

            {/* MODALIDADE Section */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#3D2C2E] mb-4">Modalidade</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Ballet", icon: "🩰" },
                  { name: "Hip Hop", icon: "🎤" },
                  { name: "Contemporary", icon: "💃" },
                  { name: "Jazz", icon: "🎷" },
                  { name: "Salsa", icon: "💃🏻" },
                  { name: "Tango", icon: "🌹" },
                ].map((modality) => (
                  <Button
                    key={modality.name}
                    variant={searchModality.includes(modality.name) ? "default" : "outline"}
                    className={`h-16 ${
                      searchModality.includes(modality.name)
                        ? "bg-[#CFB2A8] text-[#3D2C2E]"
                        : "border-[#CFB2A8] text-[#3D2C2E] bg-transparent"
                    }`}
                    onClick={() => {
                      if (searchModality.includes(modality.name)) {
                        setSearchModality(searchModality.filter((m) => m !== modality.name))
                      } else {
                        setSearchModality([...searchModality, modality.name])
                      }
                    }}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xl">{modality.icon}</span>
                      <span className="text-xs font-medium">{modality.name}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-[#CFB2A8] text-[#3D2C2E] bg-transparent"
                onClick={() => {
                  setSearchLocation("")
                  setSearchWhen("")
                  setSearchModality([])
                }}
              >
                Limpar tudo
              </Button>
              <Button
                className="flex-1 bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-[#3D2C2E]"
                onClick={() => {
                  setShowSearchModal(false)
                  // Stay on search results screen
                }}
              >
                Atualizar
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
      <div className="bg-white p-4 shadow-sm flex items-center gap-3">
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

        {/* Time */}
        <div>
          <h3 className="font-medium text-[#3D2C2E] mb-3">Horário</h3>
          <div className="grid grid-cols-2 gap-2">
            {["Manhã", "Tarde", "Noite", "Madrugada"].map((time) => (
              <Button key={time} variant="outline" className="border-[#CFB2A8] text-[#3D2C2E] bg-transparent">
                {time}
              </Button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <h3 className="font-medium text-[#3D2C2E] mb-3">Localização</h3>
          <Input placeholder="Digite a localização ou CEP" className="border-[#CFB2A8]" />
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-medium text-[#3D2C2E] mb-3">Faixa de Preço</h3>
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="Mín" className="border-[#CFB2A8]" />
            <Input placeholder="Máx" className="border-[#CFB2A8]" />
          </div>
        </div>

        {/* Rating */}
        <div>
          <h3 className="font-medium text-[#3D2C2E] mb-3">Avaliação Mínima</h3>
          <div className="flex gap-2">
            {[4, 4.5, 5].map((rating) => (
              <Button key={rating} variant="outline" className="border-[#CFB2A8] text-[#3D2C2E] bg-transparent">
                {rating}+ ⭐
              </Button>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <div className="pt-4">
          <Button
            className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-[#3D2C2E]"
            onClick={() => setCurrentScreen("home")}
          >
            Aplicar Filtros
          </Button>
        </div>
      </div>
    </div>
  )

  const renderDetailScreen = () => (
    <div className="min-h-screen bg-[#F5F0EB]">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("detail")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-lg font-semibold text-[#3D2C2E]">Agendar Experimental</h1>
      </div>

      <div className="p-4 space-y-6">
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
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#3D2C2E]">Nome Completo</label>
              <Input placeholder="Digite seu nome completo" className="border-[#CFB2A8]" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#3D2C2E]">Email</label>
              <Input type="email" placeholder="Digite seu email" className="border-[#CFB2A8]" />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#E5D6CD]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-[#3D2C2E] opacity-70">Or</span>
              </div>
            </div>

            <Button variant="outline" className="w-full border-[#CFB2A8] text-[#3D2C2E] bg-transparent">
              <User className="h-4 w-4 mr-2" />
              Continuar com Google
            </Button>
          </CardContent>
        </Card>

        {/* Terms */}
        <p className="text-xs text-[#3D2C2E] opacity-70 text-center">
          By scheduling, you agree to our Terms of Service and Privacy Policy. Your trial class is free and no payment
          is required today.
        </p>

        {/* Schedule Button */}
        <Button
          className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-[#3D2C2E] py-6 text-lg"
          onClick={() => setCurrentScreen("confirmation")}
        >
          Agendar Minha Aula Experimental
        </Button>
      </div>
    </div>
  )

  const renderConfirmationScreen = () => (
    <div className="min-h-screen bg-[#F5F0EB] flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <h1 className="text-lg font-semibold text-[#3D2C2E] text-center">Confirmação</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 space-y-6">
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

        {/* Next Steps */}
        <div className="text-center space-y-2">
          <p className="text-sm text-[#3D2C2E] opacity-70">Enviamos um email de confirmação com todos os detalhes.</p>
          <p className="text-sm text-[#3D2C2E] opacity-70">Chegue 15 minutos antes da sua primeira aula.</p>
        </div>

        {/* Actions */}
        <div className="space-y-3 w-full max-w-sm">
          <Button
            className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-[#3D2C2E]"
            onClick={() => setCurrentScreen("home")}
          >
            Explorar Mais Aulas
          </Button>
          <Button variant="outline" className="w-full border-[#CFB2A8] text-[#3D2C2E] bg-transparent">
            Adicionar ao Calendário
          </Button>
        </div>
      </div>
    </div>
  )

  const renderScheduleScreen = () => <div>Schedule Screen</div>

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
      <div className="max-w-sm mx-auto bg-white shadow-xl">{renderCurrentScreen()}</div>
    </>
  )
}

export default SissonePrototype
