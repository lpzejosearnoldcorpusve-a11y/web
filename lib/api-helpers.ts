export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Error desconocido" }))
    throw new Error(error.message || `Error ${response.status}`)
  }

  return response.json()
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export function handleApiError(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  return "Ha ocurrido un error inesperado"
}
