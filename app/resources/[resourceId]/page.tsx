import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Calendar, ArrowLeft, BookOpen } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function ResourcePostPage({
  params,
}: {
  params: { resourceId: string };
}) {
  const supabase = await createClient();

  // Fetch the specific resource
  const { data: resource, error } = await supabase
    .from("resources")
    .select("*")
    .eq("id", params.resourceId)
    .single();

  if (error || !resource) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/resources">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Resources
          </Link>
        </Button>

        <article className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold text-foreground">
                {resource.title}
              </h1>
              <Badge variant="secondary" className="mt-1">
                <BookOpen className="h-3 w-3 mr-1" />
                {resource.category}
              </Badge>
            </div>

            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              <time dateTime={resource.created_at}>
                {new Date(resource.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>

          {resource.image_url && (
            <div className="max-w-2xl mx-auto">
              <div className="w-full overflow-hidden rounded-xl shadow-lg">
                <div className="aspect-[16/9] relative">
                  <img
                    src={resource.image_url}
                    alt={resource.title || "Resource image"}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="prose prose-lg max-w-none">
                {resource.content
                  .split("\n\n")
                  .map((paragraph: string, index: number) => (
                    <p
                      key={index}
                      className="mb-4 text-muted-foreground leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>

              {resource.resource_url && (
                <div className="mt-8 pt-6 border-t border-border">
                  <a
                    href={resource.resource_url}
                    className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-medium transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Access External Resource
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        </article>
      </main>

      <Footer />
    </div>
  );
}
