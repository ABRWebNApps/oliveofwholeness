import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Script from "next/script";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Calendar,
  BookOpen,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";

const POSTS_PER_PAGE = 10;

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = parseInt(searchParams.page || "1");
  const offset = (currentPage - 1) * POSTS_PER_PAGE;

  const supabase = await createClient();

  // Get total counts for pagination
  const [communityCountResult, resourcesCountResult] = await Promise.all([
    supabase
      .from("community_feed")
      .select("*", { count: "exact", head: true })
      .eq("published", true),
    supabase
      .from("resources")
      .select("*", { count: "exact", head: true })
      .eq("published", true),
  ]);

  const totalCommunityPosts = communityCountResult.count || 0;
  const totalResources = resourcesCountResult.count || 0;
  const totalPosts = totalCommunityPosts + totalResources;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  // Fetch all posts for sorting, then slice for pagination
  // This approach ensures proper chronological ordering across both tables
  const [communityResult, resourcesResult] = await Promise.all([
    supabase
      .from("community_feed")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false }),
    supabase
      .from("resources")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false }),
  ]);

  // Combine and sort all posts
  const allPosts = [
    ...(communityResult.data || []).map((post) => ({
      ...post,
      type: "community",
    })),
    ...(resourcesResult.data || []).map((resource) => ({
      id: resource.id,
      title: resource.title,
      content: resource.content,
      created_at: resource.created_at,
      image_url: null,
      link_url: `/resources#${resource.category.toLowerCase().replace(/ /g, "-")}`,
      type: "resource",
      category: resource.category,
    })),
  ].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Paginate the sorted posts
  const paginatedPosts = allPosts.slice(offset, offset + POSTS_PER_PAGE);

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

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary/20 to-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Community Feed
          </h1>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
            Stay connected with our community through updates, encouragement,
            events, and announcements. This is your space for spiritual
            fellowship and support.
          </p>
        </div>
      </section>

      {/* Combined Feed */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Posts Count and Page Info */}
          <div className="mb-6 text-center">
            <p className="text-sm text-muted-foreground">
              Showing {paginatedPosts.length} of {totalPosts} posts
              {totalPages > 1 && (
                <span className="ml-2">
                  (Page {currentPage} of {totalPages})
                </span>
              )}
            </p>
          </div>

          <div className="grid gap-8">
            {paginatedPosts.length > 0 ? (
              paginatedPosts.map((post) => (
                <Card
                  key={`${post.type}-${post.id}`}
                  className={`hover:shadow-lg transition-shadow ${
                    post.type === "community" ? "cursor-pointer" : ""
                  }`}
                >
                  <Link
                    href={
                      post.type === "community"
                        ? `/community/${post.id}`
                        : post.link_url
                    }
                    className="block"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-xl">
                              {post.title}
                            </CardTitle>
                            {post.type === "resource" && (
                              <Badge variant="secondary" className="ml-2">
                                <BookOpen className="h-3 w-3 mr-1" />
                                {post.category}
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(post.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        {post.image_url && (
                          <div className="w-full overflow-hidden rounded-xl shadow-lg">
                            <div className="aspect-[3/4] relative">
                              <img
                                src={post.image_url || "/placeholder.svg"}
                                alt="Post image"
                                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          </div>
                        )}
                        <div className={post.image_url ? "" : "md:col-span-2"}>
                          <div className="prose max-w-none">
                            <p className="text-muted-foreground leading-relaxed line-clamp-3">
                              {post.content}
                            </p>
                          </div>
                          <div className="mt-4">
                            {post.type === "community" ? (
                              <span className="text-primary hover:text-primary/80 inline-flex items-center">
                                Read More
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </span>
                            ) : (
                              <span className="text-primary hover:text-primary/80 inline-flex items-center">
                                <BookOpen className="h-4 w-4 mr-2" />
                                View Resource
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No posts found. Check back later for updates!
                </p>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center space-x-4">
              {/* Previous Button */}
              <Button
                variant="outline"
                size="sm"
                className={`${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={currentPage === 1}
                asChild={currentPage > 1}
              >
                {currentPage > 1 ? (
                  <Link href={`/community?page=${currentPage - 1}`}>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Link>
                ) : (
                  <span>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </span>
                )}
              </Button>

              {/* Page Numbers */}
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => {
                    // Show first page, current page with neighbors, and last page
                    const showPage =
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1);

                    if (!showPage) {
                      // Show ellipsis
                      if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return (
                          <span
                            key={page}
                            className="px-2 py-1 text-muted-foreground"
                          >
                            ...
                          </span>
                        );
                      }
                      return null;
                    }

                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        className="min-w-[40px]"
                        asChild={currentPage !== page}
                      >
                        {currentPage === page ? (
                          <span>{page}</span>
                        ) : (
                          <Link href={`/community?page=${page}`}>{page}</Link>
                        )}
                      </Button>
                    );
                  }
                )}
              </div>

              {/* Next Button */}
              <Button
                variant="outline"
                size="sm"
                className={`${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={currentPage === totalPages}
                asChild={currentPage < totalPages}
              >
                {currentPage < totalPages ? (
                  <Link href={`/community?page=${currentPage + 1}`}>
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                ) : (
                  <span>
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </span>
                )}
              </Button>
            </div>
          )}

          {/* Quick Navigation */}
          {totalPages > 5 && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Jump to page:</span>
                <div className="flex space-x-1">
                  {currentPage > 3 && (
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/community?page=1">1</Link>
                    </Button>
                  )}
                  {currentPage < totalPages - 2 && (
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/community?page=${totalPages}`}>
                        {totalPages}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
