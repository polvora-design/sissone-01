"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
  LucideTag as PriceTag,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Copy,
  Mail,
  Check,
  GraduationCap,
} from "lucide-react"

type ToastType = "success" | "error" | "info"
type Toast = {
  message: string
  type: ToastType
  id: number
}

type Screen =
  | "dashboard"
  | "profile"
  | "school-units"
  | "create-class"
  | "view-class"
  | "classes"
  | "pricing"
  | "students"
  | "student-profile"
  | "user-profile"
  | "student-view"

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

type Plan = {
  id: string
  name: string
  discount: number
}

type Combo = {
  id: string
  name: string
  classes: string[]
  price: number
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
  {
    id: "4",
    title: "Contemporâneo Intermediário",
    unitId: "3",
    unitName: "Unidade Norte",
    date: "2024-03-16",
    time: "20:00",
    capacity: 18,
    enrolled: 15,
    price: 90,
    isRecurring: true,
    frequency: "Terça, Quinta",
  },
  {
    id: "5",
    title: "Sapateado Avançado",
    unitId: "2",
    unitName: "Unidade Zona Sul",
    date: "2024-03-17",
    time: "17:00",
    capacity: 12,
    enrolled: 10,
    price: 110,
    isRecurring: false,
  },
  {
    id: "6",
    title: "Dança de Salão Iniciante",
    unitId: "3",
    unitName: "Unidade Norte",
    date: "2024-03-18",
    time: "19:30",
    capacity: 20,
    enrolled: 16,
    price: 75,
    isRecurring: true,
    frequency: "Segunda, Quarta",
  },
  {
    id: "7",
    title: "Zumba Fitness",
    unitId: "1",
    unitName: "Unidade Centro",
    date: "2024-03-19",
    time: "18:30",
    capacity: 30,
    enrolled: 25,
    price: 60,
    isRecurring: true,
    frequency: "Segunda, Quarta, Sexta",
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
  {
    id: "4",
    name: "Pedro Oliveira",
    phone: "(11) 99999-4444",
    email: "pedro@email.com",
    unitId: "3",
    classes: ["Contemporâneo Intermediário"],
    frequency: 88,
    acquisitionType: "invite",
    paymentStatus: "current",
  },
  {
    id: "5",
    name: "Juliana Alves",
    phone: "(11) 99999-5555",
    email: "juliana@email.com",
    unitId: "2",
    classes: ["Sapateado Avançado", "Jazz Avançado"],
    frequency: 92,
    acquisitionType: "platform",
    paymentStatus: "current",
  },
  {
    id: "6",
    name: "Carlos Mendes",
    phone: "(11) 99999-6666",
    email: "carlos@email.com",
    unitId: "1",
    classes: ["Hip Hop Kids"],
    frequency: 67,
    acquisitionType: "invite",
    paymentStatus: "current",
  },
  {
    id: "7",
    name: "Fernanda Lima",
    phone: "(11) 99999-7777",
    email: "fernanda@email.com",
    unitId: "3",
    classes: ["Dança de Salão Iniciante"],
    frequency: 81,
    acquisitionType: "platform",
    paymentStatus: "current",
  },
  {
    id: "8",
    name: "Ricardo Souza",
    phone: "(11) 99999-8888",
    email: "ricardo@email.com",
    unitId: "2",
    classes: ["Zumba Fitness"],
    frequency: 73,
    acquisitionType: "invite",
    paymentStatus: "current",
  },
  {
    id: "9",
    name: "Patrícia Rodrigues",
    phone: "(11) 99999-9999",
    email: "patricia@email.com",
    unitId: "1",
    classes: ["Ballet Iniciante", "Zumba Fitness"],
    frequency: 90,
    acquisitionType: "platform",
    paymentStatus: "current",
  },
  {
    id: "10",
    name: "Bruno Ferreira",
    phone: "(11) 99999-0000",
    email: "bruno@email.com",
    unitId: "2",
    classes: ["Jazz Avançado", "Sapateado Avançado"],
    frequency: 85,
    acquisitionType: "invite",
    paymentStatus: "current",
  },
  {
    id: "11",
    name: "Camila Martins",
    phone: "(11) 98888-1111",
    email: "camila@email.com",
    unitId: "3",
    classes: ["Contemporâneo Intermediário"],
    frequency: 76,
    acquisitionType: "platform",
    paymentStatus: "current",
  },
  {
    id: "12",
    name: "Lucas Pereira",
    phone: "(11) 98888-2222",
    email: "lucas@email.com",
    unitId: "1",
    classes: ["Hip Hop Kids"],
    frequency: 82,
    acquisitionType: "invite",
    paymentStatus: "current",
  },
  {
    id: "13",
    name: "Mariana Cardoso",
    phone: "(11) 98888-3333",
    email: "mariana@email.com",
    unitId: "2",
    classes: ["Jazz Avançado"],
    frequency: 94,
    acquisitionType: "platform",
    paymentStatus: "current",
  },
  {
    id: "14",
    name: "Rafael Barbosa",
    phone: "(11) 98888-4444",
    email: "rafael@email.com",
    unitId: "3",
    classes: ["Dança de Salão Iniciante"],
    frequency: 69,
    acquisitionType: "invite",
    paymentStatus: "current",
  },
  {
    id: "15",
    name: "Amanda Nunes",
    phone: "(11) 98888-5555",
    email: "amanda@email.com",
    unitId: "1",
    classes: ["Ballet Iniciante", "Zumba Fitness"],
    frequency: 87,
    acquisitionType: "platform",
    paymentStatus: "current",
  },
  {
    id: "16",
    name: "Gabriel Costa",
    phone: "(11) 98888-6666",
    email: "gabriel@email.com",
    unitId: "2",
    classes: ["Sapateado Avançado"],
    frequency: 91,
    acquisitionType: "invite",
    paymentStatus: "current",
  },
  {
    id: "17",
    name: "Larissa Santos",
    phone: "(11) 98888-7777",
    email: "larissa@email.com",
    unitId: "3",
    classes: ["Contemporâneo Intermediário"],
    frequency: 79,
    acquisitionType: "platform",
    paymentStatus: "current",
  },
  {
    id: "18",
    name: "Thiago Almeida",
    phone: "(11) 98888-8888",
    email: "thiago@email.com",
    unitId: "1",
    classes: ["Hip Hop Kids", "Zumba Fitness"],
    frequency: 83,
    acquisitionType: "invite",
    paymentStatus: "current",
  },
  {
    id: "19",
    name: "Beatriz Rocha",
    phone: "(11) 98888-9999",
    email: "beatriz@email.com",
    unitId: "2",
    classes: ["Jazz Avançado"],
    frequency: 96,
    acquisitionType: "platform",
    paymentStatus: "current",
  },
  {
    id: "20",
    name: "Diego Lima",
    phone: "(11) 98888-0000",
    email: "diego@email.com",
    unitId: "3",
    classes: ["Dança de Salão Iniciante"],
    frequency: 72,
    acquisitionType: "invite",
    paymentStatus: "current",
  },
  {
    id: "21",
    name: "Gabriela Freitas",
    phone: "(11) 97777-1111",
    email: "gabriela@email.com",
    unitId: "1",
    classes: ["Ballet Iniciante"],
    frequency: 89,
    acquisitionType: "platform",
    paymentStatus: "current",
  },
  {
    id: "22",
    name: "Rodrigo Dias",
    phone: "(11) 97777-2222",
    email: "rodrigo@email.com",
    unitId: "2",
    classes: ["Sapateado Avançado", "Jazz Avançado"],
    frequency: 84,
    acquisitionType: "invite",
    paymentStatus: "current",
  },
  {
    id: "23",
    name: "Isabela Carvalho",
    phone: "(11) 97777-3333",
    email: "isabela@email.com",
    unitId: "3",
    classes: ["Contemporâneo Intermediário"],
    frequency: 77,
    acquisitionType: "platform",
    paymentStatus: "current",
  },
  {
    id: "24",
    name: "Vinicius Gomes",
    phone: "(11) 97777-4444",
    email: "vinicius@email.com",
    unitId: "1",
    classes: ["Hip Hop Kids"],
    frequency: 80,
    acquisitionType: "invite",
    paymentStatus: "current",
  },
  {
    id: "25",
    name: "Letícia Moreira",
    phone: "(11) 97777-5555",
    email: "leticia@email.com",
    unitId: "2",
    classes: ["Jazz Avançado", "Zumba Fitness"],
    frequency: 93,
    acquisitionType: "platform",
    paymentStatus: "current",
  },
  {
    id: "26",
    name: "Henrique Batista",
    phone: "(11) 97777-6666",
    email: "henrique@email.com",
    unitId: "3",
    classes: ["Dança de Salão Iniciante"],
    frequency: 71,
    acquisitionType: "invite",
    paymentStatus: "current",
  },
  {
    id: "27",
    name: "Carolina Ribeiro",
    phone: "(11) 97777-7777",
    email: "carolina@email.com",
    unitId: "1",
    classes: ["Ballet Iniciante"],
    frequency: 86,
    acquisitionType: "platform",
    paymentStatus: "current",
  },
  {
    id: "28",
    name: "Felipe Teixeira",
    phone: "(11) 97777-8888",
    email: "felipe@email.com",
    unitId: "2",
    classes: ["Sapateado Avançado"],
    frequency: 88,
    acquisitionType: "invite",
    paymentStatus: "current",
  },
  {
    id: "29",
    name: "Natália Araújo",
    phone: "(11) 97777-9999",
    email: "natalia@email.com",
    unitId: "3",
    classes: ["Contemporâneo Intermediário"],
    frequency: 75,
    acquisitionType: "platform",
    paymentStatus: "current",
  },
  {
    id: "30",
    name: "Matheus Castro",
    phone: "(11) 97777-0000",
    email: "matheus@email.com",
    unitId: "1",
    classes: ["Hip Hop Kids", "Zumba Fitness"],
    frequency: 81,
    acquisitionType: "invite",
    paymentStatus: "current",
  },
  {
    id: "31",
    name: "Aline Pinto",
    phone: "(11) 96666-1111",
    email: "aline@email.com",
    unitId: "2",
    classes: ["Jazz Avançado"],
    frequency: 97,
    acquisitionType: "platform",
    paymentStatus: "current",
  },
  {
    id: "32",
    name: "Eduardo Monteiro",
    phone: "(11) 96666-2222",
    email: "eduardo@email.com",
    unitId: "3",
    classes: ["Dança de Salão Iniciante"],
    frequency: 68,
    acquisitionType: "invite",
    paymentStatus: "current",
  },
  {
    id: "33",
    name: "Bianca Cunha",
    phone: "(11) 96666-3333",
    email: "bianca@email.com",
    unitId: "1",
    classes: ["Ballet Iniciante"],
    frequency: 90,
    acquisitionType: "platform",
    paymentStatus: "current",
  },
  {
    id: "34",
    name: "Gustavo Ramos",
    phone: "(11) 96666-4444",
    email: "gustavo@email.com",
    unitId: "2",
    classes: ["Sapateado Avançado", "Jazz Avançado"],
    frequency: 85,
    acquisitionType: "invite",
    paymentStatus: "current",
  },
  {
    id: "35",
    name: "Priscila Correia",
    phone: "(11) 96666-5555",
    email: "priscila@email.com",
    unitId: "3",
    classes: ["Contemporâneo Intermediário"],
    frequency: 78,
    acquisitionType: "platform",
    paymentStatus: "current",
  },
  {
    id: "36",
    name: "Leandro Farias",
    phone: "(11) 96666-6666",
    email: "leandro@email.com",
    unitId: "1",
    classes: ["Hip Hop Kids"],
    frequency: 82,
    acquisitionType: "invite",
    paymentStatus: "current",
  },
  {
    id: "37",
    name: "Vanessa Duarte",
    phone: "(11) 96666-7777",
    email: "vanessa@email.com",
    unitId: "2",
    classes: ["Jazz Avançado", "Zumba Fitness"],
    frequency: 94,
    acquisitionType: "platform",
    paymentStatus: "current",
  },
  {
    id: "38",
    name: "Marcelo Vieira",
    phone: "(11) 96666-8888",
    email: "marcelo@email.com",
    unitId: "3",
    classes: ["Dança de Salão Iniciante"],
    frequency: 70,
    acquisitionType: "invite",
    paymentStatus: "current",
  },
  {
    id: "39",
    name: "Renata Sousa",
    phone: "(11) 96666-9999",
    email: "renata@email.com",
    unitId: "1",
    classes: ["Ballet Iniciante"],
    frequency: 87,
    acquisitionType: "platform",
    paymentStatus: "current",
  },
  {
    id: "40",
    name: "Fabio Andrade",
    phone: "(11) 96666-0000",
    email: "fabio@email.com",
    unitId: "2",
    classes: ["Sapateado Avançado"],
    frequency: 91,
    acquisitionType: "invite",
    paymentStatus: "current",
  },
]

export default function SissoneResponsivePrototype() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedUnit, setSelectedUnit] = useState<string>("all")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [frequencyFilter, setFrequencyFilter] = useState("all") // Added for students section filter
  const [unitFilter, setUnitFilter] = useState("all") // Added for students section filter
  const [classFilter, setClassFilter] = useState("all") // Added for students section filter

  const [toasts, setToasts] = useState<Toast[]>([])

  const [classUnitFilter, setClassUnitFilter] = useState<string>("all")
  const [classFrequencyFilter, setClassFrequencyFilter] = useState<string>("all")
  const [classRentabilityFilter, setClassRentabilityFilter] = useState<string>("all")

  const [plans, setPlans] = useState<Plan[]>([
    { id: "1", name: "Trimestral", discount: 10 },
    { id: "2", name: "Semestral", discount: 15 },
    { id: "3", name: "Anual", discount: 20 },
  ])
  const [combos, setCombos] = useState<Combo[]>([
    { id: "1", name: "Combo Ballet + Jazz", classes: ["Ballet Iniciante", "Jazz Avançado"], price: 150 },
    { id: "2", name: "Pacote Família", classes: ["Hip Hop Kids", "Zumba Fitness", "Ballet Iniciante"], price: 210 },
  ])
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null)
  const [editingCombo, setEditingCombo] = useState<Combo | null>(null)
  const [newPlan, setNewPlan] = useState<{ name: string; discount: string }>({ name: "", discount: "" })
  const [newCombo, setNewCombo] = useState<{ name: string; classes: string[]; price: string }>({
    name: "",
    classes: [],
    price: "",
  })

  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteLink] = useState("https://sissone.com.br/invite/abc123")
  const [linkCopied, setLinkCopied] = useState(false)

  const [showUnitModal, setShowUnitModal] = useState(false)
  const [editingUnit, setEditingUnit] = useState<any>(null)
  const [unitFormData, setUnitFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    description: "",
  })

  const [userProfile] = useState<{ name: string; role: "admin" | "manager" }>({
    name: "Gestor Principal",
    role: "admin",
  })

  const [userProfileForm, setUserProfileForm] = useState({
    name: "Gestor Principal",
    email: "gestor@sissone.com.br",
    phone: "+55 (11) 98765-4321",
    password: "",
    confirmPassword: "",
  })

  const [classData, setClassData] = useState({
    unit: "",
    title: "",
    isRecurring: false,
    recurringDays: [] as string[],
    date: "",
    endDate: "",
    time: "",
    price: "",
    hasEndDate: false,
    description: "",
    images: [] as string[],
  })

  const showToast = (message: string, type: ToastType = "success") => {
    const id = Date.now()
    setToasts((prev) => [...prev, { message, type, id }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 3000)
  }

  const handleUserProfileUpdate = () => {
    if (!userProfileForm.name || !userProfileForm.email || !userProfileForm.phone) {
      showToast("Por favor, preencha todos os campos obrigatórios", "error")
      return
    }
    if (userProfileForm.password && userProfileForm.password !== userProfileForm.confirmPassword) {
      showToast("As senhas não coincidem", "error")
      return
    }
    showToast("Perfil atualizado com sucesso!")
    navigateTo("dashboard")
  }

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
      classes: mockClasses.length,
    }
  }

  const getFilteredStats = () => {
    if (selectedUnit === "all") {
      return getTotalStats()
    }
    const unit = mockUnits.find((u) => u.id === selectedUnit)
    const unitClasses = mockClasses.filter((c) => c.unitId === selectedUnit)
    return {
      students: unit?.students || 0,
      rating: unit?.rating.toFixed(1) || "0.0",
      revenue: unit?.revenue || 0,
      classes: unitClasses.length,
    }
  }

  const getFilteredClasses = () => {
    return mockClasses.filter((classItem) => {
      const matchesSearch = classItem.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesUnit = classUnitFilter === "all" || classItem.unitId === classUnitFilter
      const matchesFrequency =
        classFrequencyFilter === "all" ||
        (classFrequencyFilter === "recurring" && classItem.isRecurring) ||
        (classFrequencyFilter === "single" && !classItem.isRecurring)

      let matchesRentability = true
      if (classRentabilityFilter !== "all") {
        const profitability = (classItem.enrolled / classItem.capacity) * 100
        if (classRentabilityFilter === "high") matchesRentability = profitability >= 80
        else if (classRentabilityFilter === "medium") matchesRentability = profitability >= 50 && profitability < 80
        else if (classRentabilityFilter === "low") matchesRentability = profitability < 50
      }

      return matchesSearch && matchesUnit && matchesFrequency && matchesRentability
    })
  }

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink)
    setLinkCopied(true)
    showToast("Link copiado para a área de transferência!")
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const openUnitModal = (unit: any = null) => {
    if (unit) {
      setEditingUnit(unit)
      setUnitFormData({
        name: unit.name,
        address: unit.address,
        phone: unit.phone,
        email: unit.email,
        description: unit.description,
      })
    } else {
      setEditingUnit(null)
      setUnitFormData({
        name: "",
        address: "",
        phone: "",
        email: "",
        description: "",
      })
    }
    setShowUnitModal(true)
  }

  const closeUnitModal = () => {
    setShowUnitModal(false)
    setEditingUnit(null)
  }

  const saveUnit = () => {
    if (editingUnit) {
      showToast("Unidade atualizada com sucesso!")
    } else {
      showToast("Nova unidade criada com sucesso!")
    }
    closeUnitModal()
  }

  const renderUnitFilter = () => (
    <div className="flex gap-2 mb-4 items-center flex-wrap">
      <Filter className="w-4 h-4 flex-shrink-0" style={{ color: "#3D2C2E" }} />
      <div className="flex-1 min-w-[200px]">
        <Select value={selectedUnit} onValueChange={setSelectedUnit}>
          <SelectTrigger style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}>
            <SelectValue>
              <span className="text-sm">
                <strong>Unidade:</strong>{" "}
                {selectedUnit === "all" ? "Todas" : mockUnits.find((u) => u.id === selectedUnit)?.name}
              </span>
            </SelectValue>
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
                <img src="/sissone-logo.png" alt="Sissone" className="h-8 mb-2" />
                <p className="text-xs" style={{ color: "#3D2E" }}>
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
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigateTo("student-view")}
          className="flex items-center gap-2 hover:bg-[#CFB2A8]/20"
        >
          <GraduationCap className="w-4 h-4" style={{ color: "#3D2C2E" }} />
          <span className="text-sm" style={{ color: "#3D2C2E" }}>
            Meu perfil de Aluno
          </span>
        </Button>
        <button
          onClick={() => navigateTo("user-profile")}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="text-right">
            <p className="text-sm font-medium" style={{ color: "#3D2C2E" }}>
              {userProfile.name}
            </p>
            {/* Removed role badge */}
          </div>
          <div className="w-10 h-10 rounded-full" style={{ backgroundColor: "#CFB2A8" }}>
            <div className="flex items-center justify-center h-full">
              <User className="w-5 h-5" style={{ color: "#3D2C2E" }} />
            </div>
          </div>
        </button>
      </div>
    </div>
  )

  const renderDashboard = () => {
    const stats = getFilteredStats()

    return (
      <div className="p-4 lg:p-6 pb-24 lg:pb-6">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                        className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
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
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium truncate" style={{ color: "#3D2C2E" }}>
                          {unit.name}
                        </h3>
                        <p className="text-xs truncate" style={{ color: "#3D2C2E" }}>
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
                onClick={() => navigateTo("invite-student")}
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
              {mockClasses.slice(0, 3).map((classItem) => (
                <Card
                  key={classItem.id}
                  style={{ backgroundColor: "#E5D6CD" }}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-3 lg:p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-sm lg:text-base font-medium" style={{ color: "#3D2C2E" }}>
                          {classItem.title}
                        </h3>
                        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4 mt-1">
                          <p className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                            {selectedUnit === "all" ? classItem.unitName : `${classItem.time}`}
                          </p>
                          <p className="text-xs lg:text-sm" style={{ color: "#3D2C2E" }}>
                            {classItem.enrolled} alunos inscritos
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
    <>
      <div className="p-4 lg:p-6 pb-24 lg:pb-6">
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
            <div className="flex items-center justify-between mb-4 gap-2">
              <h2 className="text-lg lg:text-xl font-semibold" style={{ color: "#3D2C2E" }}>
                Unidades
              </h2>
              <Button
                className="flex-shrink-0"
                onClick={() => openUnitModal()}
                style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}
              >
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Criar Unidade</span>
                <span className="sm:hidden">Criar</span>
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
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover:bg-white/50"
                          onClick={() => openUnitModal(unit)}
                        >
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

      {showUnitModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: "#E5D6CD" }}>
            <CardHeader>
              <CardTitle style={{ color: "#3D2C2E" }}>
                {editingUnit ? "Editar Unidade" : "Criar Nova Unidade"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="unit-name" className="text-sm font-medium" style={{ color: "#3D2C2E" }}>
                  Nome da Unidade *
                </Label>
                <Input
                  id="unit-name"
                  placeholder="Ex: Unidade Centro"
                  value={unitFormData.name}
                  onChange={(e) => setUnitFormData({ ...unitFormData, name: e.target.value })}
                  className="mt-1"
                  style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
                />
              </div>

              <div>
                <Label htmlFor="unit-address" className="text-sm font-medium" style={{ color: "#3D2C2E" }}>
                  Endereço *
                </Label>
                <Input
                  id="unit-address"
                  placeholder="Rua, número, bairro"
                  value={unitFormData.address}
                  onChange={(e) => setUnitFormData({ ...unitFormData, address: e.target.value })}
                  className="mt-1"
                  style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="unit-phone" className="text-sm font-medium" style={{ color: "#3D2C2E" }}>
                    Telefone *
                  </Label>
                  <Input
                    id="unit-phone"
                    placeholder="(11) 99999-9999"
                    value={unitFormData.phone}
                    onChange={(e) => setUnitFormData({ ...unitFormData, phone: e.target.value })}
                    className="mt-1"
                    style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
                  />
                </div>

                <div>
                  <Label htmlFor="unit-email" className="text-sm font-medium" style={{ color: "#3D2C2E" }}>
                    Email *
                  </Label>
                  <Input
                    id="unit-email"
                    placeholder="contato@unidade.com"
                    type="email"
                    value={unitFormData.email}
                    onChange={(e) => setUnitFormData({ ...unitFormData, email: e.target.value })}
                    className="mt-1"
                    style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="unit-description" className="text-sm font-medium" style={{ color: "#3D2C2E" }}>
                  Descrição
                </Label>
                <textarea
                  id="unit-description"
                  placeholder="Descrição da unidade..."
                  value={unitFormData.description}
                  onChange={(e) => setUnitFormData({ ...unitFormData, description: e.target.value })}
                  className="mt-1 w-full min-h-[100px] p-3 rounded-md border text-sm"
                  style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD", color: "#3D2C2E" }}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={closeUnitModal}
                  style={{ borderColor: "#CFB2A8", color: "#3D2C2E" }}
                >
                  Cancelar
                </Button>
                <Button
                  className="flex-1"
                  onClick={saveUnit}
                  disabled={!unitFormData.name || !unitFormData.address || !unitFormData.phone || !unitFormData.email}
                  style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}
                >
                  {editingUnit ? "Salvar Alterações" : "Criar Unidade"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )

  const renderClasses = () => {
    const filteredClasses = getFilteredClasses()

    return (
      <div className="p-4 lg:p-6 pb-24 lg:pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6 gap-2">
            <h2 className="text-lg lg:text-xl font-semibold" style={{ color: "#3D2C2E" }}>
              Gerenciar Aulas
            </h2>
            <Button
              className="flex-shrink-0"
              style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}
              onClick={() => navigateTo("create-class")}
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Criar Aula</span>
              <span className="sm:hidden">Criar</span>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

            <Select value={classUnitFilter} onValueChange={setClassUnitFilter}>
              <SelectTrigger style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}>
                <SelectValue>
                  <span className="text-sm">
                    Unidade:{" "}
                    {classUnitFilter === "all" ? "Todas" : mockUnits.find((u) => u.id === classUnitFilter)?.name}
                  </span>
                </SelectValue>
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

            <Select value={classFrequencyFilter} onValueChange={setClassFrequencyFilter}>
              <SelectTrigger style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}>
                <SelectValue>
                  <span className="text-sm">
                    Frequência:{" "}
                    {classFrequencyFilter === "all"
                      ? "Todas"
                      : classFrequencyFilter === "recurring"
                        ? "Recorrentes"
                        : "Únicas"}
                  </span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="recurring">Recorrentes</SelectItem>
                <SelectItem value="single">Únicas</SelectItem>
              </SelectContent>
            </Select>

            <Select value={classRentabilityFilter} onValueChange={setClassRentabilityFilter}>
              <SelectTrigger style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}>
                <SelectValue>
                  <span className="text-sm">
                    Rentabilidade:{" "}
                    {classRentabilityFilter === "all"
                      ? "Todas"
                      : classRentabilityFilter === "high"
                        ? "Alta"
                        : classRentabilityFilter === "medium"
                          ? "Média"
                          : "Baixa"}
                  </span>
                </SelectValue>
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
            {filteredClasses.map((classItem) => (
              <Card
                key={classItem.id}
                style={{ backgroundColor: "#E5D6CD" }}
                className="hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-1" style={{ color: "#3D2E" }}>
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

          {filteredClasses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg" style={{ color: "#3D2C2E" }}>
                Nenhuma aula encontrada com os filtros selecionados.
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderPricing = () => {
    if (currentScreen === "create-plan" || currentScreen === "edit-plan") {
      return (
        <div className="p-4 lg:p-6 pb-24 lg:pb-6">
          <div className="max-w-2xl mx-auto">
            <Card style={{ backgroundColor: "#E5D6CD" }}>
              <CardHeader>
                <CardTitle style={{ color: "#3D2C2E" }}>
                  {currentScreen === "create-plan" ? "Novo Plano" : "Editar Plano"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="plan-name" style={{ color: "#3D2C2E" }}>
                    Nome do Plano
                  </Label>
                  <Input
                    id="plan-name"
                    placeholder="ex: Trimestral"
                    value={currentScreen === "edit-plan" && editingPlan ? editingPlan.name : newPlan.name}
                    onChange={(e) => {
                      if (currentScreen === "edit-plan" && editingPlan) {
                        setEditingPlan({ ...editingPlan, name: e.target.value })
                      } else {
                        setNewPlan({ ...newPlan, name: e.target.value })
                      }
                    }}
                    className="mt-1"
                    style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
                  />
                </div>

                <div>
                  <Label htmlFor="plan-discount" style={{ color: "#3D2C2E" }}>
                    Porcentagem de Desconto (%)
                  </Label>
                  <Input
                    id="plan-discount"
                    placeholder="ex: 10"
                    type="number"
                    value={currentScreen === "edit-plan" && editingPlan ? editingPlan.discount : newPlan.discount}
                    onChange={(e) => {
                      if (currentScreen === "edit-plan" && editingPlan) {
                        setEditingPlan({ ...editingPlan, discount: Number(e.target.value) })
                      } else {
                        setNewPlan({ ...newPlan, discount: e.target.value })
                      }
                    }}
                    className="mt-1"
                    style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => {
                      setCurrentScreen("pricing")
                      setNewPlan({ name: "", discount: "" })
                      setEditingPlan(null)
                    }}
                    style={{ borderColor: "#CFB2A8", color: "#3D2C2E" }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      if (currentScreen === "edit-plan" && editingPlan) {
                        setPlans(plans.map((p) => (p.id === editingPlan.id ? editingPlan : p)))
                        showToast("Plano editado com sucesso!")
                      } else if (newPlan.name && newPlan.discount) {
                        setPlans([
                          ...plans,
                          { id: String(plans.length + 1), name: newPlan.name, discount: Number(newPlan.discount) },
                        ])
                        showToast("Plano criado com sucesso!")
                      }
                      setCurrentScreen("pricing")
                      setNewPlan({ name: "", discount: "" })
                      setEditingPlan(null)
                    }}
                    style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}
                  >
                    Salvar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }

    if (currentScreen === "create-combo" || currentScreen === "edit-combo") {
      return (
        <div className="p-4 lg:p-6 pb-24 lg:pb-6">
          <div className="max-w-2xl mx-auto">
            <Card style={{ backgroundColor: "#E5D6CD" }}>
              <CardHeader>
                <CardTitle style={{ color: "#3D2C2E" }}>
                  {currentScreen === "create-combo" ? "Novo Combo" : "Editar Combo"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="combo-name" style={{ color: "#3D2C2E" }}>
                    Nome do Combo
                  </Label>
                  <Input
                    id="combo-name"
                    placeholder="ex: Combo Ballet + Jazz"
                    value={currentScreen === "edit-combo" && editingCombo ? editingCombo.name : newCombo.name}
                    onChange={(e) => {
                      if (currentScreen === "edit-combo" && editingCombo) {
                        setEditingCombo({ ...editingCombo, name: e.target.value })
                      } else {
                        setNewCombo({ ...newCombo, name: e.target.value })
                      }
                    }}
                    className="mt-1"
                    style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
                  />
                </div>

                <div>
                  <Label style={{ color: "#3D2C2E" }}>Aulas Incluídas</Label>
                  <div className="space-y-2 mt-2">
                    {mockClasses.map((classItem) => (
                      <div key={classItem.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`combo-class-${classItem.id}`}
                          checked={
                            currentScreen === "edit-combo" && editingCombo
                              ? editingCombo.classes.includes(classItem.title)
                              : newCombo.classes.includes(classItem.title)
                          }
                          onCheckedChange={(checked) => {
                            if (currentScreen === "edit-combo" && editingCombo) {
                              setEditingCombo({
                                ...editingCombo,
                                classes: checked
                                  ? [...editingCombo.classes, classItem.title]
                                  : editingCombo.classes.filter((c) => c !== classItem.title),
                              })
                            } else {
                              setNewCombo({
                                ...newCombo,
                                classes: checked
                                  ? [...newCombo.classes, classItem.title]
                                  : newCombo.classes.filter((c) => c !== classItem.title),
                              })
                            }
                          }}
                        />
                        <Label htmlFor={`combo-class-${classItem.id}`} className="text-sm" style={{ color: "#3D2C2E" }}>
                          {classItem.title} - R$ {classItem.price}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="combo-price" style={{ color: "#3D2C2E" }}>
                    Valor do Combo (R$)
                  </Label>
                  <Input
                    id="combo-price"
                    placeholder="ex: 150"
                    type="number"
                    value={currentScreen === "edit-combo" && editingCombo ? editingCombo.price : newCombo.price}
                    onChange={(e) => {
                      if (currentScreen === "edit-combo" && editingCombo) {
                        setEditingCombo({ ...editingCombo, price: Number(e.target.value) })
                      } else {
                        setNewCombo({ ...newCombo, price: e.target.value })
                      }
                    }}
                    className="mt-1"
                    style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => {
                      setCurrentScreen("pricing")
                      setNewCombo({ name: "", classes: [], price: "" })
                      setEditingCombo(null)
                    }}
                    style={{ borderColor: "#CFB2A8", color: "#3D2C2E" }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      if (currentScreen === "edit-combo" && editingCombo) {
                        setCombos(combos.map((c) => (c.id === editingCombo.id ? editingCombo : c)))
                        showToast("Combo editado com sucesso!")
                      } else if (newCombo.name && newCombo.classes.length > 0 && newCombo.price) {
                        setCombos([
                          ...combos,
                          {
                            id: String(combos.length + 1),
                            name: newCombo.name,
                            classes: newCombo.classes,
                            price: Number(newCombo.price),
                          },
                        ])
                        showToast("Combo criado com sucesso!")
                      }
                      setCurrentScreen("pricing")
                      setNewCombo({ name: "", classes: [], price: "" })
                      setEditingCombo(null)
                    }}
                    style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}
                  >
                    Salvar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }

    return (
      <div className="p-4 lg:p-6 pb-24 lg:pb-6">
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
              <Button
                style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}
                onClick={() => setCurrentScreen("create-plan")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo Plano
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card key={plan.id} style={{ backgroundColor: "#E5D6CD" }} className="hover:shadow-md transition-all">
                  <CardContent className="p-6 text-center">
                    <h4 className="text-lg font-bold mb-2" style={{ color: "#3D2C2E" }}>
                      {plan.name}
                    </h4>
                    <div className="text-2xl font-bold mb-4" style={{ color: "#CFB2A8" }}>
                      {plan.discount}% OFF
                    </div>
                    <div className="flex gap-2 justify-center">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="hover:bg-white/50"
                        onClick={() => {
                          setEditingPlan(plan)
                          setCurrentScreen("edit-plan")
                        }}
                      >
                        <Edit className="w-4 h-4" style={{ color: "#3D2C2E" }} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="hover:bg-white/50"
                        onClick={() => {
                          setPlans(plans.filter((p) => p.id !== plan.id))
                          showToast("Plano excluído com sucesso!")
                        }}
                      >
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
              <Button
                style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}
                onClick={() => setCurrentScreen("create-combo")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo Combo
              </Button>
            </div>

            <Card style={{ backgroundColor: "#E5D6CD" }}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {combos.map((combo) => (
                    <div
                      key={combo.id}
                      className="flex items-center justify-between p-4 rounded"
                      style={{ backgroundColor: "#F5F0EB" }}
                    >
                      <div>
                        <h4 className="font-semibold" style={{ color: "#3D2C2E" }}>
                          {combo.name}
                        </h4>
                        <p className="text-sm" style={{ color: "#3D2C2E" }}>
                          {combo.classes.join(", ")}
                        </p>
                        <p className="text-lg font-bold" style={{ color: "#CFB2A8" }}>
                          R$ {combo.price},00
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover:bg-white/50"
                          onClick={() => {
                            setEditingCombo(combo)
                            setCurrentScreen("edit-combo")
                          }}
                        >
                          <Edit className="w-4 h-4" style={{ color: "#3D2C2E" }} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover:bg-white/50"
                          onClick={() => {
                            setCombos(combos.filter((c) => c.id !== combo.id))
                            showToast("Combo excluído com sucesso!")
                          }}
                        >
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
  }

  const renderStudents = () => {
    const filteredStudents = mockStudents.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesUnit = unitFilter === "all" || student.unitId === unitFilter // Corrected to use unitFilter
      const matchesFrequency =
        frequencyFilter === "all" ||
        (frequencyFilter === "high" && student.frequency >= 80) ||
        (frequencyFilter === "medium" && student.frequency >= 50 && student.frequency < 80) ||
        (frequencyFilter === "low" && student.frequency < 50)

      return matchesSearch && matchesUnit && matchesFrequency
    })

    return (
      <div className="p-4 lg:p-6 pb-24 lg:pb-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold" style={{ color: "#3D2C2E" }}>
              Alunos ({filteredStudents.length})
            </h1>
            <Button onClick={() => setShowInviteModal(true)} style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}>
              <UserPlus className="w-4 h-4 mr-2" />
              Novo Aluno
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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

            <Select defaultValue="all" onValueChange={setUnitFilter}>
              <SelectTrigger style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}>
                <SelectValue>
                  <span className="text-sm">
                    Unidade: {unitFilter === "all" ? "Todas" : mockUnits.find((u) => u.id === unitFilter)?.name}
                  </span>
                </SelectValue>
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

            <Select defaultValue="all" onValueChange={setClassFilter}>
              <SelectTrigger style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}>
                <SelectValue>
                  <span className="text-sm">
                    Aula: {classFilter === "all" ? "Todas" : mockClasses.find((c) => c.id === classFilter)?.title}
                  </span>
                </SelectValue>
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
                <SelectValue>
                  <span className="text-sm">Idade: Todas</span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="kids">Kids (até 12)</SelectItem>
                <SelectItem value="teen">Teen (13-17)</SelectItem>
                <SelectItem value="adult">Adulto (18+)</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all" onValueChange={setFrequencyFilter}>
              <SelectTrigger style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}>
                <SelectValue>
                  <span className="text-sm">
                    Freq.:{" "}
                    {frequencyFilter === "all"
                      ? "Todas"
                      : frequencyFilter === "high"
                        ? "Alta"
                        : frequencyFilter === "medium"
                          ? "Média"
                          : "Baixa"}
                  </span>
                </SelectValue>
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
                <table className="w-full min-w-[600px]">
                  <thead className="border-b" style={{ borderColor: "#CFB2A8" }}>
                    <tr>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: "#3D2E" }}>
                        Aluno
                      </th>
                      <th
                        className="text-left p-4 text-sm font-semibold hidden lg:table-cell"
                        style={{ color: "#3D2E" }}
                      >
                        Telefone
                      </th>
                      <th
                        className="text-left p-4 text-sm font-semibold hidden lg:table-cell"
                        style={{ color: "#3D2E" }}
                      >
                        Origem
                      </th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: "#3D2E" }}>
                        Aulas
                      </th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: "#3D2E" }}>
                        Frequência
                      </th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: "#3D2E" }}>
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
                            <div
                              className="w-16 h-2 rounded-full overflow-hidden"
                              style={{ backgroundColor: "#F5F0EB" }}
                            >
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

        {showInviteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md" style={{ backgroundColor: "#E5D6CD" }}>
              <CardHeader>
                <CardTitle style={{ color: "#3D2C2E" }}>Convidar Novo Aluno</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm mb-4" style={{ color: "#3D2C2E" }}>
                    Compartilhe o link abaixo com o aluno para que ele possa se cadastrar:
                  </p>
                  <div
                    className="flex items-center gap-2 p-3 rounded"
                    style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD", border: "1px solid" }}
                  >
                    <Input
                      value={inviteLink}
                      readOnly
                      className="flex-1 border-0 bg-transparent text-sm"
                      style={{ color: "#3D2C2E" }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full"
                    onClick={copyInviteLink}
                    style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}
                  >
                    {linkCopied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Link Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar Link
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => setShowInviteModal(false)}
                    style={{ borderColor: "#CFB2A8", color: "#3D2C2E" }}
                  >
                    Fechar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    )
  }

  const renderInviteStudent = () => (
    <div className="p-4 lg:p-6 pb-24 lg:pb-6">
      <div className="max-w-2xl mx-auto">
        <Card style={{ backgroundColor: "#E5D6CD" }}>
          <CardHeader>
            <CardTitle style={{ color: "#3D2C2E" }}>Convidar Novo Aluno</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm mb-4" style={{ color: "#3D2C2E" }}>
                Compartilhe o link abaixo com o aluno para que ele possa se cadastrar:
              </p>
              <div
                className="flex items-center gap-2 p-3 rounded"
                style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD", border: "1px solid" }}
              >
                <Input
                  value={inviteLink}
                  readOnly
                  className="flex-1 border-0 bg-transparent"
                  style={{ color: "#3D2C2E" }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                className="w-full"
                onClick={copyInviteLink}
                style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}
              >
                {linkCopied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Link Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar Link
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => {
                  window.location.href = `mailto:?subject=Convite Sissone&body=Olá! Você foi convidado para se juntar à nossa escola de dança. Acesse: ${inviteLink}`
                  showToast("Cliente de email aberto!")
                }}
                style={{ borderColor: "#CFB2A8", color: "#3D2C2E" }}
              >
                <Mail className="w-4 h-4 mr-2" />
                Enviar por Email
              </Button>
            </div>

            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => navigateTo("students")}
              style={{ borderColor: "#CFB2A8", color: "#3D2C2E" }}
            >
              Voltar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderCreateClass = () => (
    <div className="p-4 lg:p-6 pb-24 lg:pb-6">
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
                <SelectValue>
                  {classData.unit ? (
                    <span className="text-sm">{mockUnits.find((u) => u.id === classData.unit)?.name}</span>
                  ) : (
                    <span className="text-sm text-gray-500">Selecione a unidade</span>
                  )}
                </SelectValue>
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
                <div className="lg:col-span-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id="has-end-date"
                      checked={classData.hasEndDate}
                      onCheckedChange={(checked) => setClassData({ ...classData, hasEndDate: !!checked })}
                    />
                    <Label htmlFor="has-end-date" className="text-sm" style={{ color: "#3D2C2E" }}>
                      Adicionar data de término
                    </Label>
                  </div>
                  {classData.hasEndDate && (
                    <Input
                      id="end-date"
                      type="date"
                      value={classData.endDate}
                      onChange={(e) => setClassData({ ...classData, endDate: e.target.value })}
                      className="h-10 lg:h-12"
                      style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
                    />
                  )}
                </div>
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
            <Button
              className="lg:flex-1 h-10 lg:h-12"
              onClick={() => showToast("Rascunho salvo com sucesso!")}
              style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}
            >
              Salvar Rascunho
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderClassPreview = () => (
    <div className="p-4 lg:p-6 pb-24 lg:pb-6">
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
                  style={{ color: "#3D2E" }}
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
                      {classData.date || "Data de início"}
                      {classData.hasEndDate && classData.endDate
                        ? ` até ${classData.endDate}`
                        : " (Sem data de término)"}
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
              <Button
                className="w-full h-10 lg:h-12"
                onClick={() => showToast("Aula byla publiée com sucesso!")}
                style={{ backgroundColor: "#CFB2A8", color: "#3D2C2E" }}
              >
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

  const renderUserProfile = () => (
    <div className="p-4 lg:p-6 pb-24 lg:pb-6">
      {" "}
      {/* Added padding to match other screens */}
      <div className="max-w-2xl mx-auto">
        {" "}
        {/* Centering content */}
        <Card>
          <CardHeader>
            <CardTitle>Meus Dados de Login</CardTitle>
            <CardDescription>Gerencie suas informações pessoais e credenciais de acesso</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center mb-6">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#CFB2A8" }}
              >
                <User className="w-12 h-12" style={{ color: "#3D2C2E" }} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="profile-name">Nome Completo *</Label>
                <Input
                  id="profile-name"
                  value={userProfileForm.name}
                  onChange={(e) => setUserProfileForm({ ...userProfileForm, name: e.target.value })}
                  placeholder="Digite seu nome"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile-email">Email *</Label>
                <Input
                  id="profile-email"
                  type="email"
                  value={userProfileForm.email}
                  onChange={(e) => setUserProfileForm({ ...userProfileForm, email: e.target.value })}
                  placeholder="seu@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile-phone">Telefone *</Label>
                <Input
                  id="profile-phone"
                  type="tel"
                  value={userProfileForm.phone}
                  onChange={(e) => setUserProfileForm({ ...userProfileForm, phone: e.target.value })}
                  placeholder="+55 (11) 98765-4321"
                />
              </div>
            </div>

            <div className="border-t pt-4 mt-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: "#3D2C2E" }}>
                Alterar Senha
              </h3>
              <p className="text-sm text-gray-500 mb-4">Deixe em branco se não desejar alterar sua senha</p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="profile-password">Nova Senha</Label>
                  <Input
                    id="profile-password"
                    type="password"
                    value={userProfileForm.password}
                    onChange={(e) => setUserProfileForm({ ...userProfileForm, password: e.target.value })}
                    placeholder="Digite a nova senha"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profile-confirm-password">Confirmar Nova Senha</Label>
                  <Input
                    id="profile-confirm-password"
                    type="password"
                    value={userProfileForm.confirmPassword}
                    onChange={(e) => setUserProfileForm({ ...userProfileForm, confirmPassword: e.target.value })}
                    placeholder="Confirme a nova senha"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3">
            <Button onClick={() => navigateTo("dashboard")} variant="outline" className="w-full sm:w-auto">
              Cancelar
            </Button>
            <Button
              onClick={handleUserProfileUpdate}
              className="w-full sm:w-auto"
              style={{ backgroundColor: "#3D2C2E" }}
            >
              Salvar Alterações
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (currentScreen) {
      case "dashboard":
        return renderDashboard()
      // case "profile": // Kept for potential future use or if it was intended
      //   return renderProfile() // renderProfile is not defined, so it's commented out
      case "user-profile":
        return renderUserProfile()
      case "school-units":
        return renderSchoolUnits()
      case "classes":
        return renderClasses()
      case "create-class":
        return renderCreateClass()
      case "view-class": // Corrected to match the new type definition
        return renderClassPreview()
      case "class-preview": // Kept for backward compatibility or if it was intended as a synonym
        return renderClassPreview()
      case "pricing":
      case "create-plan":
      case "edit-plan":
      case "create-combo":
      case "edit-combo":
        return renderPricing()
      case "students":
        return renderStudents()
      case "student-profile": // Added for student-profile case
        return <div>Student Profile</div> // Placeholder
      case "student-view": // Added for student-view case
        return <div>Student View</div> // Placeholder
      case "invite-student":
        return renderInviteStudent()
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen flex overflow-x-hidden" style={{ backgroundColor: "#F5F0EB" }}>
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-right"
            style={{
              backgroundColor: toast.type === "success" ? "#CFB2A8" : "#F5F0EB",
              border: `1px solid ${toast.type === "success" ? "#CFB2A8" : "#E5D6CD"}`,
            }}
          >
            <Check className="w-4 h-4" style={{ color: "#3D2C2E" }} />
            <span className="text-sm font-medium" style={{ color: "#3D2C2E" }}>
              {toast.message}
            </span>
          </div>
        ))}
      </div>

      <div className="hidden lg:block">{renderSidebar()}</div>
      <div className="lg:hidden">{renderSidebar()}</div>

      <div className="flex-1 flex flex-col min-h-screen lg:ml-0 min-w-0">
        {currentScreen === "dashboard" && renderHeader("Painel", false)}
        {currentScreen === "school-units" && renderHeader("Escola & Unidades")}
        {currentScreen === "classes" && renderHeader("Aulas")}
        {currentScreen === "create-class" && renderHeader("Criar Aula")}
        {currentScreen === "view-class" && renderHeader("Visualizar Aula")}
        {currentScreen === "class-preview" && renderHeader("Visualizar Aula")}
        {currentScreen === "pricing" && renderHeader("Precificação")}
        {currentScreen === "create-plan" && renderHeader("Novo Plano")}
        {currentScreen === "edit-plan" && renderHeader("Editar Plano")}
        {currentScreen === "create-combo" && renderHeader("Novo Combo")}
        {currentScreen === "edit-combo" && renderHeader("Editar Combo")}
        {currentScreen === "students" && renderHeader("Alunos")}
        {currentScreen === "invite-student" && renderHeader("Convidar Aluno")}
        {currentScreen === "user-profile" && renderHeader("Meu Perfil")} {/* Added header for user-profile */}
        {currentScreen === "student-profile" && renderHeader("Perfil do Aluno")}{" "}
        {/* Added header for student-profile */}
        {currentScreen === "student-view" && renderHeader("Meu Perfil de Aluno")} {/* Added header for student-view */}
        <div className="flex-1 overflow-auto">
          {currentScreen === "dashboard" && renderDashboard()}
          {currentScreen === "school-units" && renderSchoolUnits()}
          {currentScreen === "classes" && renderClasses()}
          {currentScreen === "create-class" && renderCreateClass()}
          {currentScreen === "view-class" && renderClassPreview()}
          {currentScreen === "class-preview" && renderClassPreview()}
          {(currentScreen === "pricing" ||
            currentScreen === "create-plan" ||
            currentScreen === "edit-plan" ||
            currentScreen === "create-combo" ||
            currentScreen === "edit-combo") &&
            renderPricing()}
          {currentScreen === "students" && renderStudents()}
          {currentScreen === "user-profile" && renderUserProfile()} {/* Render user profile */}
          {currentScreen === "student-profile" && <div>Student Profile Content</div>}{" "}
          {/* Placeholder for student-profile */}
          {currentScreen === "student-view" && <div>Student View Content</div>} {/* Placeholder for student-view */}
          {currentScreen === "invite-student" && renderInviteStudent()}
        </div>
      </div>

      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 flex justify-around items-center px-2 py-3 border-t z-30 shadow-lg"
        style={{ backgroundColor: "#F5F0EB", borderColor: "#E5D6CD" }}
      >
        {navigationItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => navigateTo(item.id as Screen)}
              className="flex flex-col items-center gap-1 h-auto py-2 px-1 min-w-0"
            >
              <Icon
                className="w-5 h-5 flex-shrink-0"
                style={{ color: currentScreen === item.id ? "#CFB2A8" : "#3D2C2E" }}
              />
              <span
                className="text-[10px] leading-tight text-center"
                style={{ color: currentScreen === item.id ? "#CFB2A8" : "#3D2C2E" }}
              >
                {item.label.split(" ")[0]}
              </span>
            </Button>
          )
        })}
        <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2 px-1 min-w-0">
          <div
            className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
            style={{ backgroundColor: "#CFB2A8" }}
          >
            <User className="w-3 h-3" style={{ color: "#3D2C2E" }} />
          </div>
          <span className="text-[10px] leading-tight text-center" style={{ color: "#3D2C2E" }}>
            Perfil
          </span>
        </Button>
      </div>
    </div>
  )
}
