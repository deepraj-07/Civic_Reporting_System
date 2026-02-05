import { Navbar } from "@/components/navigation/navbar"
import { LoginForm } from "@/components/auth/login-form"

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <LoginForm />
    </div>
  )
}
