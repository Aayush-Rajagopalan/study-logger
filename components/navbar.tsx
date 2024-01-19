import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SubjectForm } from "./subject-form";
export default function Navbar({ userId }: { userId: string }) {
  return (
    <div className="h-16 pr-5 flex items-center gap-x-5 justify-end">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"}>Add Subject</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Subject</DialogTitle>
          </DialogHeader>
          <SubjectForm userId={userId} />
        </DialogContent>
      </Dialog>
      <ThemeToggle />
      <UserButton />
    </div>
  );
}
