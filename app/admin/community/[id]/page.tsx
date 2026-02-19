"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, X, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

export default function EditCommunityPostPage({
  params,
}: {
  params: { id: string };
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [published, setPublished] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // New states for image handling
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data, error } = await supabase
          .from("community_feed")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error) throw error;
        if (!data) throw new Error("Post not found");

        setTitle(data.title);
        setContent(data.content);
        setImageUrl(data.image_url || "");
        if (data.image_url) setImagePreview(data.image_url);
        setLinkUrl(data.link_url || "");
        setPublished(data.published);
      } catch (err: any) {
        toast.error("Failed to load post");
        router.push("/admin/community");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [params.id, router, supabase]);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageUrl(""); // Clear URL input when file is selected

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageUrl("");
  };

  const uploadImage: (file: File) => Promise<string | null> = async (file) => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from("community-images")
        .upload(fileName, file);

      if (error) {
        console.error("Storage upload error:", error);
        throw error;
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("community-images").getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error("You must be logged in to edit posts");
      }

      let finalImageUrl = imageUrl;

      // If a new file was selected, upload it
      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile);
        if (uploadedUrl) {
          finalImageUrl = uploadedUrl;
        } else {
          throw new Error("Failed to upload image");
        }
      } else if (!imageUrl && !imagePreview) {
        // If both are empty, and no preview, it means image was removed
        finalImageUrl = "";
      } else if (!imageUrl && imagePreview && imagePreview.startsWith("http")) {
        // If imageUrl input is empty but preview exists and is a remote URL (from initial load), keep it
        finalImageUrl = imagePreview;
      }

      const { error } = await supabase
        .from("community_feed")
        .update({
          title,
          content,
          image_url: finalImageUrl || null,
          link_url: linkUrl || null,
          published,
        })
        .eq("id", params.id);

      if (error) {
        console.error("Database update error:", error);
        throw error;
      }

      toast.success("Post updated successfully");
      router.push("/admin/community");
    } catch (error: unknown) {
      console.error("Submit error:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
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
            <Link href="/admin/community">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Community Feed
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Edit Community Post
          </h1>
          <p className="text-muted-foreground">
            Update your community post details.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Post Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your community post content here..."
                  className="min-h-[200px]"
                  required
                />
              </div>

              <div className="space-y-4">
                <Label>Image</Label>

                {/* Image preview */}
                {imagePreview && (
                  <div className="relative inline-block border rounded-lg overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-[200px] h-auto object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 h-6 w-6 rounded-full p-0"
                      onClick={removeImage}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* File upload */}
                  <div className="space-y-2">
                    <Label htmlFor="imageFile">Upload Image</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="imageFile"
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        disabled={!!imageUrl && !imageFile} // Disable if URL is typed (unless we are overriding)
                        className="file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                      />
                      {imageFile && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={removeImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* URL input */}
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">Or Image URL</Label>
                    <Input
                      id="imageUrl"
                      value={imageUrl}
                      onChange={(e) => {
                        setImageUrl(e.target.value);
                        if (e.target.value) setImagePreview(e.target.value);
                      }}
                      placeholder="https://example.com/image.jpg"
                      disabled={!!imageFile}
                    />
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Choose either upload a file or provide an image URL, not both.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkUrl">Link URL (optional)</Label>
                <Input
                  id="linkUrl"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
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
                  <Link href="/admin/community">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
