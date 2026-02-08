import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  const coreValues = [
    {
      title: "Christ-Centered Healing",
      description:
        "We believe that Jesus Christ is the ultimate source of healing and restoration for both emotional and spiritual wounds.",
    },
    {
      title: "Compassion",
      description:
        "We approach every person with empathy, understanding, and genuine care, creating a safe space for vulnerability and growth.",
    },
    {
      title: "Integrity",
      description:
        "We maintain the highest ethical standards in all our interactions, ensuring trust and confidentiality in our therapeutic relationships.",
    },
    {
      title: "Growth & Transformation",
      description:
        "We are committed to helping individuals experience lasting change and personal development through faith-based healing.",
    },
    {
      title: "Community",
      description:
        "We foster a sense of belonging and support, recognizing that healing often happens in the context of healthy relationships.",
    },
    {
      title: "Hope",
      description:
        "We believe in the power of hope to transform lives and help people envision a brighter, healthier future in Christ.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary/20 to-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">About Olive of Wholeness</h1>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
            Discover our heart for healing and our commitment to walking alongside you on your journey to wholeness.
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1">
              <img
                src="/professional-therapist-portrait-warm-compassionate.jpg"
                alt="Faith Therapist"
                className="w-full h-96 object-cover rounded-lg shadow-md"
              />
            </div>

            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Meet Your Guide to Healing</h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p className="leading-relaxed">
                  Welcome to Olive of Wholeness, where faith meets healing in a journey toward emotional and spiritual
                  restoration. I am passionate about helping individuals discover the transformative power of Christ's
                  love in their healing process.
                </p>
                <p className="leading-relaxed">
                  With years of experience in faith-based counseling and a deep understanding of both psychological
                  principles and biblical wisdom, I provide a unique approach that addresses the whole person - mind,
                  body, and spirit.
                </p>
                <p className="leading-relaxed">
                  My calling is to create a safe, nurturing environment where you can explore your struggles, find hope
                  in God's promises, and experience the freedom that comes from true healing. Every person who walks
                  through our doors is precious to God, and it is my privilege to help you discover that truth for
                  yourself.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">Our Mission</h2>
          <blockquote className="text-xl md:text-2xl text-foreground font-medium text-pretty leading-relaxed border-l-4 border-primary pl-6 italic">
            "To guide people on a journey of emotional healing and spiritual renewal through the love of Christ,
            providing compassionate support that addresses both the heart and mind in a safe, nurturing environment."
          </blockquote>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">Our Vision</h2>
          <blockquote className="text-xl md:text-2xl text-foreground font-medium text-pretty leading-relaxed border-l-4 border-accent pl-6 italic">
            "To see a generation emotionally whole, spiritually strong, and free from the grip of past wounds, walking
            confidently in their God-given purpose and experiencing the abundant life Christ promised."
          </blockquote>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              These values guide everything we do and shape how we approach each person's unique healing journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ethics */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-foreground">Our Ethics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Confidentiality</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your privacy and trust are sacred to us. All sessions and communications are kept strictly
                  confidential.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Biblical Foundation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our approach is grounded in biblical principles while respecting individual faith journeys.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Non-judgmental Approach</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We provide a safe space free from judgment, where you can be authentic and vulnerable.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Excellence & Accountability</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We maintain high professional standards and are committed to continuous growth and accountability.
                </p>
              </div>
            </div>

            <div className="pt-8">
              <Button asChild size="lg">
                <Link href="/contact">Begin Your Healing Journey</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
