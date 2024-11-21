import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCV } from "@/context/CVContext";

export default function DialogDeleteCV({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { selectedCV: cv, deleteCV } = useCV();

  const handleDeleteCV = (cvId: number | undefined) => {
    deleteCV(cvId!);
    setOpen(false);
  };

  const handleCancelDeleteCV = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete selected CV?</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-1">
          <div className="grid items-center text-gray-500 italic">
            This action cannot be undone.
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={handleCancelDeleteCV}>Cancel</Button>
          <Button
            variant="destructive"
            onClick={() => handleDeleteCV(cv?.cv_id)}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
