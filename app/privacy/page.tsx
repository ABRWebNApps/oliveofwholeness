import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Olives of Wholeness",
  description: "Privacy Statement for Olives of Wholeness Healing Centre.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary/20 to-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-10">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Privacy Statement
          </h1>
          <p className="text-xl text-muted-foreground">
            Olives of Wholeness Healing Centre
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-headings:text-foreground">
          <div>
            <h2 className="text-2xl font-semibold mb-4">WHO WE ARE</h2>
            <p>
              We are Olives of Wholeness Healing Centre (“Olives of Wholeness”).
              Our website address is:{" "}
              <Link href="https://www.olivesofwholeness.org" className="text-primary hover:underline">
                https://www.olivesofwholeness.org
              </Link>
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              WHAT PERSONAL DATA DO WE COLLECT?
            </h2>
            <p className="mb-4">We collect the following data:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>
                Personal identification information (name, email address, phone
                number etc)
              </li>
            </ul>

            <p className="mb-4">
              You directly provide Olives of Wholeness with most of the data
              that we collect. We collect data and process data when you:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Voluntarily complete our Contact Form</li>
              <li>
                Register online or place an order for any of our products or
                services
              </li>
              <li>Add or view our website via your browsers cookies</li>
            </ul>

            <p className="mb-4">We collect your data so that we can:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Process your order and manage your account</li>
              <li>
                Email you with special products or services we think you might
                like
              </li>
            </ul>

            <p className="mb-4">
              If you agree, Olives of Wholeness may share your data with our
              partner companies so that they may offer you their products or
              services.
            </p>

            <p className="mb-4">
              If you have agreed to receive marketing, you may always opt out at
              a later date. You have the right at any time to stop Olives of
              Wholeness from contacting you for marketing purposes or giving
              your data to our partners.
            </p>

            <p>
              When Olives of Wholeness processes your order, it may send your
              data to, and use the resulting information from, credit reference
              agencies to fraudulent purchases.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">CONTACT FORMS</h2>
            <p>
              Information submitted through contact forms is used for customer
              service purposes and is handled confidentially.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">COOKIES</h2>
            <p className="mb-4">
              Cookies are text files placed on your computer to collect standard
              Internet log information and visitor behaviour information. When
              you visit our website, we may collect information from you
              automatically through cookies or similar technology.
            </p>

            <p className="mb-4">
              Olives of Wholeness uses cookies in a range of ways to improve
              your experience on our website, including understanding how you
              use our website.
            </p>

            <p className="mb-4">
              There are a number of different cookies, however, our website
              uses:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-4 mb-4">
              <li>
                <strong>Functionality</strong> – Olives of Wholeness uses these
                cookies so that we recognise you on our website and remember
                your previously selected preferences. This could include what
                language you prefer and location you are in. A mix of
                first-party and third-party cookies are used.
              </li>
              <li>
                <strong>Advertising</strong> – Olives of Wholeness uses these
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

            <p className="mb-4">
              You can set your browser to not accept cookies, however, in a few
              cases, some of our website features may not function as a result.
            </p>

            <p>
              For our Cookie Policy, please see here:{" "}
              <Link href="/cookie-policy" className="text-primary hover:underline">
                Cookie Policy Page
              </Link>
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              EMBEDDED CONTENT FROM OTHER WEBSITES
            </h2>
            <p className="mb-4">
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
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">ANALYTICS</h2>
            <p>
              We use analytics tools to help us understand how visitors engage
              with our website, so that we can improve it.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              HOW LONG WE RETAIN YOUR DATA
            </h2>
            <p>
              If you leave a comment, the comment and its metadata are retained
              indefinitely. This is so we can recognize and approve any
              follow-up comments automatically instead of holding them in a
              moderation queue.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              WHAT RIGHTS YOU HAVE OVER YOUR DATA
            </h2>
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

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              WHERE WE SEND YOUR DATA
            </h2>
            <p>
              Visitor comments may be checked through an automated spam
              detection service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              ADDITIONAL INFORMATION
            </h2>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              WHAT ARE YOUR DATA PROTECTION RIGHTS?
            </h2>
            <p className="mb-4">
              Olives of Wholeness would like to make sure you are fully aware of
              all your data protection rights. Every user is entitled to the
              following:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-4 mb-4">
              <li>
                <strong>The right to access</strong> – You have the right to
                request from Olives of Wholeness copies of your personal data.
                We may charge you a small fee for this service.
              </li>
              <li>
                <strong>The right to rectification</strong> – You have the right
                to request that Olives of Wholeness correct any information you
                believe is incorrect. You also have the right to request DAS
                Healthcare Limited complete information you believe is
                incomplete.
              </li>
              <li>
                <strong>The right to erasure</strong> – You have the right to
                request Olives of Wholeness erase your personal data, under
                certain conditions.
              </li>
              <li>
                <strong>The right to restrict processing</strong> – You have the
                right to request that Olives of Wholeness restrict the
                processing of your personal data, under certain conditions.
              </li>
              <li>
                <strong>The right to object to processing</strong> – You have
                the right to object to Olives of Wholeness processing your
                personal data, under certain conditions.
              </li>
              <li>
                <strong>The right to data portability</strong> – You have the
                right to request that Olives of Wholeness transfer the data that
                we have collected to another organisation, or directly to you,
                under certain conditions.
              </li>
            </ul>
            <p>
              If you make a request, we have one month to respond to you. If you
              would like to exercise any of these rights, please contact us at
              our email:{" "}
              <a href="mailto:info@olivesofwholeness.org" className="text-primary hover:underline">
                info@olivesofwholeness.org
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              CHANGES TO OUR PRIVACY POLICY
            </h2>
            <p className="mb-4">
              Olives of Wholeness keeps its privacy policy under regular review
              and places any updates on this page. This Privacy Policy was last
              updated on 2nd April, 2026.
            </p>
            <p className="mb-4">
              If you have any questions about Olives of Wholeness Privacy
              Policy, the data we hold on you, or you would like to exercise one
              of your data protection rights, please do not hesitate to contact
              us.
            </p>
            <div className="space-y-4 mt-6">
              <p>
                <strong>Email us at:</strong>{" "}
                <a href="mailto:info@olivesofwholeness.org" className="text-primary hover:underline">
                  info@olivesofwholeness.org
                </a>
              </p>
              <p>
                <strong>Write us at:</strong>
                <br />
                <span className="text-muted-foreground mt-2 block">
                  Olive of Wholess Healing International Centre, <br />
                  55, Aja Road, Ogharefe, Oghara, <br />
                  Delta State, Nigeria.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
