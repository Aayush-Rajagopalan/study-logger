'use server'

import db from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function addSubject({name, userId}: {name: string, userId: string}){
    const res = await db.subject.create({
        data: {
            userId,
            name: name,
        }
    })
    revalidatePath('/')
    return res
}