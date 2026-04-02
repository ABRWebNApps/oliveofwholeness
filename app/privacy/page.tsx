import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldCheck, Database, Cookie, Globe, Activity, UserCog, Send, Info, Scale, Edit3, Mail } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Olives of Wholeness",
  description: "Privacy Statement for Olives of Wholeness Healing Centre.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary/20 to-background py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-10">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Privacy Statement
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Olives of Wholeness Healing Centre is committed to protecting your personal information and your right to privacy.
          </p>
        </div>
      </section>

      <section className="py-12 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <Info className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">WHO WE ARE</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="prose-p:text-muted-foreground prose-p:leading-relaxed">
              <p>
                We are Olives of Wholeness Healing Centre (“Olives of Wholeness”).
                Our website address is:{" "}
                <Link href="https://www.olivesofwholeness.org" className="text-primary hover:underline font-medium">
                  https://www.olivesofwholeness.org
                </Link>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <Database className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">WHAT PERSONAL DATA DO WE COLLECT?</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 prose-p:text-muted-foreground prose-p:leading-relaxed text-muted-foreground">
              <div>
                <p className="mb-3 font-medium text-foreground">We collect the following data:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Personal identification information (name, email address, phone number etc)</li>
                </ul>
              </div>

              <div>
                <p className="mb-3 font-medium text-foreground">
                  You directly provide Olives of Wholeness with most of the data that we collect. We collect data and process data when you:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Voluntarily complete our Contact Form</li>
                  <li>Register online or place an order for any of our products or services</li>
                  <li>Add or view our website via your browsers cookies</li>
                </ul>
              </div>

              <div>
                <p className="mb-3 font-medium text-foreground">We collect your data so that we can:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Process your order and manage your account</li>
                  <li>Email you with special products or services we think you might like</li>
                </ul>
              </div>

              <div className="bg-secondary/30 p-4 rounded-lg border border-border">
                <p className="mb-3">
                  If you agree, Olives of Wholeness may share your data with our partner companies so that they may offer you their products or services.
                </p>
                <p className="mb-3">
                  If you have agreed to receive marketing, you may always opt out at a later date. You have the right at any time to stop Olives of Wholeness from contacting you for marketing purposes or giving your data to our partners.
                </p>
                <p>
                  When Olives of Wholeness processes your order, it may send your data to, and use the resulting information from, credit reference agencies to fraudulent purchases.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <Send className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl">CONTACT FORMS</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                <p>
                  Information submitted through contact forms is used for customer
                  service purposes and is handled confidentially.
                </p>
              </CardContent>
            </Card>

             <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <Activity className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl">ANALYTICS</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                <p>
                  We use analytics tools to help us understand how visitors engage
                  with our website, so that we can improve it.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <Cookie className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">COOKIES</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 prose-p:text-muted-foreground prose-p:leading-relaxed text-muted-foreground">
              <p>
                Cookies are text files placed on your computer to collect standard
                Internet log information and visitor behaviour information. When
                you visit our website, we may collect information from you
                automatically through cookies or similar technology.
              </p>

              <p>
                Olives of Wholeness uses cookies in a range of ways to improve
                your experience on our website, including understanding how you
                use our website.
              </p>

              <p className="font-medium text-foreground pt-2">
                There are a number of different cookies, however, our website uses:
              </p>
              <ul className="list-disc pl-6 space-y-4">
                <li>
                  <strong className="text-foreground">Functionality</strong> – Olives of Wholeness uses these
                  cookies so that we recognise you on our website and remember
                  your previously selected preferences. This could include what
                  language you prefer and location you are in. A mix of
                  first-party and third-party cookies are used.
                </li>
                <li>
                  <strong className="text-foreground">Advertising</strong> – Olives of Wholeness uses these
                  cookies to collect information about your visit to our website,
                  the content you viewed, the links you followed and information
                  about your browser, device, and your IP address. DAS sometimes
                  shares some limited aspects of this data with third parties for
                  advertising purposes. We may also share online data collected
                  through cookies with our advertising partners. This means that
                  when you visit another website, you may be shown advertising
                  based on your browsing patterns on our website.
                </li>
              </ul>

              <p className="pt-2">
                You can set your browser to not accept cookies, however, in a few
                cases, some of our website features may not function as a result.
              </p>

              <div className="bg-primary/5 p-4 rounded-lg mt-4 flex items-center justify-between border border-primary/10">
                <p className="text-foreground font-medium m-0">For our full Cookie Policy, please see here:</p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/cookie-policy">
                    Cookie Policy Page
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <Globe className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">EMBEDDED CONTENT FROM OTHER WEBSITES</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 prose-p:text-muted-foreground prose-p:leading-relaxed">
              <p>
                Articles on this site may include embedded content (e.g. videos,
                images, articles, etc.). Embedded content from other websites
                behaves in the exact same way as if the visitor has visited the
                other website.
              </p>
              <p>
                These websites may collect data about you, use cookies, embed
                additional third-party tracking, and monitor your interaction with
                that embedded content, including tracking your interaction with
                the embedded content if you have an account and are logged in to
                that website. Our Privacy Policy applies only to our website, so
                if you click on a link to another website, you should read their
                Privacy Policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <Scale className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">DATA RETENTION & RIGHTS</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-8 prose-p:text-muted-foreground prose-p:leading-relaxed text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">HOW LONG WE RETAIN YOUR DATA</h3>
                <p>
                  If you leave a comment, the comment and its metadata are retained
                  indefinitely. This is so we can recognize and approve any
                  follow-up comments automatically instead of holding them in a
                  moderation queue.
                </p>
              </div>
              
              <div className="h-px bg-border w-full" />

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">WHAT RIGHTS YOU HAVE OVER YOUR DATA</h3>
                <p className="mb-4">
                  For users that register on our website (if any), we also store the
                  personal information they provide in their user profile. All users
                  can see, edit, or delete their personal information at any time
                  (except they cannot change their username). Website administrators
                  can also see and edit that information.
                </p>
                <p>
                  If you have an account on this site, or have left comments, you
                  can request to receive an exported file of the personal data we
                  hold about you, including any data you have provided to us. You
                  can also request that we erase any personal data we hold about
                  you. This does not include any data we are obliged to keep for
                  administrative, legal, or security purposes.
                </p>
              </div>

              <div className="h-px bg-border w-full" />

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">WHERE WE SEND YOUR DATA</h3>
                <p>
                  Visitor comments may be checked through an automated spam
                  detection service.
                </p>
              </div>

            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-md">
            <CardHeader className="pb-4 bg-primary/5 rounded-t-xl">
              <div className="flex items-center space-x-3">
                <UserCog className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">WHAT ARE YOUR DATA PROTECTION RIGHTS?</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4 text-muted-foreground">
              <p className="mb-6">
                Olives of Wholeness would like to make sure you are fully aware of
                all your data protection rights. Every user is entitled to the
                following:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-background border border-border p-4 rounded-lg">
                  <strong className="text-foreground block mb-1">The right to access</strong>
                  <span className="text-sm">You have the right to request from Olives of Wholeness copies of your personal data. We may charge you a small fee for this service.</span>
                </div>
                
                <div className="bg-background border border-border p-4 rounded-lg">
                  <strong className="text-foreground block mb-1">The right to rectification</strong>
                  <span className="text-sm">You have the right to request that Olives of Wholeness correct any information you believe is incorrect. You also have the right to request DAS Healthcare Limited complete information you believe is incomplete.</span>
                </div>

                <div className="bg-background border border-border p-4 rounded-lg">
                  <strong className="text-foreground block mb-1">The right to erasure</strong>
                  <span className="text-sm">You have the right to request Olives of Wholeness erase your personal data, under certain conditions.</span>
                </div>

                <div className="bg-background border border-border p-4 rounded-lg">
                  <strong className="text-foreground block mb-1">The right to restrict processing</strong>
                  <span className="text-sm">You have the right to request that Olives of Wholeness restrict the processing of your personal data, under certain conditions.</span>
                </div>

                <div className="bg-background border border-border p-4 rounded-lg">
                  <strong className="text-foreground block mb-1">The right to object to processing</strong>
                  <span className="text-sm">You have the right to object to Olives of Wholeness processing your personal data, under certain conditions.</span>
                </div>

                <div className="bg-background border border-border p-4 rounded-lg">
                  <strong className="text-foreground block mb-1">The right to data portability</strong>
                  <span className="text-sm">You have the right to request that Olives of Wholeness transfer the data that we have collected to another organisation, or directly to you, under certain conditions.</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-sm">
                  If you make a request, we have one month to respond to you.
                </p>
                <Button asChild>
                  <a href="mailto:info@olivesofwholeness.org">
                    <Mail className="mr-2 h-4 w-4" /> Exercise Your Rights
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <Edit3 className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">CHANGES & CONTACT INFO</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground prose-p:leading-relaxed">
              <div>
                <p className="mb-2">
                  Olives of Wholeness keeps its privacy policy under regular review
                  and places any updates on this page. This Privacy Policy was last
                  updated on <strong className="text-foreground">2nd April, 2026</strong>.
                </p>
                <p>
                  If you have any questions about Olives of Wholeness Privacy
                  Policy, the data we hold on you, or you would like to exercise one
                  of your data protection rights, please do not hesitate to contact
                  us.
                </p>
              </div>

              <div className="bg-secondary/30 p-6 rounded-xl border border-border grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground flex items-center mb-2">
                    <Mail className="h-4 w-4 mr-2" /> Email Us
                  </h4>
                  <a href="mailto:info@olivesofwholeness.org" className="text-primary hover:underline">
                    info@olivesofwholeness.org
                  </a>
                </div>
                <div>
                   <h4 className="font-semibold text-foreground flex items-center mb-2">
                    <Globe className="h-4 w-4 mr-2" /> Write Us
                  </h4>
                  <address className="not-italic text-sm">
                    Olive of Wholess Healing International Centre, <br />
                    55, Aja Road, Ogharefe, Oghara, <br />
                    Delta State, Nigeria.
                  </address>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </section>

      <Footer />
    </div>
  );
}
