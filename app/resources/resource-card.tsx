import { BookOpen } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Resource } from "./types";

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow flex flex-col">
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
          {new Date(resource.created_at).toLocaleDateString()}
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
  );
}
