import { LoginForm } from "@/components/auth/login-form"
import { LoginHeader } from "@/components/auth/login-header"
import { LoginBackground } from "@/components/auth/login-background"

export default function LoginPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <LoginBackground />

      <div className="w-full max-w-md relative z-10">
        <LoginHeader />
        <LoginForm />
      </div>
    </div>
  )
}
