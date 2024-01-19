import { UserButton, auth } from "@clerk/nextjs";
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
import { SubjectForm } from "@/components/subject-form";
import { redirect } from "next/navigation";
import db from "@/lib/prisma";
import SubjectCard from "@/components/subject-card";
import Navbar from "@/components/navbar";
export default async function Home() {
  const { userId } = auth();
  if (!userId) {
    return redirect("/signin");
  }
  const subjects = await db.subject.findMany({
    where: {
      userId: userId,
    },
  });

  return (
    <div>
      <Navbar userId={userId}/>
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-4">
        {subjects.map((subject:any) => (
          <SubjectCard key={subject.id} id={subject.id} subject={subject.name} />
        ))}
      </div>
    </div>
  );
}
