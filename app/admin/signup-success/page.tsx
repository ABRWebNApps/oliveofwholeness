import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function AdminSignupSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-primary hover:text-primary/80">
            <Image src="/logo.jpg" alt="Olives of Wholeness Logo" width={32} height={32} className="rounded-full" />
            <span className="font-semibold text-lg">Olive of Wholeness</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-green-600">Account Created Successfully!</CardTitle>
            <CardDescription>Please check your email to verify your account</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              We've sent a verification email to your address. Please click the link in the email to activate your admin
              account.
            </p>

            <div className="space-y-2">
              <Link href="/admin/login" className="inline-block text-sm text-primary hover:text-primary/80 underline">
                Return to Login
              </Link>
              <br />
              <Link href="/" className="inline-block text-sm text-muted-foreground hover:text-primary">
                ← Back to Website
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
