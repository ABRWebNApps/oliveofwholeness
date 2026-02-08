import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Calendar, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function CommunityPostPage({
  params,
}: {
  params: { postId: string };
}) {
  const supabase = await createClient();

  // Fetch the specific post
  const { data: post, error } = await supabase
    .from("community_feed")
    .select("*")
    .eq("id", params.postId)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/community">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Community Feed
          </Link>
        </Button>

        <article className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground">{post.title}</h1>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              <time dateTime={post.created_at}>
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>

          {post.image_url && (
            <div className="max-w-2xl mx-auto">
              <div className="w-full overflow-hidden rounded-xl shadow-xl">
                <div className="aspect-[3/4] relative">
                  <img
                    src={post.image_url}
                    alt="Post image"
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          )}

          <Card>
            <CardContent className="p-6">
              <div className="prose prose-lg max-w-none">
                {post.content.split("\n\n").map((paragraph, index) => (
                  <p
                    key={index}
                    className="mb-4 text-muted-foreground leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {post.link_url && (
                <div className="mt-8 pt-4 border-t border-border">
                  <a
                    href={post.link_url}
                    className="inline-flex items-center text-primary hover:text-primary/80"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {post.link_url.startsWith("mailto")
                      ? "Contact for More Information"
                      : "Learn More"}
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
