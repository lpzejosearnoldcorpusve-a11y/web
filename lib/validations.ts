export const validations = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  password: (password: string): { valid: boolean; message?: string } => {
    if (password.length < 8) {
      return { valid: false, message: "La contraseña debe tener al menos 8 caracteres" }
    }
    if (!/[A-Z]/.test(password)) {
      return { valid: false, message: "La contraseña debe contener al menos una mayúscula" }
    }
    if (!/[a-z]/.test(password)) {
      return { valid: false, message: "La contraseña debe contener al menos una minúscula" }
    }
    if (!/[0-9]/.test(password)) {
      return { valid: false, message: "La contraseña debe contener al menos un número" }
    }
    return { valid: true }
  },

  required: (value: string): boolean => {
    return value.trim().length > 0
  },

  minLength: (value: string, min: number): boolean => {
    return value.length >= min
  },

  maxLength: (value: string, max: number): boolean => {
    return value.length <= max
  },

  phone: (phone: string): boolean => {
    const phoneRegex = /^[0-9]{8,15}$/
    return phoneRegex.test(phone.replace(/\s/g, ""))
  },

  url: (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  },
}
