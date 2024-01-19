import Stopwatch from "@/components/stopwatch";
import { Button } from "@/components/ui/button";
import db from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function SubjectPage({
  params,
}: {
  params: { subjectId: string };
}) {
  const subject = await db.subject.findUnique({
    where: {
      id: params.subjectId,
    },
  });

  if (!subject) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col gap-y-5 justify-center items-center h-screen">
      <h1 className="text-3xl font-bold">{subject.name}</h1>
      <Stopwatch subjectId={subject.id}/>
    </div>
  );
}
