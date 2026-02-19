"use client";

import type { FormEvent } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Upload, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const categories = [
  "Spiritual Growth",
  "Mental Health",
  "Emotional Healing",
  "Relationships",
  "Prayer & Worship",
  "Biblical Studies",
  "Self-Care",
  "Grief & Loss",
  "Anxiety & Depression",
  "Forgiveness",
  "Other",
];

export default function EditResourcePage({
  params,
}: {
  params: { id: string };
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [resourceUrl, setResourceUrl] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [published, setPublished] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function fetchResource() {
      try {
        const { data, error } = await supabase
          .from("resources")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error) throw error;
        if (!data) throw new Error("Resource not found");

        setTitle(data.title);
        setContent(data.content);
        setCategory(data.category);
        setResourceUrl(data.resource_url || "");
        setImagePreview(data.image_url);
        setPublished(data.published);
      } catch (err: any) {
        toast.error("Failed to load resource");
        router.push("/admin/resources");
      } finally {
        setLoading(false);
      }
    }

    fetchResource();
  }, [params.id, router, supabase]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Get the current user's ID
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Create the excerpt from the content (first 150 characters)
      const excerpt =
        content.length > 150 ? content.substring(0, 150) + "..." : content;

      // Prepare updates
      const updates: any = {
        title,
        content,
        excerpt,
        category,
        published,
        resource_url: resourceUrl || null,
        image_url: imagePreview, // Default to current preview (which might be base64 if new, or url if old)
      };

      // Since we are using base64 for now as per "new" page implementation:
      // In a real app with storage, we'd upload `image` file here if it exists.
      // But keeping consistent with existing pattern.

      const { error: updateError } = await supabase
        .from("resources")
        .update(updates)
        .eq("id", params.id);

      if (updateError) throw updateError;

      toast.success("Resource updated successfully!");
      router.push("/admin/resources");
    } catch (error: unknown) {
      console.error("Error updating resource:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred while updating the resource"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/admin/resources">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Resources
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Edit Resource
          </h1>
          <p className="text-muted-foreground">
            Update your article or resource details.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Resource Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter resource title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="resourceUrl">Resource URL</Label>
                  <Input
                    id="resourceUrl"
                    type="url"
                    value={resourceUrl}
                    onChange={(e) => setResourceUrl(e.target.value)}
                    placeholder="https://drive.google.com/..."
                  />
                  <p className="text-sm text-muted-foreground">
                    External resource link (Google Drive, PDF, etc.)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Featured Image</Label>
                  <div className="mt-1 flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="bg-transparent"
                      onClick={() => document.getElementById("image")?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Image
                    </Button>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    {imagePreview && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={removeImage}
                        className="bg-transparent text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {imagePreview && (
                <div className="mt-4 relative w-full aspect-[16/9] rounded-lg overflow-hidden border">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your resource content here..."
                  className="min-h-[300px]"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="published"
                  checked={published}
                  onCheckedChange={(checked) => setPublished(!!checked)}
                />
                <Label htmlFor="published">Publish immediately</Label>
              </div>

              {error && (
                <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  {error}
                </p>
              )}

              <div className="flex space-x-4">
                <Button type="submit" disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
                <Button
                  asChild
                  variant="outline"
                  type="button"
                  className="bg-transparent"
                >
                  <Link href="/admin/resources">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
