export const formatters = {
  date: (date: Date | string, locale = "es-BO"): string => {
    const d = typeof date === "string" ? new Date(date) : date
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(d)
  },

  dateTime: (date: Date | string, locale = "es-BO"): string => {
    const d = typeof date === "string" ? new Date(date) : date
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d)
  },

  currency: (amount: number, currency = "BOB", locale = "es-BO"): string => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(amount)
  },

  number: (num: number, locale = "es-BO"): string => {
    return new Intl.NumberFormat(locale).format(num)
  },

  percentage: (value: number, decimals = 0): string => {
    return `${(value * 100).toFixed(decimals)}%`
  },

  truncate: (text: string, length: number): string => {
    if (text.length <= length) return text
    return text.substring(0, length) + "..."
  },

  capitalize: (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  },

  slug: (text: string): string => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  },
}
