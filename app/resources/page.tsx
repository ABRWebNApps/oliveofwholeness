"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BookOpen, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// Define the Resource type
type Resource = {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  created_at: string;
  image_url?: string | null;
  resource_url?: string | null;
  published: boolean;
};

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchResources() {
      try {
        const { data, error } = await supabase
          .from("resources")
          .select("*")
          .eq("published", true)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setResources(data || []);
      } catch (error) {
        console.error("Error loading resources:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchResources();
  }, []);

  // Group resources by category
  const resourcesByCategory = resources.reduce(
    (acc, resource) => {
      if (!acc[resource.category]) {
        acc[resource.category] = [];
      }
      acc[resource.category].push(resource);
      return acc;
    },
    {} as Record<string, Resource[]>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary/20 to-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Healing Resources
          </h1>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
            Discover articles, guides, and materials to support your journey
            toward emotional healing and spiritual renewal. Each resource is
            carefully crafted to provide biblical wisdom and practical guidance.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources by title or category..."
              className="pl-10 bg-background"
            />
          </div>
        </div>
      </section>

      {/* Resources Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
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
          ) : (
            <div className="space-y-12">
              {Object.entries(resourcesByCategory).map(
                ([category, categoryResources]) => (
                  <div key={category}>
                    <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                      <BookOpen className="h-6 w-6 text-primary mr-2" />
                      {category}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryResources.map((resource) => (
                        <Card
                          key={resource.id}
                          className="h-full hover:shadow-lg transition-shadow flex flex-col"
                        >
                          {resource.image_url && (
                            <div className="relative w-full pt-[56.25%] overflow-hidden rounded-t-lg">
                              <img
                                src={resource.image_url}
                                alt={resource.title}
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <CardHeader>
                            <Badge variant="secondary" className="w-fit mb-2">
                              {resource.category}
                            </Badge>
                            <CardTitle className="text-lg leading-tight">
                              {resource.title}
                            </CardTitle>
                            <CardDescription className="text-sm text-muted-foreground">
                              {new Date(
                                resource.created_at
                              ).toLocaleDateString()}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="flex-1 flex flex-col">
                            <p className="text-muted-foreground leading-relaxed mb-4 flex-1">
                              {resource.excerpt ||
                                (resource.content.length > 150
                                  ? resource.content.substring(0, 150) + "..."
                                  : resource.content)}
                            </p>
                            <div className="space-y-2 mt-auto">
                              <button className="text-primary hover:text-primary/80 font-medium text-sm">
                                Read More →
                              </button>
                              {resource.resource_url && (
                                <a
                                  href={resource.resource_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center w-full bg-primary/10 text-primary hover:bg-primary/20 py-2 px-4 rounded-md transition-colors"
                                >
                                  <BookOpen className="h-4 w-4 mr-2" />
                                  Get Resource
                                </a>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
