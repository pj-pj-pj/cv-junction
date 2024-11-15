import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCV } from "@/context/CVContext";

export default function DialogUpdateTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cvTitle, setCvTitle] = useState("");
  const [open, setOpen] = useState(false);
  const { selectedCV, updateCVTitle } = useCV();

  const handleTitleChange = (id: number, title: string) => {
    updateCVTitle(id, title);
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
          <DialogTitle>Change Title</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="cv-title"
              className="text-center"
            >
              CV Title:
            </Label>
            <Input
              id="cv-title"
              value={cvTitle}
              onChange={(e) => setCvTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={() => handleTitleChange(selectedCV!.cv_id, cvTitle)}
            disabled={!cvTitle.trim()}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
