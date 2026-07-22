import { NextRequest, NextResponse } from "next/server";
import { underTagSchema } from '@/validation/validationSchemas'
import { prisma } from "@/lib/prisma";

export async function GET(){
    const underTags = await prisma.underTag.findMany({
        include: {
            products: true,
        }
    })
    return NextResponse.json(underTags)
}

export async function POST(request: NextRequest) {
    const body = await request.json()
    const underTag = await prisma.underTag.findUnique({
        where: {
            id: body.id,
        }
    })
    if(underTag)
        return NextResponse.json({error: "UnderTag already exists"}, {status: 400})

    const newUnderTag = await prisma.underTag.create({
        data: {
            label: body.label,
            tag: {
                connect: {
                    id: body.tagId
                }
            }
        }
    })
    return NextResponse.json(newUnderTag, {status: 201})
}