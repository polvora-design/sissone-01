"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Home,
  User,
  Plus,
  Eye,
  Users,
  Calendar,
  BarChart3,
  ArrowLeft,
  Star,
  Clock,
  MapPin,
  DollarSign,
  Menu,
  X,
  Filter,
  Building2,
  Upload,
  ChevronLeft,
  ChevronRight,
  Trophy,
} from "lucide-react"

type Screen =
  | "dashboard"
  | "profile"
  | "create-event"
  | "event-preview"
  | "interested-students"
  | "scheduled-students"
  | "analytics"

type Unit = {
  id: string
  name: string
  address: string
  students: number
  rating: number
  revenue: number
}

const mockUnits: Unit[] = [
  { id: "1", name: "Unidade Centro", address: "Rua das Flores, 123", students: 28, rating: 4.9, revenue: 1200 },
  { id: "2", name: "Unidade Zona Sul", address: "Av. Paulista, 456", students: 32, rating: 4.7, revenue: 1500 },
  { id: "3", name: "Unidade Norte", address: "Rua do Norte, 789", students: 18, rating: 4.6, revenue: 800 },
]

export default function SissoneResponsivePrototype() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedUnit, setSelectedUnit] = useState<string>("all")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    time: "",
    price: "",
    description: "",
    unit: "",
    isRecurring: false,
    recurringDays: [] as string[],
    endDate: "",
    images: [] as string[],
  })

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen)
    setSidebarOpen(false)
  }

  const navigationItems = [
    { id: "dashboard", label: "Painel", icon: Home },
    { id: "profile", label: "Perfil", icon: User },
    { id: "create-event", label: "Criar Evento", icon: Plus },
    { id: "scheduled-students", label: "Alunos", icon: Users },
    { id: "analytics", label: "Relatórios", icon: BarChart3 },
  ]

  const weekDays = [
    { id: "monday", label: "Segunda" },
    { id: "tuesday", label: "Terça" },
    { id: "wednesday", label: "Quarta" },
    { id: "thursday", label: "Quinta" },
    { id: "friday", label: "Sexta" },
    { id: "saturday", label: "Sábado" },
    { id: "sunday", label: "Domingo" },
  ]

  const mockImages = ["/ballet-class-studio.png", "/dance-students-practicing.png", "/dance-instructor-teaching.png"]

  const getFilteredStats = () => {
    if (selectedUnit === "all") {
      return {
        students: mockUnits.reduce((sum, unit) => sum + unit.students, 0),
        rating: (mockUnits.reduce((sum, unit) => sum + unit.rating, 0) / mockUnits.length).toFixed(1),
        revenue: mockUnits.reduce((sum, unit) => sum + unit.revenue, 0),
        classes: 12,
      }
    }
    const unit = mockUnits.find((u) => u.id === selectedUnit)
    return {
      students: unit?.students || 0,
      rating: unit?.rating.toFixed(1) || "0.0",
      revenue: unit?.revenue || 0,
      classes: selectedUnit === "1" ? 5 : selectedUnit === "2" ? 4 : 3,
    }
  }

  const renderUnitFilter = () => (
    <div className="flex items-center gap-2 mb-4">
      <Filter className="w-4 h-4" style={{ color: "#3D2C2E" }} />
      <Select value={selectedUnit} onValueChange={setSelectedUnit}>
        <SelectTrigger className="w-48" style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}>
          <SelectItem value="all">Todas as Unidades</SelectItem>
          {mockUnits.map((unit) => (
            <SelectItem key={unit.id} value={unit.id}>
              {unit.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )

  const renderSidebar = () => (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "#F5F0EB", borderRight: "1px solid #E5D6CD" }}
      >
        {/* Logo Section */}
        <div className="p-6 border-b" style={{ borderColor: "#E5D6CD" }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="w-32 h-8 rounded mb-2" style={{ backgroundColor: "#E5D6CD" }}>
                <div className="flex items-center justify-center h-full text-sm font-bold" style={{ color: "#3D2C2E" }}>
                  SISSONE
                </div>
              </div>
              <p className="text-xs" style={{ color: "#3D2C2E" }}>
                Para quem quer aprender, ensinar e viver a dança
              </p>
            </div>
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" style={{ color: "#3D2C2E" }} />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = currentScreen === item.id
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`w-full justify-start h-12 px-4 ${isActive ? "font-medium" : ""}`}
                  onClick={() => navigateTo(item.id as Screen)}
                  style={{
                    backgroundColor: isActive ? "#CFB2A8" : "transparent",
                    color: "#3D2C2E",
                  }}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Button>
              )
            })}
          </div>
        </nav>

        {/* Quick Stats in Sidebar (Desktop only) */}
        <div className="hidden lg:block p-4 mt-8">
          <h3 className="text-sm font-semibold mb-3" style={{ color: "#3D2C2E" }}>
            Resumo Rápido
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs" style={{ color: "#3D2C2E" }}>
                Eventos Ativos
              </span>
              <span className="text-sm font-bold" style={{ color: "#3D2C2E" }}>
                {getFilteredStats().classes}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs" style={{ color: "#3D2C2E" }}>
                Total de Alunos
              </span>
              <span className="text-sm font-bold" style={{ color: "#3D2C2E" }}>
                {getFilteredStats().students}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs" style={{ color: "#3D2C2E" }}>
                Avaliação
              </span>
              <span className="text-sm font-bold" style={{ color: "#3D2C2E" }}>
                {getFilteredStats().rating}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  const renderHeader = (title: string, showBack = true) => (
    <div className="flex items-center justify-between p-4 lg:p-6 border-b" style={{ borderColor: "#E5D6CD" }}>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
          <Menu className="w-5 h-5" style={{ color: "#3D2C2E" }} />
        </Button>
        {showBack && (
          <Button variant="ghost" size="sm" onClick={() => navigateTo("dashboard")} className="lg:hidden">
            <ArrowLeft className="w-4 h-4" style={{ color: "#3D2C2E" }} />
          </Button>
        )}
        <h1 className="text-lg lg:text-2xl font-semibold" style={{ color: "#3D2C2E" }}>
          {title}
        </h1>
      </div>
    </div>
  )

  const renderDashboard = () => {
    const stats = getFilteredStats()

    return (
      <div className="p-4 lg:p-6">
        {/* Welcome Section - Desktop only */}
        <div className="hidden lg:block mb-8">
          <h2 className="text-xl font-semibold mb-2" style={{ color: "#3D2C2E" }}>
            Bem-vindo de volta, Gestor!
          </h2>
          <p className="text-sm" style={{ color: "#3D2C2E" }}>
            Proveite os nossos dados para tomar as melhores decisões!
          </p>
        </div>

        {/* Units Ranking - Desktop only */}
        <div className="hidden lg:block mt-8">
          <h2 className="text-base font-semibold mb-4" style={{ color: "#3D2C2E" }}>
            Unidades
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {mockUnits
              .sort((a, b) => b.rating - a.rating)
              .map((unit, index) => (
                <Card
                  key={unit.id}
                  style={{ backgroundColor: "#E5D6CD" }}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="flex items-center justify-center w-8 h-8 rounded-full"
                        style={{ backgroundColor: index === 0 ? "#CFB2A8" : "#F5F0EB" }}
                      >
                        {index === 0 ? (
                          <Trophy className="w-4 h-4" style={{ color: "#3D2C2E" }} />
                        ) : (
                          <span className="text-sm font-bold" style={{ color: "#3D2C2E" }}>
                            {index + 1}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium" style={{ color: "#3D2C2E" }}>
                          {unit.name}
                        </h3>
                        <p className="text-xs" style={{ color: "#3D2C2E" }}>
                          {unit.address}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-sm font-bold" style={{ color: "#3D2C2E" }}>
                          {unit.rating}
                        </div>
                        <div className="text-xs" style={{ color: "#3D2C2E" }}>
                          Rating
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-bold" style={{ color: "#3D2C2E" }}>
                          {unit.students}
                        </div>
                        <div className="text-xs" style={{ color: "#3D2C2E" }}>
                          Alunos
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-bold" style={{ color: "#3D2C2E" }}>
                          R${unit.revenue}
                        </div>
                        <div className="text-xs" style={{ color: "#3D2C2E" }}>
                          Receita
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* Unit Filter */}
        {renderUnitFilter()}

        {/* Stats Grid - Responsive */}
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
          <Card style={{ backgroundColor: "#E5D6CD" }} className="hover:shadow-md transition-shadow">
            <CardContent className="p-3 lg:p-6 text-center">
              <div className="text-lg lg:text-3xl font-bold" style={{ color: "#3D2C2E" }}>
                {stats.classes}
              </div>
              <div className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                Eventos Ativos
              </div>
            </CardContent>
          </Card>
          <Card style={{ backgroundColor: "#E5D6CD" }} className="hover:shadow-md transition-shadow">
            <CardContent className="p-3 lg:p-6 text-center">
              <div className="text-lg lg:text-3xl font-bold" style={{ color: "#3D2C2E" }}>
                {stats.students}
              </div>
              <div className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                Alunos
              </div>
            </CardContent>
          </Card>
          <Card style={{ backgroundColor: "#E5D6CD" }} className="hover:shadow-md transition-shadow">
            <CardContent className="p-3 lg:p-6 text-center">
              <div className="text-lg lg:text-3xl font-bold" style={{ color: "#3D2C2E" }}>
                {stats.rating}
              </div>
              <div className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                Avaliação
              </div>
            </CardContent>
          </Card>
          <Card style={{ backgroundColor: "#E5D6CD" }} className="hover:shadow-md transition-shadow hidden lg:block">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold" style={{ color: "#3D2C2E" }}>
                R$ {stats.revenue}
              </div>
              <div className="text-sm" style={{ color: "#3D2C2E" }}>
                Este Mês
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <h2 className="text-sm lg:text-base font-semibold mb-3 lg:mb-4" style={{ color: "#3D2C2E" }}>
              Ações Rápidas
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              <Button
                variant="outline"
                className="h-16 lg:h-20 flex flex-col gap-1 bg-transparent hover:shadow-md transition-all"
                onClick={() => navigateTo("create-event")}
                style={{ borderColor: "#CFB2A8", backgroundColor: "#F5F0EB" }}
              >
                <Plus className="w-5 h-5 lg:w-6 lg:h-6" style={{ color: "#3D2C2E" }} />
                <span className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                  Novo Evento
                </span>
              </Button>
              <Button
                variant="outline"
                className="h-16 lg:h-20 flex flex-col gap-1 bg-transparent hover:shadow-md transition-all"
                onClick={() => navigateTo("scheduled-students")}
                style={{ borderColor: "#CFB2A8", backgroundColor: "#F5F0EB" }}
              >
                <Users className="w-5 h-5 lg:w-6 lg:h-6" style={{ color: "#3D2C2E" }} />
                <span className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                  Alunos
                </span>
              </Button>
              <Button
                variant="outline"
                className="h-16 lg:h-20 flex flex-col gap-1 bg-transparent hover:shadow-md transition-all lg:block hidden"
                onClick={() => navigateTo("analytics")}
                style={{ borderColor: "#CFB2A8", backgroundColor: "#F5F0EB" }}
              >
                <BarChart3 className="w-6 h-6 rounded-none opacity-0" style={{ color: "#3D2C2E" }} />
                <span className="text-sm" style={{ color: "#3D2C2E" }}>
                  Relatórios
                </span>
              </Button>
            </div>
          </div>

          {/* Recent Events */}
          <div className="lg:col-span-2">
            <h2 className="text-sm lg:text-base font-semibold mb-3 lg:mb-4" style={{ color: "#3D2C2E" }}>
              Eventos Recentes
            </h2>
            <div className="space-y-3 lg:space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} style={{ backgroundColor: "#E5D6CD" }} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-3 lg:p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-sm lg:text-base font-medium" style={{ color: "#3D2C2E" }}>
                          Aula de Ballet Iniciante {i}
                        </h3>
                        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4 mt-1">
                          <p className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                            {selectedUnit === "all" ? mockUnits[i - 1]?.name : "Hoje, 18:00"}
                          </p>
                          <p className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                            8 alunos inscritos
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => navigateTo("event-preview")}
                          className="hover:bg-white/50"
                        >
                          <Eye className="w-4 h-4" style={{ color: "#3D2C2E" }} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderProfile = () => (
    <div className="p-4 lg:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Unit Selection */}
        <div className="mb-6">
          <Label className="text-sm lg:text-base font-semibold" style={{ color: "#3D2C2E" }}>
            Gerenciar Perfil da Unidade
          </Label>
          <Select defaultValue="1">
            <SelectTrigger className="w-full mt-2" style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}>
              {mockUnits.map((unit) => (
                <SelectItem key={unit.id} value={unit.id}>
                  {unit.name}
                </SelectItem>
              ))}
              <SelectItem value="new">+ Adicionar Nova Unidade</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-6 lg:space-y-8">
          {/* Profile Image */}
          <div className="text-center">
            <div className="w-24 h-24 lg:w-32 lg:h-32 mx-auto rounded-full" style={{ backgroundColor: "#E5D6CD" }}>
              <div className="flex items-center justify-center h-full">
                <Building2 className="w-8 h-8 lg:w-12 lg:h-12" style={{ color: "#3D2C2E" }} />
              </div>
            </div>
            <Button variant="ghost" size="sm" className="mt-2 hover:bg-white/50">
              <span style={{ color: "#CFB2A8" }}>Alterar Logo da Unidade</span>
            </Button>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div className="lg:col-span-2">
              <Label htmlFor="unit-name" className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                Nome da Unidade
              </Label>
              <Input
                id="unit-name"
                placeholder="Ex: Unidade Centro"
                className="mt-1 h-10 lg:h-12"
                style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
              />
            </div>

            <div className="lg:col-span-2">
              <Label htmlFor="address" className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                Endereço Completo
              </Label>
              <Input
                id="address"
                placeholder="Rua, número, bairro, cidade, estado"
                className="mt-1 h-10 lg:h-12"
                style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                Telefone
              </Label>
              <Input
                id="phone"
                placeholder="(11) 99999-9999"
                className="mt-1 h-10 lg:h-12"
                style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                E-mail da Unidade
              </Label>
              <Input
                id="email"
                placeholder="contato@unidade.com"
                className="mt-1 h-10 lg:h-12"
                style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
              />
            </div>

            <div className="lg:col-span-2">
              <Label htmlFor="bio" className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                Descrição da Unidade
              </Label>
              <Textarea
                id="bio"
                placeholder="Conte sobre esta unidade, infraestrutura, diferenciais..."
                rows={4}
                className="mt-1"
                style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
              />
            </div>

            <div className="lg:col-span-2">
              <Label htmlFor="specialties" className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                Especialidades desta Unidade
              </Label>
              <Input
                id="specialties"
                placeholder="Ballet, Jazz, Hip-hop, Dança Contemporânea..."
                className="mt-1 h-10 lg:h-12"
                style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-3">
            <Button className="lg:flex-1 h-10 lg:h-12" style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}>
              Salvar Perfil da Unidade
            </Button>
            <Button
              variant="outline"
              className="lg:flex-1 h-10 lg:h-12 bg-transparent"
              style={{ borderColor: "#CFB2A8", color: "#3D2C2E" }}
            >
              Duplicar para Nova Unidade
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCreateEvent = () => (
    <div className="p-4 lg:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4 lg:space-y-6">
          {/* Unit Selection */}
          <div>
            <Label htmlFor="unit" className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
              Unidade *
            </Label>
            <Select value={eventData.unit} onValueChange={(value) => setEventData({ ...eventData, unit: value })}>
              <SelectTrigger
                className="mt-1 h-10 lg:h-12"
                style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
              >
                <SelectValue placeholder="Selecione a unidade" />
              </SelectTrigger>
              <SelectContent style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}>
                {mockUnits.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id}>
                    {unit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="title" className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
              Título do Evento/Aula
            </Label>
            <Input
              id="title"
              placeholder="ex: Ballet Iniciante"
              value={eventData.title}
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
              className="mt-1 h-10 lg:h-12"
              style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
            />
          </div>

          {/* Event Type */}
          <div className="space-y-3">
            <Label className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
              Tipo de Evento
            </Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="recurring"
                checked={eventData.isRecurring}
                onCheckedChange={(checked) => setEventData({ ...eventData, isRecurring: !!checked })}
              />
              <Label htmlFor="recurring" className="text-sm" style={{ color: "#3D2C2E" }}>
                Evento Recorrente (múltiplos dias da semana)
              </Label>
            </div>
          </div>

          {/* Date/Time Configuration */}
          {eventData.isRecurring ? (
            <div className="space-y-4">
              <div>
                <Label className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                  Dias da Semana
                </Label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-2">
                  {weekDays.map((day) => (
                    <div key={day.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={day.id}
                        checked={eventData.recurringDays.includes(day.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setEventData({
                              ...eventData,
                              recurringDays: [...eventData.recurringDays, day.id],
                            })
                          } else {
                            setEventData({
                              ...eventData,
                              recurringDays: eventData.recurringDays.filter((d) => d !== day.id),
                            })
                          }
                        }}
                      />
                      <Label htmlFor={day.id} className="text-sm" style={{ color: "#3D2C2E" }}>
                        {day.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                <div>
                  <Label htmlFor="start-date" className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                    Data de Início
                  </Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={eventData.date}
                    onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                    className="mt-1 h-10 lg:h-12"
                    style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
                  />
                </div>
                <div>
                  <Label htmlFor="end-date" className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                    Data de Término
                  </Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={eventData.endDate}
                    onChange={(e) => setEventData({ ...eventData, endDate: e.target.value })}
                    className="mt-1 h-10 lg:h-12"
                    style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                    Horário
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={eventData.time}
                    onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
                    className="mt-1 h-10 lg:h-12"
                    style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
              <div>
                <Label htmlFor="date" className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                  Data
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={eventData.date}
                  onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                  className="mt-1 h-10 lg:h-12"
                  style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
                />
              </div>
              <div>
                <Label htmlFor="time" className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                  Horário
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={eventData.time}
                  onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
                  className="mt-1 h-10 lg:h-12"
                  style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
                />
              </div>
              <div>
                <Label htmlFor="price" className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                  Preço (R$)
                </Label>
                <Input
                  id="price"
                  placeholder="25,00"
                  value={eventData.price}
                  onChange={(e) => setEventData({ ...eventData, price: e.target.value })}
                  className="mt-1 h-10 lg:h-12"
                  style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
                />
              </div>
            </div>
          )}

          {/* Image Upload */}
          <div>
            <Label className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
              Fotos do Evento (Carrossel)
            </Label>
            <div className="mt-2 space-y-3">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col gap-2 bg-transparent"
                style={{ borderColor: "#CFB2A8", backgroundColor: "#F5F0EB" }}
                onClick={() => {
                  // Simulate adding images
                  setEventData({
                    ...eventData,
                    images: [...eventData.images, ...mockImages.slice(0, 3)],
                  })
                }}
              >
                <Upload className="w-6 h-6" style={{ color: "#3D2C2E" }} />
                <span className="text-sm" style={{ color: "#3D2C2E" }}>
                  Adicionar Fotos
                </span>
              </Button>

              {eventData.images.length > 0 && (
                <div className="grid grid-cols-3 lg:grid-cols-5 gap-2">
                  {eventData.images.slice(0, 5).map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-lg overflow-hidden"
                      style={{ backgroundColor: "#E5D6CD" }}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Foto ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
              Descrição
            </Label>
            <Textarea
              id="description"
              placeholder="Detalhes do evento/aula, requisitos, o que trazer..."
              rows={4}
              value={eventData.description}
              onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
              className="mt-1"
              style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() => navigateTo("event-preview")}
              className="lg:flex-1 h-10 lg:h-12"
              style={{ borderColor: "#CFB2A8", color: "#3D2C2E" }}
            >
              Visualizar
            </Button>
            <Button className="lg:flex-1 h-10 lg:h-12" style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}>
              Salvar Rascunho
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderEventPreview = () => (
    <div className="p-4 lg:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Image Carousel */}
          <div className="space-y-4">
            <div
              className="relative w-full h-48 lg:h-64 rounded-lg overflow-hidden"
              style={{ backgroundColor: "#E5D6CD" }}
            >
              {eventData.images.length > 0 ? (
                <>
                  <img
                    src={eventData.images[currentImageIndex] || mockImages[0]}
                    alt="Foto do evento"
                    className="w-full h-full object-cover"
                  />
                  {eventData.images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40"
                        onClick={() =>
                          setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : eventData.images.length - 1))
                        }
                      >
                        <ChevronLeft className="w-4 h-4 text-white" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40"
                        onClick={() =>
                          setCurrentImageIndex((prev) => (prev < eventData.images.length - 1 ? prev + 1 : 0))
                        }
                      >
                        <ChevronRight className="w-4 h-4 text-white" />
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <div
                  className="flex items-center justify-center h-full text-sm lg:text-base"
                  style={{ color: "#3D2C2E" }}
                >
                  Imagem do Evento (Placeholder)
                </div>
              )}
            </div>

            {eventData.images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {eventData.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? "w-6" : ""}`}
                    style={{ backgroundColor: index === currentImageIndex ? "#CFB2A8" : "#E5D6CD" }}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Event Details */}
          <div className="space-y-4 lg:space-y-6">
            <h1 className="text-xl lg:text-3xl font-bold" style={{ color: "#3D2C2E" }}>
              {eventData.title || "Aula de Ballet Iniciante"}
            </h1>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 lg:w-5 lg:h-5" style={{ color: "#CFB2A8" }} />
                <span className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                  {mockUnits.find((u) => u.id === eventData.unit)?.name || "Unidade Centro"}
                </span>
              </div>

              {eventData.isRecurring ? (
                <>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 lg:w-5 lg:h-5" style={{ color: "#CFB2A8" }} />
                    <span className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                      {eventData.recurringDays.length > 0
                        ? `${eventData.recurringDays.map((day) => weekDays.find((d) => d.id === day)?.label).join(", ")}`
                        : "Dias da semana não selecionados"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 lg:w-5 lg:h-5" style={{ color: "#CFB2A8" }} />
                    <span className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                      {eventData.date || "Data de início"} até {eventData.endDate || "Data de término"}
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 lg:w-5 lg:h-5" style={{ color: "#CFB2A8" }} />
                  <span className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                    {eventData.date || "15 de março, 2024"}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 lg:w-5 lg:h-5" style={{ color: "#CFB2A8" }} />
                <span className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                  {eventData.time || "18:00"} - 19:30
                </span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 lg:w-5 lg:h-5" style={{ color: "#CFB2A8" }} />
                <span className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                  Estúdio A
                </span>
              </div>

              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 lg:w-5 lg:h-5" style={{ color: "#CFB2A8" }} />
                <span className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                  R$ {eventData.price || "25,00"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 lg:w-5 lg:h-5" style={{ color: "#CFB2A8" }} />
                <span className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                  4.8 avaliação
                </span>
              </div>
            </div>

            <div className="space-y-3 lg:space-y-4">
              <Button className="w-full h-10 lg:h-12" style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}>
                Publicar Evento
              </Button>
              <Button
                variant="outline"
                className="w-full h-10 lg:h-12 bg-transparent"
                onClick={() => navigateTo("create-event")}
                style={{ borderColor: "#CFB2A8", color: "#3D2C2E" }}
              >
                Editar Evento
              </Button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 lg:mt-8">
          <h3 className="font-semibold mb-2 lg:mb-3 text-base lg:text-lg" style={{ color: "#3D2C2E" }}>
            Descrição
          </h3>
          <p className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
            {eventData.description ||
              "Perfeito para iniciantes que querem aprender os fundamentos do ballet. Vamos cobrir posições básicas, movimentos e terminologia em um ambiente acolhedor."}
          </p>
        </div>
      </div>
    </div>
  )

  const renderStudentsList = (title: string, isScheduled = false) => (
    <div className="p-4 lg:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Unit Filter */}
        {renderUnitFilter()}

        {isScheduled && (
          <div className="mb-6">
            <h2 className="text-base lg:text-lg font-semibold" style={{ color: "#3D2C2E" }}>
              Eventos de Hoje
            </h2>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {isScheduled
            ? ["Ballet Iniciante - 18:00", "Jazz Fundamentos - 20:00"].map((className, idx) => (
                <Card key={idx} style={{ backgroundColor: "#E5D6CD" }} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                      {className}
                    </CardTitle>
                    <p className="text-xs" style={{ color: "#3D2C2E" }}>
                      {selectedUnit === "all" ? mockUnits[idx]?.name : ""}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 lg:space-y-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center justify-between py-1">
                          <div className="flex items-center gap-2 lg:gap-3">
                            <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full" style={{ backgroundColor: "#CFB2A8" }}>
                              <div className="flex items-center justify-center h-full">
                                <User className="w-3 h-3 lg:w-4 lg:h-4" style={{ color: "#3D2C2E" }} />
                              </div>
                            </div>
                            <span className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                              Aluno {i}
                            </span>
                          </div>
                          <span
                            className="text-xs lg:text-sm px-2 py-1 rounded"
                            style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}
                          >
                            Confirmado
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            : [1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} style={{ backgroundColor: "#E5D6CD" }} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-3 lg:p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full" style={{ backgroundColor: "#CFB2A8" }}>
                          <div className="flex items-center justify-center h-full">
                            <User className="w-5 h-5 lg:w-6 lg:h-6" style={{ color: "#3D2C2E" }} />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm lg:text-base font-medium" style={{ color: "#3D2C2E" }}>
                            Aluno {i}
                          </h3>
                          <p className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                            Interessado em Ballet Iniciante
                          </p>
                          {selectedUnit === "all" && (
                            <p className="text-xs" style={{ color: "#CFB2A8" }}>
                              {mockUnits[i % 3]?.name}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" style={{ color: "#CFB2A8" }} />
                        <span className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                          4.{i}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </div>
  )

  const renderAnalytics = () => {
    const stats = getFilteredStats()

    return (
      <div className="p-4 lg:p-6">
        <div className="max-w-6xl mx-auto space-y-6 lg:space-y-8">
          {/* Unit Filter */}
          {renderUnitFilter()}

          {/* Overview Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
            <Card style={{ backgroundColor: "#E5D6CD" }} className="hover:shadow-md transition-shadow">
              <CardContent className="p-3 lg:p-6 text-center">
                <div className="text-2xl lg:text-3xl font-bold" style={{ color: "#3D2C2E" }}>
                  156
                </div>
                <div className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                  Check-ins Totais
                </div>
                <div className="text-xs lg:text-sm" style={{ color: "#CFB2A8" }}>
                  +12% esta semana
                </div>
              </CardContent>
            </Card>
            <Card style={{ backgroundColor: "#E5D6CD" }} className="hover:shadow-md transition-shadow">
              <CardContent className="p-3 lg:p-6 text-center">
                <div className="text-2xl lg:text-3xl font-bold" style={{ color: "#3D2C2E" }}>
                  {stats.rating}
                </div>
                <div className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                  Avaliação Média
                </div>
                <div className="text-xs lg:text-sm" style={{ color: "#CFB2A8" }}>
                  24 avaliações
                </div>
              </CardContent>
            </Card>
            <Card style={{ backgroundColor: "#E5D6CD" }} className="hover:shadow-md transition-shadow hidden lg:block">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold" style={{ color: "#3D2C2E" }}>
                  R$ {stats.revenue}
                </div>
                <div className="text-sm" style={{ color: "#3D2C2E" }}>
                  Receita
                </div>
                <div className="text-sm" style={{ color: "#CFB2A8" }}>
                  Este mês
                </div>
              </CardContent>
            </Card>
            <Card style={{ backgroundColor: "#E5D6CD" }} className="hover:shadow-md transition-shadow hidden lg:block">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold" style={{ color: "#3D2C2E" }}>
                  92%
                </div>
                <div className="text-sm" style={{ color: "#3D2C2E" }}>
                  Presença
                </div>
                <div className="text-sm" style={{ color: "#CFB2A8" }}>
                  Média
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Peak Hours Chart */}
            <Card style={{ backgroundColor: "#E5D6CD" }} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                  Horários de Pico
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 lg:h-48 flex items-end justify-between gap-1">
                  {[20, 35, 45, 60, 80, 65, 40].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t transition-all hover:opacity-80"
                      style={{
                        height: `${height}%`,
                        backgroundColor: "#CFB2A8",
                        minHeight: "8px",
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                  <span>Seg</span>
                  <span>Ter</span>
                  <span>Qua</span>
                  <span>Qui</span>
                  <span>Sex</span>
                  <span>Sáb</span>
                  <span>Dom</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Feedback */}
            <Card style={{ backgroundColor: "#E5D6CD" }} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                  Avaliações Recentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 lg:space-y-4">
                {[
                  {
                    rating: 5,
                    comment: "Evento incrível! Professora excelente.",
                    unit: selectedUnit === "all" ? "Unidade Centro" : "",
                  },
                  {
                    rating: 4,
                    comment: "Gostei muito da aula.",
                    unit: selectedUnit === "all" ? "Unidade Zona Sul" : "",
                  },
                  {
                    rating: 5,
                    comment: "Perfeito para iniciantes como eu.",
                    unit: selectedUnit === "all" ? "Unidade Norte" : "",
                  },
                ].map((feedback, i) => (
                  <div key={i} className="border-b pb-2 lg:pb-3" style={{ borderColor: "#CFB2A8" }}>
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          className="w-3 h-3 lg:w-4 lg:h-4"
                          style={{
                            color: starIdx < feedback.rating ? "#CFB2A8" : "#E5D6CD",
                            fill: starIdx < feedback.rating ? "#CFB2A8" : "none",
                          }}
                        />
                      ))}
                      {feedback.unit && (
                        <span className="text-xs ml-2" style={{ color: "#CFB2A8" }}>
                          {feedback.unit}
                        </span>
                      )}
                    </div>
                    <p className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                      {feedback.comment}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#F5F0EB" }}>
      {/* Sidebar */}
      <div className="hidden lg:block">{renderSidebar()}</div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">{renderSidebar()}</div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        {/* Header */}
        {currentScreen === "dashboard" && renderHeader("Painel", false)}
        {currentScreen === "profile" && renderHeader("Perfil")}
        {currentScreen === "create-event" && renderHeader("Criar Evento")}
        {currentScreen === "event-preview" && renderHeader("Visualizar Evento")}
        {currentScreen === "interested-students" && renderHeader("Alunos Interessados")}
        {currentScreen === "scheduled-students" && renderHeader("Alunos Agendados")}
        {currentScreen === "analytics" && renderHeader("Relatórios")}

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {currentScreen === "dashboard" && renderDashboard()}
          {currentScreen === "profile" && renderProfile()}
          {currentScreen === "create-event" && renderCreateEvent()}
          {currentScreen === "event-preview" && renderEventPreview()}
          {currentScreen === "interested-students" && renderStudentsList("Alunos Interessados")}
          {currentScreen === "scheduled-students" && renderStudentsList("Alunos Agendados", true)}
          {currentScreen === "analytics" && renderAnalytics()}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 flex justify-around p-4 border-t"
        style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
      >
        {navigationItems.slice(0, 4).map((item) => {
          const Icon = item.icon
          return (
            <Button key={item.id} variant="ghost" size="sm" onClick={() => navigateTo(item.id as Screen)}>
              <Icon className="w-5 h-5" style={{ color: currentScreen === item.id ? "#CFB2A8" : "#3D2C2E" }} />
            </Button>
          )
        })}
      </div>
    </div>
  )
}
