"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, MapPin, Star, Clock, Calendar, User, Check } from "lucide-react"

type Screen = "home" | "filters" | "detail" | "schedule" | "confirmation"

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
  ]

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
              <div className="font-medium text-sm">Para onde?</div>
              <div className="text-xs text-gray-500">Qualquer lugar • Qualquer data • Modalidade</div>
            </div>
          </div>
        </Button>
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
                  // Apply search logic here
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
          <div className="px-4 mb-3">
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
        <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("home")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-lg font-semibold text-[#3D2C2E]">Detalhes da Aula</h1>
        <Button variant="ghost" size="icon" onClick={() => toggleFavorite(selectedClass?.id)} className="ml-auto">
          <Heart
            className={`h-5 w-5 ${
              favorites.includes(selectedClass?.id) ? "fill-[#CFB2A8] text-[#CFB2A8]" : "text-[#3D2C2E]"
            }`}
          />
        </Button>
      </div>

      {selectedClass && (
        <div className="p-4 space-y-6">
          {/* Carrossel de Imagens */}
          <div className="relative">
            <div className="w-full h-48 bg-[#E5D6CD] rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-[#3D2C2E]">FOTO {currentImageIndex + 1}</span>
              </div>
            </div>

            {/* Indicadores do carrossel */}
            <div className="flex justify-center gap-2 mt-3">
              {selectedClass.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-[#CFB2A8]" : "bg-[#E5D6CD]"}`}
                />
              ))}
            </div>

            {/* Botões de navegação */}
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? selectedClass.images.length - 1 : prev - 1))}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev === selectedClass.images.length - 1 ? 0 : prev + 1))}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
            >
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </button>
          </div>

          {/* Class Info */}
          <div>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#3D2C2E]">{selectedClass.name}</h2>
                <p className="text-lg text-[#3D2C2E] opacity-70">{selectedClass.school}</p>
              </div>
              {/* Tag */}
              <Badge className={`${selectedClass.tagColor} font-medium`}>{selectedClass.tag}</Badge>
            </div>

            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-[#CFB2A8] text-[#CFB2A8]" />
                <span className="text-[#3D2C2E]">{selectedClass.rating}</span>
              </div>
              <Badge className="bg-[#CFB2A8] text-[#3D2C2E]">{selectedClass.price}</Badge>
            </div>
          </div>

          {/* Schedule Info */}
          <Card className="bg-white border-[#E5D6CD]">
            <CardHeader>
              <h3 className="font-semibold text-[#3D2C2E]">Horários</h3>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#3D2C2E]" />
                <span className="text-[#3D2C2E]">{selectedClass.days.join(" e ")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#3D2C2E]" />
                <span className="text-[#3D2C2E]">{selectedClass.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#3D2C2E]" />
                <span className="text-[#3D2C2E]">{selectedClass.location}</span>
              </div>
            </CardContent>
          </Card>

          {/* Carrossel de Depoimentos */}
          <Card className="bg-white border-[#E5D6CD]">
            <CardHeader>
              <h3 className="font-semibold text-[#3D2C2E]">Depoimentos</h3>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="text-center space-y-3">
                  <div className="flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < selectedClass.reviews[currentReviewIndex].rating
                            ? "fill-[#CFB2A8] text-[#CFB2A8]"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[#3D2C2E] italic">"{selectedClass.reviews[currentReviewIndex].comment}"</p>
                  <p className="text-sm text-[#3D2C2E] opacity-70 font-medium">
                    - {selectedClass.reviews[currentReviewIndex].name}
                  </p>
                </div>

                {/* Indicadores dos depoimentos */}
                <div className="flex justify-center gap-2 mt-4">
                  {selectedClass.reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentReviewIndex(index)}
                      className={`w-2 h-2 rounded-full ${
                        index === currentReviewIndex ? "bg-[#CFB2A8]" : "bg-[#E5D6CD]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="bg-white border-[#E5D6CD]">
            <CardHeader>
              <h3 className="font-semibold text-[#3D2C2E]">Sobre Esta Aula</h3>
            </CardHeader>
            <CardContent>
              <p className="text-[#3D2C2E] opacity-80">
                Perfeita para iniciantes e dançarinos intermediários que buscam explorar movimento e expressão. Esta
                aula foca no desenvolvimento de força, flexibilidade e interpretação artística através de técnicas de
                dança contemporânea.
              </p>
            </CardContent>
          </Card>

          {/* CTA Button */}
          <Button
            className="w-full bg-[#CFB2A8] hover:bg-[#CFB2A8]/90 text-[#3D2C2E] py-6 text-lg"
            onClick={() => setCurrentScreen("schedule")}
          >
            Agendar Aula Experimental
          </Button>
        </div>
      )}
    </div>
  )

  const renderScheduleScreen = () => (
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
