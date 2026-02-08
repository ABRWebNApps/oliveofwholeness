"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Instagram, Clock, Shield } from "lucide-react"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [consent, setConsent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!consent) {
      setError("Please provide consent to proceed with your request.")
      setIsLoading(false)
      return
    }

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsSubmitted(true)
      setName("")
      setEmail("")
      setMessage("")
      setConsent(false)
    } catch (error: unknown) {
      setError("An error occurred. Please try again or contact us directly via email.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary/20 to-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Contact & Help Request</h1>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
            Ready to begin your healing journey? Reach out to us for support, schedule a session, or ask any questions.
            We're here to walk alongside you with compassion and care.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible. Your request will be handled
                    confidentially in line with our ethics.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Message Received!</h3>
                      <p className="text-muted-foreground mb-4">
                        Thank you for reaching out. Please contact us directly at info@olivesofwholeness.org for the
                        fastest response.
                      </p>
                      <Button onClick={() => setIsSubmitted(false)} variant="outline" className="bg-transparent">
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your.email@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Your Message *</Label>
                        <Textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Please share what brings you here today and how we can support you on your healing journey..."
                          className="min-h-[120px]"
                          required
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="consent"
                            checked={consent}
                            onCheckedChange={(checked) => setConsent(!!checked)}
                            className="mt-1"
                          />
                          <Label htmlFor="consent" className="text-sm leading-relaxed">
                            I consent to Olive of Wholeness contacting me regarding my request and understand that my
                            information will be handled confidentially in accordance with their ethics and privacy
                            practices.
                          </Label>
                        </div>

                        <div className="bg-muted/30 p-4 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-foreground mb-1">Confidentiality Commitment</p>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                Your request will be handled confidentially in line with our ethics. We maintain strict
                                privacy standards and will never share your information without your explicit consent.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {error && <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</p>}

                      <Button type="submit" disabled={isLoading || !consent} className="w-full">
                        {isLoading ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Get in Touch</CardTitle>
                  <CardDescription>Multiple ways to connect with us for support and information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <a
                        href="mailto:info@olivesofwholeness.org"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        info@olivesofwholeness.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Instagram className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Instagram</p>
                      <a href="https://www.instagram.com/olivesofwholeness" className="text-muted-foreground hover:text-primary transition-colors">
                        Follow us for daily encouragement
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Response Time</p>
                      <p className="text-muted-foreground">We typically respond within 24-48 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">What to Expect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary font-semibold text-xs">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Initial Response</p>
                        <p className="text-sm text-muted-foreground">
                          We'll acknowledge your message and schedule a time to connect.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary font-semibold text-xs">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Compassionate Listening</p>
                        <p className="text-sm text-muted-foreground">
                          We'll listen to your story with empathy and without judgment.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary font-semibold text-xs">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Personalized Support</p>
                        <p className="text-sm text-muted-foreground">
                          We'll work together to create a healing plan that fits your needs.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
