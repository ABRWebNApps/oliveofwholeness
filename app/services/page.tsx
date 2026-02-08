import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, Users, BookOpen, Play as Pray } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      icon: Heart,
      title: "Individual Counseling",
      description:
        "One-on-one therapy sessions that combine professional counseling techniques with biblical wisdom to address emotional wounds, trauma, anxiety, depression, and relationship issues.",
      features: [
        "Faith-based therapeutic approach",
        "Trauma-informed care",
        "Anxiety and depression support",
        "Relationship counseling",
        "Grief and loss support",
      ],
    },
    {
      icon: Users,
      title: "Group Workshops",
      description:
        "Structured group sessions focused on specific topics such as forgiveness, healing from past wounds, building healthy relationships, and growing in faith.",
      features: [
        "Forgiveness and healing workshops",
        "Healthy relationships training",
        "Emotional regulation skills",
        "Faith-building sessions",
        "Support group facilitation",
      ],
    },
    {
      icon: Pray,
      title: "Prayer Groups",
      description:
        "Regular prayer meetings where community members come together to pray for healing, support one another, and experience the power of corporate prayer.",
      features: [
        "Weekly prayer gatherings",
        "Intercessory prayer support",
        "Healing prayer ministry",
        "Community fellowship",
        "Spiritual encouragement",
      ],
    },
    {
      icon: BookOpen,
      title: "Resources & Materials",
      description:
        "Access to carefully curated resources including articles, guides, recommended books, and multimedia content to support your healing journey.",
      features: [
        "Biblical healing resources",
        "Self-help guides and workbooks",
        "Recommended reading lists",
        "Audio and video content",
        "Practical tools for growth",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary/20 to-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Our Services</h1>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
            Comprehensive support for your journey toward emotional healing and spiritual renewal. Each service is
            designed to meet you where you are and guide you toward wholeness in Christ.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl text-foreground">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-muted-foreground leading-relaxed text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">What's Included:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-2 text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl font-bold text-foreground">Ready to Begin Your Healing Journey?</h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Taking the first step toward healing requires courage, but you don't have to walk this path alone. We're
            here to support you with compassion, wisdom, and the transformative love of Christ.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/contact">Book a Session</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              <Link href="/resources">Explore Resources</Link>
            </Button>
          </div>

          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              <strong>Confidential Support:</strong> Your request will be handled confidentially in line with our
              ethics. All sessions are conducted in a safe, non-judgmental environment.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
