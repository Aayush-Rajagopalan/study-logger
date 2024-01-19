"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

export default function SubjectCard({ id,subject }: any) {
  const router = useRouter();
  return (
    <Card>
      <div className="relative bg-emerald-500 h-[40px] rounded-tl-lg rounded-tr-lg"></div>
      <CardContent className="pt-8 flex flex-col items-center">
        <h3 className="text-left font-semibold text-2xl">
          {subject}
        </h3>
      </CardContent>
      <CardFooter className="p-4">
        <Button onClick={() => router.push(`/${id}`)}>
          Go to subject
        </Button>
      </CardFooter>
    </Card>
  );
}