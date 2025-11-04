"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  nombre: string
  rol: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    try {
      const userStr = localStorage.getItem("user")
      if (userStr) {
        setUser(JSON.parse(userStr))
      }
    } catch (error) {
      console.error("Error checking auth:", error)
    } finally {
      setLoading(false)
    }
  }

  const login = (email: string, password: string) => {
    // Simulación de login - reemplazar con API real
    const mockUser: User = {
      id: "1",
      email,
      nombre: "Usuario Demo",
      rol: "Administrador",
    }
    localStorage.setItem("user", JSON.stringify(mockUser))
    setUser(mockUser)
    router.push("/dashboard")
  }

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/")
  }

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  }
}
