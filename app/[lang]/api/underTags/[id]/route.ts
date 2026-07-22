import { underTagSchema } from "@/validation/validationSchemas";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function PATCH(request: NextRequest, props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const body = await request.json()

    const underTag = await prisma.underTag.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!underTag)
        return NextResponse.json({ error: 'Invalid underTag'}, { status: 404 })

    const updatedUnderTag = await prisma.underTag.update({
        where: {
            id: underTag.id
        },
        data: {
            label: body.label,
        }
    })

    return NextResponse.json(updatedUnderTag)
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const underTag = await prisma.underTag.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!underTag)
        return NextResponse.json({ error: 'Invalid underTag'}, { status: 404 })

    await prisma.underTag.delete({
        where:{
            id: underTag.id
        }
    })
    return NextResponse.json({})
}