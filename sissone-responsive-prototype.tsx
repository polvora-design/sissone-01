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
  Edit,
  Trash2,
  Search,
  UserPlus,
  FileDown,
  LucideTag as PriceTag,
  Shield,
  ShieldCheck,
  AlertCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react"

type Screen = "dashboard" | "school-units" | "classes" | "create-class" | "class-preview" | "pricing" | "students"

type Unit = {
  id: string
  name: string
  address: string
  phone: string
  email: string
  students: number
  rating: number
  revenue: number
  description: string
}

type Class = {
  id: string
  title: string
  unitId: string
  unitName: string
  date: string
  time: string
  capacity: number
  enrolled: number
  price: number
  isRecurring: boolean
  frequency?: string
}

type Student = {
  id: string
  name: string
  phone: string
  email: string
  unitId: string
  classes: string[]
  frequency: number
  acquisitionType: "invite" | "platform"
  paymentStatus: "current" | "overdue"
  avatar?: string
}

const mockUnits: Unit[] = [
  {
    id: "1",
    name: "Unidade Centro",
    address: "Rua das Flores, 123",
    phone: "(11) 98765-4321",
    email: "centro@sissone.com.br",
    students: 28,
    rating: 4.9,
    revenue: 1200,
    description: "Nossa unidade principal no centro da cidade",
  },
  {
    id: "2",
    name: "Unidade Zona Sul",
    address: "Av. Paulista, 456",
    phone: "(11) 98765-4322",
    email: "zonasul@sissone.com.br",
    students: 32,
    rating: 4.7,
    revenue: 1500,
    description: "Unidade moderna com equipamentos de ponta",
  },
  {
    id: "3",
    name: "Unidade Norte",
    address: "Rua do Norte, 789",
    phone: "(11) 98765-4323",
    email: "norte@sissone.com.br",
    students: 18,
    rating: 4.6,
    revenue: 800,
    description: "Ambiente acolhedor para todas as idades",
  },
]

const mockClasses: Class[] = [
  {
    id: "1",
    title: "Ballet Iniciante",
    unitId: "1",
    unitName: "Unidade Centro",
    date: "2024-03-15",
    time: "18:00",
    capacity: 15,
    enrolled: 12,
    price: 80,
    isRecurring: true,
    frequency: "Segunda, Quarta, Sexta",
  },
  {
    id: "2",
    title: "Jazz Avançado",
    unitId: "2",
    unitName: "Unidade Zona Sul",
    date: "2024-03-15",
    time: "19:00",
    capacity: 20,
    enrolled: 18,
    price: 100,
    isRecurring: true,
    frequency: "Terça, Quinta",
  },
  {
    id: "3",
    title: "Hip Hop Kids",
    unitId: "1",
    unitName: "Unidade Centro",
    date: "2024-03-16",
    time: "16:00",
    capacity: 25,
    enrolled: 8,
    price: 70,
    isRecurring: true,
    frequency: "Sábado",
  },
]

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Maria Silva",
    phone: "(11) 99999-1111",
    email: "maria@email.com",
    unitId: "1",
    classes: ["Ballet Iniciante", "Jazz Avançado"],
    frequency: 95,
    acquisitionType: "platform",
    paymentStatus: "current",
  },
  {
    id: "2",
    name: "João Santos",
    phone: "(11) 99999-2222",
    email: "joao@email.com",
    unitId: "2",
    classes: ["Jazz Avançado"],
    frequency: 78,
    acquisitionType: "invite",
    paymentStatus: "current",
  },
  {
    id: "3",
    name: "Ana Costa",
    phone: "(11) 99999-3333",
    email: "ana@email.com",
    unitId: "1",
    classes: ["Ballet Iniciante"],
    frequency: 45,
    acquisitionType: "platform",
    paymentStatus: "overdue",
  },
]

export default function SissoneResponsivePrototype() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedUnit, setSelectedUnit] = useState<string>("all")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [userProfile] = useState<{ name: string; role: "admin" | "manager" }>({
    name: "Gestor Principal",
    role: "admin",
  })

  const [classData, setClassData] = useState({
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
    { id: "school-units", label: "Escola & Unidades", icon: Building2 },
    { id: "classes", label: "Aulas", icon: Calendar },
    { id: "pricing", label: "Precificação", icon: PriceTag },
    { id: "students", label: "Alunos", icon: Users },
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

  const getTotalStats = () => {
    return {
      students: mockUnits.reduce((sum, unit) => sum + unit.students, 0),
      rating: (mockUnits.reduce((sum, unit) => sum + unit.rating, 0) / mockUnits.length).toFixed(1),
      revenue: mockUnits.reduce((sum, unit) => sum + unit.revenue, 0),
      classes: 12,
    }
  }

  const getFilteredStats = () => {
    if (selectedUnit === "all") {
      return getTotalStats()
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
    <div className="flex gap-2 mb-4 items-center flex-row">
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

  const renderSidebar = () => {
    const totalStats = getTotalStats()

    return (
      <>
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <div
          className={`fixed left-0 top-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ backgroundColor: "#F5F0EB", borderRight: "1px solid #E5D6CD" }}
        >
          <div className="p-6 border-b" style={{ borderColor: "#E5D6CD" }}>
            <div className="flex items-center justify-between">
              <div>
                <div className="w-32 h-8 rounded mb-2" style={{ backgroundColor: "#E5D6CD" }}>
                  <div
                    className="flex items-center justify-center h-full text-sm font-bold"
                    style={{ color: "#3D2C2E" }}
                  >
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

          <div className="hidden lg:block p-4 mt-8">
            <h3 className="text-sm font-semibold mb-3" style={{ color: "#3D2C2E" }}>
              Resumo Rápido
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs" style={{ color: "#3D2C2E" }}>
                  Aulas Ativas
                </span>
                <span className="text-sm font-bold" style={{ color: "#3D2C2E" }}>
                  {totalStats.classes}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs" style={{ color: "#3D2C2E" }}>
                  Total de Alunos
                </span>
                <span className="text-sm font-bold" style={{ color: "#3D2C2E" }}>
                  {totalStats.students}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs" style={{ color: "#3D2C2E" }}>
                  Avaliação
                </span>
                <span className="text-sm font-bold" style={{ color: "#3D2C2E" }}>
                  {totalStats.rating}
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

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

      <div className="hidden lg:flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium" style={{ color: "#3D2C2E" }}>
            {userProfile.name}
          </p>
          <p className="text-xs flex items-center gap-1" style={{ color: "#CFB2A8" }}>
            {userProfile.role === "admin" ? (
              <>
                <ShieldCheck className="w-3 h-3" />
                Admin (Editor)
              </>
            ) : (
              <>
                <Shield className="w-3 h-3" />
                Gestor (Visualizador)
              </>
            )}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full" style={{ backgroundColor: "#CFB2A8" }}>
          <div className="flex items-center justify-center h-full">
            <User className="w-5 h-5" style={{ color: "#3D2C2E" }} />
          </div>
        </div>
      </div>
    </div>
  )

  const renderDashboard = () => {
    const stats = getFilteredStats()

    return (
      <div className="p-4 lg:p-6">
        <div className="hidden lg:block mb-8">
          <h2 className="text-xl font-semibold mb-2" style={{ color: "#3D2C2E" }}>
            Bem-vindo de volta, Gestor!
          </h2>
          <p className="text-sm" style={{ color: "#3D2C2E" }}>
            Aproveite os nossos dados para tomar as melhores decisões!
          </p>
        </div>

        <div className="mb-8">
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

        {renderUnitFilter()}

        <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
          <Card style={{ backgroundColor: "#E5D6CD" }} className="hover:shadow-md transition-shadow">
            <CardContent className="p-3 lg:p-6 text-center">
              <div className="text-lg lg:text-3xl font-bold" style={{ color: "#3D2C2E" }}>
                {stats.classes}
              </div>
              <div className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                Aulas Ativas
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6">
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
                  comment: "Aula incrível! Professora excelente.",
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-1">
            <h2 className="text-sm lg:text-base font-semibold mb-3 lg:mb-4" style={{ color: "#3D2C2E" }}>
              Ações Rápidas
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              <Button
                variant="outline"
                className="h-16 lg:h-20 flex flex-col gap-1 bg-transparent hover:shadow-md transition-all"
                onClick={() => navigateTo("create-class")}
                style={{ borderColor: "#CFB2A8", backgroundColor: "#F5F0EB" }}
              >
                <Plus className="w-5 h-5 lg:w-6 lg:h-6" style={{ color: "#3D2C2E" }} />
                <span className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                  Nova Aula
                </span>
              </Button>
              <Button
                variant="outline"
                className="h-16 lg:h-20 flex flex-col gap-1 bg-transparent hover:shadow-md transition-all"
                onClick={() => navigateTo("students")}
                style={{ borderColor: "#CFB2A8", backgroundColor: "#F5F0EB" }}
              >
                <UserPlus className="w-5 h-5 lg:w-6 lg:h-6" style={{ color: "#3D2C2E" }} />
                <span className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                  Cadastrar Aluno
                </span>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-sm lg:text-base font-semibold mb-3 lg:mb-4" style={{ color: "#3D2C2E" }}>
              Aulas Recentes
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
                          onClick={() => navigateTo("class-preview")}
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

  const renderSchoolUnits = () => (
    <div className="p-4 lg:p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* School Profile Section */}
        <div>
          <h2 className="text-lg lg:text-xl font-semibold mb-4" style={{ color: "#3D2C2E" }}>
            Perfil da Escola
          </h2>
          <Card style={{ backgroundColor: "#E5D6CD" }}>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto rounded-full mb-3" style={{ backgroundColor: "#CFB2A8" }}>
                    <div className="flex items-center justify-center h-full">
                      <Building2 className="w-12 h-12" style={{ color: "#3D2C2E" }} />
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="hover:bg-white/50">
                    <span style={{ color: "#CFB2A8" }}>Alterar Logo</span>
                  </Button>
                </div>

                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <Label htmlFor="school-name" className="text-sm font-medium" style={{ color: "#3D2C2E" }}>
                      Nome da Escola
                    </Label>
                    <Input
                      id="school-name"
                      placeholder="Sissone Dance Studio"
                      className="mt-1"
                      style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="school-photos" className="text-sm font-medium" style={{ color: "#3D2C2E" }}>
                      Fotos da Escola
                    </Label>
                    <Button
                      variant="outline"
                      className="w-full mt-1 h-12 bg-transparent"
                      style={{ borderColor: "#CFB2A8", backgroundColor: "#F5F0EB" }}
                    >
                      <Upload className="w-4 h-4 mr-2" style={{ color: "#3D2C2E" }} />
                      Adicionar Fotos
                    </Button>
                  </div>
                  <Button className="w-full" style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}>
                    Salvar Perfil da Escola
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Units Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg lg:text-xl font-semibold" style={{ color: "#3D2C2E" }}>
              Unidades
            </h2>
            <Button style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}>
              <Plus className="w-4 h-4 mr-2" />
              Criar Unidade
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
              style={{ color: "#3D2C2E" }}
            />
            <Input
              placeholder="Buscar unidades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
            />
          </div>

          {/* Units Grid - Netflix style */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockUnits.map((unit) => (
              <Card
                key={unit.id}
                style={{ backgroundColor: "#E5D6CD" }}
                className="hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full" style={{ backgroundColor: "#CFB2A8" }}>
                        <div className="flex items-center justify-center h-full">
                          <Building2 className="w-6 h-6" style={{ color: "#3D2C2E" }} />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold" style={{ color: "#3D2C2E" }}>
                          {unit.name}
                        </h3>
                        <p className="text-xs" style={{ color: "#3D2C2E" }}>
                          {unit.address}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="hover:bg-white/50">
                        <Edit className="w-4 h-4" style={{ color: "#3D2C2E" }} />
                      </Button>
                      <Button size="sm" variant="ghost" className="hover:bg-white/50">
                        <Trash2 className="w-4 h-4" style={{ color: "#3D2C2E" }} />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm" style={{ color: "#3D2C2E" }}>
                      <strong>Telefone:</strong> {unit.phone}
                    </p>
                    <p className="text-sm" style={{ color: "#3D2C2E" }}>
                      <strong>Email:</strong> {unit.email}
                    </p>
                    <p className="text-sm" style={{ color: "#3D2C2E" }}>
                      {unit.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-3 border-t" style={{ borderColor: "#CFB2A8" }}>
                    <div className="text-center">
                      <div className="text-lg font-bold" style={{ color: "#3D2C2E" }}>
                        {unit.rating}
                      </div>
                      <div className="text-xs" style={{ color: "#3D2C2E" }}>
                        Rating
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold" style={{ color: "#3D2C2E" }}>
                        {unit.students}
                      </div>
                      <div className="text-xs" style={{ color: "#3D2C2E" }}>
                        Alunos
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold" style={{ color: "#3D2C2E" }}>
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
      </div>
    </div>
  )

  const renderClasses = () => (
    <div className="p-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg lg:text-xl font-semibold" style={{ color: "#3D2C2E" }}>
            Gerenciar Aulas
          </h2>
          <Button style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }} onClick={() => navigateTo("create-class")}>
            <Plus className="w-4 h-4 mr-2" />
            Criar Aula
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card style={{ backgroundColor: "#E5D6CD" }}>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4" style={{ color: "#CFB2A8" }} />
                <span className="text-lg font-bold" style={{ color: "#3D2C2E" }}>
                  Jazz Avançado
                </span>
              </div>
              <div className="text-xs" style={{ color: "#3D2C2E" }}>
                Aula Mais Cheia
              </div>
            </CardContent>
          </Card>
          <Card style={{ backgroundColor: "#E5D6CD" }}>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <TrendingDown className="w-4 h-4" style={{ color: "#CFB2A8" }} />
                <span className="text-lg font-bold" style={{ color: "#3D2C2E" }}>
                  Hip Hop Kids
                </span>
              </div>
              <div className="text-xs" style={{ color: "#3D2C2E" }}>
                Aula Mais Vazia
              </div>
            </CardContent>
          </Card>
          <Card style={{ backgroundColor: "#E5D6CD" }}>
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold" style={{ color: "#3D2C2E" }}>
                Ballet Iniciante
              </div>
              <div className="text-xs" style={{ color: "#3D2C2E" }}>
                Próxima Aula
              </div>
            </CardContent>
          </Card>
          <Card style={{ backgroundColor: "#E5D6CD" }}>
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold" style={{ color: "#3D2C2E" }}>
                Jazz Avançado
              </div>
              <div className="text-xs" style={{ color: "#3D2C2E" }}>
                Última Aula
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
              style={{ color: "#3D2C2E" }}
            />
            <Input
              placeholder="Buscar aulas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
            />
          </div>

          <Select defaultValue="all">
            <SelectTrigger style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}>
              <SelectValue placeholder="Unidade" />
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

          <Select defaultValue="all">
            <SelectTrigger style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}>
              <SelectValue placeholder="Frequência" />
            </SelectTrigger>
            <SelectContent style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="recurring">Recorrentes</SelectItem>
              <SelectItem value="single">Únicas</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}>
              <SelectValue placeholder="Rentabilidade" />
            </SelectTrigger>
            <SelectContent style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="high">Alta</SelectItem>
              <SelectItem value="medium">Média</SelectItem>
              <SelectItem value="low">Baixa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Classes Grid - Netflix style */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockClasses.map((classItem) => (
            <Card
              key={classItem.id}
              style={{ backgroundColor: "#E5D6CD" }}
              className="hover:shadow-lg transition-all hover:scale-[1.02]"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1" style={{ color: "#3D2C2E" }}>
                      {classItem.title}
                    </h3>
                    <p className="text-sm mb-2" style={{ color: "#CFB2A8" }}>
                      {classItem.unitName}
                    </p>
                    {classItem.isRecurring && (
                      <span
                        className="text-xs px-2 py-1 rounded"
                        style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}
                      >
                        Recorrente: {classItem.frequency}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="hover:bg-white/50">
                      <Edit className="w-4 h-4" style={{ color: "#3D2C2E" }} />
                    </Button>
                    <Button size="sm" variant="ghost" className="hover:bg-white/50">
                      <Trash2 className="w-4 h-4" style={{ color: "#3D2C2E" }} />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" style={{ color: "#CFB2A8" }} />
                    <span className="text-sm" style={{ color: "#3D2C2E" }}>
                      {classItem.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" style={{ color: "#CFB2A8" }} />
                    <span className="text-sm" style={{ color: "#3D2C2E" }}>
                      R$ {classItem.price},00
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t" style={{ borderColor: "#CFB2A8" }}>
                  <div>
                    <span className="text-sm font-semibold" style={{ color: "#3D2C2E" }}>
                      {classItem.enrolled}/{classItem.capacity}
                    </span>
                    <span className="text-xs ml-1" style={{ color: "#3D2C2E" }}>
                      alunos
                    </span>
                  </div>
                  <div className="w-24 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#F5F0EB" }}>
                    <div
                      className="h-full"
                      style={{
                        width: `${(classItem.enrolled / classItem.capacity) * 100}%`,
                        backgroundColor: "#CFB2A8",
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const renderPricing = () => (
    <div className="p-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg lg:text-xl font-semibold mb-6" style={{ color: "#3D2C2E" }}>
          Gerenciar Precificação
        </h2>

        {/* Base Price */}
        <Card style={{ backgroundColor: "#E5D6CD" }} className="mb-6">
          <CardHeader>
            <CardTitle style={{ color: "#3D2C2E" }}>Preço Base das Aulas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <Label style={{ color: "#3D2C2E" }}>Ballet</Label>
                <Input placeholder="R$ 80,00" style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }} />
              </div>
              <div>
                <Label style={{ color: "#3D2C2E" }}>Jazz</Label>
                <Input placeholder="R$ 90,00" style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }} />
              </div>
              <div>
                <Label style={{ color: "#3D2C2E" }}>Hip Hop</Label>
                <Input placeholder="R$ 70,00" style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Plans */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold" style={{ color: "#3D2C2E" }}>
              Planos de Assinatura
            </h3>
            <Button style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Plano
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { period: "Trimestral", discount: "10%", price: "R$ 648,00" },
              { period: "Semestral", discount: "15%", price: "R$ 1.224,00" },
              { period: "Anual", discount: "20%", price: "R$ 2.304,00" },
            ].map((plan) => (
              <Card key={plan.period} style={{ backgroundColor: "#E5D6CD" }} className="hover:shadow-md transition-all">
                <CardContent className="p-6 text-center">
                  <h4 className="text-lg font-bold mb-2" style={{ color: "#3D2C2E" }}>
                    {plan.period}
                  </h4>
                  <div className="text-2xl font-bold mb-1" style={{ color: "#CFB2A8" }}>
                    {plan.price}
                  </div>
                  <div className="text-sm mb-4" style={{ color: "#3D2C2E" }}>
                    {plan.discount} de desconto
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button size="sm" variant="ghost" className="hover:bg-white/50">
                      <Edit className="w-4 h-4" style={{ color: "#3D2C2E" }} />
                    </Button>
                    <Button size="sm" variant="ghost" className="hover:bg-white/50">
                      <Trash2 className="w-4 h-4" style={{ color: "#3D2C2E" }} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Promotional Combos */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold" style={{ color: "#3D2C2E" }}>
              Combos Promocionais
            </h3>
            <Button style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Combo
            </Button>
          </div>

          <Card style={{ backgroundColor: "#E5D6CD" }}>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  { name: "Combo Ballet + Jazz", classes: "Ballet Iniciante, Jazz Avançado", price: "R$ 150,00" },
                  { name: "Pacote Família", classes: "3 aulas à escolha", price: "R$ 210,00" },
                ].map((combo, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded"
                    style={{ backgroundColor: "#F5F0EB" }}
                  >
                    <div>
                      <h4 className="font-semibold" style={{ color: "#3D2C2E" }}>
                        {combo.name}
                      </h4>
                      <p className="text-sm" style={{ color: "#3D2C2E" }}>
                        {combo.classes}
                      </p>
                      <p className="text-lg font-bold" style={{ color: "#CFB2A8" }}>
                        {combo.price}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="hover:bg-white/50">
                        <Edit className="w-4 h-4" style={{ color: "#3D2C2E" }} />
                      </Button>
                      <Button size="sm" variant="ghost" className="hover:bg-white/50">
                        <Trash2 className="w-4 h-4" style={{ color: "#3D2C2E" }} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderStudents = () => (
    <div className="p-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg lg:text-xl font-semibold" style={{ color: "#3D2C2E" }}>
            Gerenciar Alunos
          </h2>
          <div className="flex gap-2">
            <Button style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}>
              <UserPlus className="w-4 h-4 mr-2" />
              Novo Aluno
            </Button>
            <Button variant="outline" style={{ borderColor: "#CFB2A8", color: "#3D2C2E" }}>
              <FileDown className="w-4 h-4 mr-2" />
              Importar Lista
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card style={{ backgroundColor: "#E5D6CD" }}>
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold" style={{ color: "#3D2C2E" }}>
                Maria Silva
              </div>
              <div className="text-xs" style={{ color: "#3D2C2E" }}>
                Mais Frequente (95%)
              </div>
            </CardContent>
          </Card>
          <Card style={{ backgroundColor: "#E5D6CD" }}>
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold" style={{ color: "#3D2C2E" }}>
                Ana Costa
              </div>
              <div className="text-xs" style={{ color: "#3D2C2E" }}>
                Menos Frequente (45%)
              </div>
            </CardContent>
          </Card>
          <Card style={{ backgroundColor: "#E5D6CD" }}>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1">
                <AlertCircle className="w-4 h-4" style={{ color: "#3D2C2E" }} />
                <span className="text-lg font-bold" style={{ color: "#3D2C2E" }}>
                  1
                </span>
              </div>
              <div className="text-xs" style={{ color: "#3D2C2E" }}>
                Inadimplente
              </div>
            </CardContent>
          </Card>
          <Card style={{ backgroundColor: "#E5D6CD" }}>
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold" style={{ color: "#3D2C2E" }}>
                {mockStudents.length}
              </div>
              <div className="text-xs" style={{ color: "#3D2C2E" }}>
                Total de Alunos
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
              style={{ color: "#3D2C2E" }}
            />
            <Input
              placeholder="Buscar alunos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
            />
          </div>

          <Select defaultValue="all">
            <SelectTrigger style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}>
              <SelectValue placeholder="Unidade" />
            </SelectTrigger>
            <SelectContent style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}>
              <SelectItem value="all">Todas</SelectItem>
              {mockUnits.map((unit) => (
                <SelectItem key={unit.id} value={unit.id}>
                  {unit.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}>
              <SelectValue placeholder="Aula" />
            </SelectTrigger>
            <SelectContent style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}>
              <SelectItem value="all">Todas</SelectItem>
              {mockClasses.map((classItem) => (
                <SelectItem key={classItem.id} value={classItem.id}>
                  {classItem.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}>
              <SelectValue placeholder="Faixa Etária" />
            </SelectTrigger>
            <SelectContent style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="kids">Kids (até 12)</SelectItem>
              <SelectItem value="teen">Teen (13-17)</SelectItem>
              <SelectItem value="adult">Adulto (18+)</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}>
              <SelectValue placeholder="Frequência" />
            </SelectTrigger>
            <SelectContent style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="high">Alta (&gt;80%)</SelectItem>
              <SelectItem value="medium">Média (50-80%)</SelectItem>
              <SelectItem value="low">Baixa (&lt;50%)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Students List */}
        <Card style={{ backgroundColor: "#E5D6CD" }}>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b" style={{ borderColor: "#CFB2A8" }}>
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: "#3D2C2E" }}>
                      Aluno
                    </th>
                    <th
                      className="text-left p-4 text-sm font-semibold hidden lg:table-cell"
                      style={{ color: "#3D2C2E" }}
                    >
                      Telefone
                    </th>
                    <th
                      className="text-left p-4 text-sm font-semibold hidden lg:table-cell"
                      style={{ color: "#3D2C2E" }}
                    >
                      Origem
                    </th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: "#3D2C2E" }}>
                      Aulas
                    </th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: "#3D2C2E" }}>
                      Frequência
                    </th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: "#3D2C2E" }}>
                      Situação
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockStudents.map((student) => (
                    <tr key={student.id} className="border-b hover:bg-white/30" style={{ borderColor: "#CFB2A8" }}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full" style={{ backgroundColor: "#CFB2A8" }}>
                            <div className="flex items-center justify-center h-full">
                              <User className="w-5 h-5" style={{ color: "#3D2C2E" }} />
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium" style={{ color: "#3D2C2E" }}>
                              {student.name}
                            </p>
                            <p className="text-xs lg:hidden" style={{ color: "#3D2C2E" }}>
                              {student.phone}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm hidden lg:table-cell" style={{ color: "#3D2C2E" }}>
                        {student.phone}
                      </td>
                      <td className="p-4 hidden lg:table-cell">
                        <span
                          className="text-xs px-2 py-1 rounded"
                          style={{
                            backgroundColor: student.acquisitionType === "platform" ? "#CFB2A8" : "#F5F0EB",
                            color: "#3D2C2E",
                          }}
                        >
                          {student.acquisitionType === "platform" ? "Plataforma" : "Convite"}
                        </span>
                      </td>
                      <td className="p-4 text-sm" style={{ color: "#3D2C2E" }}>
                        {student.classes.join(", ")}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#F5F0EB" }}>
                            <div
                              className="h-full"
                              style={{
                                width: `${student.frequency}%`,
                                backgroundColor: "#CFB2A8",
                              }}
                            />
                          </div>
                          <span className="text-sm" style={{ color: "#3D2C2E" }}>
                            {student.frequency}%
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className="text-xs px-2 py-1 rounded"
                          style={{
                            backgroundColor: student.paymentStatus === "current" ? "#CFB2A8" : "#F5F0EB",
                            color: "#3D2C2E",
                          }}
                        >
                          {student.paymentStatus === "current" ? "Em dia" : "Inadimplente"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderCreateClass = () => (
    <div className="p-4 lg:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4 lg:space-y-6">
          <div>
            <Label htmlFor="unit" className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
              Unidade *
            </Label>
            <Select value={classData.unit} onValueChange={(value) => setClassData({ ...classData, unit: value })}>
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
              Título da Aula
            </Label>
            <Input
              id="title"
              placeholder="ex: Ballet Iniciante"
              value={classData.title}
              onChange={(e) => setClassData({ ...classData, title: e.target.value })}
              className="mt-1 h-10 lg:h-12"
              style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
              Tipo de Aula
            </Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="recurring"
                checked={classData.isRecurring}
                onCheckedChange={(checked) => setClassData({ ...classData, isRecurring: !!checked })}
              />
              <Label htmlFor="recurring" className="text-sm" style={{ color: "#3D2C2E" }}>
                Aula Recorrente (múltiplos dias da semana)
              </Label>
            </div>
          </div>

          {classData.isRecurring ? (
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
                        checked={classData.recurringDays.includes(day.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setClassData({
                              ...classData,
                              recurringDays: [...classData.recurringDays, day.id],
                            })
                          } else {
                            setClassData({
                              ...classData,
                              recurringDays: classData.recurringDays.filter((d) => d !== day.id),
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
                    value={classData.date}
                    onChange={(e) => setClassData({ ...classData, date: e.target.value })}
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
                    value={classData.endDate}
                    onChange={(e) => setClassData({ ...classData, endDate: e.target.value })}
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
                    value={classData.time}
                    onChange={(e) => setClassData({ ...classData, time: e.target.value })}
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
                  value={classData.date}
                  onChange={(e) => setClassData({ ...classData, date: e.target.value })}
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
                  value={classData.time}
                  onChange={(e) => setClassData({ ...classData, time: e.target.value })}
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
                  value={classData.price}
                  onChange={(e) => setClassData({ ...classData, price: e.target.value })}
                  className="mt-1 h-10 lg:h-12"
                  style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
                />
              </div>
            </div>
          )}

          <div>
            <Label className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
              Fotos da Aula (Carrossel)
            </Label>
            <div className="mt-2 space-y-3">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col gap-2 bg-transparent"
                style={{ borderColor: "#CFB2A8", backgroundColor: "#F5F0EB" }}
                onClick={() => {
                  setClassData({
                    ...classData,
                    images: [...classData.images, ...mockImages.slice(0, 3)],
                  })
                }}
              >
                <Upload className="w-6 h-6" style={{ color: "#3D2C2E" }} />
                <span className="text-sm" style={{ color: "#3D2C2E" }}>
                  Adicionar Fotos
                </span>
              </Button>

              {classData.images.length > 0 && (
                <div className="grid grid-cols-3 lg:grid-cols-5 gap-2">
                  {classData.images.slice(0, 5).map((image, index) => (
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
              placeholder="Detalhes da aula, requisitos, o que trazer..."
              rows={4}
              value={classData.description}
              onChange={(e) => setClassData({ ...classData, description: e.target.value })}
              className="mt-1"
              style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() => navigateTo("class-preview")}
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

  const renderClassPreview = () => (
    <div className="p-4 lg:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="space-y-4">
            <div
              className="relative w-full h-48 lg:h-64 rounded-lg overflow-hidden"
              style={{ backgroundColor: "#E5D6CD" }}
            >
              {classData.images.length > 0 ? (
                <>
                  <img
                    src={classData.images[currentImageIndex] || mockImages[0]}
                    alt="Foto da aula"
                    className="w-full h-full object-cover"
                  />
                  {classData.images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40"
                        onClick={() =>
                          setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : classData.images.length - 1))
                        }
                      >
                        <ChevronLeft className="w-4 h-4 text-white" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40"
                        onClick={() =>
                          setCurrentImageIndex((prev) => (prev < classData.images.length - 1 ? prev + 1 : 0))
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
                  Imagem da Aula (Placeholder)
                </div>
              )}
            </div>

            {classData.images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {classData.images.map((_, index) => (
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

          <div className="space-y-4 lg:space-y-6">
            <h1 className="text-xl lg:text-3xl font-bold" style={{ color: "#3D2C2E" }}>
              {classData.title || "Aula de Ballet Iniciante"}
            </h1>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 lg:w-5 lg:h-5" style={{ color: "#CFB2A8" }} />
                <span className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                  {mockUnits.find((u) => u.id === classData.unit)?.name || "Unidade Centro"}
                </span>
              </div>

              {classData.isRecurring ? (
                <>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 lg:w-5 lg:h-5" style={{ color: "#CFB2A8" }} />
                    <span className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                      {classData.recurringDays.length > 0
                        ? `${classData.recurringDays.map((day) => weekDays.find((d) => d.id === day)?.label).join(", ")}`
                        : "Dias da semana não selecionados"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 lg:w-5 lg:h-5" style={{ color: "#CFB2A8" }} />
                    <span className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                      {classData.date || "Data de início"} até {classData.endDate || "Data de término"}
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 lg:w-5 lg:h-5" style={{ color: "#CFB2A8" }} />
                  <span className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                    {classData.date || "15 de março, 2024"}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 lg:w-5 lg:h-5" style={{ color: "#CFB2A8" }} />
                <span className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
                  {classData.time || "18:00"} - 19:30
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
                  R$ {classData.price || "25,00"}
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
                Publicar Aula
              </Button>
              <Button
                variant="outline"
                className="w-full h-10 lg:h-12 bg-transparent"
                onClick={() => navigateTo("create-class")}
                style={{ borderColor: "#CFB2A8", color: "#3D2C2E" }}
              >
                Editar Aula
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 lg:mt-8">
          <h3 className="font-semibold mb-2 lg:mb-3 text-base lg:text-lg" style={{ color: "#3D2C2E" }}>
            Descrição
          </h3>
          <p className="text-sm lg:text-base" style={{ color: "#3D2C2E" }}>
            {classData.description ||
              "Perfeito para iniciantes que querem aprender os fundamentos do ballet. Vamos cobrir posições básicas, movimentos e terminologia em um ambiente acolhedor."}
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#F5F0EB" }}>
      <div className="hidden lg:block">{renderSidebar()}</div>
      <div className="lg:hidden">{renderSidebar()}</div>

      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        {currentScreen === "dashboard" && renderHeader("Painel", false)}
        {currentScreen === "school-units" && renderHeader("Escola & Unidades")}
        {currentScreen === "classes" && renderHeader("Aulas")}
        {currentScreen === "create-class" && renderHeader("Criar Aula")}
        {currentScreen === "class-preview" && renderHeader("Visualizar Aula")}
        {currentScreen === "pricing" && renderHeader("Precificação")}
        {currentScreen === "students" && renderHeader("Alunos")}

        <div className="flex-1 overflow-auto">
          {currentScreen === "dashboard" && renderDashboard()}
          {currentScreen === "school-units" && renderSchoolUnits()}
          {currentScreen === "classes" && renderClasses()}
          {currentScreen === "create-class" && renderCreateClass()}
          {currentScreen === "class-preview" && renderClassPreview()}
          {currentScreen === "pricing" && renderPricing()}
          {currentScreen === "students" && renderStudents()}
        </div>
      </div>

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
