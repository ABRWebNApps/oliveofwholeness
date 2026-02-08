import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Heart, BookOpen, Users, Phone, Star, Shield, Compass, Calendar, ArrowRight, Sparkles } from "lucide-react"
import Script from "next/script";

const samplePosts = [
  {
    id: 1,
    title: "Weekly Encouragement: God's Love Never Fails",
    content:
      "This week, let's remember that God's love for us is constant and unwavering. No matter what challenges you're facing, His love remains as your foundation.",
    created_at: "2024-01-20",
    published: true,
  },
  {
    id: 2,
    title: "Upcoming: Healing Prayer Circle - January 25th",
    content:
      "Join us for our monthly Healing Prayer Circle this Thursday, January 25th at 7:00 PM. This is a safe space where we come together to pray for emotional and spiritual healing.",
    created_at: "2024-01-18",
    published: true,
  },
  {
    id: 3,
    title: "New Resource: Dealing with Grief During the Holidays",
    content:
      "The holiday season can be particularly challenging for those dealing with loss. We've added a new resource to help navigate grief during this time.",
    created_at: "2024-01-15",
    published: true,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
            {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-RGDCYJNXRJ"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-RGDCYJNXRJ');
        `}
      </Script>
      <Navigation />

      <section className="relative gradient-warm py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float"></div>
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-secondary/10 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-primary/5 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-12">
            <div className="flex justify-center">
              <div className="relative w-32 h-32 flex items-center justify-center animate-pulse-slow">
                <img
                  src="/logo.jpg"
                  alt="Olives of Wholeness Logo"
                  className="w-full h-full object-contain rounded-full shadow-2xl"
                />
                <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-400 animate-spin" />
              </div>
            </div>

            <div className="mx-auto w-full max-w-3xl">
              <div className="relative group">
                <img
                  src="/peaceful-nature-scene-with-olive-tree-and-soft-lig.jpg"
                  alt="Peaceful healing environment"
                  className="w-full h-80 object-cover rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    "He heals the brokenhearted and binds up their wounds." - Psalm 147:3
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-foreground to-secondary bg-clip-text text-transparent text-balance leading-tight animate-fade-in">
                Welcome to Your Journey of Healing
              </h1>

              <div className="max-w-4xl mx-auto space-y-6">
                <p className="text-xl md:text-2xl text-muted-foreground text-pretty leading-relaxed animate-fade-in-up">
                  To guide people on a journey of emotional healing and spiritual renewal through the love of Christ,
                  providing compassionate support that addresses both the heart and mind in a safe, nurturing
                  environment.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="text-base sm:text-lg px-4 sm:px-8 py-4 sm:py-6 gradient-primary border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group whitespace-normal text-center leading-tight"
                >
                  <Link href="/contact" className="flex items-center justify-center">
                    <span className="text-balance">Start Your Healing Journey</span>
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-base sm:text-lg px-4 sm:px-8 py-4 sm:py-6 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent hover:scale-105 transition-all duration-300"
                >
                  <Link href="/about">Learn Our Story</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-primary font-semibold uppercase tracking-wider text-sm">
                    About Our Ministry
                  </span>
                </div>
                <h2 className="text-4xl font-bold text-foreground">Healing Hearts, Renewing Spirits</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that true healing comes when we address both emotional wounds and spiritual needs. Our
                approach combines professional therapeutic practices with biblical wisdom, creating a safe space where
                you can find hope, healing, and wholeness in Christ.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-primary hover:scale-105 transition-transform cursor-pointer">
                  <Shield className="h-5 w-5" />
                  <span className="font-medium">Safe Environment</span>
                </div>
                <div className="flex items-center gap-2 text-primary hover:scale-105 transition-transform cursor-pointer">
                  <Heart className="h-5 w-5" />
                  <span className="font-medium">Compassionate Care</span>
                </div>
                <div className="flex items-center gap-2 text-primary hover:scale-105 transition-transform cursor-pointer">
                  <Compass className="h-5 w-5" />
                  <span className="font-medium">Biblical Guidance</span>
                </div>
              </div>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent group"
              >
                <Link href="/about">
                  Discover Our Mission
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="/peaceful-therapy-room-with-soft-lighting.jpg"
                    alt="Therapy room"
                    className="w-full h-48 object-cover rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  />
                  <img
                    src="/hands-in-prayer-with-soft-light.jpg"
                    alt="Prayer hands"
                    className="w-full h-36 object-cover rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  />
                </div>
                <div className="space-y-4 mt-8">
                  <img
                    src="/open-bible-with-warm-lighting.jpg"
                    alt="Open Bible"
                    className="w-full h-36 object-cover rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  />
                  <img
                    src="/peaceful-garden-with-flowers-and-sunlight.jpg"
                    alt="Peaceful garden"
                    className="w-full h-48 object-cover rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-16">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-foreground">How We Can Help You</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover the pathways to healing and growth through our comprehensive services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-0 shadow-lg bg-card group">
                <CardHeader className="pb-4">
                  <div className="mx-auto w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Heart className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">Services</CardTitle>
                  <CardDescription className="text-base">
                    Professional counseling, workshops, and prayer groups
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent group-hover:scale-105 transition-all duration-300"
                  >
                    <Link href="/services">Explore Services</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-0 shadow-lg bg-card group">
                <CardHeader className="pb-4">
                  <div className="mx-auto w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-secondary transition-colors">Resources</CardTitle>
                  <CardDescription className="text-base">
                    Articles, guides, and materials for your healing journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent group-hover:scale-105 transition-all duration-300"
                  >
                    <Link href="/resources">Browse Resources</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-0 shadow-lg bg-card group">
                <CardHeader className="pb-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-green-600 transition-colors">Community</CardTitle>
                  <CardDescription className="text-base">Updates, encouragement, and community events</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white bg-transparent group-hover:scale-105 transition-all duration-300"
                  >
                    <Link href="/community">Join Community</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-0 shadow-lg bg-card group">
                <CardHeader className="pb-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-rose-500 transition-colors">Contact</CardTitle>
                  <CardDescription className="text-base">Reach out for support and schedule sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    className="w-full gradient-primary border-0 shadow-lg hover:shadow-xl group-hover:scale-105 transition-all duration-300"
                  >
                    <Link href="/contact">Get Help Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Community Feed */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-foreground mb-4">Latest from Our Community</h2>
                <p className="text-lg text-muted-foreground">
                  Stay connected with updates, encouragement, and upcoming events
                </p>
              </div>

              <div className="space-y-6">
                {samplePosts.slice(0, 2).map((post, index) => (
                  <Card
                    key={post.id}
                    className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md"
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
                      <CardDescription className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{post.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center lg:text-left">
                <Button asChild variant="outline" className="group bg-transparent">
                  <Link href="/community">
                    View All Updates
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Visual Elements */}
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/community-gathering-in-prayer-circle.jpg"
                  alt="Community prayer"
                  className="w-full h-40 object-cover rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                />
                <img
                  src="/people-supporting-each-other-in-group-therapy.jpg"
                  alt="Group support"
                  className="w-full h-40 object-cover rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                />
              </div>

              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Users className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Join Our Community</h3>
                  <p className="text-muted-foreground mb-4">
                    Connect with others on their healing journey and find encouragement in fellowship
                  </p>
                  <Button asChild className="gradient-primary border-0">
                    <Link href="/contact">Get Connected</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-16">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-foreground">How We Can Help You</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover the pathways to healing and growth through our comprehensive services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-card">
                <CardHeader className="pb-4">
                  <div className="mx-auto w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Heart className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">Services</CardTitle>
                  <CardDescription className="text-base">
                    Professional counseling, workshops, and prayer groups
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    <Link href="/services">Explore Services</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-card">
                <CardHeader className="pb-4">
                  <div className="mx-auto w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <BookOpen className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <CardTitle className="text-xl">Resources</CardTitle>
                  <CardDescription className="text-base">
                    Articles, guides, and materials for your healing journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent"
                  >
                    <Link href="/resources">Browse Resources</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-card">
                <CardHeader className="pb-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Community</CardTitle>
                  <CardDescription className="text-base">Updates, encouragement, and community events</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white bg-transparent"
                  >
                    <Link href="/community">Join Community</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-card">
                <CardHeader className="pb-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Phone className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Contact</CardTitle>
                  <CardDescription className="text-base">Reach out for support and schedule sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    className="w-full gradient-primary border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Link href="/contact">Get Help Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 gradient-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-foreground">A Place of Hope and Healing</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Experience the transformative power of faith-centered therapy in a supportive community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Star className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Professional Excellence</h3>
                <p className="text-muted-foreground">
                  Licensed therapists with specialized training in faith-based counseling
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 gradient-secondary rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Shield className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Safe Environment</h3>
                <p className="text-muted-foreground">Confidential, judgment-free space where you can share openly</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Compass className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Biblical Foundation</h3>
                <p className="text-muted-foreground">Therapy grounded in Christian principles and biblical wisdom</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
