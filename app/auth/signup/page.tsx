import { SignUpForm } from "@/components/signup-form"
import { GalleryVerticalEnd } from "lucide-react"

export default function SignUpPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Mediva
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white/80">
            <h2 className="text-3xl font-bold mb-4">Join Mediva</h2>
            <p className="text-lg">Start managing your healthcare practice today</p>
          </div>
        </div>
      </div>
    </div>
  )
}
