import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminNav } from "@/components/admin-nav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Users, Mail, Plus } from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  let resourcesCount = 0;
  let communityCount = 0;
  let helpRequestsCount = 0;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: adminProfile } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", user?.id)
    .single();

  try {
    const [resourcesResult, communityResult, helpRequestsResult] =
      await Promise.allSettled([
        supabase.from("resources").select("*", { count: "exact", head: true }),
        supabase
          .from("community_feed")
          .select("*", { count: "exact", head: true }),
        supabase
          .from("help_requests")
          .select("*", { count: "exact", head: true }),
      ]);

    if (resourcesResult.status === "fulfilled") {
      resourcesCount = resourcesResult.value.count || 0;
    }
    if (communityResult.status === "fulfilled") {
      communityCount = communityResult.value.count || 0;
    }
    if (helpRequestsResult.status === "fulfilled") {
      helpRequestsCount = helpRequestsResult.value.count || 0;
    }
  } catch (error) {
    // Tables might not exist yet, use default counts
    console.log("[v0] Database tables not found, using default counts");
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back,{" "}
            {adminProfile?.full_name || adminProfile?.email || "Admin"}! Manage
            your website content and help requests.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Resources
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resourcesCount}</div>
              <p className="text-xs text-muted-foreground">
                Articles, guides, and materials
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Community Posts
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{communityCount}</div>
              <p className="text-xs text-muted-foreground">
                Updates and encouragement
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Help Requests
              </CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{helpRequestsCount}</div>
              <p className="text-xs text-muted-foreground">Visitor inquiries</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>Resources Management</span>
              </CardTitle>
              <CardDescription>
                Create and manage articles, guides, sermons, and healing
                resources.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Button asChild size="sm" className="flex-1">
                  <Link href="/admin/resources/new">
                    <Plus className="h-4 w-4 mr-2" />
                    New Resource
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                >
                  <Link href="/admin/resources">View All</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Community Posts</span>
              </CardTitle>
              <CardDescription>
                Create and manage community updates, encouragement posts,
                events, and announcements.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Button asChild size="sm">
                  <Link href="/admin/posts">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Posts
                  </Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="bg-transparent"
                >
                  <Link href="/admin/community/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Post
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>Help Requests</span>
              </CardTitle>
              <CardDescription>
                View and respond to visitor help requests and contact form
                submissions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full bg-transparent"
              >
                <Link href="/admin/help-requests">View All Requests</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-muted/30 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              asChild
              variant="outline"
              className="justify-start h-auto p-4 bg-transparent"
            >
              <Link href="/resources" target="_blank">
                <div className="text-left">
                  <div className="font-medium">Preview Resources Page</div>
                  <div className="text-sm text-muted-foreground">
                    See how visitors view your resources
                  </div>
                </div>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="justify-start h-auto p-4 bg-transparent"
            >
              <Link href="/community" target="_blank">
                <div className="text-left">
                  <div className="font-medium">Preview Community Feed</div>
                  <div className="text-sm text-muted-foreground">
                    See how visitors view community posts
                  </div>
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
