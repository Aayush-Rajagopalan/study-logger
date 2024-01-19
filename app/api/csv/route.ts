import { auth } from "@clerk/nextjs";
import { createObjectCsvWriter } from "csv-writer";
import db from "@/lib/prisma";
import { NextResponse } from "next/server";
import { join } from "path";
import { readFileSync } from "fs";


export async function POST(req: Request) {
    try {
        const { userId } = auth();

        if (!userId) {
            return { status: 401, body: "Unauthorized" };
        }

        // Retrieve subjects affiliated with the userId
        const activities = await db.activity.findMany({
            where: {
                subject: {
                    userId,
                },
            },
        });

        // Format activities into CSV
        const csvWriter = createObjectCsvWriter({
            path: "./output.csv",
            header: [
                { id: "subject.name", title: "Subject" },
                { id: "activity.startTime", title: "Start Time" },
                { id: "activity.endTime", title: "End Time" },
            ],
        });

        await csvWriter.writeRecords(activities);
        const csvFile = readFileSync(join(process.cwd(), "./output.csv"), "utf-8");

        console.log(csvFile)

        // Send the CSV file as a response
        return new NextResponse(csvFile, {
            headers: {
                "Content-Type": "text/csv",
            },
        });
    } catch (error) {
        console.error("Error:", error);
        return { status: 500, body: "Internal Server Error" };
    }
}
