import { auth } from "@clerk/nextjs";
import { createObjectCsvWriter } from "csv-writer";
import db from "@/lib/prisma";
import { NextResponse } from "next/server";
import { join } from "path";
import { readFileSync } from "fs";


export async function POST(req: Request) {
    return new NextResponse('coming soon')
}
