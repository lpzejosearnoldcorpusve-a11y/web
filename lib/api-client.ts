const API_BASE_URL = "/api"

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`
    console.log("[v0] Llamada API:", url)
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()
    console.log("[v0] Respuesta API:", result)
    
    // Retornar directamente la respuesta de la API
    return result as ApiResponse<T>
  } catch (error) {
    console.error("[v0] Error en apiCall:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

export const usuariosApi = {
  getAll: () => apiCall<any[]>("/usuarios"),
  getById: (id: string) => apiCall(`/usuarios/${id}`),
  create: (usuario: any) =>
    apiCall("/usuarios", {
      method: "POST",
      body: JSON.stringify(usuario),
    }),
  update: (id: string, usuario: any) =>
    apiCall(`/usuarios/${id}`, {
      method: "PUT",
      body: JSON.stringify(usuario),
    }),
  delete: (id: string) =>
    apiCall(`/usuarios/${id}`, {
      method: "DELETE",
    }),
}