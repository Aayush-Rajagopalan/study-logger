'use server'

import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addActivity({ subjectId }: { subjectId: string }) {
    const res = await db.activity.create({
        data: {
            subjectId,
            startTime: new Date().toISOString(),
            endTime: new Date().toISOString(),
        },
    });
    revalidatePath(`/${subjectId}`);
    return res;
}

export async function updateActivity({ subjectId, activityId }: { subjectId: string, activityId: string }) {
    const res = await db.activity.update({
        where: {
            id: activityId,
        },
        data: {
            subjectId,
            endTime: new Date().toISOString(),
        },
    });
    revalidatePath(`/${subjectId}`);
    return res;
}