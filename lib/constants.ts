export const ROLES = {
  ADMIN: "Administrador",
  EDITOR: "Editor",
  USER: "Usuario",
} as const

export const ROLE_OPTIONS = [
  { value: "Administrador", label: "Administrador" },
  { value: "Editor", label: "Editor" },
  { value: "Usuario", label: "Usuario" },
]

export const STATUS = {
  ACTIVE: "Activo",
  INACTIVE: "Inactivo",
  PENDING: "Pendiente",
} as const

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
}

export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  USERS: "/dashboard/usuarios",
  LOGIN: "/",
} as const

export const API_ENDPOINTS = {
  USERS: "/api/users",
  AUTH: "/api/auth",
} as const
