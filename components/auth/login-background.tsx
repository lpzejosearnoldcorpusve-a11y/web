export function LoginBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient background con los colores de La Paz */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-10" />

      {/* Formas decorativas */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
    </div>
  )
}
