import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cookie, Settings2, ShieldOff, BarChart3, Mail } from "lucide-react";

export const metadata = {
  title: "Cookie Policy | Olives of Wholeness",
  description: "Cookie Policy for Olives of Wholeness Healing Centre.",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary/20 to-background py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-10">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Cookie className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Cookie Policy
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Olives of Wholeness Healing Centre
          </p>
        </div>
      </section>

      <section className="py-12 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center shadow-sm">
            <p className="text-muted-foreground">
              This is the Cookie Policy for Olives of Wholeness Healing Centre,
              accessible from{" "}
              <a href="https://www.olivesofwholeness.org" className="text-primary hover:underline font-medium">
                www.olivesofwholeness.org
              </a>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <Cookie className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl">What Are Cookies</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  As is common practice with almost all professional websites this
                  site uses cookies, which are tiny files that are downloaded to
                  your computer, to improve your experience. This page describes
                  what information they gather, how we use it and why we sometimes
                  need to store these cookies. We will also share how you can
                  prevent these cookies from being stored however this may downgrade
                  or 'break' certain elements of the sites functionality.
                </p>
                <p className="text-sm bg-secondary/30 p-3 rounded-lg">
                  For more general information on cookies see the Wikipedia article
                  on HTTP Cookies.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <Settings2 className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl">How We Use Cookies</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                <p>
                  We use cookies for a variety of reasons detailed below.
                  Unfortunately in most cases there are no industry standard options
                  for disabling cookies without completely disabling the
                  functionality and features they add to this site. It is
                  recommended that you leave on all cookies if you are not sure
                  whether you need them or not in case they are used to provide a
                  service that you use.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-destructive/20">
            <CardHeader className="pb-4 bg-destructive/5 rounded-t-xl">
              <div className="flex items-center space-x-3">
                <ShieldOff className="h-6 w-6 text-destructive" />
                <CardTitle className="text-2xl">Disabling Cookies</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 text-muted-foreground leading-relaxed space-y-4">
              <p>
                You can prevent the setting of cookies by adjusting the settings
                on your browser (see your browser Help for how to do this). Be
                aware that disabling cookies will affect the functionality of this
                and many other websites that you visit. 
              </p>
              <div className="bg-background border-l-4 border-destructive p-4 text-sm mt-4">
                <strong className="text-foreground block mb-1">Warning:</strong> 
                Disabling cookies will usually result in also disabling certain functionality and
                features of the site. Therefore it is recommended that you do not
                disable cookies.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <Cookie className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">The Cookies We Set</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-1">Email newsletters related cookies</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    This site offers newsletter or email subscription services and
                    cookies may be used to remember if you are already registered
                    and whether to show certain notifications which might only be
                    valid to subscribed/unsubscribed users.
                  </p>
                </div>
              </div>

              <div className="w-full h-px bg-border my-2" />

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Settings2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-1">Site preferences cookies</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    In order to provide you with a great experience on this site we
                    provide the functionality to set your preferences for how this
                    site runs when you use it. In order to remember your
                    preferences we need to set cookies so that this information can
                    be called whenever you interact with a page that is affected by
                    your preferences.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <BarChart3 className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Third Party Cookies</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                In some special cases we also use cookies provided by trusted
                third parties. The following section details which third party
                cookies you might encounter through this site.
              </p>
              
              <ul className="space-y-6">
                <li className="bg-secondary/20 p-5 rounded-lg border border-border">
                  <p className="mb-2">
                    <strong className="text-foreground">Google Analytics: </strong>
                    This site uses Google Analytics which is one of the most
                    widespread and trusted analytics solution on the web for helping
                    us to understand how you use the site and ways that we can
                    improve your experience. These cookies may track things such as
                    how long you spend on the site and the pages that you visit so
                    we can continue to produce engaging content.
                  </p>
                  <p className="text-sm">
                    For more information on Google Analytics cookies, see the official Google Analytics page.
                  </p>
                </li>
                
                <li className="pl-4 border-l-2 border-primary/30">
                  From time to time we test new features and make subtle changes
                  to the way that the site is delivered. When we are still testing
                  new features these cookies may be used to ensure that you
                  receive a consistent experience whilst on the site whilst
                  ensuring we understand which optimisations our users appreciate
                  the most.
                </li>
                
                <li className="pl-4 border-l-2 border-primary/30">
                  As we sell products it’s important for us to understand
                  statistics about how many of the visitors to our site actually
                  make a purchase and as such this is the kind of data that these
                  cookies will track. This is important to you as it means that we
                  can accurately make business predictions that allow us to
                  monitor our advertising and product costs to ensure the best
                  possible price.
                </li>
                
                <li className="pl-4 border-l-2 border-primary/30">
                  Several partners advertise on our behalf and affiliate tracking
                  cookies simply allow us to see if our customers have come to the
                  site through one of our partner sites so that we can credit them
                  appropriately and where applicable allow our affiliate partners
                  to provide any bonus that they may provide you for making a
                  purchase.
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="bg-primary text-primary-foreground p-8 rounded-xl text-center shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Need More Information?</h2>
            <p className="mb-6 opacity-90">
              If you are still looking for more information then you can contact
              us through one of our preferred contact methods:
            </p>
            <a 
              href="mailto:info@olivesofwholeness.org" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-background text-primary shadow hover:bg-background/90 h-10 px-8 py-2"
            >
              <Mail className="mr-2 h-4 w-4" /> info@olivesofwholeness.org
            </a>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
