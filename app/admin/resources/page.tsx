import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminNav } from "@/components/admin-nav";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Plus, Edit, Trash2, BookOpen } from "lucide-react";

export default async function AdminResourcesPage() {
  const supabase = await createClient();

  const { data: resources } = await supabase
    .from("resources")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Resources Management
            </h1>
            <p className="text-muted-foreground">
              Create and manage articles, guides, and healing resources.
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/resources/new">
              <Plus className="h-4 w-4 mr-2" />
              New Resource
            </Link>
          </Button>
        </div>

        {resources && resources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Card
                key={resource.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary" className="mb-2">
                      {resource.category}
                    </Badge>
                    <div className="flex space-x-1">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/admin/resources/edit/${resource.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {resource.content.substring(0, 100)}
                    {resource.content.length > 100 ? "..." : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>By {resource.author}</span>
                    <span>
                      {new Date(resource.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-3">
                    <Badge
                      variant={resource.published ? "default" : "secondary"}
                    >
                      {resource.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <CardTitle className="mb-2">No Resources Yet</CardTitle>
              <CardDescription className="mb-4">
                Start creating resources to help visitors on their healing
                journey.
              </CardDescription>
              <Button asChild>
                <Link href="/admin/resources/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Resource
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
