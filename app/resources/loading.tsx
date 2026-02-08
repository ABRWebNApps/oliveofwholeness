import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section Loading */}
      <section className="bg-gradient-to-b from-secondary/20 to-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="h-12 bg-muted/50 rounded-lg animate-pulse w-3/4 mx-auto" />
          <div className="h-20 bg-muted/50 rounded-lg animate-pulse" />
        </div>
      </section>

      {/* Search Section Loading */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-10 bg-muted/50 rounded-lg animate-pulse" />
        </div>
      </section>

      {/* Resources Content Loading */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="h-8 bg-muted/50 rounded-lg animate-pulse w-48 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, j) => (
                    <Card key={j} className="h-[300px]">
                      <div className="w-full h-48 bg-muted/50 rounded-t-lg animate-pulse" />
                      <CardHeader>
                        <div className="h-6 bg-muted/50 rounded animate-pulse w-20 mb-2" />
                        <div className="h-6 bg-muted/50 rounded animate-pulse" />
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
