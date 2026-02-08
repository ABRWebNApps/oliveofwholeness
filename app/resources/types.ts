export type Resource = {
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
