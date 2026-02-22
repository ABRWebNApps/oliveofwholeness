"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DeleteButtonProps {
  id: string;
  table: string;
  title: string;
}

export function DeleteButton({ id, table, title }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const { error } = await supabase.from(table).delete().eq("id", id);

      if (error) throw error;

      toast.success(`${title} deleted successfully.`);
      setIsOpen(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete item.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Delete Confirmation
          </DialogTitle>
          <DialogDescription className="pt-2 text-base">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">"{title}"</span>?
            This action cannot be undone and will permanently remove this data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Permanently"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
