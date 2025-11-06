import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Validaciones
export const validators = {
  email: (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  },

  password: (password: string): boolean => {
    return password.length >= 8
  },

  username: (username: string): boolean => {
    return /^[a-zA-Z0-9_]{3,20}$/.test(username)
  },

  phone: (phone: string): boolean => {
    return /^[0-9]{7,15}$/.test(phone)
  },
}

// Formatadores
export const formatters = {
  formatDate: (date: Date): string => {
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  },

  formatTime: (date: Date): string => {
    return new Intl.DateTimeFormat("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  },

  formatDateTime: (date: Date): string => {
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  },

  formatCurrency: (value: number): string => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "BOB",
    }).format(value)
  },

  truncate: (text: string, length: number): string => {
    return text.length > length ? text.substring(0, length) + "..." : text
  },
}

// Helpers para API
export const apiHelpers = {
  getAuthHeader: (): Record<string, string> => {
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
    return token ? { Authorization: `Bearer ${token}` } : {}
  },

  parseError: (error: any): string => {
    if (error?.response?.data?.message) {
      return error.response.data.message
    }
    if (error?.message) {
      return error.message
    }
    return "Ocurrió un error inesperado"
  },

  buildQueryString: (params: Record<string, any>): string => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        searchParams.append(key, String(value))
      }
    })
    return searchParams.toString()
  },
}

// Constantes
export const constants = {
  ROLES: ["admin", "editor", "usuario"],
  STATUSES: ["activo", "inactivo", "pendiente"],
  PAGINATION: {
    LIMIT: 10,
    MAX_LIMIT: 100,
  },
  TIMEOUTS: {
    SHORT: 2000,
    MEDIUM: 5000,
    LONG: 10000,
  },
}

// Helpers de array y objeto
export const arrayHelpers = {
  unique: <T,>(array: T[]): T[] => {
    return [...new Set(array)]
  },

  groupBy: <T,>(array: T[], key: keyof T): Record<string, T[]> => {
    return array.reduce(
      (result, item) => {
        const groupKey = String(item[key])
        if (!result[groupKey]) result[groupKey] = []
        result[groupKey].push(item)
        return result
      },
      {} as Record<string, T[]>,
    )
  },

  flatten: <T,>(array: T[][]): T[] => {
    return array.flat()
  },
}

export const objectHelpers = {
  isEmpty: (obj: Record<string, any>): boolean => {
    return Object.keys(obj).length === 0
  },

  pick: <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
    return keys.reduce(
      (result, key) => {
        result[key] = obj[key]
        return result
      },
      {} as Pick<T, K>,
    )
  },
}

// Helpers de strings
export const stringHelpers = {
  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  },

  slug: (str: string): string => {
    return str
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "")
  },

  camelCase: (str: string): string => {
    return str.replace(/(-|_|\.|\s)+(.)?/g, (_, __, c) => (c ? c.toUpperCase() : ""))
  },
}

// Storage helpers
export const storageHelpers = {
  get: (key: string): any => {
    if (typeof window === "undefined") return null
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },

  set: (key: string, value: any): void => {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      console.error("Error saving to localStorage")
    }
  },

  remove: (key: string): void => {
    if (typeof window === "undefined") return
    localStorage.removeItem(key)
  },

  clear: (): void => {
    if (typeof window === "undefined") return
    localStorage.clear()
  },
}
