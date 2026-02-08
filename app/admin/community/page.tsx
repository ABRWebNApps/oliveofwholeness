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
import { Plus, Edit, Trash2, Users } from "lucide-react";

export default async function AdminCommunityPage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("community_feed")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Community Feed Management
            </h1>
            <p className="text-muted-foreground">
              Create and manage community updates, encouragement, and events.
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/community/new">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Link>
          </Button>
        </div>

        {posts && posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {post.content.substring(0, 200)}
                        {post.content.length > 200 ? "..." : ""}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-1 ml-4">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/admin/community/edit/${post.id}`}>
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
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                      {post.link_url && <span>• Has Link</span>}
                      {post.image_url && <span>• Has Image</span>}
                    </div>
                    <Badge variant={post.published ? "default" : "secondary"}>
                      {post.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <CardTitle className="mb-2">No Community Posts Yet</CardTitle>
              <CardDescription className="mb-4">
                Start sharing updates, encouragement, and events with your
                community.
              </CardDescription>
              <Button asChild>
                <Link href="/admin/community/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Post
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
