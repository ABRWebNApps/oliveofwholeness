import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { BookingWidget } from "@/components/booking-widget";

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2 space-y-8 lg:sticky lg:top-24">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tighter">
                Begin Your Journey to{" "}
                <span className="text-primary italic">Wholeness.</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Choose a time that works best for you. Our sessions are designed
                to be a safe, compassionate space for emotional healing.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              {[
                {
                  step: 1,
                  title: "Select Service",
                  desc: "Pick your specific consultation.",
                },
                {
                  step: 2,
                  title: "Pick a Time",
                  desc: "Real-time availability updates.",
                },
                {
                  step: 3,
                  title: "Book It",
                  desc: "Simple, secure confirmation.",
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="flex items-start gap-3 bg-card/30 p-4 rounded-xl border border-transparent hover:border-primary/10 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{s.title}</h4>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 relative">
            <div className="absolute -inset-10 bg-gradient-to-tr from-primary/10 to-transparent blur-3xl rounded-full opacity-50 -z-10"></div>
            <BookingWidget />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
