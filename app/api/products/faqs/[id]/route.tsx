import { prisma } from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: any) {
    const id = params.id;
    console.log("ID", id)
    const { content } = await request.json();
    try {
        const fAQ = await prisma.fAQ.create({
            data: {
                content,
                Product: {
                    connect: {
                        id,
                    },
                },
            },
        });

        return NextResponse.json(
            { message: "New fAQ added", result: fAQ },
            { status: 201 }
        );

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 });

    }
}
