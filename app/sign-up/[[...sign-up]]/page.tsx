import { SignUp } from "@clerk/nextjs"
import { AuthLeftPanel } from "@/components/auth/auth-left-panel"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-bg-base flex">
      <AuthLeftPanel />
      <div className="flex-1 flex items-center justify-center">
        <SignUp />
      </div>
    </div>
  )
}
